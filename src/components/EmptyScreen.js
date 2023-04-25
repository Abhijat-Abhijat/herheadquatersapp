import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
// core components
import Icon from './Icons/HerHeadquartersIcon';
import { primaryColor } from '../assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 18,
    paddingBottom: 27,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 15,
    color: primaryColor.main,
    fontFamily: 'lato-bold',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  text: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
  },
});

export default class EmptyScreen extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
  };

  static defaultProps = {
    iconName: 'ios-heart-empty',
    iconSize: 125,
  };

  render() {
    const { title, text, iconName, iconSize } = this.props;

    return (
      <View style={styles.container}>
        <Icon name={iconName} size={iconSize} color={primaryColor.main} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}
