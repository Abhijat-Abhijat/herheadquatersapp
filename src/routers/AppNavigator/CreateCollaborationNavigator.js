import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import CollaborationCreateStepOneScreen from 'src/screens/Collaboration/Create/StepOne';
import CollaborationCreateStepTwoScreen from 'src/screens/Collaboration/Create/StepTwo';
import CollaborationCreateStepThreeScreen from 'src/screens/Collaboration/Create/StepThree';
import CollaborationCreateStepFourScreen from 'src/screens/Collaboration/Create/StepFour';
import CollaborationCreateReviewSubmittedScreen, {
  screenOptions as collaborationCreateReviewSubmittedScreenOptions,
} from 'src/screens/Collaboration/Create/ReviewSubmitted';
// styles
import { defaultScreenOptions } from './styles';

const Stack = createStackNavigator();

function CreateCollaborationNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CollaborationCreateStepOne"
      screenOptions={{
        ...defaultScreenOptions,
        title: 'Add Partnership',
      }}
    >
      <Stack.Screen
        name="CollaborationCreateStepOne"
        component={CollaborationCreateStepOneScreen}
      />
      <Stack.Screen
        name="CollaborationCreateStepTwo"
        component={CollaborationCreateStepTwoScreen}
      />
      <Stack.Screen
        name="CollaborationCreateStepThree"
        component={CollaborationCreateStepThreeScreen}
      />
      <Stack.Screen
        name="CollaborationCreateStepFourScreen"
        component={CollaborationCreateStepFourScreen}
      />
      <Stack.Screen
        name="CollaborationCreateReviewSubmittedScreen"
        component={CollaborationCreateReviewSubmittedScreen}
        options={collaborationCreateReviewSubmittedScreenOptions}
      />
    </Stack.Navigator>
  );
}

export const screenOptions = {
  headerShown: false,
};

export default CreateCollaborationNavigator;
