import { call, put, select, all } from 'redux-saga/effects';
import * as types from './types';
// actions
import { updateChat } from './chat';
import { receiveMessage } from './helpers';
// selectors
import { getChat } from '../selectors/chat';
import { getPaginationMessage, getUnreadMessages } from '../selectors/message';
import { getProfile } from '../selectors/user';
import { getNavigationState } from '../selectors/app';
// services
import axios from '../axios';
import { proceedError } from './utils';
import config from '../config';
import SocketService from '../services/SocketService';
import { viewMessagesRequest } from './helpers';
import { generateId } from '../services/helpers';

export const getMessagesRequest = (
  idChat,
  page = 1,
  limit = config.messagesLimit,
  type = types.GET_CHAT_MESSAGES_REQUEST,
) => ({
  type,
  payload: {
    idChat,
    page,
    limit,
  },
});

const getMessagesSuccess = (list, pagination, type) => {
  switch (type) {
    case types.GET_CHAT_MESSAGES_REQUEST:
      return {
        type: types.GET_CHAT_MESSAGES_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_CHAT_MESSAGES_MORE_REQUEST:
      return {
        type: types.GET_CHAT_MESSAGES_MORE_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
  }
};

const getMessagesFailure = (error) => ({
  type: types.GET_CHAT_MESSAGES_FAILURE,
  error,
});

export function* getMessages(action) {
  try {
    const result = (yield call(axios, {
      url: `/chats/${action.payload.idChat}/messages`,
      method: 'GET',
      params: {
        page: action.payload.page,
        limit: action.payload.limit,
      },
    })).data;

    if (result.success) {
      const pagination = yield select(getPaginationMessage);

      let canLoadMore;

      if (pagination.total > result.data.pagination.total) {
        canLoadMore =
          result.data.pagination.page * result.data.pagination.limit <
          pagination.total;
      } else {
        canLoadMore =
          result.data.pagination.page * result.data.pagination.limit <
          result.data.pagination.total;
      }

      // sorry, this hack need for date separator in chat
      if (!canLoadMore && result.data.list[0]) {
        result.data.list[0].newDay = true;
      }

      yield put(
        getMessagesSuccess(
          result.data.list,
          Object.assign({}, result.data.pagination, {
            canLoadMore,
          }),
          action.type,
        ),
      );
      yield put(viewMessagesRequest(action.payload.idChat, result.data.list));
    } else {
      yield put(getMessagesFailure(result.error));
    }
  } catch (e) {
    yield proceedError(getMessagesFailure, e);
  }
}

export const sendMessageRequest = (message, payload) => ({
  type: types.SEND_MESSAGE,
  payload: {
    message,
    ...payload,
  },
});

export function* generateMessagePayload(extraPayload = {}) {
  const [chat, profile] = yield all([select(getChat), select(getProfile)]);

  return {
    author: profile,
    chat,
    status: null,
    ...extraPayload,
  };
}

export function* sendMessage(action) {
  let { message, subject, attachment, _id } = action.payload;
  // create payload for message
  const messagePayload = yield generateMessagePayload({
    attachment,
  });

  // if user specified a subject - set this subject in chat header
  if (subject) {
    yield put(
      updateChat({
        ...messagePayload.chat,
        subject,
      }),
    );
  }

  // generate unique id for message
  if (!_id) {
    _id = generateId();
  }

  // erase spaces
  message = message.trim();

  yield put(
    receiveMessage({
      text: message,
      _id,
      ...messagePayload,
      chat: messagePayload.chat._id,
    }),
  );

  SocketService.sendMessage(messagePayload.chat._id, message, subject, {
    _id,
    ...messagePayload,
  });
}

export function* socketError(action) {
  yield proceedError(action.error);
}

export function* viewMessages(action) {
  try {
    const myProfile = yield select(getProfile);
    const messages = Array.isArray(action.payload.messages)
      ? action.payload.messages
      : [action.payload.messages];

    const notViewedMessages = messages.reduce((acc, message) => {
      if (message.status !== 'viewed' && message.author._id !== myProfile._id) {
        acc.push(message._id);
      }

      return acc;
    }, []);

    if (notViewedMessages.length) {
      SocketService.viewMessages(action.payload.idChat, notViewedMessages);
      const currentUnreadMessages = yield select(getUnreadMessages);
      yield put(
        updateUnreadMessages(currentUnreadMessages - notViewedMessages.length),
      );
    }
  } catch (e) {
    yield proceedError('Error');
  }
}

export const updateUnreadMessages = (count) => ({
  type: types.UPDATE_UNREAD_MESSAGES,
  payload: {
    count,
  },
});

export function* onReceiveMessage(action) {
  const [currentUnreadMessages, profile] = yield all([
    select(getUnreadMessages),
    select(getProfile),
  ]);

  if (profile._id !== action.payload.message.author._id) {
    yield put(updateUnreadMessages(currentUnreadMessages + 1));
  }
}

export const deleteMessagesRequest = (idMessages) => ({
  type: types.DELETE_MESSAGES,
  payload: {
    idMessages,
  },
});

export function* deleteMessages(action) {
  const activeChat = yield select(getChat);

  SocketService.deleteMessages(activeChat._id, action.payload.idMessages);
}

export const toggleMessageContextMenu = (message, extraOptions = []) => ({
  type: types.TOGGLE_MESSAGE_CONTEXT_MENU,
  payload: {
    message,
    extraOptions,
  },
});
