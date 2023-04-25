import { Alert } from 'react-native';
import { openLink } from '../actions/utils';
import config from '../config';

export const showCreditsModal = (credits) => {
  if (credits === 0) {
    Alert.alert(
      'You used your last partnership credit.',
      'Login to HerHeadquarters.app to purchase additional credits.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Account Management',
          onPress: () => openLink(config.management),
        },
      ],
      { cancelable: true },
    );
  } else if (credits < 0) {
    Alert.alert(
      'No available credits.',
      'Login to HerHeadquarters.app to purchase additional credits.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Account Management',
          onPress: () => openLink(config.management),
        },
      ],
      { cancelable: true },
    );
  }
};
