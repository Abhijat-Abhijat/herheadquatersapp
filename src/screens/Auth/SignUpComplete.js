import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingLeft: 64,
    paddingRight: 57,
  },
});

function SignUpComplete() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={backgroundAuthColor}
        barStyle="dark-content"
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          styles.formWrapper,
          styles.mainContainer,
        ]}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.bigText}>{'Thanks for signing up!'}</Text>
          <Text style={styles.smallText}>
            {'Please confirm your email to login.'}
          </Text>
        </View>
        <Button type="orange" onPress={() => NavigationService.reset('SignIn')}>
          <Text style={styles.buttonText}>Return to Sign In</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUpComplete;
