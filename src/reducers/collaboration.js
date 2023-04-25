// action types
import {
  SIGN_OUT_SUCCESS,
  GET_COLLABORATIONS_REQUEST,
  GET_COLLABORATIONS_SUCCESS,
  GET_COLLABORATIONS_FAILURE,
  GET_COLLABORATIONS_REFRESH_REQUEST,
  GET_COLLABORATIONS_REFRESH_SUCCESS,
  GET_COLLABORATIONS_MORE_REQUEST,
  GET_COLLABORATIONS_MORE_SUCCESS,
  GET_COLLABORATION_REQUEST,
  GET_COLLABORATION_SUCCESS,
  GET_COLLABORATION_FAILURE,
  JOIN_TO_COLLABORATION_REQUEST,
  JOIN_TO_COLLABORATION_SUCCESS,
  JOIN_TO_COLLABORATION_FAILURE,
  ADD_COLLABORATION_TO_FAVORITE_REQUEST,
  ADD_COLLABORATION_TO_FAVORITE_SUCCESS,
  ADD_COLLABORATION_TO_FAVORITE_FAILURE,
  CLEAR_COLLABORATION,
  CREATE_COLLABORATION_REQUEST,
  CREATE_COLLABORATION_SUCCESS,
  CREATE_COLLABORATION_FAILURE,
  RATE_COLLABORATION_REQUEST,
  RATE_COLLABORATION_SUCCESS,
  RATE_COLLABORATION_FAILURE,
  UPDATE_COLLABORATION_REQUEST,
  UPDATE_COLLABORATION_SUCCESS,
  UPDATE_COLLABORATION_FAILURE,
  DELETE_COLLABORATION_REQUEST,
  DELETE_COLLABORATION_SUCCESS,
  DELETE_COLLABORATION_FAILURE,
} from 'src/actions/types';
import {
  sendCollaborationToFriendRequest,
  sendCollaborationToFriendSuccess,
  sendCollaborationToFriendFailure,
} from 'src/modules/collaboration/collaboration.actions';
// utils
import config from 'src/config';
import { arrayToHashTable, refreshList } from 'src/actions/utils';

const initState = {
  list: {},
  collaboration: {
    author: {
      avatar: {},
    },
    photo: {},
    perks: [],
    industry: [],
  },
  isFetching: {
    init: false,
    update: false,
    one: false,
    join: false,
    favorite: false,
    create: false,
    rate: false,
    delete: false,
    sendToFriend: false,
  },
  pagination: {
    page: 0,
    limit: config.limit,
    canLoadMore: false,
  },
  error: null,
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => {
    return initState;
  },
  [GET_COLLABORATIONS_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: {
        ...state.isFetching,
        init: false,
        update: false,
      },
      error: action.error,
    };
  },
  [GET_COLLABORATIONS_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: true,
    },
  }),
  [GET_COLLABORATIONS_SUCCESS]: (state, action) => {
    return {
      ...state,
      isFetching: {
        ...state.isFetching,
        init: false,
      },
      list: arrayToHashTable(action.payload.list),
      pagination: action.payload.pagination,
    };
  },
  [GET_COLLABORATIONS_REFRESH_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_COLLABORATIONS_REFRESH_SUCCESS]: (state, action) => {
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
  [GET_COLLABORATIONS_MORE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_COLLABORATIONS_MORE_SUCCESS]: (state, action) => ({
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
  [GET_COLLABORATION_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      one: true,
    },
    collaboration: initState.collaboration,
  }),
  [GET_COLLABORATION_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      one: false,
    },
    collaboration: action.payload.collaboration,
  }),
  [GET_COLLABORATION_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      one: false,
    },
    error: action.error,
  }),
  [JOIN_TO_COLLABORATION_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      join: true,
    },
  }),
  [JOIN_TO_COLLABORATION_SUCCESS]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      join: false,
    },
  }),
  [JOIN_TO_COLLABORATION_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      join: false,
    },
    error: action.error,
  }),
  [ADD_COLLABORATION_TO_FAVORITE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      favorite: true,
    },
  }),
  [ADD_COLLABORATION_TO_FAVORITE_SUCCESS]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      favorite: false,
    },
  }),
  [ADD_COLLABORATION_TO_FAVORITE_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      favorite: false,
    },
    error: action.error,
  }),
  [CLEAR_COLLABORATION]: (state) => ({
    ...state,
    collaboration: initState.collaboration,
  }),
  [CREATE_COLLABORATION_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      create: true,
    },
  }),
  [CREATE_COLLABORATION_SUCCESS]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      create: false,
    },
  }),
  [CREATE_COLLABORATION_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      create: false,
    },
    error: action.error,
  }),
  [RATE_COLLABORATION_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      rate: true,
    },
  }),
  [RATE_COLLABORATION_SUCCESS]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      rate: false,
    },
  }),
  [RATE_COLLABORATION_FAILURE]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      rate: false,
    },
  }),
  [UPDATE_COLLABORATION_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      create: true,
    },
  }),
  [UPDATE_COLLABORATION_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      create: false,
    },
    collaboration: {
      ...action.payload.collaboration,
      author: state.collaboration.author,
    },
  }),
  [UPDATE_COLLABORATION_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      create: false,
    },
    error: action.error,
  }),
  [DELETE_COLLABORATION_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      delete: true,
    },
  }),
  [DELETE_COLLABORATION_SUCCESS]: (state, action) => {
    const filteredList = { ...state.list };

    delete filteredList[action.payload.collaboration._id];

    return {
      ...state,
      isFetching: {
        ...state.isFetching,
        delete: false,
      },
      list: filteredList,
      collaboration: initState.collaboration,
    };
  },
  [DELETE_COLLABORATION_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      delete: false,
    },
    error: action.error,
  }),
  [`${sendCollaborationToFriendRequest}`]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      sendToFriend: true,
    },
  }),
  [`${sendCollaborationToFriendSuccess}`]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      sendToFriend: false,
    },
  }),
  [`${sendCollaborationToFriendFailure}`]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      sendToFriend: false,
    },
  }),
};

export default (state = initState, action) => {
  const reducer = reducerMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};
