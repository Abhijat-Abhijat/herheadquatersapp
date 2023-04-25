import React from 'react';
import { View, Text } from 'react-native';
// styles
import styles from './SectionTitleRow.styled';

function SectionTitleRow({ title, style, textStyle }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </View>
  );
}

export default SectionTitleRow;
