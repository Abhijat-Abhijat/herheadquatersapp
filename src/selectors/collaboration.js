import { createSelector } from 'reselect';
import { hashTableToArray } from '../actions/utils';
import { getMyId } from './user';

export const getListCollaboration = (state) =>
  hashTableToArray(state.collaboration.list);
export const getPaginationCollaboration = (state) =>
  state.collaboration.pagination;
export const getIsFetchingCollaboration = (state) =>
  state.collaboration.isFetching;

export const getCurrentCollaboration = (state) =>
  state.collaboration.collaboration;

export const isMyCollaboration = createSelector(
  getMyId,
  (state, author) => (author ? author._id : null),
  (myId, authorId) => myId === authorId,
);

export const selectIsFetchingOneCollaboration = (state) =>
  state.collaboration.isFetching.one;
export const selectIsSubmittingCollaboration = (state) =>
  state.collaboration.isFetching.create;
export const selectIsFetchingSentCollaborationToFriend = (state) =>
  state.collaboration.isFetching.sendToFriend;
