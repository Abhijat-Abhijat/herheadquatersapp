import {
  GET_CHAT_MESSAGES_REQUEST,
  GET_CHAT_MESSAGES_SUCCESS,
  GET_CHAT_MESSAGES_FAILURE,
  GET_CHAT_MESSAGES_MORE_REQUEST,
  GET_CHAT_MESSAGES_MORE_SUCCESS,
  RECEIVE_MESSAGE,
  UPDATE_MESSAGE,
  SIGN_OUT_SUCCESS,
  UPDATE_UNREAD_MESSAGES,
  JOIN_TO_CHAT_SUCCESS,
  CLEAR_ACTIVE_CHAT,
  UPDATE_CHAT,
  UPDATE_DELETE_MESSAGES,
  TOGGLE_MESSAGE_CONTEXT_MENU,
} from '../actions/types';
import config from '../config';
import { arrayToHashTable, removeItems } from '../actions/utils';

const initState = {
  list: {},
  isFetching: {
    init: false,
    update: false,
  },
  pagination: {
    page: 1,
    limit: config.messagesLimit,
    canLoadMore: false,
  },
  unreadMessages: 0,
  activeChat: null,
  modals: {
    contextMenu: false,
    contextMenuOptions: [],
  },
  currentMessage: null,
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [GET_CHAT_MESSAGES_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
      update: false,
    },
    error: action.error,
  }),
  [GET_CHAT_MESSAGES_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: true,
    },
  }),
  [GET_CHAT_MESSAGES_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
    },
    list: arrayToHashTable(action.payload.list.reverse()),
    pagination: action.payload.pagination,
  }),
  [GET_CHAT_MESSAGES_MORE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_CHAT_MESSAGES_MORE_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: false,
    },
    list: {
      ...state.list,
      ...arrayToHashTable(action.payload.list.reverse()),
    },
    pagination: action.payload.pagination,
  }),
  [RECEIVE_MESSAGE]: (state, action) => {
    if (action.payload.message.chat !== state.activeChat) {
      return state;
    }

    return {
      ...state,
      list: {
        [action.payload.message._id]: action.payload.message,
        ...removeItems(state.list, action.payload.message._id),
      },
      pagination: {
        ...state.pagination,
        total:
          state.pagination.total && action.meta.increment
            ? state.pagination.total + 1
            : state.pagination.total,
      },
    };
  },
  [UPDATE_MESSAGE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      [action.payload.message._id]: action.payload.message,
    },
  }),
  [UPDATE_UNREAD_MESSAGES]: (state, action) => ({
    ...state,
    unreadMessages: action.payload.count,
  }),
  [JOIN_TO_CHAT_SUCCESS]: (state, action) => ({
    ...state,
    activeChat: action.payload.chat._id,
  }),
  [UPDATE_CHAT]: (state, action) => ({
    ...state,
    activeChat: action.payload.chat ? action.payload.chat._id : null,
  }),
  [CLEAR_ACTIVE_CHAT]: (state) => ({
    ...state,
    activeChat: null,
  }),
  [UPDATE_DELETE_MESSAGES]: (state, action) => {
    const newList = removeItems(state.list, action.payload.idMessages);

    return {
      ...state,
      list: newList,
    };
  },
  [TOGGLE_MESSAGE_CONTEXT_MENU]: (
    state,
    { payload: { message, extraOptions } },
  ) => {
    const isContextMenuOpen = !state.modals.contextMenu;

    return {
      ...state,
      modals: {
        contextMenu: isContextMenuOpen,
        contextMenuOptions: extraOptions,
      },
      currentMessage: isContextMenuOpen ? message : null,
    };
  },
};

export default (state = initState, action) => {
  const reducer = reducerMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};
