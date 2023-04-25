import * as types from './types';

export const viewMessagesRequest = (idChat, messages) => ({
  type: types.VIEW_MESSAGES,
  payload: {
    idChat,
    messages,
  },
});

export const updateViewedMessages = (idMessages) => ({
  type: types.UPDATE_VIEWED_MESSAGES,
  payload: {
    idMessages,
  },
});

export const receiveMessage = (message, meta = {}) => ({
  type: types.RECEIVE_MESSAGE,
  payload: {
    message,
  },
  meta,
});

export const socketErrorRequest = (error) => ({
  type: types.SOCKET_ERROR,
  error,
});

export const updateMessage = (message) => ({
  type: types.UPDATE_MESSAGE,
  payload: {
    message,
  },
});

export const updateDeletedMessages = (idMessages) => ({
  type: types.UPDATE_DELETE_MESSAGES,
  payload: {
    idMessages,
  },
});

export const newJoinCollaborationRequest = (request) => ({
  type: types.NEW_JOIN_COLLABORATION_REQUEST,
  payload: {
    request,
  },
});
