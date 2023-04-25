import * as Notifications from 'expo-notifications';

const getPushNotifications = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync({
    experienceId: '@kostyazgara/herheadquarters',
  });

  return token;
};

export default {
  getPushNotifications,
};
