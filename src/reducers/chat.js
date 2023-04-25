import {
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAILURE,
  GET_CHATS_REFRESH_REQUEST,
  GET_CHATS_REFRESH_SUCCESS,
  GET_CHATS_MORE_REQUEST,
  GET_CHATS_MORE_SUCCESS,
  UPDATE_CHAT,
  RECEIVE_MESSAGE,
  UPDATE_MESSAGE,
  SIGN_OUT_SUCCESS,
  JOIN_TO_CHAT_REQUEST,
  JOIN_TO_CHAT_SUCCESS,
  BACKGROUND_JOIN_TO_CHAT_SUCCESS,
  JOIN_TO_CHAT_FAILURE,
  UPDATE_VIEWED_MESSAGES,
  CLEAR_ACTIVE_CHAT,
  DELETE_CHAT_REQUEST,
  DELETE_CHAT_SUCCESS,
  DELETE_CHAT_FAILURE,
} from '../actions/types';
import config from '../config';
import {
  arrayToHashTable,
  hashTableToArray,
  refreshList,
  removeItems,
} from '../actions/utils';

const initState = {
  list: {},
  isFetching: {
    init: false,
    update: false,
    join: false,
    delete: false,
  },
  pagination: {
    page: 0,
    limit: config.limit,
    canLoadMore: false,
  },
  chat: {},
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [GET_CHATS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
      update: false,
    },
    error: action.error,
  }),
  [GET_CHATS_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: true,
    },
  }),
  [GET_CHATS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
    },
    list: arrayToHashTable(action.payload.list),
    pagination: action.payload.pagination,
  }),
  [GET_CHATS_REFRESH_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_CHATS_REFRESH_SUCCESS]: (state, action) => {
    const newList = refreshList(state.list, action.payload.list);

    return {
      ...state,
      isFetching: {
        ...state.isFetching,
        update: false,
      },
      list: newList,
      pagination: action.payload.pagination,
    };
  },
  [GET_CHATS_MORE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_CHATS_MORE_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: false,
    },
    list: {
      ...state.list,
      ...arrayToHashTable(action.payload.list),
    },
    pagination: action.payload.pagination,
  }),
  [UPDATE_CHAT]: (state, action) => {
    let newState = {
      ...state,
    };

    if (state.list[action.payload.chat._id]) {
      newState = {
        ...newState,
        list: {
          [action.payload.chat._id]: {
            ...state.list[action.payload.chat._id],
            ...action.payload.chat,
          },
          ...removeItems(state.list, action.payload.chat._id),
        },
      };
    }

    return {
      ...newState,
      chat: {
        ...state.chat,
        ...action.payload.chat,
      },
    };
  },
  [RECEIVE_MESSAGE]: (state, action) => {
    const newList = removeItems(state.list, action.payload.message.chat);

    const chat = state.list[action.payload.message.chat]
      ? {
          [action.payload.message.chat]: {
            ...state.list[action.payload.message.chat],
            lastMessage: action.payload.message,
          },
        }
      : {};

    return {
      ...state,
      list: {
        ...chat,
        ...newList,
      },
    };
  },
  [UPDATE_MESSAGE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      [action.payload.message.chat]: {
        ...state.list[action.payload.message.chat],
        lastMessage: action.payload.message,
      },
    },
  }),
  [UPDATE_VIEWED_MESSAGES]: (state, action) => {
    const chat = hashTableToArray(state.list).find((chat) =>
      chat.lastMessage
        ? action.payload.idMessages.includes(chat.lastMessage._id)
        : false,
    );

    if (!chat) {
      return state;
    }

    return {
      ...state,
      list: {
        ...state.list,
        [chat._id]: {
          ...chat,
          lastMessage: {
            ...chat.lastMessage,
            status: 'viewed',
          },
        },
      },
    };
  },
  [JOIN_TO_CHAT_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      join: true,
    },
  }),
  [JOIN_TO_CHAT_SUCCESS]: (state, action) => {
    const newList = removeItems(state.list, action.payload.chat._id);

    return {
      ...state,
      isFetching: {
        ...state.isFetching,
        join: false,
      },
      list: {
        [action.payload.chat._id]: {
          ...action.payload.chat,
        },
        ...newList,
      },
      chat: action.payload.chat,
    };
  },
  [BACKGROUND_JOIN_TO_CHAT_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      [action.payload.chat._id]: action.payload.chat,
      ...removeItems(state.list, action.payload.chat._id),
    },
  }),
  [JOIN_TO_CHAT_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      join: false,
    },
    error: action.error,
  }),
  [CLEAR_ACTIVE_CHAT]: (state) => ({
    ...state,
    chat: {},
  }),
  [DELETE_CHAT_REQUEST]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      delete: action.payload.idChat,
    },
  }),
  [DELETE_CHAT_SUCCESS]: (state, action) => {
    const newList = removeItems(state.list, action.payload.idChat);

    return {
      ...state,
      isFetching: {
        ...state.isFetching,
        delete: false,
      },
      list: newList,
    };
  },
  [DELETE_CHAT_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      delete: false,
    },
    error: action.error,
  }),
};

export default (state = initState, action) => {
  const reducer = reducerMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};
