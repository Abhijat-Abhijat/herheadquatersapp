import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// components
import Checkbox from './Checkbox';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

function QuizCheckboxRow({ input, text }) {
  const { value, onChange } = input;

  const onPress = useCallback(() => {
    onChange(!value);
  }, [value, onChange]);

  return (
    <View style={styles.wrapper}>
      <Text>{text}</Text>
      <Checkbox checked={value} onPress={onPress} />
    </View>
  );
}

function areEqual(prevProps, nextProps) {
  if (
    prevProps.input.value === nextProps.input.value &&
    prevProps.input.onChange === nextProps.input.onChange
  ) {
    return true;
  }
  return false;
}

export default memo(QuizCheckboxRow, areEqual);
