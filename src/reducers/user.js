import {
  AUTH_INITIAL_PROFILE_REQUEST,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  ADD_USER_TO_FAVORITE_REQUEST,
  ADD_USER_TO_FAVORITE_SUCCESS,
  ADD_USER_TO_FAVORITE_FAILURE,
  ADD_COLLABORATION_TO_FAVORITE_SUCCESS,
  ADD_COLLABORATION_TO_FAVORITE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USERS_REFRESH_REQUEST,
  GET_USERS_REFRESH_SUCCESS,
  GET_USERS_MORE_REQUEST,
  GET_USERS_MORE_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from '../actions/types';
import { arrayToHashTable, refreshList, removeItems } from '../actions/utils';
import config from '../config';

const initState = {
  isFetching: {
    profile: false,
    updateProfile: false,
    signin: false,
    signup: false,
    signout: false,
    one: false,
    favorite: false,
    init: false,
    update: false,
    changePassword: false,
  },
  profile: {
    favorites: {
      profiles: {},
      collaborations: {},
    },
    stripeCustomer: {},
  },
  error: null,
  user: {
    socialLinks: {},
    rating: {},
    portfolio: [],
    collaborations: [],
  },
  list: {},
  pagination: {
    page: 0,
    limit: config.limit,
    canLoadMore: false,
  },
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [AUTH_INITIAL_PROFILE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      profile: true,
    },
  }),
  [GET_PROFILE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      profile: true,
    },
  }),
  [GET_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      profile: false,
    },
    profile: {
      ...state.profile,
      ...action.payload.user,
      favorites: {
        profiles: arrayToHashTable(action.payload.user.favorites.profiles),
        collaborations: arrayToHashTable(
          action.payload.user.favorites.collaborations,
        ),
      },
    },
  }),
  [GET_PROFILE_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      profile: false,
    },
    error: action.error,
  }),
  [SIGN_IN_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      signin: true,
    },
  }),
  [SIGN_IN_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      signin: false,
    },
    profile: action.payload.user,
  }),
  [SIGN_IN_FAILURE]: (state, action) => ({
    isFetching: {
      ...state.isFetching,
      signin: false,
    },
    error: action.error,
  }),
  [SIGN_UP_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      signup: true,
    },
  }),
  [SIGN_UP_SUCCESS]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      signup: false,
    },
  }),
  [SIGN_UP_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      signup: false,
    },
    error: action.error,
  }),
  [SIGN_OUT_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      signout: true,
    },
  }),
  [SIGN_OUT_FAILURE]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      signout: false,
    },
  }),
  [GET_USER_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      one: true,
    },
    user: initState.user,
  }),
  [GET_USER_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      one: false,
    },
    user: action.payload.user,
  }),
  [GET_USER_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      one: false,
    },
    error: action.error,
  }),
  [ADD_USER_TO_FAVORITE_REQUEST]: (state) => state,
  [ADD_USER_TO_FAVORITE_SUCCESS]: (state, action) => {
    const newListFavoritesProfiles = refreshList(
      state.profile.favorites.profiles,
      action.payload.user.favorites.profiles,
    );

    return {
      ...state,
      isFetching: {
        ...state.isFetching,
        favorite: false,
      },
      profile: {
        ...state.profile,
        favorites: {
          ...state.profile.favorites,
          profiles: newListFavoritesProfiles,
        },
      },
    };
  },
  [ADD_COLLABORATION_TO_FAVORITE_REQUEST]: (state) => state,
  [ADD_COLLABORATION_TO_FAVORITE_SUCCESS]: (state, action) => {
    const newListFavoritesCollaborations = refreshList(
      state.profile.favorites.collaborations,
      action.payload.user.favorites.collaborations,
    );

    return {
      ...state,
      profile: {
        ...state.profile,
        favorites: {
          ...state.profile.favorites,
          collaborations: newListFavoritesCollaborations,
        },
      },
    };
  },
  [ADD_USER_TO_FAVORITE_FAILURE]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      favorite: false,
    },
  }),
  [UPDATE_PROFILE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      updateProfile: true,
    },
  }),
  [UPDATE_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      updateProfile: false,
    },
    profile: {
      ...state.profile,
      ...action.payload.user,
      favorites: {
        profiles: arrayToHashTable(action.payload.user.favorites.profiles),
        collaborations: arrayToHashTable(
          action.payload.user.favorites.collaborations,
        ),
      },
    },
  }),
  [UPDATE_PROFILE_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      updateProfile: false,
    },
    error: action.error,
  }),
  [GET_USERS_FAILURE]: (state, action) => {
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
  [GET_USERS_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: true,
    },
  }),
  [GET_USERS_SUCCESS]: (state, action) => {
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
  [GET_USERS_REFRESH_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_USERS_REFRESH_SUCCESS]: (state, action) => {
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
  [GET_USERS_MORE_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_USERS_MORE_SUCCESS]: (state, action) => ({
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
  [CHANGE_PASSWORD_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      changePassword: true,
    },
  }),
  [CHANGE_PASSWORD_SUCCESS]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      changePassword: false,
    },
  }),
  [CHANGE_PASSWORD_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      changePassword: false,
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
