import React from 'react';
// core components
import OnboardingContainer from 'src/components/OnboardingContainer';

function Onboarding2({ navigation }) {
  return (
    <OnboardingContainer
      title={'Discover Partnerships'}
      text={
        'Get immediate access to partnership opportunities! Discover partnerships via the newsfeed or search to discover specific opportunities for your business. Instantly receive all the relevant details to determine if the partnership is a great fit for your brand.'
      }
      step={1}
      image={require('../../../assets/Onboarding/Onboarding2/Onboarding2.png')}
      next={() => navigation.navigate('Onboarding3')}
      navigation={navigation}
    />
  );
}

export default Onboarding2;
