import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: 45,
    backgroundColor: '#02BAC2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
});

const AttachmentIcon = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export default AttachmentIcon;
