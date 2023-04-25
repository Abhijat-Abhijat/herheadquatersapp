import io from 'socket.io-client';
import { AppState } from 'react-native';
// services
import ToastService from 'src/services/ToastService';
import NotificationService from 'src/services/NotificationService';
import NavigationService from 'src/services/NavigationService';
// actions
import {
  socketErrorRequest,
  updateMessage,
  receiveMessage,
  viewMessagesRequest,
  updateViewedMessages,
  updateDeletedMessages,
  newJoinCollaborationRequest,
} from 'src/actions/helpers';
import { updateChat, backgroundJoinToChatSuccess } from 'src/actions/chat';
// utils
import config from 'src/config';

let _client;
let _connected = false;
let _dispatch;
let _idChats = [];

const initDispatch = (dispatch) => {
  _dispatch = dispatch;
};

const subscribeOnEvents = () => {
  onNewChatCreated();
  onReceiveMessage();
  onMessageUpdated();
  onMessagesViewed();
  onSubjectChanged();
  onUpdateDeletedMessages();
  onNewJoinRequest();
  onAcceptedRequest();
};

const initClient = () => {
  if (!_connected) {
    _client = io.connect(`${config.url}`, {
      path: '/app',
      forceNode: true,
    });
    subscribeOnEvents();

    _client.on('connect', () => {
      _connected = _client.connected;
    });

    _client.on('reconnect', () => {
      connectToChat(_idChats);
    });
  }
};

const connectToChat = (idChats) => {
  if (typeof idChats === 'string') {
    _idChats.push(idChats);
  } else {
    _idChats = idChats;
  }

  _client.emit('connect to chat', idChats);
};

const disconnectSocket = () => {
  _client.disconnect();
  _connected = false;
};

const sendMessage = (
  idChat,
  text,
  subject,
  { _id, ...messagePayload } = {},
) => {
  if (!_client) {
    _dispatch(socketErrorRequest('No connection. Please try later'));
    return;
  }

  const messageToSend = {
    text,
    _id,
  };

  _client.binary(false).emit('send message', idChat, messageToSend, {
    subject,
    ...messagePayload,
  });
};

const onReceiveMessage = () => {
  _client.on('receive message', (message) => {
    _dispatch(
      receiveMessage(message, {
        increment: true,
      }),
    );

    if (AppState.currentState === 'active') {
      _dispatch(viewMessagesRequest(message.chat, message));
    }
  });
};

const onSubjectChanged = (navigation, corresponderName) => {
  _client.on('update subject', (idChat, subject) => {
    _dispatch(
      updateChat({
        _id: idChat,
        subject,
      }),
    );

    if (navigation) {
      navigation.setParams({
        title: subject,
      });

      ToastService.showToast(`${corresponderName} update a subject of chat`);
    }
  });
};

const onMessageUpdated = () => {
  _client.on('update message', (message) => {
    _dispatch(updateMessage(message));
  });
};

const onMessagesViewed = () => {
  _client.on('view message', (idMessages) => {
    _dispatch(updateViewedMessages(idMessages));
  });
};

const onNewChatCreated = () => {
  _client.on('new chat', (chat) => {
    connectToChat(chat._id);
    _dispatch(backgroundJoinToChatSuccess(chat));
  });
};

const onUpdateDeletedMessages = () => {
  _client.on('update deleted messages', (idMessages) => {
    _dispatch(updateDeletedMessages(idMessages));
  });
};

const deleteMessages = (idChat, idMessages) => {
  if (!Array.isArray(idMessages)) {
    idMessages = [idMessages];
  }

  _client.binary(false).emit('delete messages', idChat, idMessages);
};

const viewMessages = (idChat, idMessages) => {
  if (!Array.isArray(idMessages)) {
    idMessages = [idMessages];
  }

  _client.binary(false).emit('view message', idChat, idMessages);
};

const enterToChat = (idChat) => {
  _client.binary(false).emit('enter chat', idChat);
};

const leaveChat = () => {
  _client.binary(false).emit('leave chat');
};

const viewNewJoinRequests = (idRequests) => {
  _client.binary(false).emit('view request', idRequests);
};

const onNewJoinRequest = () => {
  _client.on('new request', (request) => {
    _dispatch(newJoinCollaborationRequest(request));

    NotificationService.show({
      title: 'Someone requested to join your partnership!',
      message:
        "To view and respond to your new request, visit the Partnerships section, under 'Needs Review'.",
      onPress: () => {
        NavigationService.navigate('Home', {
          screen: 'Collaborations',
        });
      },
    });
  });
};

const onAcceptedRequest = () => {
  _client.on('accepted request', (request) => {
    // request: { collaboration, requestId }
    NotificationService.show({
      title: 'Congratulations! You secured a partnership!',
      message:
        "View your new partnership and your next steps under the Partnerships 'In Progress' section.",
      onPress: () => {
        NavigationService.navigate('Home', {
          screen: 'Collaborations',
        });
      },
    });
  });
};

export default {
  connectToChat,
  initClient,
  disconnectSocket,
  initDispatch,
  sendMessage,
  onSubjectChanged,
  viewMessages,
  deleteMessages,
  enterToChat,
  leaveChat,
  viewNewJoinRequests,
};
