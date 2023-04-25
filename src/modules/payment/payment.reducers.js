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
} from 'src/modules/payment/payment.types';

const initState = {
  isConnectingToStore: false,
  isConnectedToStore: false,
  isSubscriptionsLoading: false,
  subscriptions: [],
  isProductsLoading: false,
  products: [],
  isStorePaymentProceeding: false,
  isBackendPaymentProceeding: false,
  paymentSuccessCallback: null,
  // only for development
  paymentHost: '',
};

const reduceMap = {
  ['CHANGE_PAYMENT_HOST']: (state, action) => {
    return {
      ...state,
      paymentHost: action.payload,
    };
  },
  [IN_APP_PURCHASE_CONNECTION_REQUEST]: (state) => {
    return {
      ...state,
      isConnectingToStore: true,
      isConnectedToStore: false,
    };
  },
  [IN_APP_PURCHASE_CONNECTION_SUCCESS]: (state) => {
    return {
      ...state,
      isConnectingToStore: false,
      isConnectedToStore: true,
    };
  },
  [IN_APP_PURCHASE_CONNECTION_FAILURE]: (state) => {
    return {
      ...state,
      isConnectingToStore: false,
      isConnectedToStore: false,
    };
  },
  [GET_IAP_SUBSCRIPTIONS_LIST_REQUEST]: (state) => {
    return {
      ...state,
      isSubscriptionsLoading: true,
      subscriptions: [],
    };
  },
  [GET_IAP_SUBSCRIPTIONS_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      isSubscriptionsLoading: false,
      subscriptions: action.payload,
    };
  },
  [GET_IAP_SUBSCRIPTIONS_LIST_FAILURE]: (state) => {
    return {
      ...state,
      isSubscriptionsLoading: false,
    };
  },
  [GET_IAP_PRODUCTS_LIST_REQUEST]: (state) => {
    return {
      ...state,
      isProductsLoading: true,
      products: [],
    };
  },
  [GET_IAP_PRODUCTS_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      isProductsLoading: false,
      products: action.payload,
    };
  },
  [GET_IAP_PRODUCTS_LIST_FAILURE]: (state) => {
    return {
      ...state,
      isProductsLoading: false,
    };
  },
  [HANDLE_PURCHASE_REQUEST]: (state) => {
    return {
      ...state,
      isStorePaymentProceeding: true,
    };
  },
  [HANDLE_PURCHASE_SUCCESS]: (state, action) => {
    return {
      ...state,
      paymentSuccessCallback: action?.payload,
    };
  },
  [HANDLE_PURCHASE_FAILURE]: (state) => {
    return {
      ...state,
      isStorePaymentProceeding: false,
    };
  },
  [HANDLE_PURCHASE_PAYMENT_REQUEST]: (state) => {
    return {
      ...state,
      isStorePaymentProceeding: false,
      isBackendPaymentProceeding: true,
    };
  },
  [HANDLE_PURCHASE_PAYMENT_SUCCESS]: (state) => {
    return {
      ...state,
      isBackendPaymentProceeding: false,
      paymentSuccessCallback: null,
    };
  },
  [HANDLE_PURCHASE_PAYMENT_FAILURE]: (state) => {
    return {
      ...state,
      isBackendPaymentProceeding: false,
      paymentSuccessCallback: null,
    };
  },
  [DONWGRADE_OLD_PREMIUM_TO_BASIC_REQUEST]: (state) => {
    return {
      ...state,
      isBackendPaymentProceeding: true,
    };
  },
  [DONWGRADE_OLD_PREMIUM_TO_BASIC_SUCCESS]: (state) => {
    return {
      ...state,
      isBackendPaymentProceeding: false,
    };
  },
  [DONWGRADE_OLD_PREMIUM_TO_BASIC_FAILURE]: (state) => {
    return {
      ...state,
      isBackendPaymentProceeding: false,
    };
  },
};

export default (state = initState, action) => {
  const reducer = reduceMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};
