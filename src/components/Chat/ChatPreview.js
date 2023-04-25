import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { connect } from 'react-redux';
// core components
import Avatar from '../User/Avatar';
import Spinner from '../Spinner';
import { coral, lightBlueGrey, primaryColor } from '../../assets/jss/styles';
// actions
import { formatToDateString } from '../../actions/utils';
import { deleteChatRequest } from '../../actions/chat';
import { isChatProccessing } from '../../selectors/chat';
import { getFileDisplayType } from '../../services/helpers';

const text = {
  lineHeight: 18,
  letterSpacing: 0,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: lightBlueGrey,
    flexDirection: 'row',
    height: 80,
  },
  undreadIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 6,
    paddingLeft: 6,
    flexBasis: '5%',
  },
  unreadIcon: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: primaryColor.main,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 14,
  },
  avatar: {
    width: 37,
    height: 37,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: lightBlueGrey,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  mainInfoContainer: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 15,
    ...text,
  },
  dateText: {
    fontSize: 11,
    ...text,
    lineHeight: 14,
  },
  dateContainer: {
    marginRight: 23,
  },
  subjectContainer: {
    marginBottom: 1,
  },
  messagePreview: {
    paddingRight: 8,
  },
  messageText: {
    color: lightBlueGrey,
    ...text,
  },
  rightActionContainer: {
    backgroundColor: coral,
    flexDirection: 'row',
    width: 75,
  },
  rightActionTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightActionText: {
    color: '#fff',
    lineHeight: 18,
    letterSpacing: 0,
  },
});

class ChatPreview extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    myId: PropTypes.string,
    subject: PropTypes.string,
    isFetching: PropTypes.bool,
    corresponder: PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatar: PropTypes.oneOfType([
        PropTypes.shape({
          src: PropTypes.string,
        }),
        PropTypes.string,
      ]),
    }),
    message: PropTypes.shape({
      author: PropTypes.shape({
        _id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        avatar: PropTypes.shape({
          src: PropTypes.string,
        }),
      }),
      text: PropTypes.string,
      status: PropTypes.oneOf(['sent', 'viewed']),
      createdAt: PropTypes.string,
    }),
    attachment: PropTypes.shape({
      type: PropTypes.string,
    }),
  };

  swipe = React.createRef();

  renderRightActions = (idChat) => (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [75, 0],
    });
    return (
      <TouchableOpacity
        style={styles.rightActionContainer}
        onPress={() => this.deleteChat(idChat)}
      >
        <Animated.View
          style={[
            styles.rightActionTextContainer,
            {
              flex: 1,
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Text style={styles.rightActionText}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  deleteChat = (idChat) => {
    this.swipe.current.close();
    this.props.dispatch(deleteChatRequest(idChat));
  };

  render() {
    const { subject, message, myId, corresponder, id, isFetching } = this.props;

    const isMyLastMessage = message && message.author._id === myId;
    const attachmentType =
      message &&
      message.attachment &&
      getFileDisplayType(message.attachment.type);
    const lastMessage = message
      ? `${isMyLastMessage ? 'You: ' : ''}${message.text || attachmentType}`
      : null;

    return (
      <Swipeable
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this.renderRightActions(id)}
        ref={this.swipe}
      >
        <View style={styles.container}>
          <Spinner isFetching={isFetching} onCenter>
            <View style={styles.undreadIconContainer}>
              {message &&
                message.author._id !== myId &&
                message.status !== 'viewed' && (
                  <View style={styles.unreadIcon} />
                )}
            </View>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Avatar
                  size={37}
                  name={`${corresponder.firstName} ${corresponder.lastName}`}
                  avatar={corresponder.avatar}
                  idUser={corresponder._id}
                />
              </View>
            </View>
            <View style={styles.mainInfoContainer}>
              <View style={styles.nameRow}>
                <View>
                  <Text
                    style={styles.nameText}
                  >{`${corresponder.firstName} ${corresponder.lastName}`}</Text>
                </View>
                {message && (
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                      {formatToDateString(message.createdAt)}
                    </Text>
                  </View>
                )}
              </View>
              {subject && (
                <View style={styles.subjectContainer}>
                  <Text style={text}>{subject}</Text>
                </View>
              )}
              <View style={styles.messagePreview}>
                <Text numberOfLines={1} style={styles.messageText}>
                  {lastMessage || 'No messages yet...'}
                </Text>
              </View>
            </View>
          </Spinner>
        </View>
      </Swipeable>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isFetching: isChatProccessing(state, props),
});

export default connect(mapStateToProps)(ChatPreview);
