import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import SignInScreen from 'src/screens/Auth/SignIn';
import SignUpCompleteScreen from 'src/screens/Auth/SignUpComplete';
import ForgotPasswordScreen from 'src/screens/Auth/ForgotPassword';
import ForgotPasswordSuccessScreen from 'src/screens/Auth/ForgotPasswordSuccess';
import SignUpFirstStepScreen, {
  screenOptions as signUpFirstStepScreenOptions,
} from 'src/screens/Auth/SignUpFirstStep';
import SignUpSecondStepScreen, {
  screenOptions as signUpSecondStepScreenOptions,
} from 'src/screens/Auth/SignUpSecondStep';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="SignUpFirstStep"
        component={SignUpFirstStepScreen}
        options={signUpFirstStepScreenOptions}
      />
      <Stack.Screen
        name="SignUpSecondStep"
        component={SignUpSecondStepScreen}
        options={signUpSecondStepScreenOptions}
      />
      <Stack.Screen name="SignUpComplete" component={SignUpCompleteScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="ForgotPasswordSuccess"
        component={ForgotPasswordSuccessScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
