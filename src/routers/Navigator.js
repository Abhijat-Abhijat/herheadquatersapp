import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
// navigators
import OnboardingNavigator from 'src/routers/OnboardingNavigator';
import QuizNavigator from 'src/routers/QuizNavigator';
import AppNavigator from 'src/routers/AppNavigator';
import AuthNavigator from 'src/routers/AuthNavigator';
// screens
import AuthLoadingScreen from 'src/screens/Auth/AuthLoading';
// services
import NavigationService from 'src/services/NavigationService';
// actions
import { updateNavigationRequest } from 'src/actions/app';

const Stack = createStackNavigator();

function Navigator() {
  const dispatch = useDispatch();

  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      onStateChange={(...props) => {
        dispatch(updateNavigationRequest(...props));
      }}
    >
      <Stack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Quiz" component={QuizNavigator} />
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Home" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
