import React from 'react';
import { Linking, Text } from 'react-native';
import config from '../../../../config';

import styles from './TermsAndPrivacyLinks.styled';

const TermsAndPrivacyLinks = () => {
  return <Text style={styles.infoText}>
    By signing up, you agree to the{' '}
    <Text
      style={styles.linkingText}
      onPress={() => Linking.openURL(config.terms)}
    >
      User Terms
    </Text>{' '}
    and our{' '}
    <Text
      style={styles.linkingText}
      onPress={() => Linking.openURL(config.privacy)}
    >
      Privacy Policy
    </Text>
  </Text>
}

export default TermsAndPrivacyLinks;
