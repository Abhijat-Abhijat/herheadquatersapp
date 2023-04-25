import { put, call, select, all } from 'redux-saga/effects';
import * as types from './types';
import axios from '../axios';
import { proceedError } from './utils';
// selectors
import { getCurrentRoute, getPreviousTimeStamp } from '../selectors/app';
// services
import PushService from '../services/PushService';
import ToastService from '../services/ToastService';
import NavigationService from '../services/NavigationService';
import TrackingService from '../services/TrackingService';
// helpers
import { msToSec } from './utils';

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
};

export const updateNavigationRequest = (prevState, currentState) => ({
  type: types.UPDATE_NAVIGATION_REQUEST,
  payload: {
    prevState,
    currentState,
  },
});

const updateNavigationSuccess = (payload) => ({
  type: types.UPDATE_NAVIGATION_SUCCESS,
  payload,
});

export function* updateNavigation(action) {
  try {
    const { currentState } = action.payload;
    const [previousTimeStamp, previousRoute] = yield all([
      select(getPreviousTimeStamp),
      select(getCurrentRoute),
    ]);
    const currentTimeStamp = Date.now();

    const currentRoute = getCurrentRouteName(currentState);

    const timeOnScreen = msToSec(currentTimeStamp - previousTimeStamp);

    yield all([
      // call(TrackingService.track, 'ScreenTime', {
      //   time: timeOnScreen,
      //   screen: previousRoute,
      // }),
      put(
        updateNavigationSuccess({
          currentRoute,
          previousTimeStamp: currentTimeStamp,
        }),
      ),
    ]);
  } catch (e) {
    yield proceedError(e.message);
  }
}

export const registerTokenRequest = {
  type: types.REGISTER_TOKEN_REQUEST,
};

const registerTokenSuccess = {
  type: types.REGISTER_TOKEN_SUCCESS,
};

const registerTokenFailure = (error) => ({
  type: types.REGISTER_TOKEN_FAILURE,
  error,
});

const handlePushNotification = (notification) => {
  if (notification.origin === 'selected') {
    NavigationService.navigate('ChatView', {
      idChat: notification.data.idChat,
    });
  }
};

export function* registerToken() {
  try {
    const token = yield call(PushService.getPushNotifications);

    if (!token) {
      return yield put(registerTokenSuccess);
    }

    yield call(axios, {
      url: '/notification-token',
      method: 'POST',
      data: {
        token: token.data,
      },
    });

    yield put(registerTokenSuccess);
    // Notifications.addListener(handlePushNotification);
  } catch (e) {
    yield proceedError(registerTokenFailure, e);
  }
}

export const sendFeedbackRequest = (text) => ({
  type: types.SEND_FEEDBACK_REQUEST,
  payload: {
    text,
  },
});

const sendFeedbackSuccess = {
  type: types.SEND_FEEDBACK_SUCCESS,
};

const sendFeedbackFailure = (error) => ({
  type: types.SEND_FEEDBACK_FAILURE,
  error,
});

export function* sendFeedback(action) {
  try {
    yield call(axios, {
      url: '/feedback',
      method: 'POST',
      data: action.payload,
    });

    ToastService.showToast(`You've successfully sent feedback.`);
    NavigationService.navigate('MyHQ');
    yield put(sendFeedbackSuccess);
  } catch (e) {
    yield proceedError(sendFeedbackFailure, e);
  }
}
