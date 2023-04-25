import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from '../Icons/HerHeadquartersIcon';
import {
  primaryColor,
  blackColor,
  coolGrey,
  lightBlueGrey,
} from '../../assets/jss/styles';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 12,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: lightBlueGrey,
    backgroundColor: '#fff',
  },
  itemIconContainer: {
    paddingLeft: 21,
    paddingRight: 21,
  },
  itemIconArrowContainer: {
    position: 'absolute',
    right: 0,
    paddingRight: 22,
  },
  label: {
    color: blackColor,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
});

export default class SettingsRow extends React.PureComponent {
  static propTypes = {
    action: PropTypes.func,
    label: PropTypes.string.isRequired,
    icon: PropTypes.element,
    iconName: PropTypes.string,
  };

  render() {
    const { action, label, icon, iconName } = this.props;

    const InsideContent = (
      <React.Fragment>
        <View style={styles.itemIconContainer}>
          {iconName ? (
            <Icon name={iconName} size={28} color={primaryColor.main} />
          ) : (
            icon
          )}
        </View>
        <Text style={styles.label}>{label}</Text>
        {action && (
          <View style={styles.itemIconArrowContainer}>
            <Icon name={'ios-arrow-forward'} size={22} color={coolGrey} />
          </View>
        )}
      </React.Fragment>
    );

    return action ? (
      <TouchableOpacity onPress={action} style={styles.itemContainer}>
        {InsideContent}
      </TouchableOpacity>
    ) : (
      <View style={styles.itemContainer}>{InsideContent}</View>
    );
  }
}
