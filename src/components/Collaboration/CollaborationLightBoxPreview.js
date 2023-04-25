import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
// core components
import Avatar from '../User/Avatar';
import { getShortState } from '../../actions/utils';

const styles = StyleSheet.create({
  simpleText: {
    lineHeight: 18,
    letterSpacing: 0,
  },
  authorContainer: {
    paddingLeft: 26,
    paddingBottom: 18,
    paddingTop: 15,
    flexDirection: 'row',
  },
  authorInfoContainer: {
    marginLeft: 30,
    paddingTop: 10,
    flex: 1,
  },
  authorName: {
    fontFamily: 'lato-bold',
    lineHeight: 18,
    letterSpacing: 0,
    fontSize: 17,
    marginBottom: 10,
  },
});

export default class CollaborationLightBoxPreview extends React.PureComponent {
  static propTypes = {
    collaboration: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      type: PropTypes.string,
    }),
    styleContainer: PropTypes.object,
  };

  render() {
    const { collaboration, styleContainer } = this.props;

    return (
      <View style={[styles.authorContainer, styleContainer]}>
        <Avatar
          name={collaboration.title}
          size={130}
          avatar={collaboration.photo}
        />
        <View style={styles.authorInfoContainer}>
          <Text style={styles.authorName}>{collaboration.title}</Text>
          {!collaboration.remote ? (
            <Text style={[styles.simpleText, { marginBottom: 4 }]}>
              {collaboration.city}
              {collaboration.state && ', '}
              {getShortState(collaboration.state)}
            </Text>
          ) : (
            <Text style={[styles.simpleText, { marginBottom: 4 }]}>Remote</Text>
          )}
          <Text style={[styles.simpleText, { marginBottom: 4 }]}>
            {collaboration.type}
          </Text>
        </View>
      </View>
    );
  }
}
