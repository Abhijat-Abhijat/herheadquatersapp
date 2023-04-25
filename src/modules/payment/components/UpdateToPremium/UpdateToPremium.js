import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
// components
import Button from 'src/components/Buttons/Button';
// styles
import styles from './UpdateToPremium.styled';

function UpdateToPremium({ updateToPremiumRedirect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {
          "Don't miss out on a great partnership opportunity for your business! Upgrade to a premium membership to submit a private partnership. "
        }
      </Text>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('root/assets/outOfCredits.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          styleButton={styles.button}
          type={'orange'}
          onPress={updateToPremiumRedirect}
        >
          <Text style={styles.buttonText}>View Premium Memberships</Text>
        </Button>
      </View>
    </View>
  );
}

export default UpdateToPremium;
