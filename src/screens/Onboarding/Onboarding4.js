import React from 'react';
// core components
import OnboardingContainer from 'src/components/OnboardingContainer';

function Onboarding4({ navigation }) {
  return (
    <OnboardingContainer
      title={'Get Started!'}
      text={
        'Complete your profile, post your first partnership, and discover new partnership opportunities!'
      }
      step={3}
      image={require('../../../assets/Onboarding/Onboarding4/Onboarding4.png')}
      navigation={navigation}
    />
  );
}

export default Onboarding4;
