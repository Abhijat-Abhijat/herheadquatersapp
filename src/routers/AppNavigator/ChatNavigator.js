import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import ChatListScreen, {
  screenOptions as chatListScreenOptions,
} from 'src/screens/Chat/ChatList';
import ChatViewScreen, {
  screenOptions as chatViewScreenOptions,
} from 'src/screens/Chat/ChatView';
import ProfileScreen, {
  screenOptions as profileScreenOptions,
} from 'src/screens/User/Profile';
import ReviewListScreen, {
  screenOptions as reviewListScreenOptions,
} from 'src/screens/User/ReviewList';
import FullScreenImageScreen, {
  screenOptions as fullScreenImageScreenOptions,
} from 'src/screens/FullScreenImage';
import UserCollaborationsListScreen, {
  screenOptions as userCollaborationsListScreenOptions,
} from 'src/screens/Collaboration/UserCollaborationsList';
import CollaborationViewScreen, {
  screenOptions as collaborationViewScreenOptions,
} from 'src/screens/Collaboration/CollaborationView';
import OutOfCreditsScreen, {
  screenOptions as outOfCreditsScreenOptions,
} from 'src/screens/OutOfCredits';
import SendCollaborationScreen, {
  screenOptions as sendCollaborationScreenOptions,
} from 'src/screens/Collaboration/SendCollaboration';
// styles
import { defaultScreenOptions } from './styles';
const Stack = createStackNavigator();

function ChatNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={chatListScreenOptions}
      />
      <Stack.Screen
        name="ChatView"
        component={ChatViewScreen}
        options={chatViewScreenOptions}
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
        name="UserCollaborationsList"
        component={UserCollaborationsListScreen}
        options={userCollaborationsListScreenOptions}
      />
      <Stack.Screen
        name="CollaborationView"
        component={CollaborationViewScreen}
        options={collaborationViewScreenOptions}
      />
      <Stack.Screen
        name="SendCollaboration"
        component={SendCollaborationScreen}
        options={sendCollaborationScreenOptions}
      />
      <Stack.Screen
        name="OutOfCredits"
        component={OutOfCreditsScreen}
        options={outOfCreditsScreenOptions}
      />
    </Stack.Navigator>
  );
}

export default ChatNavigator;
