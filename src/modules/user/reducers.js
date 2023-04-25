import {
  GET_POTENTIAL_PARTNERS_REQUEST,
  GET_POTENTIAL_PARTNERS_SUCCESS,
  GET_POTENTIAL_PARTNERS_FAILURE,
  GET_POTENTIAL_PARTNERS_REFRESH_REQUEST,
  GET_POTENTIAL_PARTNERS_REFRESH_SUCCESS,
  GET_POTENTIAL_PARTNERS_MORE_REQUEST,
  GET_POTENTIAL_PARTNERS_MORE_SUCCESS,
} from './types';
import { SIGN_OUT_SUCCESS } from 'src/actions/types';
import config from 'src/config';
import { arrayToHashTable, refreshList } from 'src/actions/utils';

const initState = {
  list: {},
  isFetching: false,
  pagination: {
    page: 0,
    limit: config.potentialPartnersLimit,
    canLoadMore: true,
  },
  error: null,
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => {
    return initState;
  },
  [GET_POTENTIAL_PARTNERS_REQUEST]: (state) => {
    return {
      ...state,
      isFetching: true,
    };
  },
  [GET_POTENTIAL_PARTNERS_SUCCESS]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      list: arrayToHashTable(action.payload.list),
      pagination: action.payload.pagination,
    };
  },
  [GET_POTENTIAL_PARTNERS_REFRESH_REQUEST]: (state) => {
    return {
      ...state,
      isFetching: true,
    };
  },
  [GET_POTENTIAL_PARTNERS_REFRESH_SUCCESS]: (state, action) => {
    const newList = refreshList(state.list, action.payload.list);

    return {
      ...state,
      isFetching: false,
      list: newList,
      pagination: action.payload.pagination,
    };
  },
  [GET_POTENTIAL_PARTNERS_MORE_REQUEST]: (state) => {
    return {
      ...state,
      isFetching: true,
    };
  },
  [GET_POTENTIAL_PARTNERS_MORE_SUCCESS]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      list: {
        ...state.list,
        ...arrayToHashTable(action.payload.list),
      },
      pagination: action.payload.pagination,
    };
  },
  [GET_POTENTIAL_PARTNERS_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      error: action.error,
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
