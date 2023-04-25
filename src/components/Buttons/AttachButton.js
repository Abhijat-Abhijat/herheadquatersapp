import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../Icons/HerHeadquartersIcon';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
});

export default ({ name, ...props }) => (
  <TouchableOpacity {...props} style={[styles.container, props.containerStyle]}>
    <Icon name={name} size={20} color={'#C8C7CC'} />
  </TouchableOpacity>
);
