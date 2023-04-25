import * as types from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, put, select, all } from 'redux-saga/effects';
import { proceedError } from './utils';
import axios from '../axios';
import { getNavigationState } from '../selectors/app';
import { getProfile } from '../selectors/user';
import { getSearchText } from '../selectors/search';
import NavigationService from '../services/NavigationService';
import TrackingService from '../services/TrackingService';

export const changeSearchText = (text) => ({
  type: types.CHANGE_SEARCH_TEXT,
  payload: {
    text,
  },
});

export const searchRequest = (q, filters = {}) => ({
  type: types.SEARCH_REQUEST,
  payload: {
    ...filters,
    q,
  },
});

const searchSuccess = (users, collaborations, searchQuery) => ({
  type: types.SEARCH_SUCCESS,
  payload: {
    users,
    collaborations,
    searchQuery,
  },
});

const searchFailure = (error) => ({
  type: types.SEARCH_FAILURE,
  error,
});

export function* search(action) {
  try {
    // save last search payload
    const profile = yield select(getProfile);

    let mySettings = yield call(AsyncStorage.getItem, profile._id);

    if (!mySettings) {
      mySettings = {};
    } else {
      mySettings = JSON.parse(mySettings);
    }

    if (!mySettings.listRecentSearch) {
      mySettings = {
        ...mySettings,
        listRecentSearch: [],
      };
    }

    if (
      !mySettings.listRecentSearch.includes(action.payload.q) &&
      action.payload.q
    ) {
      if (mySettings.listRecentSearch.length >= 5) {
        mySettings.listRecentSearch.pop();
      }

      mySettings.listRecentSearch.unshift(action.payload.q);
      yield call(AsyncStorage.setItem, profile._id, JSON.stringify(mySettings));
    }

    // get current search text if user doesn't pass string to action
    const currentSearchText = yield select(getSearchText);
    const q = action.payload.q || currentSearchText;
    const city = JSON.stringify(action.payload.city);
    const industry = JSON.stringify(action.payload.industry);

    // send request to server
    const result = (yield call(axios, {
      url: '/search',
      method: 'GET',
      params: {
        q,
        city,
        industry,
      },
    })).data;

    const [navigationState] = yield all([
      select(getNavigationState),
      put(
        searchSuccess(
          result.data.users,
          result.data.collaborations,
          result.data.search,
        ),
      ),
    ]);

    if (navigationState.currentRoute !== 'SearchResult') {
      NavigationService.navigate('SearchResult');
    }

    // yield call(TrackingService.track, 'SearchResults', q, {
    //   city,
    //   industry,
    // });
  } catch (e) {
    yield proceedError(searchFailure, e);
  }
}

export const changeFilter = (name, value) => ({
  type: types.CHANGE_FILTER,
  payload: {
    name,
    value,
  },
});

export const resetFilter = (name) => ({
  type: types.RESET_FILTER,
  payload: {
    name,
  },
});
