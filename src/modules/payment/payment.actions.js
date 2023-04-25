import {
  IN_APP_PURCHASE_CONNECTION_REQUEST,
  IN_APP_PURCHASE_CONNECTION_SUCCESS,
  IN_APP_PURCHASE_CONNECTION_FAILURE,
  GET_IAP_SUBSCRIPTIONS_LIST_REQUEST,
  GET_IAP_SUBSCRIPTIONS_LIST_SUCCESS,
  GET_IAP_SUBSCRIPTIONS_LIST_FAILURE,
  GET_IAP_PRODUCTS_LIST_REQUEST,
  GET_IAP_PRODUCTS_LIST_SUCCESS,
  GET_IAP_PRODUCTS_LIST_FAILURE,
  HANDLE_PURCHASE_REQUEST,
  HANDLE_PURCHASE_SUCCESS,
  HANDLE_PURCHASE_FAILURE,
  HANDLE_PURCHASE_PAYMENT_REQUEST,
  HANDLE_PURCHASE_PAYMENT_SUCCESS,
  HANDLE_PURCHASE_PAYMENT_FAILURE,
  DONWGRADE_OLD_PREMIUM_TO_BASIC_REQUEST,
  DONWGRADE_OLD_PREMIUM_TO_BASIC_SUCCESS,
  DONWGRADE_OLD_PREMIUM_TO_BASIC_FAILURE,
  CHANGE_PAYMENT_HOST,
} from 'src/modules/payment/payment.types';

export function inAppPurchaseConnectionRequest(callback) {
  return {
    type: IN_APP_PURCHASE_CONNECTION_REQUEST,
    payload: callback,
  };
}

export function inAppPurchaseConnectionSuccess() {
  return {
    type: IN_APP_PURCHASE_CONNECTION_SUCCESS,
  };
}

export function inAppPurchaseConnectionFailure(error) {
  return {
    type: IN_APP_PURCHASE_CONNECTION_FAILURE,
    error,
  };
}

export function getIAPSubscriptionsListRequest() {
  return {
    type: GET_IAP_SUBSCRIPTIONS_LIST_REQUEST,
  };
}

export function getIAPSubscriptionsListSuccess(list) {
  return {
    type: GET_IAP_SUBSCRIPTIONS_LIST_SUCCESS,
    payload: list,
  };
}

export function getIAPSubscriptionsListFailure(error) {
  return {
    type: GET_IAP_SUBSCRIPTIONS_LIST_FAILURE,
    error,
  };
}

export function getIAPProductsListRequest() {
  return {
    type: GET_IAP_PRODUCTS_LIST_REQUEST,
  };
}

export function getIAPProductsListSuccess(list) {
  return {
    type: GET_IAP_PRODUCTS_LIST_SUCCESS,
    payload: list,
  };
}

export function getIAPProductsListFailure(error) {
  return {
    type: GET_IAP_PRODUCTS_LIST_FAILURE,
    error,
  };
}

export function handlePurchaseRequest(id, callback) {
  return {
    type: HANDLE_PURCHASE_REQUEST,
    payload: {
      id,
      callback,
    },
  };
}

export function handlePurchaseSuccess(callback = null) {
  return {
    type: HANDLE_PURCHASE_SUCCESS,
    payload: callback,
  };
}

export function handlePurchaseFailure() {
  return {
    type: HANDLE_PURCHASE_FAILURE,
  };
}

export function handlePurchasePaymentRequest(payment) {
  return {
    type: HANDLE_PURCHASE_PAYMENT_REQUEST,
    payload: payment,
  };
}

export function handlePurchasePaymentSuccess() {
  return {
    type: HANDLE_PURCHASE_PAYMENT_SUCCESS,
  };
}

export function handlePurchasePaymentFailure() {
  return {
    type: HANDLE_PURCHASE_PAYMENT_FAILURE,
  };
}

export function downgradeOldPremiumToBasicRequest(callback) {
  return {
    type: DONWGRADE_OLD_PREMIUM_TO_BASIC_REQUEST,
    payload: callback,
  };
}

export function downgradeOldPremiumToBasicSuccess() {
  return {
    type: DONWGRADE_OLD_PREMIUM_TO_BASIC_SUCCESS,
  };
}

export function downgradeOldPremiumToBasicFailure() {
  return {
    type: DONWGRADE_OLD_PREMIUM_TO_BASIC_FAILURE,
  };
}

export function changePaymentHost(host) {
  return {
    type: CHANGE_PAYMENT_HOST,
    payload: host,
  };
}
