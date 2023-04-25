import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// actions
import { changePaymentHost } from 'src/modules/payment/payment.actions';
// selectors
import { selectPaymentHost } from 'src/modules/payment/payment.selectors';

function ChangePaymentHost() {
  const paymentHost = useSelector(selectPaymentHost);

  const dispatch = useDispatch();

  const onChangeText = (text) => {
    dispatch(changePaymentHost(text));
  };

  return (
    <View>
      <View>
        <Text>Change payment host</Text>
      </View>
      <View>
        <Text>Current host: {paymentHost}</Text>
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 10,
        }}
        onChangeText={onChangeText}
        value={paymentHost}
      />
    </View>
  );
}

export default ChangePaymentHost;
