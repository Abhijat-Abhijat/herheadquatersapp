import { SIGN_OUT_SUCCESS } from '../actions/types';

const initState = {
  images: {},
  isFetching: {},
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
};

export default (state = initState, action) => {
  const reducer = reducerMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};
