import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
// components
import Button from 'src/components/Buttons/Button';
// styles
import styles from './OutOfCredits.styled';

function OutOfCredits({ creditsRedirect, accountRedirect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        It looks like you're out of credits. Upgrade to a premium membership or
        purchase more credits to continue.
      </Text>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('root/assets/outOfCredits.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button styleButton={styles.button} onPress={creditsRedirect}>
          <Text style={styles.buttonText}>Purchase Credits</Text>
        </Button>
        <Button
          styleButton={styles.button}
          type={'orange'}
          onPress={accountRedirect}
        >
          <Text style={styles.buttonText}>View Premium Memberships</Text>
        </Button>
      </View>
    </View>
  );
}

export default OutOfCredits;
