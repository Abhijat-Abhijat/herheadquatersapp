import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { primaryColor } from '../../assets/jss/styles';

const styles = StyleSheet.create({
  section: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'lato-bold',
    lineHeight: 14,
    letterSpacing: 0,
    color: '#fff',
  },
  sectionHeader: {
    backgroundColor: primaryColor.mainBlended(0.6),
    height: 55,
    paddingLeft: 20,
    justifyContent: 'center',
  },
});

export default class Section extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    styleHeader: PropTypes.object,
  };

  render() {
    const { title, children, style, styleHeader } = this.props;

    return (
      <View style={[styles.section, style]}>
        <View style={[styles.sectionHeader, styleHeader]}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {children}
      </View>
    );
  }
}
