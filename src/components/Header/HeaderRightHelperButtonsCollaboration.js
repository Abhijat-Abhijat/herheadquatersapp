import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// core components
import Icon from '../Icons/HerHeadquartersIcon';
import HelpMenuModal from '../Modal/HelpMenuModal';
import ComplaintReasonModal from '../Modal/ComplaintReasonModal';
import ModalRow, { ModalText } from '../Modal/ModalRow';
// actions
import { addCollaborationToFavoriteRequest } from '../../actions/collaboration';
import { joinToChatRequest } from '../../actions/chat';
import { createComplaint } from '../../actions/complaint';
// selectors
import { getCurrentCollaboration } from '../../selectors/collaboration';
import { isCollaborationFavorite, getProfile } from '../../selectors/user';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lastIcon: {
    marginLeft: 15,
  },
});

class HeaderRightHelperButtonsCollaboration extends React.PureComponent {
  static propTypes = {
    collaboration: PropTypes.shape({
      _id: PropTypes.string,
      author: PropTypes.shape({
        _id: PropTypes.string,
      }),
    }),
    isCollaborationFavorite: PropTypes.bool,
    myId: PropTypes.string,
  };

  state = {
    isOpen: false,
    isReportOpen: false,
  };

  toggleModal = () =>
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
    });

  toggleReportModal = () =>
    this.setState({
      ...this.state,
      isReportOpen: !this.state.isReportOpen,
    });

  onToggleReportModal = () => {
    this.toggleModal();
    setTimeout(() => {
      this.toggleReportModal();
    }, 300);
  };

  onPressJoinToChat = () => {
    const { collaboration } = this.props;
    this.toggleModal();
    this.props.dispatch(
      joinToChatRequest(collaboration.author._id, collaboration.title),
    );
  };

  onPressAddToFavorites = () => {
    const { collaboration } = this.props;
    this.toggleModal();
    this.props.dispatch(addCollaborationToFavoriteRequest(collaboration._id));
  };

  onCreateCollaborationComplaint = (reason) => {
    const { collaboration } = this.props;

    this.toggleReportModal();
    this.props.dispatch(
      createComplaint('collaboration', collaboration._id, [reason]),
    );
  };

  onPressBlockUser = () => {
    const {
      collaboration: { author },
    } = this.props;

    Alert.alert(
      `Block ${author.firstName}?`,
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
            this.props.dispatch(
              createComplaint('user', author._id, ['Content']),
            );
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { isCollaborationFavorite, collaboration, myId } = this.props;

    const isMyCollaboration = myId === collaboration.author._id;

    return (
      <View style={styles.row}>
        {!isMyCollaboration && (
          <>
            <TouchableOpacity onPress={this.toggleModal}>
              <Icon name={'ios-more'} color={'#fff'} size={25} />
            </TouchableOpacity>
          </>
        )}
        {isMyCollaboration && collaboration.status === 'active' && (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('CollaborationEdit', {
                idCollaboration: collaboration._id,
              })
            }
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
          <ModalRow onPress={this.onToggleReportModal}>
            <ModalText isDanger>Report</ModalText>
          </ModalRow>
          <ModalRow onPress={this.onPressJoinToChat}>
            <ModalText>Send Message</ModalText>
          </ModalRow>
          <ModalRow onPress={this.onPressAddToFavorites}>
            <ModalText>
              {isCollaborationFavorite
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </ModalText>
          </ModalRow>
        </HelpMenuModal>
        <ComplaintReasonModal
          isOpen={this.state.isReportOpen}
          toggleModal={this.toggleReportModal}
          onCreateComplaint={this.onCreateCollaborationComplaint}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const collaboration = getCurrentCollaboration(state);

  return {
    myId: getProfile(state)._id,
    collaboration,
    isCollaborationFavorite: isCollaborationFavorite(state, collaboration._id),
  };
};

HeaderRightHelperButtonsCollaboration = connect(mapStateToProps)(
  HeaderRightHelperButtonsCollaboration,
);

export default withNavigation(HeaderRightHelperButtonsCollaboration);
