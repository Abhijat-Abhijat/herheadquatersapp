import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import FavoritesScreen, {
  screenOptions as favoritesScreenOptions,
} from 'src/screens/Favorites';
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
import MyCollaborationsListScreen, {
  screenOptions as myCollaborationListScreenOptions,
} from 'src/screens/Collaboration/MyCollaborationsList';
import ChatViewScreen, {
  screenOptions as chatViewScreenOptions,
} from 'src/screens/Chat/ChatView';
import OutOfCreditsScreen, {
  screenOptions as outOfCreditsScreenOptions,
} from 'src/screens/OutOfCredits';
import SendCollaborationScreen, {
  screenOptions as sendCollaborationScreenOptions,
} from 'src/screens/Collaboration/SendCollaboration';
// styles
import { defaultScreenOptions } from './styles';

const Stack = createStackNavigator();

function FavoritesNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={favoritesScreenOptions}
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
        name="MyCollaborationsList"
        component={MyCollaborationsListScreen}
        options={myCollaborationListScreenOptions}
      />
      <Stack.Screen
        name="ChatView"
        component={ChatViewScreen}
        options={chatViewScreenOptions}
      />
      <Stack.Screen
        name="OutOfCredits"
        component={OutOfCreditsScreen}
        options={outOfCreditsScreenOptions}
      />
    </Stack.Navigator>
  );
}

export default FavoritesNavigator;
