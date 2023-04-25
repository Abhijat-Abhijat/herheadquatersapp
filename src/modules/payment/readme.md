PAYMENT FLOW

1. IN_APP_PURCHASE_CONNECTION_REQUEST - to connect to store (required before everything else)
2. GET_IAP_SUBSCRIPTIONS_LIST_REQUEST or IN_APP_PURCHASE_CONNECTION_REQUEST - to get every
   purchasable subscriptions or products (required before purchasing)
3. HANDLE_PURCHASE_REQUEST - user wants to buy something (opens NATIVE payment)
   optionaly we pass 'success callback' - which we could need at the end of PAYMENT FLOW
4. HANDLE_PURCHASE_PAYMENT_REQUEST - starts if user successfuly pays for product or
   subscription (in NATIVE payment) - this action starts 'unblocking' of what user payed for on HH backend
   if payment was successfull we call 'success callback' from [3] (if it exist)
   We can't pass this callback directly or through actions because [3] ends when user
   starts NATIVE payment and [4] starts when response from STORE comes to app
   The listener 'setPurchaseListener' from 'expo-in-app-purchases' catches this response
   and [4] begins
