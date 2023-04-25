import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
// core
import ToastService from 'src/services/ToastService';
// styles
import { primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

function FullScreenImage({ navigation, route }) {
  const imageSrc = route.params?.src;

  useLayoutEffect(() => {
    if (!imageSrc) {
      ToastService.showToast(
        `Can't get image source. Please be sure, that image are exists`,
        'danger',
      );
      navigation.goBack();
    }
  }, [imageSrc]);

  return (
    <View style={styles.container}>
      {imageSrc && (
        <Image uri={imageSrc} style={styles.image} resizeMode={'contain'} />
      )}
    </View>
  );
}

export const screenOptions = {
  title: '',
  headerStyle: {
    backgroundColor: primaryColor.main,
    borderBottomWidth: 0,
  },
};

export default FullScreenImage;
