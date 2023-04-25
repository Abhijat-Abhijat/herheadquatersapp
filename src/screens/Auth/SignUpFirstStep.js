import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
// containers
import SignUpFirstStepContainer from 'src/modules/auth/containers/SignUpFirstStepContainer';
// styles
import { backgroundAuthColor } from 'src/assets/jss/styles';

function SignUpFirstStepScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate('SignUpSecondStep');
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
      <SignUpFirstStepContainer onSubmit={handleSubmit} />
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

export default SignUpFirstStepScreen;
