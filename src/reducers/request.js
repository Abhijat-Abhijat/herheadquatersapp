import {
  SIGN_OUT_SUCCESS,
  GET_JOIN_COLLABORATION_REQUESTS_REQUEST,
  GET_JOIN_COLLABORATION_REQUESTS_SUCCESS,
  GET_JOIN_COLLABORATION_REQUESTS_FAILURE,
  GET_JOIN_COLLABORATION_REQUESTS_REFRESH_REQUEST,
  GET_JOIN_COLLABORATION_REQUESTS_REFRESH_SUCCESS,
  CHANGE_STATUS_REQUEST_REQUEST,
  CHANGE_STATUS_REQUEST_SUCCESS,
  CHANGE_STATUS_REQUEST_FAILURE,
  UPDATE_UNVIEWED_REQUESTS,
  NEW_JOIN_COLLABORATION_REQUEST,
  CANCEL_JOIN_REQUEST_REQUEST,
  CANCEL_JOIN_REQUEST_SUCCESS,
  CANCEL_JOIN_REQUEST_FAILURE,
} from '../actions/types';
import config from '../config';
import {
  arrayToHashTable,
  hashTableToArray,
  refreshList,
  removeItems,
} from '../actions/utils';

const initState = {
  list: {
    incoming: {},
    outgoing: {},
  },
  isFetching: {
    init: false,
    update: false,
    changeStatus: false,
    cancel: false,
  },
  pagination: {
    page: 0,
    limit: config.limit,
    canLoadMore: false,
  },
  error: null,
  unviewedRequests: 0,
};

const reducerMap = {
  [SIGN_OUT_SUCCESS]: () => initState,
  [GET_JOIN_COLLABORATION_REQUESTS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
      update: false,
    },
    error: action.error,
  }),
  [GET_JOIN_COLLABORATION_REQUESTS_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: true,
    },
  }),
  [GET_JOIN_COLLABORATION_REQUESTS_SUCCESS]: (
    state,
    { payload: { list, pagination, requestType } },
  ) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      init: false,
    },
    list: {
      ...state.list,
      [requestType]: arrayToHashTable(list),
    },
    pagination: pagination,
  }),
  [GET_JOIN_COLLABORATION_REQUESTS_REFRESH_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      update: true,
    },
  }),
  [GET_JOIN_COLLABORATION_REQUESTS_REFRESH_SUCCESS]: (
    state,
    { payload: { list, pagination, requestType } },
  ) => {
    const newList = refreshList(state.list, list);

    return {
      ...state,
      isFetching: {
        ...state.isFetching,
        update: false,
      },
      list: {
        [requestType]: newList,
      },
      pagination: pagination,
    };
  },
  [CHANGE_STATUS_REQUEST_REQUEST]: (state) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      changeStatus: true,
    },
  }),
  [CHANGE_STATUS_REQUEST_SUCCESS]: (state, action) => {
    let requestsToDelete = [];
    // if request was approved find other requests to collaboration
    if (action.payload.request.status === 'approved') {
      requestsToDelete = hashTableToArray(state.list.incoming).reduce(
        (acc, request) => {
          if (
            request.collaboration._id ===
            action.payload.request.collaboration._id
          ) {
            acc.push(request._id);
          }

          return acc;
        },
        [],
      );
    }

    const newList = removeItems(state.list.incoming, [
      action.payload.request._id,
      ...requestsToDelete,
    ]);

    return {
      ...state,
      isFetching: {
        ...state.isFetching,
        changeStatus: false,
      },
      list: {
        ...state.list,
        incoming: newList,
      },
    };
  },
  [CHANGE_STATUS_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      changeStatus: false,
    },
    error: action.error,
  }),
  [UPDATE_UNVIEWED_REQUESTS]: (state, action) => ({
    ...state,
    unviewedRequests: action.payload.count,
  }),
  [NEW_JOIN_COLLABORATION_REQUEST]: (state, action) => ({
    ...state,
    list: {
      [action.payload.request._id]: action.payload.request,
      ...state.list,
    },
  }),
  [CANCEL_JOIN_REQUEST_REQUEST]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      cancel: action.payload.idRequest,
    },
  }),
  [CANCEL_JOIN_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      outgoing: removeItems(state.list.outgoing, action.payload.idRequest),
    },
    isFetching: {
      ...state.isFetching,
      cancel: false,
    },
  }),
  [CANCEL_JOIN_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      cancel: false,
    },
    error: action.error,
  }),
};

export default (state = initState, action) => {
  const reducer = reducerMap[action.type];

  if (!reducer) {
    return state;
  }

  return reducer(state, action);
};
