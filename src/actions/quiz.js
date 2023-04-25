import { call, put, select } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import axios from '../axios';
// types
import { SEND_QUIZ_INFO, SEND_QUIZ } from './types';
// actions
import { getProfileSuccess, initialEnter } from './user';
// services
import { User } from '../services/StorageService';
import ToastService from '../services/ToastService';
import NavigationService from '../services/NavigationService';
// helpers
import { parseSocialLinks } from '../services/helpers';

export const sendQuizInfoRequest = () => ({
  type: SEND_QUIZ_INFO,
});

export const sendQuizRequest = () => ({
  type: SEND_QUIZ,
});

export function* sendQuizInfo() {
  try {
    const { aboutCompany, avatar } = yield select(getFormValues('quizIntro'));

    const result = (yield call(axios, {
      url: '/profile',
      method: 'PUT',
      data: {
        avatar,
        profile: {
          aboutCompany,
        },
      },
    })).data;

    result.data.user.socialLinks = parseSocialLinks(
      result.data.user.socialLinks,
    );

    yield put(getProfileSuccess(result.data.user));
    yield call(User.setProfile, result.data.user);

    NavigationService.reset('AddPreferences');
    ToastService.showToast(
      'Your avatar and company info were successfuly updated!',
    );
  } catch (error) {
    const errorMsg = error.response
      ? error.response.data.error || error.response.statusText
      : error.message;
    yield call(ToastService.showToast, errorMsg, 'danger');
  }
}

export function* sendQuiz() {
  try {
    const quiz = yield select(getFormValues('quiz'));

    const result = (yield call(axios, {
      url: '/profile',
      method: 'PUT',
      data: {
        profile: {
          quiz,
        },
      },
    })).data;

    result.data.user.socialLinks = parseSocialLinks(
      result.data.user.socialLinks,
    );

    yield put(getProfileSuccess(result.data.user));
    yield call(User.setProfile, result.data.user);

    yield call(initialEnter, result.data.user);
    ToastService.showToast('Your preferences were successfuly updated!');
  } catch (error) {
    const errorMsg = error.response
      ? error.response.data.error || error.response.statusText
      : error.message;
    yield call(ToastService.showToast, errorMsg, 'danger');
  }
}
