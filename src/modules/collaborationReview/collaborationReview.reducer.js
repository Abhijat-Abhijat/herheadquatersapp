import { SIGN_OUT_SUCCESS } from 'src/actions/types';
import {
  getCollaborationReviewListRequest,
  getCollaborationReviewListSuccess,
  getCollaborationReviewListFailure,
  getCollaborationReviewRequest,
  getCollaborationReviewSuccess,
  getCollaborationReviewFailure,
  submitCollaborationAfterReviewRequest,
  submitCollaborationAfterReviewSuccess,
  submitCollaborationAfterReviewFailure,
} from 'src/modules/collaborationReview/collaborationReview.actions';

const initListPagination = {
  limit: 0,
  page: 0,
  total: 0,
};

const initState = {
  list: [],
  listPagination: initListPagination,
  listParams: {
    page: 0,
    limit: 25,
    status: ['wait', 'reviewed'],
  },
  isListLoading: false,
  item: null,
  isItemLoading: false,
  isSubmitting: false,
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [`${getCollaborationReviewListRequest}`]: (state) => {
    return {
      ...state,
      list: [],
      listPagination: initListPagination,
      isListLoading: true,
    };
  },
  [`${getCollaborationReviewListSuccess}`]: (state, action) => {
    return {
      ...state,
      list: action.payload.list,
      listPagination: action.payload.pagination,
      isListLoading: false,
    };
  },
  [`${getCollaborationReviewListFailure}`]: (state) => {
    return {
      ...state,
      isListLoading: false,
    };
  },
  [`${getCollaborationReviewRequest}`]: (state) => {
    return {
      ...state,
      item: null,
      isItemLoading: true,
    };
  },
  [`${getCollaborationReviewSuccess}`]: (state, action) => {
    return {
      ...state,
      item: action.payload,
      isItemLoading: false,
    };
  },
  [`${getCollaborationReviewFailure}`]: (state) => {
    return {
      ...state,
      isItemLoading: false,
    };
  },
  [`${submitCollaborationAfterReviewRequest}`]: (state) => {
    return {
      ...state,
      isSubmitting: true,
    };
  },
  [`${submitCollaborationAfterReviewSuccess}`]: (state) => {
    return {
      ...state,
      isSubmitting: false,
    };
  },
  [`${submitCollaborationAfterReviewFailure}`]: (state) => {
    return {
      ...state,
      isSubmitting: false,
    };
  },
};

export default (state = initState, action) => {
  const reducer = reducerMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};
