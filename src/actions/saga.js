import { takeEvery, takeLatest, spawn } from 'redux-saga/effects';
import * as types from './types';

import { updateNavigation, registerToken, sendFeedback } from './app';
import {
  authInitialProfile,
  getProfile,
  signin,
  signout,
  signUp,
  getUser,
  addUserToFavorite,
  updateProfile,
  getUsers,
  changePassword,
} from './user';
import { getChats, joinToChat, deleteChat } from './chat';
import {
  getMessages,
  sendMessage,
  socketError,
  viewMessages,
  onReceiveMessage,
  deleteMessages,
} from './message';
import { forgotPassword } from './auth';
import {
  getCollaborations,
  getCollaboration,
  joinToCollaboration,
  addCollaborationToFavorite,
  createCollaboration,
  getMyCollaborations,
  getUserCollaborations,
  rateCollaboration,
  updateCollaboration,
  deleteCollaboration,
} from './collaboration';
import {
  uploadImage,
  onUploadAttachment,
  onDownloadFileAndSave,
} from './upload';
import {
  getRequests,
  changeStatusRequest,
  newJoinCollaboration,
  cancelRequest,
} from './request';
import { search } from './search';
import { getUsersReviews } from './review';
import { onCreateComplaint } from './complaint';
import { sendQuiz, sendQuizInfo } from './quiz';

import userSaga from '../modules/user/saga';
import chatSaga from '../modules/chat/saga';
import paymentSaga from 'src/modules/payment/payment.saga';
import collaborationSaga from 'src/modules/collaboration/collaboration.saga';
import collaborationReviewSaga from 'src/modules/collaborationReview/collaborationReview.saga';

export default function* () {
  // app actions
  yield takeEvery(types.UPDATE_NAVIGATION_REQUEST, updateNavigation);
  yield takeEvery(types.REGISTER_TOKEN_REQUEST, registerToken);
  yield takeEvery(types.SEND_FEEDBACK_REQUEST, sendFeedback);

  // auth
  yield takeEvery(types.FORGOT_PASSWORD_REQUEST, forgotPassword);

  // user actions
  yield takeEvery(types.GET_PROFILE_REQUEST, getProfile);
  yield takeEvery(types.UPDATE_PROFILE_REQUEST, updateProfile);
  yield takeEvery(types.SIGN_IN_REQUEST, signin);
  yield takeEvery(types.SIGN_OUT_REQUEST, signout);
  yield takeEvery(types.SIGN_UP_REQUEST, signUp);
  yield takeEvery(types.GET_USER_REQUEST, getUser);
  yield takeLatest(types.ADD_USER_TO_FAVORITE_REQUEST, addUserToFavorite);
  yield takeEvery(types.GET_USERS_REQUEST, getUsers);
  yield takeEvery(types.GET_USERS_MORE_REQUEST, getUsers);
  yield takeEvery(types.GET_USERS_REFRESH_REQUEST, getUsers);
  yield takeEvery(types.CHANGE_PASSWORD_REQUEST, changePassword);

  // chat actions
  yield takeEvery(types.GET_CHATS_REQUEST, getChats);
  yield takeEvery(types.GET_CHATS_REFRESH_REQUEST, getChats);
  yield takeEvery(types.GET_CHATS_MORE_REQUEST, getChats);
  yield takeEvery(types.JOIN_TO_CHAT_REQUEST, joinToChat);
  yield takeEvery(types.DELETE_CHAT_REQUEST, deleteChat);

  // message actions
  yield takeEvery(types.GET_CHAT_MESSAGES_REQUEST, getMessages);
  yield takeEvery(types.GET_CHAT_MESSAGES_MORE_REQUEST, getMessages);
  yield takeEvery(types.SEND_MESSAGE, sendMessage);
  yield takeEvery(types.SOCKET_ERROR, socketError);
  yield takeEvery(types.VIEW_MESSAGES, viewMessages);
  yield takeEvery(types.RECEIVE_MESSAGE, onReceiveMessage);
  yield takeEvery(types.DELETE_MESSAGES, deleteMessages);

  // collaboration actions
  yield takeEvery(types.GET_COLLABORATIONS_REQUEST, getCollaborations);
  yield takeEvery(types.GET_COLLABORATIONS_REFRESH_REQUEST, getCollaborations);
  yield takeEvery(types.GET_COLLABORATIONS_MORE_REQUEST, getCollaborations);
  yield takeEvery(types.GET_COLLABORATION_REQUEST, getCollaboration);
  yield takeEvery(types.JOIN_TO_COLLABORATION_REQUEST, joinToCollaboration);
  yield takeLatest(
    types.ADD_COLLABORATION_TO_FAVORITE_REQUEST,
    addCollaborationToFavorite,
  );
  yield takeEvery(types.CREATE_COLLABORATION_REQUEST, createCollaboration);
  yield takeEvery(types.GET_MY_COLLABORATIONS_REQUEST, getMyCollaborations);
  yield takeEvery(
    types.GET_MY_COLLABORATIONS_REFRESH_REQUEST,
    getMyCollaborations,
  );
  yield takeEvery(
    types.GET_MY_COLLABORATIONS_MORE_REQUEST,
    getMyCollaborations,
  );
  yield takeEvery(types.GET_USER_COLLABORATIONS_REQUEST, getUserCollaborations);
  yield takeEvery(
    types.GET_USER_COLLABORATIONS_REFRESH_REQUEST,
    getUserCollaborations,
  );
  yield takeEvery(
    types.GET_USER_COLLABORATIONS_MORE_REQUEST,
    getUserCollaborations,
  );
  yield takeEvery(types.RATE_COLLABORATION_REQUEST, rateCollaboration);
  yield takeEvery(types.UPDATE_COLLABORATION_REQUEST, updateCollaboration);
  yield takeEvery(types.DELETE_COLLABORATION_REQUEST, deleteCollaboration);

  // upload actions
  yield takeEvery(types.UPLOAD_IMAGE_REQUEST, uploadImage);
  yield takeLatest(types.UPLOAD_ATTACHMENT, onUploadAttachment);
  yield takeEvery(types.DOWNLOAD_FILE_AND_SAVE, onDownloadFileAndSave);

  // requests actions
  yield takeEvery(types.GET_JOIN_COLLABORATION_REQUESTS_REQUEST, getRequests);
  yield takeEvery(
    types.GET_JOIN_COLLABORATION_REQUESTS_REFRESH_REQUEST,
    getRequests,
  );
  yield takeEvery(types.CHANGE_STATUS_REQUEST_REQUEST, changeStatusRequest);
  yield takeEvery(types.NEW_JOIN_COLLABORATION_REQUEST, newJoinCollaboration);
  yield takeEvery(types.CANCEL_JOIN_REQUEST_REQUEST, cancelRequest);

  // search actions
  yield takeLatest(types.SEARCH_REQUEST, search);

  // reviews actions
  yield takeEvery(types.GET_USERS_REVIEWS_REQUEST, getUsersReviews);
  yield takeEvery(types.GET_USERS_REVIEWS_REFRESH_REQUEST, getUsersReviews);
  yield takeEvery(types.GET_USERS_REVIEWS_MORE_REQUEST, getUsersReviews);

  // complaint
  yield takeLatest(types.CREATE_COMPLAINT, onCreateComplaint);

  // quiz
  yield takeLatest(types.SEND_QUIZ, sendQuiz);
  yield takeLatest(types.SEND_QUIZ_INFO, sendQuizInfo);

  // auth initial profile request
  yield takeLatest(types.AUTH_INITIAL_PROFILE_REQUEST, authInitialProfile);

  // potential partners
  yield spawn(userSaga);

  // first message to potential partner
  yield spawn(chatSaga);

  // payments
  yield spawn(paymentSaga);

  // collaboration
  yield spawn(collaborationSaga);

  // collaborationReview
  yield spawn(collaborationReviewSaga);
}
