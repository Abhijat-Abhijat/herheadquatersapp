import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
// core components
import Icon from '../Icons/HerHeadquartersIcon';
import { primaryColor } from '../../assets/jss/styles';

export default class Rating extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    size: PropTypes.number,
    max: PropTypes.number,
    color: PropTypes.string,
    containerStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    editable: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    value: 0,
    max: 5,
    size: 15,
    color: primaryColor.main,
    editable: false,
    onPress: () => null,
  };

  renderStars = () => {
    const stars = [];

    for (let i = 1; i <= this.props.max; i++) {
      stars.push(this.renderIcon(i));
    }

    return stars;
  };

  isHalfAreNeeded = (currentStep) => {
    const number = Number(currentStep - this.props.value).toFixed(1);
    const dividedNumber = number.toString().split('.');
    const rest = parseInt(dividedNumber[dividedNumber.length - 1]);

    return rest >= 0 && rest <= 5 && number < 1;
  };

  renderIcon = (i) => {
    const { editable, onPress } = this.props;

    const withHalf = !Number.isInteger(this.props.value);

    const isFilled = i <= this.props.value;
    const isHalf = i > this.props.value && withHalf && this.isHalfAreNeeded(i);
    let icon;

    if (isFilled) {
      icon = (
        <Icon
          key={i}
          name={'ios-star'}
          size={this.props.size}
          color={this.props.color}
          style={this.props.iconStyle}
        />
      );
    } else if (isHalf) {
      icon = (
        <Icon
          key={i}
          name={'ios-star-half'}
          size={this.props.size}
          color={this.props.color}
          style={this.props.iconStyle}
        />
      );
    } else {
      icon = (
        <Icon
          key={i}
          name={'ios-star-outline'}
          size={this.props.size}
          color={this.props.color}
          style={this.props.iconStyle}
        />
      );
    }

    if (editable) {
      icon = (
        <TouchableOpacity key={i} onPress={() => onPress(i)}>
          {icon}
        </TouchableOpacity>
      );
    }

    return icon;
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return <View style={this.props.containerStyle}>{this.renderStars()}</View>;
  }
}
