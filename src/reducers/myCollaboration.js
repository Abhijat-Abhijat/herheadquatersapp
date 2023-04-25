import {
  SIGN_OUT_SUCCESS,
  GET_MY_COLLABORATIONS_REQUEST,
  GET_MY_COLLABORATIONS_SUCCESS,
  GET_MY_COLLABORATIONS_FAILURE,
  GET_MY_COLLABORATIONS_REFRESH_REQUEST,
  GET_MY_COLLABORATIONS_REFRESH_SUCCESS,
  GET_MY_COLLABORATIONS_MORE_REQUEST,
  GET_MY_COLLABORATIONS_MORE_SUCCESS,
  CHANGE_STATUS_REQUEST_SUCCESS,
} from '../actions/types';
import config from '../config';
import { arrayToHashTable, refreshList } from '../actions/utils';

const initState = {
  list: {},
  isFetching: {
    init: false,
    update: false,
  },
  pagination: {
    page: 0,
    limit: config.limit,
    canLoadMore: false,
  },
  error: null,
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [GET_MY_COLLABORATIONS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
      update: false,
    },
    error: action.error,
  }),
  [GET_MY_COLLABORATIONS_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: true,
    },
  }),
  [GET_MY_COLLABORATIONS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
    },
    list: {
      ...state.list,
      ...arrayToHashTable(action.payload.list),
    },
    pagination: action.payload.pagination,
  }),
  [GET_MY_COLLABORATIONS_REFRESH_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_MY_COLLABORATIONS_REFRESH_SUCCESS]: (state, action) => {
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
  [GET_MY_COLLABORATIONS_MORE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_MY_COLLABORATIONS_MORE_SUCCESS]: (state, action) => ({
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
  [CHANGE_STATUS_REQUEST_SUCCESS]: (state, action) => {
    if (action.payload.request.status === 'approved') {
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.request.collaboration._id]: {
            ...state.list[action.payload.request.collaboration._id],
            ...action.payload.request.collaboration,
          },
        },
      };
    } else {
      return state;
    }
  },
};

export default (state = initState, action) => {
  const reducer = reducerMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};
