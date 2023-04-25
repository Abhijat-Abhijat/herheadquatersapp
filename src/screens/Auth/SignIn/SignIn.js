import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
// core components
import Spinner from 'src/components/Spinner';
import SignInForm from 'src/components/Forms/SignInForm';
import Button from 'src/components/Buttons/Button';
// actions
import { signinRequest } from 'src/actions/user';
import { getIsFetchingSignin } from 'src/selectors/user';
import { formName } from 'src/components/Forms/SignInForm';
// constants
import config from 'src/config';
// styles
import styles from './SignIn.styled';
import { backgroundAuthColor } from 'src/assets/jss/styles';

class SignIn extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
  };

  handleSubmit = (values) => {
    this.props.dispatch(signinRequest(values.email, values.password));
  };

  render() {
    const { isFetching } = this.props;

    return (
      <SafeAreaView style={styles.siginScreenContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <StatusBar
            backgroundColor={backgroundAuthColor}
            barStyle="dark-content"
          />
          <View style={styles.logoContainer}>
            <Image
              style={{ width: '100%', resizeMode: 'contain' }}
              source={require('src/../assets/logo/hh.png')}
            />
          </View>
          <View style={styles.formWrapper}>
            <SignInForm onSubmit={this.handleSubmit} />
            <Button
              styleButton={styles.button}
              type="orange"
              onPress={() => this.props.dispatch(submit(formName))}
            >
              <Spinner isFetching={isFetching} color={'#fff'}>
                <Text style={styles.buttonText}>Start Partnering</Text>
              </Spinner>
            </Button>
            <Text style={styles.infoText}>
              {'By signing in, you agree to the '}
              <Text
                style={styles.linkingText}
                onPress={() => Linking.openURL(config.terms)}
              >
                User Terms
              </Text>
              {' and our '}
              <Text
                style={styles.linkingText}
                onPress={() => Linking.openURL(config.privacy)}
              >
                Privacy Policy
              </Text>
            </Text>
            <View style={styles.helpContainer}>
              <Text style={styles.extraLink}>Don’t have an account?</Text>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate('SignUpFirstStep')
                }
              >
                <Text style={[styles.extraLinks, styles.bottomLink]}>
                  Sign Up
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: getIsFetchingSignin(state),
});

export default connect(mapStateToProps)(SignIn);
