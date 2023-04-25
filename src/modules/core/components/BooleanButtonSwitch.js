import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// styles
import { blackColor, primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {},
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
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  option: {
    width: '50%',
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: primaryColor.main,
  },
  leftOption: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightOption: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  active: {
    backgroundColor: primaryColor.main,
  },
  unactive: {
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 13,
    lineHeight: 18,
  },
  activeOptionText: {
    color: '#fff',
  },
  unactiveOptionText: {
    color: primaryColor.main,
  },
  errorText: {
    color: '#df0000',
    marginTop: 4,
  },
});

function BooleanButtonSwitch({
  value,
  label,
  info,
  falseOptionLabel,
  trueOptionLabel,
  error,
  formControlStyles,
  handleChange,
  inverted = false,
  formControlProps,
}) {
  const trueOptionHandler = () => {
    handleChange(true);
  };

  const falseOptionHandler = () => {
    handleChange(false);
  };

  return (
    <View style={[styles.container, formControlStyles]} {...formControlProps}>
      <Text style={styles.label}>{label}</Text>
      {info && <Text style={styles.info}>{info}</Text>}
      <View style={styles.optionsContainer}>
        <SwitchButton
          active={inverted ? value : !value}
          label={inverted ? trueOptionLabel : falseOptionLabel}
          onPress={inverted ? trueOptionHandler : falseOptionHandler}
          containerStyles={styles.leftOption}
        />
        <SwitchButton
          active={inverted ? !value : value}
          label={inverted ? falseOptionLabel : trueOptionLabel}
          onPress={inverted ? falseOptionHandler : trueOptionHandler}
          containerStyles={styles.rightOption}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function SwitchButton(props) {
  const { active, label, onPress, containerStyles } = props;

  return (
    <TouchableOpacity
      style={[
        styles.option,
        active ? styles.active : styles.unactive,
        containerStyles,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.optionText,
          active ? styles.activeOptionText : styles.unactiveOptionText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default BooleanButtonSwitch;
