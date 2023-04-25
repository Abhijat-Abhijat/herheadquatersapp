// todo: rename file to payments.sagas.ts (other files of this module too)
import { put, call, select, takeLatest, takeEvery } from 'redux-saga/effects';
import * as IAP from 'expo-in-app-purchases';
import { Alert, Platform } from 'react-native';
// types
import {
  IN_APP_PURCHASE_CONNECTION_REQUEST,
  GET_IAP_SUBSCRIPTIONS_LIST_REQUEST,
  GET_IAP_PRODUCTS_LIST_REQUEST,
  HANDLE_PURCHASE_REQUEST,
  HANDLE_PURCHASE_PAYMENT_REQUEST,
  DONWGRADE_OLD_PREMIUM_TO_BASIC_REQUEST,
} from 'src/modules/payment/payment.types';
// actions
import {
  inAppPurchaseConnectionSuccess,
  inAppPurchaseConnectionFailure,
  getIAPSubscriptionsListSuccess,
  getIAPSubscriptionsListFailure,
  getIAPProductsListSuccess,
  getIAPProductsListFailure,
  handlePurchaseSuccess,
  handlePurchaseFailure,
  handlePurchasePaymentSuccess,
  handlePurchasePaymentFailure,
  downgradeOldPremiumToBasicSuccess,
  downgradeOldPremiumToBasicFailure,
} from 'src/modules/payment/payment.actions';
import { getProfileRequest } from 'src/actions/user';
import { selectUserAccountPlan } from 'src/modules/user/selectors';
// selectors
import {
  selectPaymentHost,
  selectPaymentSuccessCallback,
} from 'src/modules/payment/payment.selectors';
// utils
import axios from 'src/axios';
import { proceedError } from 'src/actions/utils';
import { getPlanByName } from 'src/modules/payment/payment.helpers';
// account plan types
import { storePlanIdList } from 'src/modules/payment/planTypes';
import { productIdList } from 'src/modules/payment/productTypes';

// todo: spawn this saga
function* onInAppPurchaseConnectionRequest(action) {
  try {
    yield call(IAP.connectAsync);

    const setPurchaseListener = action.payload;
    setPurchaseListener();

    // check if there are unfinished transactions before other purchases
    // IAP.getPurchaseHistoryAsync for some reason triggers setPurchaseListener
    // so basically we trigger onHandlePurchasePaymentRequest saga from here
    // update: could be resolved in "expo-in-app-purchases": "~12.1.0" ?
    const historyResponse = yield call(IAP.getPurchaseHistoryAsync, {
      useGooglePlayCache: false,
    });

    yield put(inAppPurchaseConnectionSuccess());
  } catch (error) {
    yield proceedError(inAppPurchaseConnectionFailure, error);
  }
}

function* onGetIAPSubscriptionsListRequest() {
  try {
    const data = yield call(IAP.getProductsAsync, storePlanIdList);

    if (data.responseCode === IAP.IAPResponseCode.OK) {
      yield put(getIAPSubscriptionsListSuccess(data.results));
    } else {
      yield put(
        getIAPSubscriptionsListFailure,
        'Something went wrong when we try to load subscriptions',
      );
    }
  } catch (error) {
    yield proceedError(getIAPSubscriptionsListFailure, error);
  }
}

function* onGetIAPProductsListRequest() {
  try {
    const data = yield call(IAP.getProductsAsync, productIdList);

    if (data.responseCode === IAP.IAPResponseCode.OK) {
      yield put(getIAPProductsListSuccess(data.results));
    } else {
      yield proceedError(
        getIAPProductsListFailure,
        'Something went wrong when we try to load products',
      );
    }
  } catch (error) {
    yield proceedError(getIAPProductsListFailure, error);
  }
}

function* onHandlePurchaseRequest(action) {
  try {
    const { id, callback } = action.payload;

    const correctIds = [...storePlanIdList, ...productIdList];

    if (!correctIds.includes(id)) {
      throw new Error(`Can't purchase item with id ${id}!`);
    }

    const isPurchasingSubscription = storePlanIdList.includes(id);

    if (isPurchasingSubscription) {
      const currentAccountPlan = yield select(selectUserAccountPlan);

      const currentPlan = getPlanByName(currentAccountPlan);

      if (!currentPlan) {
        throw new Error('Can not determine current user account type!');
      }

      if (currentPlan?.storeId === id) {
        throw new Error(
          'Can not purchase the same account you currently have!',
        );
      }

      const isCurrentAccountPlanChangable = storePlanIdList.includes(
        currentPlan.storeId,
      );

      if (isCurrentAccountPlanChangable) {
        // for Android only
        // at this point user should have an active subscription
        // get last subscription purchaseToken
        let purchaseToken = undefined;

        if (Platform.OS === 'android') {
          const historyResponse = yield call(IAP.getPurchaseHistoryAsync, {
            useGooglePlayCache: false,
          });

          if (historyResponse.responseCode !== IAP.IAPResponseCode.OK) {
            Alert.alert('Error', 'Can not retrieve history data!');
            return;
          }

          if (historyResponse.results?.length === 0) {
            Alert.alert('Error', 'Can not retrieve purchase token!');
            return;
          }

          const filteredHistory = historyResponse.results.filter(
            (historyItem) => historyItem.productId === currentPlan.storeId,
          );

          if (filteredHistory.length === 0) {
            Alert.alert('Error', 'Can not extract current purchase token!');
            return;
          }

          let currentSubscriptionHistoryItem;

          if (filteredHistory.length === 1) {
            currentSubscriptionHistoryItem = filteredHistory[0];
          } else {
            currentSubscriptionHistoryItem = filteredHistory.reduce(
              (prevPurchase, curPurchase) => {
                return prevPurchase.purchaseTime > curPurchase.purchaseTime
                  ? prevPurchase
                  : curPurchase;
              },
            );
          }

          purchaseToken = currentSubscriptionHistoryItem.purchaseToken;
        }

        IAP.purchaseItemAsync(id, purchaseToken);
        yield put(handlePurchaseSuccess(callback));
        return;
      }
    }

    // can not call IAP.purchaseItemAsync in yield as promise never resolves
    // https://github.com/expo/expo/issues/5918
    IAP.purchaseItemAsync(id);
    yield put(handlePurchaseSuccess(callback));
  } catch (error) {
    yield proceedError(handlePurchaseFailure, error);
  }
}

function* onHandlePurchasePaymentRequest(action) {
  try {
    const paymentResponse = action.payload;

    const { responseCode, results, errorCode } = paymentResponse;
    const successCallback = yield select(selectPaymentSuccessCallback);
    const host = yield select(selectPaymentHost);

    if (responseCode === IAP.IAPResponseCode.OK) {
      const unfinishedPurchases = results.filter(
        (purchase) => purchase.acknowledged === false,
      );

      let lastPurchase;

      if (unfinishedPurchases.length === 0) {
        // this could happen when we call IAP.getPurchaseHistoryAsync from
        // onInAppPurchaseConnectionRequest saga as it (for some undocumented reason)
        // triggers setPurchaseListener which calls this saga
        yield put(handlePurchasePaymentSuccess());

        return;
      } else if (unfinishedPurchases.length === 1) {
        lastPurchase = unfinishedPurchases[0];
      } else {
        lastPurchase = unfinishedPurchases.reduce(
          (prevPurchase, curPurchase) => {
            return prevPurchase.purchaseTime > curPurchase.purchaseTime
              ? prevPurchase
              : curPurchase;
          },
        );
      }

      let paymentUrl;
      if (productIdList.includes(lastPurchase.productId)) {
        paymentUrl = '/payment/product';
      } else if (storePlanIdList.includes(lastPurchase.productId)) {
        paymentUrl = '/payment/subscription';
      }

      if (!paymentUrl) {
        Alert.alert('Error', `Unknown product id: ${lastPurchase.productId}!`);
        return;
      }

      const transactionReceipt = Platform.select({
        android: JSON.stringify({
          productId: lastPurchase.productId,
          packageName: lastPurchase.packageName,
          purchaseToken: lastPurchase.purchaseToken,
        }),
        ios: lastPurchase.transactionReceipt,
      });

      const paymentData = {
        transactionReceipt,
        type: Platform.select({
          android: 'google',
          ios: 'apple',
        }),
      };

      const axiosData = {
        method: 'POST',
        url: paymentUrl,
        data: paymentData,
      };

      if (host !== '') {
        axiosData.baseURL = host;
      }

      yield call(axios, axiosData);

      const consume = !storePlanIdList.includes(lastPurchase.productId);

      yield call(IAP.finishTransactionAsync, lastPurchase, consume);

      yield put(getProfileRequest());

      if (typeof successCallback === 'function') {
        successCallback();
      }

      yield put(handlePurchasePaymentSuccess());
      return;
    }

    if (responseCode === IAP.IAPResponseCode.USER_CANCELED) {
      yield proceedError(
        handlePurchasePaymentFailure,
        'You canceled your purchasing!',
      );
    } else if (responseCode === IAP.IAPResponseCode.DEFERRED) {
      yield proceedError(
        handlePurchasePaymentFailure,
        'You need parental approval before purchasing!',
      );
    } else {
      yield proceedError(
        handlePurchasePaymentFailure,
        `Could not proceed with payment! Error code: ${errorCode}`,
      );
    }
  } catch (error) {
    yield proceedError(handlePurchasePaymentFailure, error);
  }
}

function* onDowngradeOldPremiumToBasicRequest(action) {
  try {
    const callback = action.payload;

    yield call(axios, {
      method: 'POST',
      url: '/stripe/payment/plans/cancel',
    });

    yield put(getProfileRequest());
    yield put(downgradeOldPremiumToBasicSuccess());

    if (typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    yield proceedError(downgradeOldPremiumToBasicFailure, error);
  }
}

export default function* () {
  yield takeLatest(
    IN_APP_PURCHASE_CONNECTION_REQUEST,
    onInAppPurchaseConnectionRequest,
  );

  yield takeLatest(
    GET_IAP_SUBSCRIPTIONS_LIST_REQUEST,
    onGetIAPSubscriptionsListRequest,
  );

  yield takeLatest(GET_IAP_PRODUCTS_LIST_REQUEST, onGetIAPProductsListRequest);

  yield takeEvery(HANDLE_PURCHASE_REQUEST, onHandlePurchaseRequest);

  yield takeEvery(
    HANDLE_PURCHASE_PAYMENT_REQUEST,
    onHandlePurchasePaymentRequest,
  );

  yield takeEvery(
    DONWGRADE_OLD_PREMIUM_TO_BASIC_REQUEST,
    onDowngradeOldPremiumToBasicRequest,
  );
}
