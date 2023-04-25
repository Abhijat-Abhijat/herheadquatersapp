export const selectSubscriptions = (state) => state.payment.subscriptions;

export const selectProducts = (state) => state.payment.products;

export const selectIsSubscriptionsLoading = (state) =>
  state.payment.isSubscriptionsLoading;

export const selectIsProductsLoading = (state) =>
  state.payment.isProductsLoading;

export const selectIsConnectedToStore = (state) =>
  state.payment.isConnectedToStore;

export const selectIsReadyToPurchaseSubscription = (state) =>
  state.payment.isConnectedToStore &&
  !state.payment.isSubscriptionsLoading &&
  state.payment.subscriptions.length !== 0;

export const selectIsReadyToPurchaseProduct = (state) =>
  state.payment.isConnectedToStore &&
  !state.payment.isProductsLoading &&
  state.payment.products.length !== 0;

export const selectPaymentSuccessCallback = (state) =>
  state.payment.paymentSuccessCallback;

export const selectIsStorePaymentProceeding = (state) =>
  state.payment.isStorePaymentProceeding;

export const selectIsBackendPaymentProceeding = (state) =>
  state.payment.isBackendPaymentProceeding;

export const selectPaymentHost = (state) => state.payment.paymentHost;
