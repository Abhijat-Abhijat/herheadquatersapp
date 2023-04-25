import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// styles
import styles from './SignUpRedirectToSignIn.styled';

function SignUpRedirectToSignIn({ style }) {
  const navigation = useNavigation();

  const redirectToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={[styles.signInContainer, style]}>
      <Text style={styles.signInText}>Already have an account?</Text>
      <Text style={styles.signInText} onPress={redirectToSignIn}>
        Sign In
      </Text>
    </View>
  );
}

export default memo(SignUpRedirectToSignIn);
