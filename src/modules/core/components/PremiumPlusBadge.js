import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 24,
    height: 24,
  },
});

function PremiumPlusBadge({ style, imageStyle }) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../../../../assets/premiumPlusBadge.png')}
        style={[styles.image, imageStyle]}
      />
    </View>
  );
}

export default PremiumPlusBadge;
