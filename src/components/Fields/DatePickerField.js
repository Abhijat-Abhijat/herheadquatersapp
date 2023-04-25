import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { blackColor, primaryColor } from '../../assets/jss/styles';
import HerHeadquartersIcon from '../../components/Icons/HerHeadquartersIcon';
import { formatCollaborationDateToFull } from '../../actions/utils';

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
  container: {
    flexGrow: 1,
  },
  input: {
    letterSpacing: 0,
    lineHeight: 18,
    fontFamily: 'lato-regular',
    fontSize: 13,
    paddingTop: 1,
    paddingBottom: 1,
    flexGrow: 1,
    maxWidth: '95%',
  },
  endAdornment: {
    alignItems: 'flex-end',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  pickerIOSWrapper: {
    backgroundColor: '#fff',
  },
  pickerIOSButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 12,
    paddingTop: 9,
    paddingLeft: 13,
    paddingRight: 14,
    borderBottomColor: 'rgb(209, 209, 209)',
    borderBottomWidth: 1,
  },
  pickerIOSButtonText: {
    color: primaryColor.main,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
});

export default class DatePickerField extends React.PureComponent {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    inputStyle: PropTypes.object,
    iconColor: PropTypes.string,
  };

  static defaultProps = {
    iconColor: primaryColor.main,
  };

  state = {
    isOpen: false,
    currentValue: new Date(),
  };

  onPress = (value) => {
    this.changeDate(value);
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  changeDate = (date) => {
    if (date) {
      this.props.input.onChange(date);
    }
  };

  openDatepicker = async () => {
    if (Platform.OS === 'ios') {
      this.toggleModal();
    } else {
      this.changeDate(await this.openAndroid());
    }
  };

  openAndroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date(),
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        return new Date(year, month, day);
      }
    } catch (e) {
      console.warn('Cannot open date picker', e.message);
    }
  };

  render() {
    const {
      formControlProps,
      formControlStyles,
      meta,
      label,
      iconColor,
      inputStyle,
      input,
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
          {label && <Text style={styles.title}>{label}</Text>}
          <View style={styles.rowAdornment}>
            <View style={styles.container}>
              <TouchableWithoutFeedback onPress={this.openDatepicker}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.input, inputStyle]}>
                    {formatCollaborationDateToFull(input.value)}
                  </Text>
                  <View style={styles.endAdornment}>
                    <HerHeadquartersIcon
                      name={'ios-calendar'}
                      size={25}
                      color={iconColor}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {Platform.OS === 'ios' && (
            <Modal
              isVisible={this.state.isOpen}
              onRequestClose={this.toggleModal}
              onBackButtonPress={this.toggleModal}
              onBackdropPress={this.toggleModal}
              animationIn={'fadeIn'}
              animationOut={'fadeOut'}
              backdropTransitionOutTiming={0}
              style={styles.modal}
            >
              <View style={styles.pickerIOSButtonsContainer}>
                <TouchableOpacity onPress={this.toggleModal}>
                  <Text style={styles.pickerIOSButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onPress(this.state.currentValue)}
                >
                  <Text
                    style={[
                      styles.pickerIOSButtonText,
                      { fontFamily: 'lato-bold' },
                    ]}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pickerIOSWrapper}>
                <DatePickerIOS
                  date={this.state.currentValue}
                  onDateChange={(itemValue) =>
                    this.setState({ currentValue: itemValue })
                  }
                  minimumDate={new Date()}
                  mode={'date'}
                />
              </View>
            </Modal>
          )}
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
