import { combineReducers } from 'redux';
import {
  CREATE_COMPLAINT,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT_FAIL,
} from '../actions/types';

const createDefaultState = {
  isLoading: false,
};

const createReducersMap = {
  [CREATE_COMPLAINT]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [CREATE_COMPLAINT_SUCCESS]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [CREATE_COMPLAINT_FAIL]: (state) => ({
    ...state,
    isLoading: false,
  }),
};

const createReducers = (state = createDefaultState, action) => {
  const reducer = createReducersMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};

export default combineReducers({
  create: createReducers,
});
