import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
// containers
import SignUpSecondStepContainer from 'src/modules/auth/containers/SignUpSecondStepContainer';
// actions
import { signUpRequest } from 'src/actions/user';
// styles
import { backgroundAuthColor } from 'src/assets/jss/styles';

function SignUpSecondStepScreen() {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(signUpRequest());
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: backgroundAuthColor,
      }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 0,
        minHeight: '100%',
      }}
    >
      <StatusBar
        backgroundColor={backgroundAuthColor}
        barStyle="dark-content"
      />
      <SignUpSecondStepContainer onSubmit={handleSubmit} />
    </ScrollView>
  );
}

export const screenOptions = {
  title: 'Sign Up',
  headerShown: true,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: backgroundAuthColor,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    color: '#333333',
  },
  headerTintColor: '#333333',
};

export default SignUpSecondStepScreen;
