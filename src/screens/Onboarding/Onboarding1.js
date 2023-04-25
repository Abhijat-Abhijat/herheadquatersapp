import React from 'react';
// core components
import OnboardingContainer from 'src/components/OnboardingContainer';

function Onboarding1({ navigation }) {
  return (
    <OnboardingContainer
      title={'Post Partnerships'}
      text={
        'Have a need for an upcoming project, event, or campaign? Use a partnership credit to post an opportunity for the perfect partner to discover. Then, start receiving requests from potential allies who want to partner with you!'
      }
      step={0}
      image={require('../../../assets/Onboarding/Onboarding1/Onboarding1.png')}
      next={() => navigation.navigate('Onboarding2')}
      navigation={navigation}
    />
  );
}

export default Onboarding1;
