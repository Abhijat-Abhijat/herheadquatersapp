import { call, put, all, select } from 'redux-saga/effects';
import { CacheManager } from 'react-native-expo-image-cache';
import { destroy as reduxFormDestroy } from 'redux-form';
// utils
import * as types from './types';
import axios from '../axios';
import { proceedError } from './utils';
import config from '../config';
// services
import TrackingService from '../services/TrackingService';
import ToastService from '../services/ToastService';
import NavigationService from '../services/NavigationService';
import { showCreditsModal } from '../services/ModalService';
import { Collaboration } from '../services/StorageService';
import { DateSelectorExtractor } from 'src/services/DateExtractor';
// formNames
import { formName as collaborationCreateStepOneFormName } from 'src/modules/collaboration/containers/CollaborationCreateFirstStep';
import { formName as collaborationCreateStepTwoFormName } from 'src/modules/collaboration/containers/CollaborationCreateSecondStep';
import { formName as collaborationCreateStepThreeFormName } from 'src/modules/collaboration/containers/CollaborationCreateThirdStep';

export const getCollaborationsRequest = (
  page = 0,
  limit = config.limit,
  search = {},
  type = types.GET_COLLABORATIONS_REQUEST,
) => ({
  type,
  payload: {
    page,
    limit,
    search,
  },
});

export const getCollaborationsSuccess = (list, pagination, type) => {
  switch (type) {
    case types.GET_COLLABORATIONS_REQUEST:
      return {
        type: types.GET_COLLABORATIONS_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_COLLABORATIONS_REFRESH_REQUEST:
      return {
        type: types.GET_COLLABORATIONS_REFRESH_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_COLLABORATIONS_MORE_REQUEST:
      return {
        type: types.GET_COLLABORATIONS_MORE_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
  }
};

const getCollaborationsFailure = (error) => ({
  type: types.GET_COLLABORATIONS_FAILURE,
  error,
});

export function* getCollaborations(action) {
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
      url: '/collaborations',
      method: 'GET',
      params,
    })).data;

    const canLoadMore =
      (result.data.pagination.page + 1) * result.data.pagination.limit <
      result.data.pagination.total;

    yield all([
      put(
        getCollaborationsSuccess(
          result.data.list,
          {
            ...result.data.pagination,
            canLoadMore,
          },
          action.type,
        ),
      ),
      call(Collaboration.setCollaborationsList, result.data.list, action.type),
    ]);
  } catch (e) {
    yield proceedError(getCollaborationsFailure, e);
  }
}

export const getCollaborationRequest = (
  idCollaboration,
  isOpenView = false,
) => ({
  type: types.GET_COLLABORATION_REQUEST,
  payload: {
    idCollaboration,
    isOpenView,
  },
});

const getCollaborationSuccess = (collaboration) => ({
  type: types.GET_COLLABORATION_SUCCESS,
  payload: {
    collaboration,
  },
});

const getCollaborationFailure = (error) => ({
  type: types.GET_COLLABORATION_FAILURE,
  error,
});

const getCollaborationCall = async (idCollaboration) => {
  const result = await axios({
    url: `/collaborations/${idCollaboration}`,
    method: 'GET',
  });

  const path = await CacheManager.get(
    result.data.data.collaboration.photo.src,
  ).getPath();

  result.data.data.collaboration.photo = Object.assign(
    {},
    result.data.data.collaboration.photo,
    {
      path,
    },
  );

  // this check for string is for collaborations that were created
  // before new create-collaboration-flow where industry field
  // changed from string to array of strings
  if (typeof result.data.data.collaboration.industry === 'string') {
    result.data.data.collaboration.industry = [
      result.data.data.collaboration.industry,
    ];
  }

  return result.data;
};

export function* getCollaboration(action) {
  try {
    const result = yield call(
      getCollaborationCall,
      action.payload.idCollaboration,
    );

    yield put(getCollaborationSuccess(result.data.collaboration));

    if (action.payload.isOpenView) {
      // yield call(
      //   TrackingService.track,
      //   'OpenCollaboration',
      //   result.data.collaboration.title,
      // );
    }
  } catch (e) {
    yield proceedError(getCollaborationFailure, e);
  }
}

export const joinToCollaborationRequest = (idCollaboration) => ({
  type: types.JOIN_TO_COLLABORATION_REQUEST,
  payload: {
    idCollaboration,
  },
});

const joinToCollaborationSuccess = (request) => ({
  type: types.JOIN_TO_COLLABORATION_SUCCESS,
  payload: {
    request,
  },
});

const joinToCollaborationFailure = (error) => ({
  type: types.JOIN_TO_COLLABORATION_FAILURE,
  error,
});

export function* joinToCollaboration(action) {
  try {
    const {
      data: {
        data: { request, leftCredits },
      },
    } = yield call(axios, {
      url: `/collaborations/${action.payload.idCollaboration}/join`,
      method: 'POST',
    });

    yield put(joinToCollaborationSuccess(request));
    ToastService.showToast(
      `You have successfully sent a request! You have ${leftCredits} credit${
        leftCredits === 1 ? '' : 's'
      } left!`,
    );
  } catch (e) {
    if (e.response && e.response.data.code === 'insufficient_credits') {
      yield proceedError(joinToCollaborationFailure, e, false);
      NavigationService.navigate('OutOfCredits');
    } else {
      yield proceedError(joinToCollaborationFailure, e);
    }
  }
}

export const addCollaborationToFavoriteRequest = (idCollaboration) => ({
  type: types.ADD_COLLABORATION_TO_FAVORITE_REQUEST,
  payload: {
    idCollaboration,
  },
});

const addCollaborationToFavoriteSuccess = (user) => ({
  type: types.ADD_COLLABORATION_TO_FAVORITE_SUCCESS,
  payload: {
    user,
  },
});

const addCollaborationToFavoriteFailure = (error) => ({
  type: types.ADD_COLLABORATION_TO_FAVORITE_FAILURE,
  error,
});

export function* addCollaborationToFavorite(action) {
  try {
    const result = (yield call(axios, {
      url: `/collaborations/${action.payload.idCollaboration}/favorite`,
      method: 'POST',
    })).data;

    yield put(addCollaborationToFavoriteSuccess(result.data.user));
  } catch (e) {
    yield proceedError(addCollaborationToFavoriteFailure, e);
  }
}

export const clearCollaboration = {
  type: types.CLEAR_COLLABORATION,
};

export const createCollaborationRequest = (isReview = false, onSuccess) => ({
  type: types.CREATE_COLLABORATION_REQUEST,
  payload: {
    isReview,
    onSuccess,
  },
});

const createCollaborationSuccess = (collaboration) => ({
  type: types.CREATE_COLLABORATION_SUCCESS,
  payload: {
    collaboration,
  },
});

const createCollaborationFailure = (error) => ({
  type: types.CREATE_COLLABORATION_FAILURE,
  error,
});

export function* createCollaboration(action) {
  try {
    const { isReview, onSuccess } = action.payload;

    const { stepOne, stepTwo, stepThree } = yield select((state) => {
      return {
        stepOne: state.form[collaborationCreateStepOneFormName].values,
        stepTwo: state.form[collaborationCreateStepTwoFormName].values,
        stepThree: state.form[collaborationCreateStepThreeFormName].values,
      };
    });

    const dateExtractor = new DateSelectorExtractor(
      stepThree.startDate,
      stepThree.endDate,
    );
    const startDate = dateExtractor.getStartDate();
    const endDate = dateExtractor.getEndDate();

    const data = {
      ...stepOne,
      ...stepTwo,
      ...stepThree,
      startDate,
      endDate,
      isReview,
    };

    const response = yield call(axios, {
      url: '/collaborations',
      method: 'POST',
      data,
    });

    const {
      data: {
        data: { collaboration, leftCredits },
      },
    } = response;

    ToastService.showToast('Successfully create new collaboration');
    yield put(createCollaborationSuccess(collaboration));

    yield all([
      put(reduxFormDestroy(collaborationCreateStepOneFormName)),
      put(reduxFormDestroy(collaborationCreateStepTwoFormName)),
      put(reduxFormDestroy(collaborationCreateStepThreeFormName)),
    ]);

    if (typeof onSuccess === 'function') {
      onSuccess();
    }

    showCreditsModal(leftCredits);
  } catch (e) {
    if (e.response && e.response.data.code === 'insufficient_credits') {
      yield proceedError(createCollaborationFailure, e, false);
      showCreditsModal(-1);
    } else {
      yield proceedError(createCollaborationFailure, e);
    }
  }
}

export const getMyCollaborationsRequest = (
  page = 0,
  limit = config.limit,
  search,
  type = types.GET_MY_COLLABORATIONS_REQUEST,
) => ({
  type,
  payload: {
    page,
    limit,
    search,
  },
});

const getMyCollaborationsSuccess = (list, pagination, type) => {
  switch (type) {
    case types.GET_MY_COLLABORATIONS_REQUEST:
      return {
        type: types.GET_MY_COLLABORATIONS_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_MY_COLLABORATIONS_REFRESH_REQUEST:
      return {
        type: types.GET_MY_COLLABORATIONS_REFRESH_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_MY_COLLABORATIONS_MORE_REQUEST:
      return {
        type: types.GET_MY_COLLABORATIONS_MORE_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
  }
};

const getMyCollaborationsFailure = (error) => ({
  type: types.GET_MY_COLLABORATIONS_FAILURE,
  error,
});

export function* getMyCollaborations(action) {
  try {
    const result = (yield call(axios, {
      url: '/collaborations/my',
      method: 'GET',
      params: {
        page: action.payload.page,
        limit: action.payload.limit,
        search: JSON.stringify(action.payload.search),
      },
    })).data;

    result.data.pagination = {
      ...result.data.pagination,
      canLoadMore:
        (result.data.pagination.page + 1) * result.data.pagination.limit <
        result.data.pagination.total,
    };

    yield put(
      getMyCollaborationsSuccess(
        result.data.list,
        result.data.pagination,
        action.type,
      ),
    );
  } catch (e) {
    yield proceedError(getMyCollaborationsFailure, e);
  }
}

export const getUserCollaborationsRequest = (
  idUser,
  page = 0,
  limit = config.limit,
  type = types.GET_USER_COLLABORATIONS_REQUEST,
) => ({
  type,
  payload: {
    idUser,
    page,
    limit,
  },
});

const getUserCollaborationsSuccess = (list, pagination, type) => {
  switch (type) {
    case types.GET_USER_COLLABORATIONS_REQUEST:
      return {
        type: types.GET_USER_COLLABORATIONS_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_USER_COLLABORATIONS_REFRESH_REQUEST:
      return {
        type: types.GET_USER_COLLABORATIONS_REFRESH_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
    case types.GET_USER_COLLABORATIONS_MORE_REQUEST:
      return {
        type: types.GET_USER_COLLABORATIONS_MORE_SUCCESS,
        payload: {
          list,
          pagination,
        },
      };
  }
};

const getUserCollaborationsFailure = (error) => ({
  type: types.GET_USER_COLLABORATIONS_FAILURE,
  error,
});

export function* getUserCollaborations(action) {
  try {
    const result = (yield call(axios, {
      url: `/users/${action.payload.idUser}/collaborations`,
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
      getUserCollaborationsSuccess(
        result.data.list,
        Object.assign({}, result.data.pagination, {
          canLoadMore,
        }),
        action.type,
      ),
    );
  } catch (e) {
    yield proceedError(getUserCollaborationsFailure, e);
  }
}

export const rateCollaborationRequest = (idCollaboration, data) => ({
  type: types.RATE_COLLABORATION_REQUEST,
  payload: {
    idCollaboration,
    data,
  },
});

const rateCollaborationSuccess = {
  type: types.RATE_COLLABORATION_SUCCESS,
};

const rateCollaborationFailure = (error) => ({
  type: types.RATE_COLLABORATION_FAILURE,
  error,
});

export function* rateCollaboration(action) {
  try {
    yield call(axios, {
      url: `/collaborations/${action.payload.idCollaboration}/rate`,
      method: 'POST',
      data: action.payload.data,
    });

    yield put(rateCollaborationSuccess);
    NavigationService.navigate('MyCollaborationsList');
  } catch (e) {
    yield proceedError(rateCollaborationFailure, e);
  }
}

export const updateCollaborationRequest = (collaboration) => ({
  type: types.UPDATE_COLLABORATION_REQUEST,
  payload: {
    collaboration,
  },
});

const updateCollaborationSuccess = (collaboration) => ({
  type: types.UPDATE_COLLABORATION_SUCCESS,
  payload: {
    collaboration,
  },
});

const updateCollaborationFailure = (error) => ({
  type: types.UPDATE_COLLABORATION_FAILURE,
  error,
});

export function* updateCollaboration(action) {
  try {
    const result = (yield call(axios, {
      url: `/collaborations/${action.payload.collaboration._id}`,
      method: 'PUT',
      data: action.payload.collaboration,
    })).data;

    yield put(updateCollaborationSuccess(result.data.collaboration));
    NavigationService.navigate('CollaborationView', {
      idCollaboration: result.data.collaboration._id,
    });
  } catch (e) {
    yield proceedError(updateCollaborationFailure, e);
  }
}

export const deleteCollaborationRequest = (idCollaboration) => ({
  type: types.DELETE_COLLABORATION_REQUEST,
  payload: {
    idCollaboration,
  },
});

const deleteCollaborationSuccess = (collaboration) => ({
  type: types.DELETE_COLLABORATION_SUCCESS,
  payload: {
    collaboration,
  },
});

const deleteCollaborationFailure = (error) => ({
  type: types.DELETE_COLLABORATION_FAILURE,
  error,
});

export function* deleteCollaboration(action) {
  try {
    const result = (yield call(axios, {
      url: `/collaborations/${action.payload.idCollaboration}`,
      method: 'DELETE',
    })).data;

    yield put(deleteCollaborationSuccess(result.data.collaboration));

    if (result.data.collaboration.status === 'terminated') {
      ToastService.showToast(`Successfully ended partnership early`);
    } else {
      ToastService.showToast(`Successfully removed partnership`);
      NavigationService.reset('Newsfeed');
    }
  } catch (e) {
    yield proceedError(deleteCollaborationFailure, e);
  }
}
