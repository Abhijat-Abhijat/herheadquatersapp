import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
// components
import Icon from '../../Icons/HerHeadquartersIcon';
// styles
import { primaryColor, coolGrey } from '../../../assets/jss/styles';

const styles = StyleSheet.create({
  wrapper: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Checkbox({ checked, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        {checked ? (
          <Icon
            name={'ios-checkmark-circle'}
            size={25}
            color={primaryColor.main}
          />
        ) : (
          <Icon name={'ios-checkbox-standard'} size={22} color={coolGrey} />
        )}
      </View>
    </TouchableOpacity>
  );
}
