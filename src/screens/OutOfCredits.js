import React, { useCallback } from 'react';
import { ScrollView, StatusBar } from 'react-native';
// component
import OutOfCredits from 'src/modules/payment/components/OutOfCredits/OutOfCredits';

function OutOfCreditsScreen({ navigation }) {
  const creditsRedirect = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'MyHQ',
      params: {
        screen: 'PurchaseCredits',
        initial: false,
      },
    });
  }, [navigation.navigate]);

  const accountRedirect = useCallback(() => {
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
      <OutOfCredits
        creditsRedirect={creditsRedirect}
        accountRedirect={accountRedirect}
      />
    </ScrollView>
  );
}

export const screenOptions = {
  title: 'Out of Credits',
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

export default OutOfCreditsScreen;
