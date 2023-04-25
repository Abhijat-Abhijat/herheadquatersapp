import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../Icons/HerHeadquartersIcon';
import { primaryColor } from '../../assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: -5,
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
        name={'ios-add-circle'}
        size={props.size || 35}
        color={primaryColor.main}
      />
    </TouchableOpacity>
  );
};
