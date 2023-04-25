import {
  GET_USER_COLLABORATIONS_REQUEST,
  GET_USER_COLLABORATIONS_SUCCESS,
  GET_USER_COLLABORATIONS_FAILURE,
  GET_USER_COLLABORATIONS_REFRESH_REQUEST,
  GET_USER_COLLABORATIONS_REFRESH_SUCCESS,
  GET_USER_COLLABORATIONS_MORE_REQUEST,
  GET_USER_COLLABORATIONS_MORE_SUCCESS,
  SIGN_OUT_SUCCESS,
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
  [SIGN_OUT_SUCCESS]: () => {
    return initState;
  },
  [GET_USER_COLLABORATIONS_FAILURE]: (state, action) => {
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
  [GET_USER_COLLABORATIONS_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: true,
    },
  }),
  [GET_USER_COLLABORATIONS_SUCCESS]: (state, action) => {
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
  [GET_USER_COLLABORATIONS_REFRESH_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_USER_COLLABORATIONS_REFRESH_SUCCESS]: (state, action) => {
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
  [GET_USER_COLLABORATIONS_MORE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_USER_COLLABORATIONS_MORE_SUCCESS]: (state, action) => ({
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
};

export default (state = initState, action) => {
  const reducer = reducerMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};
