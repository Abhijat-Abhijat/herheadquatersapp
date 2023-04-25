import React, { useCallback } from 'react';
import { ScrollView, StatusBar } from 'react-native';
// components
import UpdateToPremium from 'src/modules/payment/components/UpdateToPremium';

function UpdateToPremiumScreen({ navigation }) {
  const updateToPremiumRedirect = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'MyHQ',
      params: {
        screen: 'AccountPlanEdit',
        initial: false,
      },
    });
  }, [navigation.navigate]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#C5E3E6',
      }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 0,
      }}
    >
      <StatusBar backgroundColor="#C5E3E6" barStyle="dark-content" />
      <UpdateToPremium updateToPremiumRedirect={updateToPremiumRedirect} />
    </ScrollView>
  );
}

export const screenOptions = {
  title: 'Upgrade to Connect',
  headerStyle: {
    backgroundColor: '#C5E3E6',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    color: '#333333',
  },
  headerTintColor: '#02BAC2',
};

export default UpdateToPremiumScreen;
