import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';
// core components
import Spinner from 'src/components/Spinner';
import HeaderRightHelperButtonsCollaboration from 'src/components/Header/HeaderRightHelperButtonsCollaboration';
import CollaborationFeaturedPhoto from 'src/components/Collaboration/CollaborationFeaturedPhoto';
import CollaborationViewInfoSection from 'src/modules/collaboration/components/CollaborationViewInfoSection';
import CollaborationViewAuthorSection from 'src/modules/collaboration/components/CollaborationViewAuthorSection';
import CollaborationViewIconsSection from 'src/modules/collaboration/components/CollaborationViewIconsSection';
// actions
import {
  getCollaborationRequest,
  joinToCollaborationRequest,
  addCollaborationToFavoriteRequest,
  deleteCollaborationRequest,
} from 'src/actions/collaboration';
import { joinToChatRequest } from 'src/actions/chat';
// selectors
import {
  getIsFetchingCollaboration,
  getCurrentCollaboration,
} from 'src/selectors/collaboration';
import { getIsFetchingChat } from 'src/selectors/chat';
import { getFavorites, getProfile } from 'src/selectors/user';
// styles
import styles from './CollaborationView.styled';

class CollaborationView extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    collaboration: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
    }),
    myId: PropTypes.string,
  };

  componentDidMount() {
    this.unsubscribeFocusListener = this.props.navigation.addListener(
      'focus',
      () => {
        const { navigation, route, dispatch, collaboration } = this.props;

        const idCollaboration = route.params?.idCollaboration;

        if (!idCollaboration) {
          navigation.goBack();
        }

        if (collaboration?._id !== idCollaboration) {
          dispatch(getCollaborationRequest(idCollaboration, true));
        }
      },
    );
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFocusListener) {
      this.unsubscribeFocusListener();
    }
  };

  handleJoinToCollaboration = () => {
    const { collaboration, dispatch } = this.props;

    dispatch(joinToCollaborationRequest(collaboration?._id));
  };

  handleJoinToChat = () => {
    const { collaboration, dispatch } = this.props;

    dispatch(
      joinToChatRequest(collaboration?.author?._id, collaboration?.title),
    );
  };

  handleAddCollaborationToFavorite = () => {
    const { collaboration, dispatch } = this.props;

    dispatch(addCollaborationToFavoriteRequest(collaboration?._id));
  };

  handleShareCollaboration = () => {
    const { navigation, collaboration } = this.props;

    navigation.navigate('SendCollaboration', {
      collaborationId: collaboration?._id,
    });
  };

  handleDeleteCollaboration = () => {
    const {
      collaboration: { _id },
    } = this.props;

    Alert.alert(
      'End Partnership',
      'Are you sure you want to end the partnership early?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.props.dispatch(deleteCollaborationRequest(_id)),
        },
      ],
      { cancelable: true },
    );
  };

  render() {
    const {
      isFetching,
      collaboration,
      isFetchingChat,
      isFetchingJoin,
      isFetchingDelete,
      favoritesCollaborations,
      myId,
    } = this.props;

    const isMyCollaboration = myId === collaboration?.author?._id;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Spinner isFetching={isFetching} onCenter>
          <Spinner
            isFetching={isFetchingChat || isFetchingJoin || isFetchingDelete}
            containerStyle={styles.spinnerContainer}
          />
          <CollaborationFeaturedPhoto
            title={collaboration?.title}
            type={collaboration?.type}
            city={collaboration?.city}
            state={collaboration?.state}
            photo={collaboration?.photo}
            remote={collaboration?.remote}
            mode={isMyCollaboration ? 'own' : 'default'}
          />
          <CollaborationViewIconsSection
            isMyCollaboration={isMyCollaboration}
            collaborationStatus={collaboration?.status}
            authorName={collaboration?.author?.firstName}
            isCollaborationFavorite={
              !!favoritesCollaborations[collaboration?._id]
            }
            handleJoinToCollaboration={this.handleJoinToCollaboration}
            handleJoinToChat={this.handleJoinToChat}
            handleAddCollaborationToFavorite={
              this.handleAddCollaborationToFavorite
            }
            handleShareCollaboration={this.handleShareCollaboration}
            handleDeleteCollaboration={this.handleDeleteCollaboration}
          />
          <CollaborationViewInfoSection
            totalPartnership={collaboration?.totalPartnership}
            startDate={collaboration?.startDate}
            endDate={collaboration?.endDate}
            overview={collaboration?.overview}
            seeking={collaboration?.seeking}
            industry={collaboration?.industry}
            perks={collaboration?.perks}
          />
          <CollaborationViewAuthorSection author={collaboration?.author} />
        </Spinner>
      </ScrollView>
    );
  }
}

export const screenOptions = {
  title: 'Partnership',
  headerRight: () => <HeaderRightHelperButtonsCollaboration />,
};

const mapStateToProps = (state) => ({
  collaboration: getCurrentCollaboration(state),
  isFetching: getIsFetchingCollaboration(state).one,
  isFetchingJoin: getIsFetchingCollaboration(state).join,
  isFetchingChat: getIsFetchingChat(state).join,
  isFetchingDelete: getIsFetchingChat(state).delete,
  favoritesCollaborations: getFavorites(state).hashCollaborations,
  myId: getProfile(state)._id,
});

export default connect(mapStateToProps)(CollaborationView);
