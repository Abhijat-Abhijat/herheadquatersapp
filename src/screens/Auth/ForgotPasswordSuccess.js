import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// components
import Button from 'src/components/Buttons/Button';
// services
import NavigationService from 'src/services/NavigationService';
// styles
import authStyles from 'src/assets/jss/components/auth';
import { backgroundAuthColor, blackColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  ...authStyles,
  mainContainer: {
    paddingBottom: 50,
    backgroundColor: backgroundAuthColor,
  },
  bigText: {
    color: blackColor,
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 30,
  },
  smallText: {
    color: blackColor,
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'center',
    paddingLeft: 44,
    paddingRight: 44,
  },
  blackText: {
    color: blackColor,
  },
});

function ForgotPasswordSuccess() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          styles.formWrapper,
          styles.mainContainer,
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styles.blackText]}>
            Password Reset Link Sent
          </Text>
        </View>
        <View>
          <Text style={styles.bigText}>What’s next?</Text>
          <Text style={styles.smallText}>
            A link to reset your password was just sent to your email address.
            Please click that link to reset your password. If you do not receive
            the reset link within a few moments, please check your spam folder.
          </Text>
        </View>
        <Button type="orange" onPress={() => NavigationService.reset('SignIn')}>
          <Text style={styles.buttonText}>Return to Sign In</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ForgotPasswordSuccess;
