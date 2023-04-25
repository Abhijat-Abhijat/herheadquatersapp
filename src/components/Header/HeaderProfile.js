import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { getCurrentUser, getProfile } from '../../selectors/user';

class HeaderProfile extends React.PureComponent {
  static propTypes = {
    myId: PropTypes.string,
    userId: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  render() {
    const { style, myId, userId, firstName, lastName } = this.props;
    const isMyProfile = myId === userId;

    return (
      <View>
        {userId ? (
          <Text style={style}>
            {isMyProfile ? 'My Profile' : `${firstName} ${lastName}`}
          </Text>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  myId: getProfile(state)._id,
  userId: getCurrentUser(state)._id,
  firstName: getCurrentUser(state).firstName,
  lastName: getCurrentUser(state).lastName,
});

export default connect(mapStateToProps)(HeaderProfile);
