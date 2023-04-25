import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import MyCollaborationsListScreen, {
  screenOptions as myCollaborationsListScreenOptions,
} from 'src/screens/Collaboration/MyCollaborationsList';
import CollaborationViewScreen, {
  screenOptions as collaborationViewScreenOptions,
} from 'src/screens/Collaboration/CollaborationView';
import CollaborationEditScreen, {
  screenOptions as collaborationEditScreenOptions,
} from 'src/screens/Collaboration/CollaborationEdit';
import ProfileScreen, {
  screenOptions as profileScreenOptions,
} from 'src/screens/User/Profile';
import ReviewListScreen, {
  screenOptions as reviewListScreenOptions,
} from 'src/screens/User/ReviewList';
import FullScreenImageScreen, {
  screenOptions as fullScreenImageScreenOptions,
} from 'src/screens/FullScreenImage';
import RateCollaborationScreen, {
  screenOptions as rateCollaborationScreenOptions,
} from 'src/screens/Collaboration/RateCollaboration';
import OutOfCreditsScreen, {
  screenOptions as outOfCreditsScreenOptions,
} from 'src/screens/OutOfCredits';
import SendCollaborationScreen, {
  screenOptions as sendCollaborationScreenOptions,
} from 'src/screens/Collaboration/SendCollaboration';
import CollaborationReviewViewScreen, {
  screenOptions as collaborationReviewViewOptions,
} from 'src/screens/Collaboration/CollaborationReviewView';
// styles
import { defaultScreenOptions } from './styles';

const Stack = createStackNavigator();

function MyCollaborationsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MyCollaborationsList"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name="MyCollaborationsList"
        component={MyCollaborationsListScreen}
        options={myCollaborationsListScreenOptions}
      />
      <Stack.Screen
        name="CollaborationView"
        component={CollaborationViewScreen}
        options={collaborationViewScreenOptions}
      />
      <Stack.Screen
        name="CollaborationEdit"
        component={CollaborationEditScreen}
        options={collaborationEditScreenOptions}
      />
      <Stack.Screen
        name="SendCollaboration"
        component={SendCollaborationScreen}
        options={sendCollaborationScreenOptions}
      />
      <Stack.Screen
        name="CollaborationReviewView"
        component={CollaborationReviewViewScreen}
        options={collaborationReviewViewOptions}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileScreenOptions}
      />
      <Stack.Screen
        name="ReviewList"
        component={ReviewListScreen}
        options={reviewListScreenOptions}
      />
      <Stack.Screen
        name="FullScreenImage"
        component={FullScreenImageScreen}
        options={fullScreenImageScreenOptions}
      />
      <Stack.Screen
        name="RateCollaboration"
        component={RateCollaborationScreen}
        options={rateCollaborationScreenOptions}
      />
      <Stack.Screen
        name="OutOfCredits"
        component={OutOfCreditsScreen}
        options={outOfCreditsScreenOptions}
      />
    </Stack.Navigator>
  );
}

export default MyCollaborationsNavigator;
