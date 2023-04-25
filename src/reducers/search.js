import {
  SIGN_OUT_SUCCESS,
  CHANGE_SEARCH_TEXT,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  CHANGE_FILTER,
  RESET_FILTER,
} from '../actions/types';
import { arrayToHashTable } from '../actions/utils';

const initState = {
  isFetching: {
    search: false,
  },
  users: {},
  collaborations: {},
  text: '',
  searchQuery: {
    users: '',
    collaborations: '',
  },
  filters: {
    industry: [],
    city: [],
  },
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [CHANGE_SEARCH_TEXT]: (state, action) => ({
    ...state,
    text: action.payload.text,
  }),
  [SEARCH_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      search: true,
    },
  }),
  [SEARCH_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      search: false,
    },
    users: arrayToHashTable(action.payload.users),
    collaborations: arrayToHashTable(action.payload.collaborations),
    searchQuery: action.payload.searchQuery,
  }),
  [SEARCH_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      search: false,
    },
    error: action.error,
  }),
  [CHANGE_FILTER]: (state, action) => {
    const { name, value } = action.payload;

    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  },
  [RESET_FILTER]: (state, action) => {
    let newFilters = { ...initState.filters };

    if (action.payload.name) {
      newFilters = {
        ...state.filters,
        [action.payload.name]: [],
      };
    }

    return {
      ...state,
      filters: newFilters,
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
