import React from 'react';
// core components
import OnboardingContainer from 'src/components/OnboardingContainer';

function Onboarding3({ navigation }) {
  return (
    <OnboardingContainer
      title={'Rated Experiences'}
      text={
        'After completing a partnership, rate the experience with your recent collaborator. Take advantage of partnership experience ratings on profiles to determine which potential partner will be your best ally.'
      }
      step={2}
      image={require('../../../assets/Onboarding/Onboarding3/Onboarding3.png')}
      next={() => navigation.navigate('Onboarding4')}
      navigation={navigation}
    />
  );
}

export default Onboarding3;
