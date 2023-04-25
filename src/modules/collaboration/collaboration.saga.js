import { put, call, takeLatest } from 'redux-saga/effects';
// services
import ToastService from 'src/services/ToastService';
// utils
import axios from 'src/axios';
import { proceedError } from 'src/actions/utils';
// action creators
import {
  sendCollaborationToFriendRequest,
  sendCollaborationToFriendSuccess,
  sendCollaborationToFriendFailure,
} from 'src/modules/collaboration/collaboration.actions';

function* sendCollaborationToFriend(action) {
  try {
    const { data, callback } = action.payload;

    yield call(axios, {
      method: 'POST',
      url: '/send/collaboration/mail',
      data,
    });

    yield put(sendCollaborationToFriendSuccess());

    if (typeof callback === 'function') {
      callback();
    }

    ToastService.showToast(
      `This partnership was sent to your friend, ${data.firstName}.`,
    );
  } catch (error) {
    yield proceedError(sendCollaborationToFriendFailure, error);
  }
}

export default function* () {
  yield takeLatest(
    `${sendCollaborationToFriendRequest}`,
    sendCollaborationToFriend,
  );
}
