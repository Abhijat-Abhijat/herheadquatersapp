import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// components
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// styles
import { primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 5,
    fontSize: 13,
    lineHeight: 18,
    flexShrink: 1,
  },
});

function InformationText({ text, style }) {
  return (
    <View style={[styles.container, style]}>
      <Icon
        name={'ios-information-circle'}
        size={24}
        color={primaryColor.main}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default InformationText;
