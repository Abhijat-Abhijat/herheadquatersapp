import { call, put, takeLatest } from 'redux-saga/effects';
// api
import { collaborationReviewApi } from 'src/modules/collaborationReview/collaborationReview.api';
// types
import { proceedError } from 'src/actions/utils';
import {
  getCollaborationReviewListFailure,
  getCollaborationReviewListRequest,
  getCollaborationReviewListSuccess,
  getCollaborationReviewRequest,
  getCollaborationReviewSuccess,
  getCollaborationReviewFailure,
  submitCollaborationAfterReviewSuccess,
  submitCollaborationAfterReviewFailure,
  submitCollaborationAfterReviewRequest,
} from 'src/modules/collaborationReview/collaborationReview.actions';
// utils
import axios from 'src/axios';

function* getCollaborationReviewList(action) {
  try {
    const params = action.payload;

    const result = yield call(
      collaborationReviewApi.getCollaborationReviewList,
      params,
    );

    yield put(getCollaborationReviewListSuccess(result.data));
  } catch (error) {
    yield proceedError(getCollaborationReviewListFailure, error);
  }
}

function* getCollaborationReview(action) {
  try {
    const params = action.payload;

    const result = yield call(
      collaborationReviewApi.getCollaborationReview,
      params.id,
    );

    yield put(getCollaborationReviewSuccess(result.data));
  } catch (error) {
    yield proceedError(getCollaborationReviewFailure, error);
  }
}

function* submitCollaborationAfterReview(action) {
  try {
    const { review, acceptedFields, onSuccess } = action.payload;

    const updatedData = acceptedFields.reduce(
      (acc, field) => {
        return {
          ...acc,
          [field]: review.recommendation[field],
        };
      },
      { ...review.collaboration },
    );

    yield call(axios, {
      url: `/collaborations/${review.collaboration._id}`,
      method: 'PUT',
      data: updatedData,
    });

    yield call(
      collaborationReviewApi.submitCollaborationReview,
      review.collaboration._id,
    );

    yield put(submitCollaborationAfterReviewSuccess());

    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    yield proceedError(submitCollaborationAfterReviewFailure, error);
  }
}

export default function* () {
  yield takeLatest(
    `${getCollaborationReviewListRequest}`,
    getCollaborationReviewList,
  );

  yield takeLatest(`${getCollaborationReviewRequest}`, getCollaborationReview);

  yield takeLatest(
    `${submitCollaborationAfterReviewRequest}`,
    submitCollaborationAfterReview,
  );
}
