import { call, put } from 'redux-saga/effects';
import config from '../config';
import * as types from './types';
import axios from '../axios';
import { proceedError } from './utils';

export const getUsersReviewsRequest = (
  idUser,
  page = 0,
  limit = config.limit,
  type = types.GET_USERS_REVIEWS_REQUEST,
) => ({
  type,
  payload: {
    idUser,
    page,
    limit,
  },
});

const getUsersReviewsSuccess = (list, pagination, type) => {
  switch (type) {
    case types.GET_USERS_REVIEWS_REQUEST:
      return {
        type: types.GET_USERS_REVIEWS_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_USERS_REVIEWS_REFRESH_REQUEST:
      return {
        type: types.GET_USERS_REVIEWS_REFRESH_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_USERS_REVIEWS_MORE_REQUEST:
      return {
        type: types.GET_USERS_REVIEWS_MORE_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
  }
};

const getUsersReviewsFailure = (error) => ({
  type: types.GET_USERS_REVIEWS_FAILURE,
  error,
});

export function* getUsersReviews(action) {
  try {
    const result = (yield call(axios, {
      url: `/users/${action.payload.idUser}/reviews`,
      method: 'GET',
      params: {
        page: action.payload.page,
        limit: action.payload.limit,
      },
    })).data;

    const canLoadMore =
      (result.data.pagination.page + 1) * result.data.pagination.limit <
      result.data.pagination.total;

    yield put(
      getUsersReviewsSuccess(
        result.data.list,
        {
          ...result.data.pagination,
          canLoadMore,
        },
        action.type,
      ),
    );
  } catch (e) {
    yield proceedError(getUsersReviewsFailure, e);
  }
}
