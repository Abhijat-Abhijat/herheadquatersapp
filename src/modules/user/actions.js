import {
  GET_POTENTIAL_PARTNERS_REQUEST,
  GET_POTENTIAL_PARTNERS_SUCCESS,
  GET_POTENTIAL_PARTNERS_FAILURE,
  GET_POTENTIAL_PARTNERS_REFRESH_REQUEST,
  GET_POTENTIAL_PARTNERS_REFRESH_SUCCESS,
  GET_POTENTIAL_PARTNERS_MORE_REQUEST,
  GET_POTENTIAL_PARTNERS_MORE_SUCCESS,
  POTENTIAL_PARTNERS_COLLABORATE,
} from './types';

import config from '../../config';

export function getPotentialPartnersRequest(
  page,
  limit = config.potentialPartnersLimit,
  type = GET_POTENTIAL_PARTNERS_REQUEST,
) {
  return {
    type,
    payload: {
      page,
      limit,
    },
  };
}

export function getPotentialPartnersSuccess(list, pagination, type) {
  switch (type) {
    case GET_POTENTIAL_PARTNERS_REQUEST: {
      return {
        type: GET_POTENTIAL_PARTNERS_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    }
    case GET_POTENTIAL_PARTNERS_REFRESH_REQUEST: {
      return {
        type: GET_POTENTIAL_PARTNERS_REFRESH_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    }
    case GET_POTENTIAL_PARTNERS_MORE_REQUEST: {
      return {
        type: GET_POTENTIAL_PARTNERS_MORE_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    }
  }
}

export function getPotentialPartnersFailure(error) {
  return {
    type: GET_POTENTIAL_PARTNERS_FAILURE,
    error,
  };
}

export function potentialPartnersCollaborate(payload) {
  return {
    type: POTENTIAL_PARTNERS_COLLABORATE,
    payload,
  };
}
