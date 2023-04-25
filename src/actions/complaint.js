import { call, put } from 'redux-saga/effects';
import * as types from './types';
import axios from '../axios';
import { proceedError } from './utils';
// services
import NavigationService from '../services/NavigationService';

export const createComplaint = (type, target, reason = []) => ({
  type: types.CREATE_COMPLAINT,
  payload: {
    type,
    target,
    reason,
  },
});

const createComplaintSuccess = (payload) => ({
  type: types.CREATE_COMPLAINT_SUCCESS,
  payload,
});

const createComplaintFail = (error) => ({
  type: types.CREATE_COMPLAINT_FAIL,
  error,
});

export function* onCreateComplaint(action) {
  try {
    const result = (yield call(axios, {
      url: '/complaints',
      method: 'POST',
      data: action.payload,
    })).data;

    yield put(createComplaintSuccess(result.data));
    NavigationService.navigate('CollaborationsList');
  } catch (e) {
    yield proceedError(createComplaintFail, e);
  }
}
