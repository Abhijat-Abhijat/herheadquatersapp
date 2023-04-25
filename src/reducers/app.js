import {
  UPDATE_NAVIGATION_SUCCESS,
  SIGN_OUT_SUCCESS,
  SEND_FEEDBACK_REQUEST,
  SEND_FEEDBACK_SUCCESS,
  SEND_FEEDBACK_FAILURE,
} from '../actions/types';

const initState = {
  navigation: {
    previousTimeStamp: Date.now(),
    currentRoute: null,
  },
  isFetching: {
    sendFeedback: false,
  },
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [UPDATE_NAVIGATION_SUCCESS]: (state, action) => ({
    ...state,
    navigation: action.payload,
  }),
  [SEND_FEEDBACK_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      sendFeedback: true,
    },
  }),
  [SEND_FEEDBACK_SUCCESS]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      sendFeedback: false,
    },
  }),
  [SEND_FEEDBACK_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      sendFeedback: false,
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
