import { call, put, select } from 'redux-saga/effects';
import config from '../config';
import * as types from './types';
import axios from '../axios';
import { proceedError } from './utils';
import { getUnviewedRequests } from '../selectors/request';
import SocketService from '../services/SocketService';

export const getRequestsRequest = (
  page = 0,
  limit = config.limit,
  requestType = 'incoming',
  status = 'pending',
  type = types.GET_JOIN_COLLABORATION_REQUESTS_REQUEST,
  populate = [],
) => ({
  type,
  payload: {
    type: requestType,
    page,
    limit,
    status: status === 'all' ? undefined : status,
    populate,
  },
});

const getRequestsSuccess = (list, pagination, type, requestType) => {
  switch (type) {
    case types.GET_JOIN_COLLABORATION_REQUESTS_REQUEST:
      return {
        type: types.GET_JOIN_COLLABORATION_REQUESTS_SUCCESS,
        payload: {
          list,
          pagination,
          requestType,
        },
      };
    case types.GET_JOIN_COLLABORATION_REQUESTS_REFRESH_REQUEST:
      return {
        type: types.GET_JOIN_COLLABORATION_REQUESTS_REFRESH_SUCCESS,
        payload: {
          list,
          pagination,
          requestType,
        },
      };
  }
};

const getRequestsFailure = (error) => ({
  type: types.GET_JOIN_COLLABORATION_REQUESTS_FAILURE,
  error,
});

export function* getRequests(action) {
  try {
    const result = (yield call(axios, {
      url: `/requests/${action.payload.type}`,
      method: 'GET',
      params: {
        page: action.payload.page,
        limit: action.payload.limit,
        search: JSON.stringify({
          status: action.payload.status,
        }),
        populate: JSON.stringify(action.payload.populate),
      },
    })).data;

    const canLoadMore =
      (result.data.pagination.page + 1) * result.data.pagination.limit <
      result.data.pagination.total;

    // update unviewed requests only for incoming requests
    if (action.payload.type === 'incoming') {
      const unviewedRequests = result.data.list.reduce((acc, request) => {
        if (!request.viewed) {
          acc.push(request._id);
        }

        return acc;
      }, []);

      if (unviewedRequests.length) {
        SocketService.viewNewJoinRequests(unviewedRequests);
        yield put(updateUnviewedRequests(0));
      }
    }

    yield put(
      getRequestsSuccess(
        result.data.list,
        {
          ...result.data.pagination,
          canLoadMore,
        },
        action.type,
        action.payload.type,
      ),
    );
  } catch (e) {
    yield proceedError(getRequestsFailure, e);
  }
}

export const changeStatusRequestRequest = (idRequest, action) => ({
  type: types.CHANGE_STATUS_REQUEST_REQUEST,
  payload: {
    idRequest,
    action,
  },
});

const changeStatusRequestSuccess = (request) => ({
  type: types.CHANGE_STATUS_REQUEST_SUCCESS,
  payload: {
    request,
  },
});

const changeStatusRequestFailure = (error) => ({
  type: types.CHANGE_STATUS_REQUEST_FAILURE,
  error,
});

export function* changeStatusRequest(action) {
  try {
    const result = (yield call(axios, {
      url: `/requests/${action.payload.idRequest}/${action.payload.action}`,
      method: 'POST',
    })).data;

    yield put(changeStatusRequestSuccess(result.data.request));
    yield put(updateUnviewedRequests(0));
  } catch (e) {
    yield proceedError(changeStatusRequestFailure, e);
  }
}

export const updateUnviewedRequests = (count) => ({
  type: types.UPDATE_UNVIEWED_REQUESTS,
  payload: {
    count,
  },
});

export function* newJoinCollaboration() {
  const currentCount = yield select(getUnviewedRequests);

  yield put(updateUnviewedRequests(currentCount + 1));
}

export const cancelRequestRequest = (idRequest) => ({
  type: types.CANCEL_JOIN_REQUEST_REQUEST,
  payload: {
    idRequest,
  },
});

const cancelRequestSuccess = (idRequest) => ({
  type: types.CANCEL_JOIN_REQUEST_SUCCESS,
  payload: {
    idRequest,
  },
});

const cancelRequestFailure = (error) => ({
  type: types.CANCEL_JOIN_REQUEST_FAILURE,
  error,
});

export function* cancelRequest(action) {
  try {
    yield call(axios, {
      url: `/requests/${action.payload.idRequest}/cancel`,
      method: 'POST',
    });

    yield put(cancelRequestSuccess(action.payload.idRequest));
  } catch (e) {
    yield proceedError(cancelRequestFailure, e);
  }
}
