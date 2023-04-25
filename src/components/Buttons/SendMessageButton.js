import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { primaryColor, contrastText } from '../../assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor.main,
    borderRadius: 4,
    width: 100,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: contrastText,
    lineHeight: 18,
    letterSpacing: 0,
  },
});

export default (props) => (
  <TouchableOpacity {...props} style={[styles.container, props.containerStyle]}>
    <Text style={styles.buttonText}>Send</Text>
  </TouchableOpacity>
);
