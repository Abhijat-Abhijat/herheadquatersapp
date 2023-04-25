import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// navigators
import CreateCollaborationNavigator, {
  screenOptions as createCollaborationNavigatorOptions,
} from 'src/routers/AppNavigator/CreateCollaborationNavigator';
// screens
import CollaborationsListScreen, {
  screenOptions as collaborationsListScreenOptions,
} from 'src/screens/Collaboration/CollaborationsList';
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
import UserCollaborationsListScreen, {
  screenOptions as userCollaborationsListScreenOptions,
} from 'src/screens/Collaboration/UserCollaborationsList';
import ChatViewScreen, {
  screenOptions as chatViewScreenOptions,
} from 'src/screens/Chat/ChatView';
import SearchScreen, {
  screenOptions as searchScreenOptions,
} from 'src/screens/Search/Search';
import SearchResultScreen, {
  screenOptions as searchResultScreenOptions,
} from 'src/screens/Search/SearchResult';
import ProfileListScreen, {
  screenOptions as profileListScreenOptions,
} from 'src/screens/User/ProfileList';
import FilterScreen, {
  screenOptions as filterScreenOptions,
} from 'src/screens/Search/Filter';
import FirstMessageScreen, {
  screenOptions as firstMessageScreenOptions,
} from 'src/screens/Chat/FirstMessage';
import OutOfCreditsScreen, {
  screenOptions as outOfCreditsScreenOptions,
} from 'src/screens/OutOfCredits';
import UpdateToPremiumScreen, {
  screenOptions as updateToPremiumScreenOptions,
} from 'src/screens/UpdateToPremium';
import SendCollaborationScreen, {
  screenOptions as sendCollaborationScreenOptions,
} from 'src/screens/Collaboration/SendCollaboration';
// styles
import { defaultScreenOptions } from './styles';

const Stack = createStackNavigator();

function NewsfeedNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CollaborationsList"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name="CollaborationsList"
        component={CollaborationsListScreen}
        options={collaborationsListScreenOptions}
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
        name="CollaborationCreate"
        component={CreateCollaborationNavigator}
        options={createCollaborationNavigatorOptions}
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
        name="ChatView"
        component={ChatViewScreen}
        options={chatViewScreenOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={searchResultScreenOptions}
      />
      <Stack.Screen
        name="ProfileList"
        component={ProfileListScreen}
        options={profileListScreenOptions}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        options={filterScreenOptions}
      />
      <Stack.Screen
        name="FirstMessage"
        component={FirstMessageScreen}
        options={firstMessageScreenOptions}
      />
      <Stack.Screen
        name="OutOfCredits"
        component={OutOfCreditsScreen}
        options={outOfCreditsScreenOptions}
      />
      <Stack.Screen
        name="UpdateToPremium"
        component={UpdateToPremiumScreen}
        options={updateToPremiumScreenOptions}
      />
    </Stack.Navigator>
  );
}

export default NewsfeedNavigator;
