import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// core components
import Icon from '../Icons/HerHeadquartersIcon';
import Avatar from '../User/Avatar';
import {
  blackColor,
  lightBlueGrey,
  primaryColor,
} from '../../assets/jss/styles';
import { getShortState } from '../../actions/utils';
import HelpMenuModal from '../Modal/HelpMenuModal';
import ModalRow, { ModalText } from '../Modal/ModalRow';
import ComplaintReasonModal from '../Modal/ComplaintReasonModal';
// actions
import { addCollaborationToFavoriteRequest } from '../../actions/collaboration';
import { joinToChatRequest } from '../../actions/chat';
import { createComplaint } from '../../actions/complaint';
// selectors
import { isCollaborationFavorite } from '../../selectors/user';
import { isMyCollaboration } from '../../selectors/collaboration';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.31,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 2,
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  favoriteContainer: {
    marginLeft: 0,
    marginRight: 0,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 10,
  },
  headerAvatar: {
    paddingLeft: 19,
    paddingRight: 14,
  },
  avatar: {
    width: 37,
    height: 37,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: lightBlueGrey,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerAuthorContainer: {
    flex: 1,
  },
  headerAuthorName: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
  },
  headerAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAuthorInfoText: {
    color: lightBlueGrey,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  separator: {
    backgroundColor: lightBlueGrey,
    borderRadius: 50,
    width: 4,
    height: 4,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 3,
  },
  time: {
    color: lightBlueGrey,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  iconMore: {
    paddingRight: 20,
  },
  timeFavorite: {
    color: blackColor,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
    paddingRight: 22,
  },
  photoContainer: {
    height: 200,
    width: '100%',
  },
  footer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 9,
    flexDirection: 'row',
  },
  footerFavorite: {
    paddingLeft: 71,
    paddingRight: 21,
    paddingTop: 0,
  },
  footerTextContainer: {
    flex: 1,
    paddingRight: 10,
    marginBottom: 11,
  },
  title: {
    fontFamily: 'lato-bold',
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 3,
  },
  rightColumn: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  alignToBottom: {
    alignSelf: 'flex-end',
  },
  overviewText: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  },
  heartIcon: {
    // flexBasis: '7%',
    justifyContent: 'flex-end',
  },
});

class CollaborationBoxPreview extends React.PureComponent {
  static propTypes = {
    collaboration: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
    }),
    type: PropTypes.oneOf(['full', 'favorite']),
    styleContainer: PropTypes.object,
    isCollaborationFavorite: PropTypes.bool,
    isMyCollaboration: PropTypes.bool,
    onRefresh: PropTypes.func,
  };

  static defaultProps = {
    type: 'full',
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
    }, 400);
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

    setTimeout(() => {
      this.props.onRefresh();
    }, 500);
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
            setTimeout(() => {
              this.props.onRefresh();
            }, 500);
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const {
      collaboration,
      type,
      isCollaborationFavorite,
      styleContainer,
      isMyCollaboration,
    } = this.props;
    const { author } = collaboration;

    const isTypeFavorite = type === 'favorite';

    return (
      <>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.push('CollaborationView', {
              idCollaboration: collaboration._id,
            })
          }
          style={[
            styles.container,
            isTypeFavorite && styles.favoriteContainer,
            styleContainer,
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerAvatar}>
              <Avatar
                size={37}
                name={`${author.firstName} ${author.lastName}`}
                avatar={author.avatar}
                idUser={author._id}
              />
            </View>
            <View style={styles.headerAuthorContainer}>
              <Text
                style={styles.headerAuthorName}
              >{`${author.firstName} ${author.lastName}`}</Text>
              <View style={styles.headerAuthorInfo}>
                {author.companyName && (
                  <React.Fragment>
                    <Text style={styles.headerAuthorInfoText}>
                      {author.companyName}
                    </Text>
                    <View style={styles.separator} />
                  </React.Fragment>
                )}
                {!collaboration.remote ? (
                  <Text style={styles.headerAuthorInfoText}>
                    {collaboration.city}
                    {collaboration.state && ', '}
                    {getShortState(collaboration.state)}
                  </Text>
                ) : (
                  <Text style={styles.headerAuthorInfoText}>Remote</Text>
                )}
              </View>
            </View>
            {!isMyCollaboration && (
              <TouchableOpacity
                style={[
                  styles.time,
                  styles.iconMore,
                  isTypeFavorite && styles.timeFavorite,
                ]}
                onPress={this.toggleModal}
              >
                <Icon name={'ios-more'} size={25} />
              </TouchableOpacity>
            )}
          </View>
          {!isTypeFavorite && (
            <View style={styles.photoContainer}>
              <Image uri={collaboration.photo.src} style={styles.image} />
            </View>
          )}
          <View
            style={[styles.footer, isTypeFavorite && styles.footerFavorite]}
          >
            <View style={styles.footerTextContainer}>
              <Text style={styles.title}>{collaboration.title}</Text>
              <Text style={styles.overviewText} numberOfLines={3}>
                {collaboration.overview}
              </Text>
            </View>
            <View
              style={[
                styles.rightColumn,
                isTypeFavorite && styles.alignToBottom,
              ]}
            >
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() =>
                  this.props.dispatch(
                    addCollaborationToFavoriteRequest(collaboration._id),
                  )
                }
              >
                <Icon
                  name={
                    isCollaborationFavorite ? 'ios-heart' : 'ios-heart-empty'
                  }
                  size={28}
                  color={primaryColor.main}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
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
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCollaborationFavorite: isCollaborationFavorite(
    state,
    ownProps.collaboration._id,
  ),
  isMyCollaboration: isMyCollaboration(state, ownProps.collaboration.author),
});

CollaborationBoxPreview = connect(mapStateToProps)(CollaborationBoxPreview);

export default withNavigation(CollaborationBoxPreview);
