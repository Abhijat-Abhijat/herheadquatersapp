import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
// components
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// styles
import { coolGrey, primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {},
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLabel: {
    lineHeight: 18,
    letterSpacing: 0,
  },
});

function Checkbox({ onPress, text, active, style }) {
  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>{text}</Text>
          {active ? (
            <Icon
              name={'ios-checkmark-circle'}
              size={22}
              color={primaryColor.main}
            />
          ) : (
            <Icon name={'ios-checkbox-standard'} size={22} color={coolGrey} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Checkbox;
