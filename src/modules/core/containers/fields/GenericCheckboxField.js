import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// components
import Checkbox from 'src/modules/core/components/Checkbox';

const styles = StyleSheet.create({
  container: {},
  label: {
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 18,
  },
  checkboxesContainer: {
    marginTop: 10,
  },
  checkboxContainer: {
    marginBottom: 15,
  },
  lastCheckboxContainer: {
    marginBottom: 0,
  },
  errorContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  errorText: {
    color: '#df0000',
  },
});

function GenericCheckboxField({
  label,
  options,
  formControlStyles,
  optionHandler,
  error,
  formControlProps,
}) {
  return (
    <View style={[styles.container, formControlStyles]} {...formControlProps}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.checkboxesContainer}>
        {options.map((option, index) => {
          const { active, onPress, text } = optionHandler(option);

          return (
            <Checkbox
              key={index}
              style={[
                styles.checkboxContainer,
                options.length === index + 1 && styles.lastCheckboxContainer,
              ]}
              onPress={onPress}
              text={text}
              active={active}
            />
          );
        })}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

export default GenericCheckboxField;
