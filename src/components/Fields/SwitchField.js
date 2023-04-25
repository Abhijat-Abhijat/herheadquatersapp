import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import {
  blackColor,
  primaryColor,
  lightBlueGrey,
} from '../../assets/jss/styles';

const styles = StyleSheet.create({
  formControl: {
    flexGrow: 1,
  },
  contentControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'lato-bold',
    color: blackColor,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 10,
  },
  errorText: {
    color: '#df0000',
    marginTop: 4,
  },
});

export default class SwitchField extends React.PureComponent {
  render() {
    const {
      input,
      inputProps,
      formControlProps,
      formControlStyles,
      meta,
      label,
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
        <View style={[styles.contentControl, errorFormControl]}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Switch
            {...inputProps}
            {...input}
            trackColor={{
              true: primaryColor.main,
              false: lightBlueGrey,
            }}
            ios_backgroundColor={lightBlueGrey}
            onValueChange={(value) => input.onChange(value)}
            style={{
              height: 32,
              width: 52,
            }}
          />
        </View>
        {meta.touched && meta.error && (
          <View>
            <Text style={styles.errorText}>{meta.error}</Text>
          </View>
        )}
      </View>
    );
  }
}
