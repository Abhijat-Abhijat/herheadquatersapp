import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
// containers
import UpdateAccountPlan from 'src/modules/payment/containers/UpdateAccountPlan';

function UpdateAccountPlanScreen({ navigation }) {
  const onSuccessCallback = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#C5E3E6',
        paddingLeft: 10,
        paddingRight: 10,
      }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 0,
      }}
    >
      <StatusBar backgroundColor="#C5E3E6" barStyle="dark-content" />
      <UpdateAccountPlan callback={onSuccessCallback} />
    </ScrollView>
  );
}

export const screenOptions = {
  title: 'Manage Membership',
  headerStyle: {
    backgroundColor: '#C5E3E6',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    color: '#333333',
  },
  headerTintColor: '#333333',
};

export default UpdateAccountPlanScreen;
