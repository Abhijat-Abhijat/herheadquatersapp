import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { coral, primaryColor } from '../../assets/jss/styles';

const styles = StyleSheet.create({
  modalRow: {
    paddingTop: 15,
    paddingBottom: 19,
    borderTopWidth: 1,
    borderTopColor: 'rgb(217,217,217)',
    width: '100%',
  },
  simpleButtonText: {
    color: primaryColor.main,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'center',
  },
  removeButtonText: {
    color: coral,
  },
});

export class ModalText extends React.PureComponent {
  static propTypes = {
    isDanger: PropTypes.bool,
  };

  render() {
    return (
      <Text
        style={[
          styles.simpleButtonText,
          this.props.isDanger ? styles.removeButtonText : {},
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}
export default class ModalRow extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity style={styles.modalRow} {...this.props}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
