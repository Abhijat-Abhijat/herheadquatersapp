import { put, call } from 'redux-saga/effects';
import * as types from './types';
import axios from '../axios';
import { proceedError } from './utils';
import NavigationService from '../services/NavigationService';

export const forgotPasswordRequest = (email) => ({
  type: types.FORGOT_PASSWORD_REQUEST,
  payload: {
    email,
  },
});

const forgotPasswordSuccess = {
  type: types.FORGOT_PASSWORD_SUCCESS,
};

const forgotPasswordFailure = (error) => ({
  type: types.FORGOT_PASSWORD_FAILURE,
  error,
});

export function* forgotPassword(action) {
  try {
    yield call(axios, {
      url: '/password/forgot',
      method: 'POST',
      data: action.payload,
    });

    yield put(forgotPasswordSuccess);
    NavigationService.reset('ForgotPasswordSuccess');
  } catch (e) {
    yield proceedError(forgotPasswordFailure, e);
  }
}
