import { put, call, select, takeLatest } from 'redux-saga/effects';
// types
import {
  GET_POTENTIAL_PARTNERS_REQUEST,
  GET_POTENTIAL_PARTNERS_MORE_REQUEST,
  GET_POTENTIAL_PARTNERS_REFRESH_REQUEST,
  POTENTIAL_PARTNERS_COLLABORATE,
} from 'src/modules/user/types';
// actions
import {
  getPotentialPartnersFailure,
  getPotentialPartnersSuccess,
} from 'src/modules/user/actions';
// selectors
import { selectUserAccountPlan } from 'src/modules/user/selectors';
// account plan types
import { basic } from 'src/modules/payment/planTypes';
// services
import NavigationService from 'src/services/NavigationService';
// utils
import { proceedError } from 'src/actions/utils';
import axios from 'src/axios';

function* getPotentialPartners(action) {
  try {
    const { page, limit } = action.payload;

    const result = (yield call(axios, {
      url: '/users/partners',
      method: 'GET',
      params: {
        page,
        limit,
      },
    })).data;

    const canLoadMore =
      (result.data.pagination.page + 1) * result.data.pagination.limit <
      result.data.pagination.total;

    yield put(
      getPotentialPartnersSuccess(
        result.data.list,
        {
          ...result.data.pagination,
          canLoadMore,
        },
        action.type,
      ),
    );
  } catch (error) {
    yield proceedError(getPotentialPartnersFailure, error);
  }
}

function* onPotentialPartnersCollaborate(action) {
  const plan = yield select(selectUserAccountPlan);

  if (plan === basic.name) {
    NavigationService.navigate('UpdateToPremium');
  } else {
    const { userId, name } = action.payload;

    NavigationService.navigate('FirstMessage', {
      userId,
      name,
    });
  }
}

export default function* () {
  yield takeLatest(GET_POTENTIAL_PARTNERS_REQUEST, getPotentialPartners);
  yield takeLatest(GET_POTENTIAL_PARTNERS_MORE_REQUEST, getPotentialPartners);
  yield takeLatest(
    GET_POTENTIAL_PARTNERS_REFRESH_REQUEST,
    getPotentialPartners,
  );
  yield takeLatest(
    POTENTIAL_PARTNERS_COLLABORATE,
    onPotentialPartnersCollaborate,
  );
}
