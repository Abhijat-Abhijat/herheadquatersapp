import { hashTableToArray } from '../actions/utils';
import { createSelector } from 'reselect';

export const getIncomingListRequest = (state) =>
  hashTableToArray(state.request.list.incoming);
export const getOutgoingListRequest = (state) =>
  hashTableToArray(state.request.list.outgoing);
export const getPaginationRequest = (state) => state.request.pagination;
export const getIsFetchingRequest = (state) => state.request.isFetching;

export const getUnviewedRequests = (state) => state.request.unviewedRequests;

const getIdRequest = (state, props) => props.request._id;

export const isCancelingRequest = createSelector(
  [getIsFetchingRequest, getIdRequest],
  (isFetching, idRequest) => isFetching.cancel === idRequest,
);
