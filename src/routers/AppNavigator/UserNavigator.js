import React from 'react';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import MyHQScreen, {
  screenOptions as myHQScreenOptions,
} from 'src/screens/MyHQ/MyHQ';
import ProfileScreen, {
  screenOptions as profileScreenOptions,
} from 'src/screens/User/Profile';
import ProfileEditScreen, {
  screenOptions as profileEditScreenOptions,
} from 'src/screens/User/ProfileEdit';
import AddPreferencesScreen, {
  screenOptions as addPreferencesScreenOptions,
} from 'src/screens/Quiz/AddPreferences';
import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from 'src/screens/MyHQ/Settings/Settings';
import ChangePasswordScreen, {
  screenOptions as changePasswordScreenOptions,
} from 'src/screens/MyHQ/Settings/ChangePassword';
import UpdateNotificationPreferencesScreen, {
  screenOptions as updateNotificationPreferencesScreenOptions,
} from 'src/screens/MyHQ/Settings/UpdateNotificationPreferences';
import UpdateEmailPreferencesScreen, {
  screenOptions as updateEmailPreferencesScreenOptions,
} from 'src/screens/MyHQ/Settings/UpdateEmailPreferences';
import SendFeedbackScreen, {
  screenOptions as sendFeedbackScreenOptions,
} from 'src/screens/MyHQ/SendFeedback';
import AboutScreen, {
  screenOptions as aboutScreenOptions,
} from 'src/screens/MyHQ/About';
import UpdateAccountPlanScreen, {
  screenOptions as updateAccountPlanScreenOptions,
} from 'src/screens/MyHQ/UpdateAccountPlan';
import PurchaseCreditsScreen, {
  screenOptions as purchaseCreditsScreenOptions,
} from 'src/screens/MyHQ/PurchaseCredits';
import FullScreenImageScreen, {
  screenOptions as fullScreenImageScreenOptions,
} from 'src/screens/FullScreenImage';
// styles
import { defaultScreenOptions } from './styles';
// DEVELOPMENT ONLY
import ChangePaymentHost from 'src/modules/payment/containers/ChangePaymentHost';

const Stack = createStackNavigator();

function UserNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MyHQ"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name="MyHQ"
        component={MyHQScreen}
        options={myHQScreenOptions}
      />
      <Stack.Screen
        name="PurchaseCredits"
        component={PurchaseCreditsScreen}
        options={purchaseCreditsScreenOptions}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileScreenOptions}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={profileEditScreenOptions}
      />
      <Stack.Screen
        name="CollaborationPreferences"
        component={AddPreferencesScreen}
        options={addPreferencesScreenOptions}
      />
      <Stack.Screen
        name="AccountPlanEdit"
        component={UpdateAccountPlanScreen}
        options={updateAccountPlanScreenOptions}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={changePasswordScreenOptions}
      />
      <Stack.Screen
        name="UpdateNotificationPreferences"
        component={UpdateNotificationPreferencesScreen}
        options={updateNotificationPreferencesScreenOptions}
      />
      <Stack.Screen
        name="UpdateEmailPreferences"
        component={UpdateEmailPreferencesScreen}
        options={updateEmailPreferencesScreenOptions}
      />
      <Stack.Screen
        name="SendFeedback"
        component={SendFeedbackScreen}
        options={sendFeedbackScreenOptions}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={aboutScreenOptions}
      />
      <Stack.Screen
        name="FullScreenImage"
        component={FullScreenImageScreen}
        options={fullScreenImageScreenOptions}
      />
      {/* for testing payments */}
      {Constants.manifest.releaseChannel !== 'production' && (
        <Stack.Screen
          name="ChangePaymentHost"
          component={ChangePaymentHost}
          options={{ title: 'Change Payment Host' }}
        />
      )}
    </Stack.Navigator>
  );
}

export default UserNavigator;
