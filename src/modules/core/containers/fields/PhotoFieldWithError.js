import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// containers
import PhotoField from 'src/components/Fields/PhotoField';

const styles = StyleSheet.create({
  avatarWrapper: {},
  photoContainer: {
    marginBottom: 0,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default function PhotoFieldWithError({
  meta,
  formControlProps,
  formControlStyles,
  imageContainerStyle,
  errorTextStyle,
  ...rest
}) {
  const { touched, error } = meta;

  return (
    <View
      style={[styles.avatarWrapper, formControlStyles]}
      {...formControlProps}
    >
      <PhotoField
        imageContainerStyle={{
          ...styles.photoContainer,
          ...imageContainerStyle,
        }}
        {...rest}
      />
      {touched && error && (
        <Text style={[styles.errorText, errorTextStyle]}>{error}</Text>
      )}
    </View>
  );
}
