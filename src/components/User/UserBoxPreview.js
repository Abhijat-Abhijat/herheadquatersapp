import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// core components
import Icon from '../Icons/HerHeadquartersIcon';
import Avatar from './Avatar';
import { lightBlueGrey, primaryColor } from '../../assets/jss/styles';
import { getShortState } from '../../actions/utils';
// actions
import { joinToChatRequest } from '../../actions/chat';
import { addUserToFavoriteRequest } from '../../actions/user';
import { isProfileFavorite } from '../../selectors/user';

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 14,
    paddingRight: 25,
    paddingBottom: 17,
  },
  container: {
    elevation: 2,
    shadowColor: lightBlueGrey,
    shadowOpacity: 0.31,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 2,
    marginBottom: 8,
  },
  touchableArea: {
    flexDirection: 'row',
    flex: 1,
  },
  infoContainer: {
    marginLeft: 14,
    flex: 1,
  },
  name: {
    fontFamily: 'lato-bold',
    lineHeight: 18,
    letterSpacing: 0,
  },
  company: {
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 1,
  },
  secondText: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
    marginBottom: 1,
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  chatIcon: {
    marginRight: 17,
  },
});

class UserBoxPreview extends React.Component {
  static propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    styleContainer: PropTypes.object,
    displayActions: PropTypes.bool,
    toProfile: PropTypes.bool,
  };

  static defaultProps = {
    displayActions: true,
    toProfile: true,
  };

  requiredUserProps = [
    '_id',
    'firstName',
    'lastName',
    'companyName',
    'city',
    'state',
    'isProfileFavorite',
  ];

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    for (let i = 0; i < this.requiredUserProps.length; i++) {
      if (
        nextProps[this.requiredUserProps[i]] !==
        this.props[this.requiredUserProps[i]]
      ) {
        return true;
      }
    }

    return false;
  }

  render() {
    const {
      user,
      isProfileFavorite,
      styleContainer,
      displayActions,
      toProfile,
    } = this.props;

    const content = (
      <>
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          size={37}
          avatar={user.avatar}
          idUser={user._id}
          toProfile={false}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.company}>{user.companyName}</Text>
          <Text style={styles.secondText}>
            {user.city}
            {user.state && ', '}
            {getShortState(user.state)}
          </Text>
          <Text style={styles.secondText}>{user.industry}</Text>
        </View>
        {displayActions && (
          <View style={styles.icons}>
            <TouchableOpacity
              style={styles.chatIcon}
              onPress={() => this.props.dispatch(joinToChatRequest(user._id))}
            >
              <Icon
                name={'ios-chatboxes'}
                size={25}
                color={primaryColor.main}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.dispatch(addUserToFavoriteRequest(user._id))
              }
            >
              <Icon
                name={isProfileFavorite ? 'ios-heart' : 'ios-heart-empty'}
                size={25}
                color={primaryColor.main}
              />
            </TouchableOpacity>
          </View>
        )}
      </>
    );

    if (toProfile) {
      return (
        <TouchableOpacity
          style={[styles.baseContainer, styles.container, styleContainer]}
          onPress={() =>
            this.props.navigation.push('Profile', {
              idUser: user._id,
            })
          }
        >
          {content}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.baseContainer, styleContainer]}>{content}</View>
      );
    }
  }
}

const mapStateToProps = (state, props) => ({
  isProfileFavorite: isProfileFavorite(state, props.user._id),
});

UserBoxPreview = connect(mapStateToProps)(UserBoxPreview);

export default withNavigation(UserBoxPreview);
