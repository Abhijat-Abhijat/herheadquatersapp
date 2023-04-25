import { hashTableToArray } from '../actions/utils';

export const getListUserCollaboration = (state) =>
  hashTableToArray(state.userCollaboration.list);
export const getPaginationUserCollaboration = (state) =>
  state.userCollaboration.pagination;
export const getIsFetchingUserCollaboration = (state) =>
  state.userCollaboration.isFetching;
