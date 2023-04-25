import { createSelector } from 'reselect';
// selectors
import { getProfile } from 'src/selectors/user';
// utils
import { hashTableToArray } from 'src/actions/utils';
// collaboration statuses
import { collaborationStatuses } from 'src/modules/collaboration/collaborationStatuses';

export const getListMyCollaboration = (state) =>
  hashTableToArray(state.myCollaboration.list);
export const getPaginationMyCollaboration = (state) =>
  state.myCollaboration.pagination;
export const getIsFetchingMyCollaboration = (state) =>
  state.myCollaboration.isFetching;

export const getListMyCollaborationActive = createSelector(
  getListMyCollaboration,
  (collaborations) =>
    collaborations.filter(
      (collaboration) => collaboration.status === collaborationStatuses.ACTIVE,
    ),
);

export const getListMyCollaborationInProgress = createSelector(
  getListMyCollaboration,
  (collaborations) =>
    collaborations.filter(
      (collaboration) =>
        collaboration.status === collaborationStatuses.PROGRESS,
    ),
);

export const selectMyCollaborationToRateList = createSelector(
  getListMyCollaboration,
  getProfile,
  (collaborations, profile) =>
    collaborations.filter((collaboration) => {
      const isRated = collaboration.rating.connections.find(
        (rating) => rating.from === profile._id,
      );

      return (
        !isRated &&
        (collaboration.status === collaborationStatuses.COMPLETED ||
          collaboration.status === collaborationStatuses.TERMINATED)
      );
    }),
);

export const selectMyCollaborationCompletedRatedList = createSelector(
  getListMyCollaboration,
  getProfile,
  (collaborations, profile) =>
    collaborations.filter((collaboration) => {
      const isRated = collaboration.rating.connections.find(
        (rating) => rating.from === profile._id,
      );

      return (
        isRated &&
        (collaboration.status === collaborationStatuses.COMPLETED ||
          collaboration.status === collaborationStatuses.TERMINATED)
      );
    }),
);
