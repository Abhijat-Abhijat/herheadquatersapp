import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  selected: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  unselected: {
    backgroundColor: '#E9EFFA',
  },
  text: {
    fontSize: 14,
    lineHeight: 23,
  },
});

function TabButton({ selected, onPress = () => {}, style, text }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        selected ? styles.selected : styles.unselected,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

export default TabButton;
