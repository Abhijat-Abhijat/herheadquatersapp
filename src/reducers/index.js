import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import user from './user';
import chat from './chat';
import message from './message';
import auth from './auth';
import collaboration from './collaboration';
import upload from './upload';
import request from './request';
import myCollaboration from './myCollaboration';
import userCollaboration from './userCollaboration';
import search from './search';
import review from './review';
import complaint from './complaint';
import potentialPartners from '../modules/user/reducers';
import payment from 'src/modules/payment/payment.reducers';
import collaborationReview from 'src/modules/collaborationReview/collaborationReview.reducer';

export default combineReducers({
  auth,
  app,
  user,
  chat,
  message,
  collaboration,
  collaborationReview,
  upload,
  request,
  myCollaboration,
  userCollaboration,
  search,
  review,
  complaint,
  potentialPartners,
  payment,
  form: formReducer,
});
