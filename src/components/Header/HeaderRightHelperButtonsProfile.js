import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// core components
import Icon from '../Icons/HerHeadquartersIcon';
import HelpMenuModal from '../Modal/HelpMenuModal';
import ModalRow, { ModalText } from '../Modal/ModalRow';
// actions
import { addUserToFavoriteRequest } from '../../actions/user';
import { joinToChatRequest } from '../../actions/chat';
// selectors
import {
  getCurrentUser,
  isProfileFavorite,
  getProfile,
} from '../../selectors/user';
import { createComplaint } from '../../actions/complaint';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lastIcon: {
    marginLeft: 15,
  },
});

class HeaderRightHelperButtonsProfile extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string,
    }),
    isProfileFavorite: PropTypes.bool,
    myId: PropTypes.string,
  };

  state = {
    isOpen: false,
  };

  toggleModal = () =>
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
    });

  onPressJoinToChat = () => {
    const { user } = this.props;
    this.toggleModal();
    this.props.dispatch(
      joinToChatRequest(user._id, `${user.firstName} ${user.lastName}`, true),
    );
  };

  onPressAddToFavorites = () => {
    const { user } = this.props;
    this.toggleModal();
    this.props.dispatch(addUserToFavoriteRequest(user._id));
  };

  onPressBlockUser = () => {
    const { user } = this.props;

    Alert.alert(
      `Block ${user.firstName}?`,
      'Are you sure you want to block this user?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.toggleModal();
            this.props.dispatch(createComplaint('user', user._id, ['Content']));
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { isProfileFavorite, user, myId } = this.props;

    const isMyProfile = myId === user._id;

    return (
      <View style={styles.row}>
        {!isMyProfile ? (
          <TouchableOpacity onPress={this.toggleModal}>
            <Icon name={'ios-more'} color={'#fff'} size={25} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ProfileEdit')}
          >
            <Icon name={'ios-create'} color={'#fff'} size={25} />
          </TouchableOpacity>
        )}
        <HelpMenuModal
          isOpen={this.state.isOpen}
          title={''}
          toggleModal={this.toggleModal}
        >
          <ModalRow onPress={this.onPressBlockUser}>
            <ModalText isDanger>Block User</ModalText>
          </ModalRow>
          <ModalRow onPress={this.onPressJoinToChat}>
            <ModalText>Send Message</ModalText>
          </ModalRow>
          <ModalRow onPress={this.onPressAddToFavorites}>
            <ModalText>
              {isProfileFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </ModalText>
          </ModalRow>
        </HelpMenuModal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const user = getCurrentUser(state);

  return {
    myId: getProfile(state)._id,
    user,
    isProfileFavorite: isProfileFavorite(state, user._id),
  };
};

export default withNavigation(
  connect(mapStateToProps)(HeaderRightHelperButtonsProfile),
);
