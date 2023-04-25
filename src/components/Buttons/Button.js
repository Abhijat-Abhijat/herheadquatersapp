import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
// styles
import {
  primaryColor,
  contrastText,
  secondaryColor,
  coral,
  orangeColor,
} from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  text: {
    color: contrastText,
  },
  button: {
    width: '100%',
    height: 44,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default class Button extends React.PureComponent {
  static propTypes = {
    styleButton: PropTypes.object,
    type: PropTypes.oneOf([
      'primary',
      'secondary',
      'success',
      'success500',
      'danger',
      'orange',
    ]),
  };

  static defaultProps = {
    type: 'primary',
  };

  render() {
    let buttonStyles;
    switch (this.props.type) {
      case 'primary':
        buttonStyles = {
          backgroundColor: primaryColor.main,
        };
        break;
      case 'secondary':
        buttonStyles = {
          backgroundColor: '#fff',
          borderColor: primaryColor.main,
          borderWidth: 1,
        };
        break;
      case 'success':
        buttonStyles = {
          backgroundColor: secondaryColor.main,
        };
        break;
      case 'success500':
        buttonStyles = {
          backgroundColor: secondaryColor.main,
        };
        break;
      case 'orange':
        buttonStyles = {
          backgroundColor: orangeColor,
        };
        break;
      case 'danger':
        buttonStyles = {
          backgroundColor: coral,
        };
        break;
    }

    return (
      <TouchableOpacity
        {...this.props}
        style={[buttonStyles, styles.button, this.props.styleButton]}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
