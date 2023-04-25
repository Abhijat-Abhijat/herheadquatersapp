import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { blackColor, coolGrey, primaryColor } from '../../assets/jss/styles';
import Icon from '../Icons/HerHeadquartersIcon';

const styles = StyleSheet.create({
  formControl: {
    flexGrow: 1,
  },
  contentControl: {
    width: '100%',
    paddingBottom: 15,
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
  perkContainer: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  perkLabel: {
    lineHeight: 18,
    letterSpacing: 0,
  },
});

export default class PerksField extends React.Component {
  onPerkClick = (perk) => {
    const { input } = this.props;
    const copyValue = [...input.value];

    const index = copyValue.findIndex((choosedPerk) => choosedPerk === perk);

    if (index !== -1) {
      copyValue.splice(index, 1);
    } else {
      copyValue.push(perk);
    }

    input.onChange(copyValue);
  };

  render() {
    const {
      formControlStyles,
      meta,
      options,
      input: { value },
    } = this.props;
    let errorFormControl;

    if (meta.touched && meta.error) {
      errorFormControl = {
        borderBottomColor: '#df0000',
      };
    }

    return (
      <View style={[styles.formControl, formControlStyles]}>
        <View style={[styles.contentControl, errorFormControl]}>
          <Text style={styles.label}>PARTNERSHIP PERKS</Text>
          <View>
            {options.map((option, key) => (
              <TouchableWithoutFeedback
                key={key}
                onPress={() => this.onPerkClick(option)}
              >
                <View style={styles.perkContainer}>
                  <Text style={styles.perkLabel}>{option}</Text>
                  {value.includes(option) ? (
                    <Icon
                      name={'ios-checkmark-circle'}
                      size={22}
                      color={primaryColor.main}
                    />
                  ) : (
                    <Icon
                      name={'ios-checkbox-standard'}
                      size={22}
                      color={coolGrey}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
            ))}
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
}
