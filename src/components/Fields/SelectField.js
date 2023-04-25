import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// components
import SelectComponent from './SelectComponent';
// styles
import { blackColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  formControl: {
    flexGrow: 1,
  },
  contentControl: {
    width: '100%',
    paddingBottom: 15,
    borderBottomColor: 'rgb(151, 151, 151)',
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'lato-bold',
    color: blackColor,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 10,
  },
  rowAdornment: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#df0000',
    marginTop: 4,
  },
});

function SelectField(props) {
  const {
    input,
    inputProps,
    formControlProps,
    formControlStyles,
    meta,
    options,
    label,
    title,
  } = props;

  let errorFormControl;

  if (meta.touched && meta.error) {
    errorFormControl = {
      borderBottomColor: '#df0000',
    };
  }

  return (
    <View {...formControlProps} style={[styles.formControl, formControlStyles]}>
      <View style={[styles.contentControl, errorFormControl]}>
        {label && <Text style={styles.title}>{label}</Text>}
        <View style={styles.rowAdornment}>
          <SelectComponent
            {...input}
            title={title}
            inputProps={inputProps}
            options={options}
          />
        </View>
      </View>
      {meta.touched && meta.error && (
        <View>
          <Text style={styles.errorText}>{meta.error}</Text>
        </View>
      )}
    </View>
  );
}

export default SelectField;
