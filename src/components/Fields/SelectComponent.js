import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Picker,
  ScrollView,
} from 'react-native';
// icons
import HerHeadquartersIcon from 'src/components/Icons/HerHeadquartersIcon';
// styles
import { blackColor, primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
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
    justifyContent: 'center',
  },
  androidModal: {
    margin: 30,
  },
  androidModalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 14,
    marginVertical: 100,
  },
  androidTitleContainer: {
    paddingTop: 15,
    paddingBottom: 17,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(151, 151, 151, 0.5)',
    alignItems: 'center',
  },
  androidTitle: {
    fontFamily: 'lato-bold',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  androidItem: {
    paddingLeft: 13,
    paddingTop: 13,
    paddingBottom: 15,
    paddingRight: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(151, 151, 151, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  androidItemLast: {
    borderBottomWidth: 0,
  },
  androidItemText: {
    lineHeight: 18,
    letterSpacing: 0,
    fontSize: 13,
    color: blackColor,
  },
  androidItemTextActive: {
    color: primaryColor.main,
  },
  androidButtonsContainer: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: 'rgba(151, 151, 151, 0.5)',
  },
  androidButtonTouchable: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 11,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(151, 151, 151, 0.5)',
  },
  androidButtonText: {
    color: primaryColor.main,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  IOSModal: {
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

export default class SelectComponent extends React.PureComponent {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
      }),
    ),
    inputStyle: PropTypes.object,
    iconColor: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    iconColor: primaryColor.main,
  };

  state = {
    isOpen: false,
    currentValue: null,
  };

  onPress = (value) => {
    if (!value) {
      value = this.props.options[0].value;
    }

    this.props.onChange(value);
    this.toggleModal();
  };

  onPressAndroid = (value) => {
    this.setState({
      currentValue: value,
    });
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  renderTextInput = () => {
    return (
      <TouchableWithoutFeedback onPress={this.toggleModal}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.input, this.props.inputStyle]}>
            {this.props.value}
          </Text>
          <View style={styles.endAdornment}>
            <HerHeadquartersIcon
              name={'ios-arrow-down'}
              size={20}
              color={this.props.iconColor}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderIOS = () => {
    const { options } = this.props;

    return (
      <View style={styles.container}>
        {this.renderTextInput()}
        <Modal
          isVisible={this.state.isOpen}
          onRequestClose={this.toggleModal}
          onBackButtonPress={this.toggleModal}
          onBackdropPress={this.toggleModal}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          backdropTransitionOutTiming={0}
          style={styles.IOSModal}
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
            <Picker
              selectedValue={this.state.currentValue}
              style={styles.pickerIOS}
              onValueChange={(itemValue) =>
                this.setState({ currentValue: itemValue })
              }
            >
              {options.map((option, key) => (
                <Picker.Item
                  key={key}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </Modal>
      </View>
    );
  };

  renderAndroid = () => {
    const { options, title } = this.props;

    return (
      <View style={styles.container}>
        {this.renderTextInput()}
        <Modal
          isVisible={this.state.isOpen}
          onRequestClose={this.toggleModal}
          onBackButtonPress={this.toggleModal}
          onBackdropPress={this.toggleModal}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          backdropTransitionOutTiming={0}
          style={styles.androidModal}
        >
          <View style={styles.androidModalContainer}>
            <View style={styles.androidTitleContainer}>
              <Text style={styles.androidTitle}>{title}</Text>
            </View>
            <ScrollView>
              {options.map((option, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => this.onPressAndroid(option.value)}
                  style={
                    key === options.length - 1
                      ? [styles.androidItem, styles.androidItemLast]
                      : styles.androidItem
                  }
                >
                  <Text
                    style={[
                      styles.androidItemText,
                      this.state.currentValue === option.value
                        ? styles.androidItemTextActive
                        : {},
                    ]}
                  >
                    {option.label}
                  </Text>
                  {this.state.currentValue === option.value && (
                    <HerHeadquartersIcon
                      name={'ios-checkmark'}
                      color={primaryColor.main}
                      size={18}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.androidButtonsContainer}>
              <TouchableOpacity
                onPress={this.toggleModal}
                style={[styles.androidButtonTouchable, styles.rightBorder]}
              >
                <Text style={styles.androidButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPress(this.state.currentValue)}
                style={styles.androidButtonTouchable}
              >
                <Text
                  style={[
                    styles.androidButtonText,
                    { fontFamily: 'lato-bold' },
                  ]}
                >
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  render() {
    return Platform.OS === 'ios' ? this.renderIOS() : this.renderAndroid();
  }
}
