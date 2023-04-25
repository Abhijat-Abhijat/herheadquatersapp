import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
} from 'react-native';
import { submit } from 'redux-form';
import { useNavigation } from '@react-navigation/native';
// core components
import Spinner from 'src/components/Spinner';
import Button from 'src/components/Buttons/Button';
import ForgotPasswordForm, {
  formName,
} from 'src/components/Forms/ForgotPasswordForm';
// actions
import { forgotPasswordRequest } from 'src/actions/auth';
// selectors
import { getIsFetchingAuth } from 'src/selectors/auth';
// styles
import authStyles from 'src/assets/jss/components/auth';
import { backgroundAuthColor, blackColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  ...authStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: backgroundAuthColor,
  },
  helpContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  leftMargin: {
    marginLeft: 5,
  },
  blackText: {
    color: blackColor,
  },
});

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isFetching = useSelector(
    (state) => getIsFetchingAuth(state).forgotPassword,
  );

  const handleSubmit = useCallback((values) => {
    dispatch(forgotPasswordRequest(values.email));
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={backgroundAuthColor}
        barStyle="dark-content"
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styles.blackText]}>Forgot Password</Text>
        </View>
        <View style={styles.formWrapper}>
          <ForgotPasswordForm onSubmit={handleSubmit} />
          <Button type="orange" onPress={() => dispatch(submit(formName))}>
            <Spinner isFetching={isFetching} color={'#fff'}>
              <Text style={styles.buttonText}>Request Reset Link</Text>
            </Spinner>
          </Button>
          <View style={styles.helpContainer}>
            <Text style={[styles.bottomText, styles.blackText]}>Back to</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text
                style={[
                  styles.bottomText,
                  styles.bottomLink,
                  styles.leftMargin,
                  styles.blackText,
                ]}
              >
                Sign In
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ForgotPassword;
