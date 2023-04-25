import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import Onboarding1Screen from 'src/screens/Onboarding/Onboarding1';
import Onboarding2Screen from 'src/screens/Onboarding/Onboarding2';
import Onboarding3Screen from 'src/screens/Onboarding/Onboarding3';
import Onboarding4Screen from 'src/screens/Onboarding/Onboarding4';
import SelectAccountPlanScreen, {
  screenOptions as selectAccountPlanScreenOptions,
} from 'src/screens/Onboarding/SelectAccountPlan';
// styles
import { primaryColor } from 'src/assets/jss/styles';

const Stack = createStackNavigator();

function OnboardingNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SelectAccount"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: primaryColor.main,
        },
        headerTitle: 'HerHeadquarters',
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'lato-bold',
          fontSize: 17,
          lineHeight: 23,
          letterSpacing: 0,
        },
      }}
    >
      <Stack.Screen
        name="SelectAccount"
        component={SelectAccountPlanScreen}
        options={selectAccountPlanScreenOptions}
      />
      <Stack.Screen name="Onboarding1" component={Onboarding1Screen} />
      <Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
      <Stack.Screen name="Onboarding3" component={Onboarding3Screen} />
      <Stack.Screen name="Onboarding4" component={Onboarding4Screen} />
    </Stack.Navigator>
  );
}

export default OnboardingNavigator;
