import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
// components
import TermsAndPrivacyLinks from 'src/modules/core/components/TermsAndPrivacyLinks';
// containers
import PurchaseCreditsContainer from 'src/modules/payment/containers/PurchaseCredits';

function PurchaseCredits({ navigation }) {
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
        paddingBottom: 10
      }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 0,
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="#C5E3E6" barStyle="dark-content" />
      <PurchaseCreditsContainer callback={onSuccessCallback} />
      <TermsAndPrivacyLinks />
    </ScrollView>
  );
}

export const screenOptions = {
  title: 'Purchase Credits',
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

export default PurchaseCredits;
