import { call, put } from 'redux-saga/effects';
import * as types from './types';
import axios from '../axios';
import { proceedError } from './utils';
import config from '../config';
import NavigationService from '../services/NavigationService';

export const getChatsRequest = (
  page = 0,
  limit = config.limit,
  type = types.GET_CHATS_REQUEST,
) => ({
  type,
  payload: {
    page,
    limit,
  },
});

const getChatsSuccess = (list, pagination, type) => {
  switch (type) {
    case types.GET_CHATS_REQUEST:
      return {
        type: types.GET_CHATS_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_CHATS_REFRESH_REQUEST:
      return {
        type: types.GET_CHATS_REFRESH_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_CHATS_MORE_REQUEST:
      return {
        type: types.GET_CHATS_MORE_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
  }
};

const getChatsFailure = (error) => ({
  type: types.GET_CHATS_FAILURE,
  error,
});

export function* getChats(action) {
  try {
    const result = (yield call(axios, {
      url: '/chats',
      method: 'GET',
      params: {
        page: action.payload.page,
        limit: action.payload.limit,
      },
    })).data;

    const canLoadMore =
      (result.data.pagination.page + 1) * result.data.pagination.limit <
      result.data.pagination.total;

    if (result.success) {
      yield put(
        getChatsSuccess(
          result.data.list,
          Object.assign({}, result.data.pagination, {
            canLoadMore,
          }),
          action.type,
        ),
      );
    } else {
      yield put(getChatsFailure(result.error));
    }
  } catch (e) {
    yield proceedError(getChatsFailure, e);
  }
}

export const updateChat = (chat) => ({
  type: types.UPDATE_CHAT,
  payload: {
    chat,
  },
});

export const joinToChatRequest = (
  idUser,
  subject,
  subjectIsName = false,
  replace = false,
) => ({
  type: types.JOIN_TO_CHAT_REQUEST,
  payload: {
    idUser,
    subject,
    subjectIsName,
    replace,
  },
});

export const joinToChatSuccess = (chat) => ({
  type: types.JOIN_TO_CHAT_SUCCESS,
  payload: {
    chat,
  },
});

export const backgroundJoinToChatSuccess = (chat) => ({
  type: types.BACKGROUND_JOIN_TO_CHAT_SUCCESS,
  payload: {
    chat,
  },
});

const joinToChatFailure = (error) => ({
  type: types.JOIN_TO_CHAT_FAILURE,
  error,
});

export function* joinToChat(action) {
  try {
    let data = {
      idUser: action.payload.idUser,
    };

    if (!action.payload.subjectIsName) {
      data = {
        ...data,
        subject: action.payload.subject,
      };
    }

    const result = (yield call(axios, {
      url: '/chats',
      method: 'POST',
      data: {
        ...data,
      },
    })).data;

    yield put(joinToChatSuccess(result.data.chat));
    // hack to use in firstMessage saga
    if (action.payload.replace) {
      NavigationService.replace('ChatView', {
        title: result.data.chat.subject || action.payload.subject,
      });
    } else {
      NavigationService.navigate('ChatView', {
        title: result.data.chat.subject || action.payload.subject,
      });
    }
  } catch (e) {
    yield proceedError(joinToChatFailure, e);
  }
}

export const clearActiveChat = {
  type: types.CLEAR_ACTIVE_CHAT,
};

export const deleteChatRequest = (idChat) => ({
  type: types.DELETE_CHAT_REQUEST,
  payload: {
    idChat,
  },
});

const deleteChatSuccess = (idChat) => ({
  type: types.DELETE_CHAT_SUCCESS,
  payload: {
    idChat,
  },
});

const deleteChatFailure = (error) => ({
  type: types.DELETE_CHAT_FAILURE,
  error,
});

export function* deleteChat(action) {
  try {
    const result = (yield call(axios, {
      url: `/chats/${action.payload.idChat}`,
      method: 'DELETE',
    })).data;

    yield put(deleteChatSuccess(result.data.idChat));
  } catch (e) {
    yield proceedError(deleteChatFailure, e);
  }
}
