import { createSelector } from 'reselect';

const selectCollaborationReview = (state) => state.collaborationReview;

export const selectCollaborationReviewList = createSelector(
  selectCollaborationReview,
  (state) => state.list,
);

export const selectCollaborationReviewListParams = createSelector(
  selectCollaborationReview,
  (state) => state.listParams,
);

export const selectCollaborationReviewListTotal = createSelector(
  selectCollaborationReview,
  (state) => state.listPagination.total,
);

export const selectCollaborationReviewIsListLoading = createSelector(
  selectCollaborationReview,
  (state) => state.isListLoading,
);

export const selectCollaborationReviewItem = createSelector(
  selectCollaborationReview,
  (state) => state.item,
);

export const selectCollaborationReviewIsItemLoading = createSelector(
  selectCollaborationReview,
  (state) => state.isItemLoading,
);

export const selectCollaborationReviewIsSubmitting = createSelector(
  selectCollaborationReview,
  (state) => state.isSubmitting,
);
