import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddInfoScreen, {
  screenOptions as addInfoScreenOptions,
} from 'src/screens/Quiz/AddInfo';
import AddPreferencesScreen, {
  screenOptions as addPreferencesScreenOptions,
} from 'src/screens/Quiz/AddPreferences';
// styles
import { primaryColor, contrastText } from 'src/assets/jss/styles';

const Stack = createStackNavigator();

function QuizNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AddInfo"
      screenOptions={{
        headerStyle: {
          backgroundColor: primaryColor.main,
        },
        headerTintColor: contrastText,
        headerTitleStyle: {
          color: contrastText,
          fontFamily: 'lato-bold',
          fontWeight: null,
          fontSize: 17,
          lineHeight: 23,
        },
        headerBackTitle: null,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="AddInfo"
        component={AddInfoScreen}
        options={addInfoScreenOptions}
      />
      <Stack.Screen
        name="AddPreferences"
        component={AddPreferencesScreen}
        options={addPreferencesScreenOptions}
      />
    </Stack.Navigator>
  );
}

export default QuizNavigator;
