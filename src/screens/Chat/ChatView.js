import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
// core components
import Spinner from '../../components/Spinner';
import Message from '../../components/Chat/Message';
import InputBox from '../../components/Chat/InputBox';
import HelpMenuModal from '../../components/Modal/HelpMenuModal';
// actions
import { clearActiveChat } from '../../actions/chat';
import {
  getMessagesRequest,
  deleteMessagesRequest,
  toggleMessageContextMenu,
} from '../../actions/message';
import { downloadFileAndSave } from '../../actions/upload';
// selectors
import {
  getCurrentMessage,
  getIsFetchingMessage,
  getListMessages,
  getPaginationMessage,
  isMessageContextMenuOpen,
  getMessageContextOptions,
} from '../../selectors/message';
import { getChat } from '../../selectors/chat';
// services
import SocketService from '../../services/SocketService';
import { GET_CHAT_MESSAGES_MORE_REQUEST } from '../../actions/types';
import { coral, primaryColor } from '../../assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalRow: {
    paddingTop: 15,
    paddingBottom: 19,
    borderTopWidth: 1,
    borderTopColor: 'rgb(217,217,217)',
    width: '100%',
  },
  simpleButtonText: {
    color: primaryColor.main,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'center',
  },
  removeButtonText: {
    color: coral,
  },
});

class ChatView extends React.Component {
  static propTypes = {
    chat: PropTypes.object,
    list: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    isFetching: PropTypes.shape({
      init: PropTypes.bool,
      update: PropTypes.bool,
    }),
    isContextModalOpen: PropTypes.bool,
    currentMessage: PropTypes.object,
    contextExtraOptions: PropTypes.array,
  };

  onEndReached = () => {
    const { pagination, isFetching } = this.props;

    if (pagination.canLoadMore && !isFetching.init && !isFetching.update) {
      this.props.dispatch(
        getMessagesRequest(
          this.props.chat._id,
          pagination.page + 1,
          pagination.limit,
          GET_CHAT_MESSAGES_MORE_REQUEST,
        ),
      );
    }
  };

  toggleContextModal = (message = {}) => {
    let extraActions = [];

    if (message.attachment) {
      extraActions = [
        {
          label: 'Download',
          onPress: this.onDownloadAttachment,
        },
      ];
    }

    this.props.dispatch(toggleMessageContextMenu(message, extraActions));
  };

  deleteMessages = () => {
    this.toggleContextModal();

    if (this.props.currentMessage) {
      this.props.dispatch(
        deleteMessagesRequest([this.props.currentMessage._id]),
      );
    }
  };

  onDownloadAttachment = () => {
    this.toggleContextModal();

    if (this.props.currentMessage && this.props.currentMessage.attachment) {
      this.props.dispatch(
        downloadFileAndSave({
          source: this.props.currentMessage.attachment.src,
        }),
      );
    }
  };

  componentDidMount() {
    const { chat, navigation, route, dispatch } = this.props;

    dispatch(getMessagesRequest(chat._id));

    SocketService.onSubjectChanged(navigation, route.params?.corresponderName);

    SocketService.enterToChat(chat._id);
  }

  componentWillUnmount() {
    this.props.dispatch(clearActiveChat);
    SocketService.leaveChat();
  }

  render() {
    const {
      isFetching,
      list,
      isContextModalOpen,
      contextExtraOptions,
    } = this.props;

    return (
      <View style={styles.container}>
        <Spinner isFetching={isFetching.init} onCenter>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor={'transparent'}
                onLongPress={() => this.toggleContextModal(item)}
              >
                <Message {...item} isNewDay={item.newDay} />
              </TouchableHighlight>
            )}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={
              <InputBox navigation={this.props.navigation} />
            }
            inverted
            keyboardShouldPersistTaps={'handled'}
            onEndReached={this.onEndReached}
          />
        </Spinner>
        <HelpMenuModal
          isOpen={isContextModalOpen}
          toggleModal={this.toggleContextModal}
          title={'Messages'}
        >
          <TouchableOpacity
            style={styles.modalRow}
            onPress={this.deleteMessages}
          >
            <Text style={[styles.simpleButtonText, styles.removeButtonText]}>
              Delete Message
            </Text>
          </TouchableOpacity>
          {contextExtraOptions.map((action, key) => (
            <TouchableOpacity
              key={key}
              style={styles.modalRow}
              onPress={action.onPress}
            >
              <Text style={[styles.simpleButtonText]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </HelpMenuModal>
      </View>
    );
  }
}

export const screenOptions = ({ route }) => {
  return {
    title: route.params?.title,
  };
};

const mapStateToProps = (state) => ({
  chat: getChat(state),
  list: getListMessages(state),
  pagination: getPaginationMessage(state),
  isFetching: getIsFetchingMessage(state),
  currentMessage: getCurrentMessage(state),
  isContextModalOpen: isMessageContextMenuOpen(state),
  contextExtraOptions: getMessageContextOptions(state),
});

export default connect(mapStateToProps)(ChatView);
