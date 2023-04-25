import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// components
import Checkbox from './Checkbox';
import TextField from '../../Fields/TextField';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
  },
  checkboxRowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otherWrapper: {
    marginTop: 20,
  },
});

function QuizOtherRow({ input, meta }) {
  const [opened, setOpened] = useState(input.value !== '');

  const toggleOpen = useCallback(() => {
    setOpened(!opened);
  }, [opened, setOpened]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.checkboxRowWrapper}>
        <Text>Other</Text>
        <Checkbox checked={opened} onPress={toggleOpen} />
      </View>
      {opened && (
        <View style={styles.otherWrapper}>
          <TextField input={input} meta={meta} label="OTHER SERVICE" />
        </View>
      )}
    </View>
  );
}

export default QuizOtherRow;
