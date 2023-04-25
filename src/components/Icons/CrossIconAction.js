import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../Icons/HerHeadquartersIcon';
import { primaryColor } from '../../assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

export default (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, props.containerStyle]}
    >
      <Icon
        name={'ios-close-circle'}
        size={props.size || 25}
        color={primaryColor.main}
      />
    </TouchableOpacity>
  );
};
