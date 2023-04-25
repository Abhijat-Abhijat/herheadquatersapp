import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
// core components
import HerHeadquartersIcon from './HerHeadquartersIcon';
import { carmine } from '../../assets/jss/styles';
// actions
import { getUnreadMessages } from '../../selectors/message';

const styles = StyleSheet.create({
  badge: {
    backgroundColor: carmine,
    position: 'absolute',
    right: -3,
    top: -2,
    borderRadius: 50,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 11,
    letterSpacing: 0,
    fontFamily: 'lato-bold',
    textAlign: 'center',
  },
});

class ChatBottomIcon extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number,
  };

  render() {
    const { count } = this.props;

    return (
      <View>
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
        <HerHeadquartersIcon {...this.props} name={'ios-chatboxes'} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  count: getUnreadMessages(state),
});

export default connect(mapStateToProps)(ChatBottomIcon);
