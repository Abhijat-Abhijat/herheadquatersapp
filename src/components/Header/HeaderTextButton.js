import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cancelHeaderText: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  },
  container: {
    marginLeft: 26,
  },
});

export default ({ title, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.cancelHeaderText}>{title}</Text>
  </TouchableOpacity>
);
