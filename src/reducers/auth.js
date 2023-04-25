import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SIGN_OUT_SUCCESS,
} from '../actions/types';

const initState = {
  isFetching: {
    forgotPassword: false,
  },
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [FORGOT_PASSWORD_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      forgotPassword: true,
    },
  }),
  [FORGOT_PASSWORD_SUCCESS]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      forgotPassword: false,
    },
  }),
  [FORGOT_PASSWORD_FAILURE]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      forgotPassword: false,
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
