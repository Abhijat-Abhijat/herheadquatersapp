import { hashTableToArray } from '../actions/utils';

export const getListReview = (state) => hashTableToArray(state.review.list);
export const getPaginationReview = (state) => state.review.pagination;
export const getIsFetchingReview = (state) => state.review.isFetching;

export const getTotalReviews = (state) => state.review.totalReviews;
