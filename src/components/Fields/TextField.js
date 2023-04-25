import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { blackColor, primaryColor } from '../../assets/jss/styles';

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
  input: {
    color: blackColor,
    letterSpacing: 0,
    lineHeight: 18,
    fontFamily: 'lato-regular',
    fontSize: 13,
    paddingTop: 0,
  },
  inputWithAdornment: {
    flexGrow: 1,
    maxWidth: '65%',
  },
  label: {
    fontFamily: 'lato-bold',
    color: blackColor,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 10,
  },
  info: {
    marginTop: -5,
    marginBottom: 20,
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 18,
    color: blackColor,
    opacity: 0.8,
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
  helperText: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
    marginTop: 5,
  },
});

export default class TextField extends React.PureComponent {
  render() {
    const {
      input,
      inputProps,
      inputStyle,
      formControlProps,
      formControlStyles,
      contentControlStyles,
      meta,
      endAdornment,
      label,
      helperText,
      info,
    } = this.props;

    let errorFormControl;

    if (meta.touched && meta.error) {
      errorFormControl = {
        borderBottomColor: '#df0000',
      };
    }

    return (
      <View
        {...formControlProps}
        style={[styles.formControl, formControlStyles]}
      >
        <View
          style={[
            styles.contentControl,
            contentControlStyles,
            errorFormControl,
          ]}
        >
          {label ? (
            <Text style={styles.label}>{label}</Text>
          ) : (
            <View style={{ marginBottom: 25 }} />
          )}
          {info && <Text style={styles.info}>{info}</Text>}
          {endAdornment ? (
            <View style={styles.rowAdornment}>
              <TextInput
                placeholderTextColor={blackColor}
                selectionColor={primaryColor.main}
                {...inputProps}
                {...input}
                style={[styles.input, styles.inputWithAdornment, inputStyle]}
              />
              {endAdornment}
            </View>
          ) : (
            <TextInput
              placeholderTextColor={blackColor}
              selectionColor={primaryColor.main}
              {...inputProps}
              {...input}
              style={[styles.input, inputStyle]}
            />
          )}
        </View>
        {helperText && <Text style={styles.helperText}>{helperText}</Text>}
        {meta.touched && meta.error && (
          <Text style={styles.errorText}>{meta.error}</Text>
        )}
      </View>
    );
  }
}
