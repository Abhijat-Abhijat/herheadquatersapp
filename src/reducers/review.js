import {
  SIGN_OUT_SUCCESS,
  GET_USERS_REVIEWS_REQUEST,
  GET_USERS_REVIEWS_SUCCESS,
  GET_USERS_REVIEWS_FAILURE,
  GET_USERS_REVIEWS_REFRESH_REQUEST,
  GET_USERS_REVIEWS_REFRESH_SUCCESS,
  GET_USERS_REVIEWS_MORE_REQUEST,
  GET_USERS_REVIEWS_MORE_SUCCESS,
  GET_USER_SUCCESS,
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
    canLoadMore: true,
  },
  error: null,
  totalReviews: 0,
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [GET_USERS_REVIEWS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
      update: false,
    },
    error: action.error,
  }),
  [GET_USERS_REVIEWS_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: true,
    },
  }),
  [GET_USERS_REVIEWS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
    },
    list: arrayToHashTable(action.payload.list),
    pagination: action.payload.pagination,
  }),
  [GET_USER_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
    },
    list: arrayToHashTable(action.payload.reviews),
    totalReviews: action.payload.totalReviews,
  }),
  [GET_USERS_REVIEWS_REFRESH_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_USERS_REVIEWS_REFRESH_SUCCESS]: (state, action) => {
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
  [GET_USERS_REVIEWS_MORE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_USERS_REVIEWS_MORE_SUCCESS]: (state, action) => ({
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
