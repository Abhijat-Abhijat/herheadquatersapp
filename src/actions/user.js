import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call, all, select } from 'redux-saga/effects';
import { getFormValues, destroy as reduxFormDestroy } from 'redux-form';
// utils
import * as types from './types';
import { proceedError } from './utils';
import axios from '../axios';
import config from '../config';
// services
import NavigationService from '../services/NavigationService';
import SocketService from '../services/SocketService';
import TrackingService from '../services/TrackingService';
import TrackingErrorService from '../services/TrackingErrorService';
import ToastService from '../services/ToastService';
import { Asset, Auth, Collaboration, User } from '../services/StorageService';
import { parseSocialLinks, stringifySocialLinks } from '../services/helpers';
// actions
import { updateUnreadMessages } from './message';
import { registerTokenRequest } from './app';
import { getCollaborationsSuccess } from './collaboration';
import { updateUnviewedRequests } from './request';
// form names
import { formName as signUpFirstStepFormName } from 'src/modules/auth/containers/SignUpFirstStepContainer';
import { formName as signUpSecondStepFormName } from 'src/modules/auth/containers/SignUpSecondStepContainer';

export async function initialEnter(isResetHome = false) {
  const addInfoFinished = await isAddInfoFinished();
  if (!addInfoFinished) {
    NavigationService.reset('Quiz', {
      screen: 'AddInfo',
    });
    return;
  }

  const quizFinished = await isQuizFinished();
  if (!quizFinished) {
    NavigationService.reset('Quiz', {
      screen: 'AddPreferences',
    });
    return;
  }

  const boardingFinished = await isBoardingFinished();
  if (!boardingFinished) {
    NavigationService.reset('Onboarding');
    return;
  }

  if (isResetHome) {
    NavigationService.reset('Home');
  } else {
    NavigationService.navigate('Home');
  }
}

async function isAddInfoFinished() {
  const { avatar, aboutCompany } = await User.getProfile();

  if (!avatar || !aboutCompany) {
    return false;
  }

  return true;
}

async function isQuizFinished() {
  const user = await User.getProfile();

  const isFirstTime = user && user.quiz && user.quiz.isFirstTime;

  if (isFirstTime) {
    return false;
  }

  return true;
}

async function isBoardingFinished() {
  const onboarding = await AsyncStorage.getItem('onboarding');

  if (onboarding === 'true') {
    return true;
  } else {
    return false;
  }
}

export const getProfileRequest = (populate, select) => ({
  type: types.GET_PROFILE_REQUEST,
  payload: {
    populate,
    select,
  },
});

export const getProfileSuccess = (payload) => ({
  type: types.GET_PROFILE_SUCCESS,
  payload: {
    user: payload,
  },
});

const getProfileFailure = (error) => ({
  type: types.GET_PROFILE_FAILURE,
  error,
});

export function* getProfile(action) {
  try {
    const result = (yield call(axios, {
      url: '/profile',
      method: 'GET',
      params: {
        populate: JSON.stringify(action.payload.populate),
        select: JSON.stringify(action.payload.select),
      },
    })).data;

    result.data.user.socialLinks = parseSocialLinks(
      result.data.user.socialLinks,
    );

    yield all([
      call(User.setProfile, result.data.user),
      put(getProfileSuccess(result.data.user)),
    ]);
  } catch (e) {
    yield proceedError(getProfileFailure, e);
  }
}

// INITIAL AUTH PROFILE REQUEST
export const authInitialProfileRequest = () => ({
  type: types.AUTH_INITIAL_PROFILE_REQUEST,
});

export function* authInitialProfile(action) {
  let cachedProfile = null;
  let cachedCollaborations = null;

  try {
    [cachedProfile, cachedCollaborations] = yield all([
      call(User.getProfile),
      call(Collaboration.getCollaborationsList),
    ]);

    if (cachedProfile) {
      yield all([
        put(getProfileSuccess(cachedProfile)),
        put(
          getCollaborationsSuccess(
            cachedCollaborations,
            {
              page: 0,
              limit: config.limit,
              canLoadMore: true,
            },
            types.GET_COLLABORATIONS_REQUEST,
          ),
        ),
      ]);

      yield call(initialEnter, true);
    }

    const result = (yield call(axios, {
      url: '/profile',
      method: 'GET',
      params: {
        init: true,
      },
    })).data;

    result.data.user.socialLinks = parseSocialLinks(
      result.data.user.socialLinks,
    );

    yield all([
      put(getProfileSuccess(result.data.user)),
      call(User.setProfile, result.data.user),
    ]);

    SocketService.connectToChat(result.data.rooms);

    yield all([
      call(initialEnter),
      put(updateUnreadMessages(result.data.unreadMessages)),
      put(registerTokenRequest),
      put(updateUnviewedRequests(result.data.unviewedRequests)),
      put(
        getCollaborationsSuccess(
          cachedCollaborations,
          {
            page: 0,
            limit: config.limit,
            canLoadMore: true,
          },
          types.GET_COLLABORATIONS_REQUEST,
        ),
      ),
    ]);

    // yield all([
    //   call(TrackingService.initUser, result.data.user),
    //   call(TrackingErrorService.initUser, result.data.user),
    // ]);
  } catch (e) {
    const errorCode = e.response ? e.response.data.code : e.message;

    if (errorCode === 'session_expired') {
      yield proceedError(getProfileFailure, e, false);
      NavigationService.reset('Auth');
    } else {
      yield proceedError(getProfileFailure, errorCode);

      if (!cachedProfile) {
        NavigationService.reset('Auth');
      }
    }
  }
}

export const signinRequest = (email, password) => ({
  type: types.SIGN_IN_REQUEST,
  payload: {
    email,
    password,
  },
});

const signinSuccess = (user) => ({
  type: types.SIGN_IN_SUCCESS,
  payload: {
    user,
  },
});

const signinFailure = (error) => ({
  type: types.SIGN_IN_FAILURE,
  error,
});

export function* signin(action) {
  try {
    const result = (yield call(axios, {
      url: '/signin',
      method: 'POST',
      data: {
        email: action.payload.email,
        password: action.payload.password,
      },
    })).data;

    result.data.user.socialLinks = parseSocialLinks(
      result.data.user.socialLinks,
    );

    yield all([
      put(signinSuccess(result.data.user)),
      put(registerTokenRequest),
      put(updateUnreadMessages(result.data.unreadMessages)),
      put(updateUnviewedRequests(result.data.unviewedRequests)),
      call(User.setProfile, result.data.user),
      call(Auth.setToken, result.data.token),
    ]);

    yield call(initialEnter, true);

    SocketService.initClient();
    SocketService.connectToChat(result.data.rooms);

    // yield all([
    // call(TrackingService.initUser, result.data.user),
    // call(TrackingErrorService.initUser, result.data.user),
    // ]);
  } catch (e) {
    yield proceedError(signinFailure, e);
  }
}

export const signoutRequest = {
  type: types.SIGN_OUT_REQUEST,
};

const signoutSuccess = {
  type: types.SIGN_OUT_SUCCESS,
};

const signoutFailure = (error) => ({
  type: types.SIGN_OUT_FAILURE,
  error,
});

export function* signout() {
  try {
    yield call(axios, {
      url: '/logout',
      method: 'POST',
    });

    yield all([
      // call(TrackingService.clearUser),
      call(User.clearProfile),
      call(Collaboration.clearCollaborationsList),
      call(Auth.clearToken),
      call(Asset.clearAssets),
    ]);

    NavigationService.reset('Auth');
    SocketService.disconnectSocket();

    yield put(signoutSuccess);
  } catch (e) {
    yield proceedError(signoutFailure, e);
  }
}

export const signUpRequest = () => ({
  type: types.SIGN_UP_REQUEST,
});

const signUpSuccess = () => ({
  type: types.SIGN_UP_SUCCESS,
});

const signUpFailure = (error) => ({
  type: types.SIGN_UP_FAILURE,
  error,
});

export function* signUp() {
  try {
    const stepOne = yield select(getFormValues(signUpFirstStepFormName));
    const stepTwo = yield select(getFormValues(signUpSecondStepFormName));

    const userData = {
      ...stepOne,
      ...stepTwo,
    };

    yield call(axios, {
      url: '/signup',
      method: 'POST',
      data: userData,
    });

    yield put(signUpSuccess());
    NavigationService.reset('SignUpComplete');

    yield all([
      put(reduxFormDestroy(signUpFirstStepFormName)),
      put(reduxFormDestroy(signUpSecondStepFormName)),
    ]);
  } catch (e) {
    yield proceedError(signUpFailure, e);
  }
}

export const getUserRequest = (idUser) => ({
  type: types.GET_USER_REQUEST,
  payload: {
    idUser,
  },
});

const getUserSuccess = (user, reviews, totalReviews) => ({
  type: types.GET_USER_SUCCESS,
  payload: {
    user,
    reviews,
    totalReviews,
  },
});

const getUserFailure = (error) => ({
  type: types.GET_USER_FAILURE,
  error,
});

export function* getUser(action) {
  try {
    const result = (yield call(axios, {
      url: `/users/${action.payload.idUser}`,
      method: 'GET',
      params: {
        populate: JSON.stringify([
          {
            path: 'avatar',
          },
          {
            path: 'collaborations',
            match: {
              status: 'active',
            },
            options: {
              limit: 3,
              sort: {
                createdAt: 'desc',
              },
            },
          },
          {
            path: 'portfolio',
          },
        ]),
        select: JSON.stringify([
          '_id',
          'email',
          'firstName',
          'lastName',
          'aboutCompany',
          'companyWebsite',
          'companyName',
          'avatar',
          'city',
          'state',
          'socialLinks',
          'yearsInBusiness',
          'industry',
          'businessType',
          'about',
          'seeking',
          'portfolio',
          'collaborations',
          'rating',
          'position',
        ]),
      },
    })).data;

    yield put(
      getUserSuccess(
        result.data.user,
        result.data.reviews,
        result.data.totalReviews,
      ),
    );
  } catch (e) {
    yield proceedError(getUserFailure, e);
    NavigationService.navigate('Newsfeed');
  }
}

export const addUserToFavoriteRequest = (idUser) => ({
  type: types.ADD_USER_TO_FAVORITE_REQUEST,
  payload: {
    idUser,
  },
});

const addUserToFavoriteSuccess = (user) => ({
  type: types.ADD_USER_TO_FAVORITE_SUCCESS,
  payload: {
    user,
  },
});

const addUserToFavoriteFailure = (error) => ({
  type: types.ADD_USER_TO_FAVORITE_FAILURE,
  error,
});

export function* addUserToFavorite(action) {
  try {
    const result = (yield call(axios, {
      url: `/users/${action.payload.idUser}/favorite`,
      method: 'POST',
    })).data;

    yield put(addUserToFavoriteSuccess(result.data.user));
  } catch (e) {
    yield proceedError(addUserToFavoriteFailure, e);
  }
}

export const updateProfileRequest = (data, callback) => ({
  type: types.UPDATE_PROFILE_REQUEST,
  payload: {
    data,
    callback,
  },
});

const updateProfileSuccess = (user) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  payload: {
    user,
  },
});

const updateProfileFailure = (error) => ({
  type: types.UPDATE_PROFILE_FAILURE,
  error,
});

export function* updateProfile({ payload }) {
  try {
    const { data, callback } = payload;
    const { profile, ...updatePayload } = data;

    profile.socialLinks = stringifySocialLinks(profile.socialLinks);

    const result = (yield call(axios, {
      url: '/profile',
      method: 'PUT',
      data: {
        profile,
        ...updatePayload,
      },
    })).data;

    ToastService.showToast('Profile is updated');

    result.data.user.socialLinks = parseSocialLinks(
      result.data.user.socialLinks,
    );

    yield all([
      put(updateProfileSuccess(result.data.user)),
      call(User.setProfile, result.data.user),
    ]);

    if (typeof callback === 'function') {
      callback();
    }
  } catch (e) {
    yield proceedError(updateProfileFailure, e);
  }
}

export const getUsersRequest = (
  page = 0,
  limit = config.limit,
  search = {},
  type = types.GET_USERS_REQUEST,
) => ({
  type,
  payload: {
    page,
    limit,
    search,
  },
});

const getUsersSuccess = (list, pagination, type) => {
  switch (type) {
    case types.GET_USERS_REQUEST:
      return {
        type: types.GET_USERS_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_USERS_REFRESH_REQUEST:
      return {
        type: types.GET_USERS_REFRESH_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_USERS_MORE_REQUEST:
      return {
        type: types.GET_USERS_MORE_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
  }
};

const getUsersFailure = (error) => ({
  type: types.GET_USERS_FAILURE,
  error,
});

export function* getUsers(action) {
  try {
    let params;

    if (action.payload.search.page && action.payload.search.limit) {
      params = action.payload.search;
    } else {
      params = {
        page: action.payload.page,
        limit: action.payload.limit,
        search: JSON.stringify(action.payload.search),
      };
    }

    const result = (yield call(axios, {
      url: '/users',
      method: 'GET',
      params,
    })).data;

    const canLoadMore =
      (result.data.pagination.page + 1) * result.data.pagination.limit <
      result.data.pagination.total;

    yield put(
      getUsersSuccess(
        result.data.list,
        {
          ...result.data.pagination,
          canLoadMore,
        },
        action.type,
      ),
    );
  } catch (e) {
    yield proceedError(getUsersFailure, e);
  }
}

export const changePasswordRequest = (payload) => ({
  type: types.CHANGE_PASSWORD_REQUEST,
  payload,
});

const changePasswordSuccess = {
  type: types.CHANGE_PASSWORD_SUCCESS,
};

const changePasswordFailure = (error) => ({
  type: types.CHANGE_PASSWORD_FAILURE,
  error,
});

export function* changePassword(action) {
  try {
    yield call(axios, {
      url: '/password/change',
      method: 'POST',
      data: action.payload,
    });

    yield put(changePasswordSuccess);
    ToastService.showToast('Your password was successfully changed.');
    NavigationService.navigate('Settings');
  } catch (e) {
    yield proceedError(changePasswordFailure, e);
  }
}
