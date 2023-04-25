import { hashTableToArray } from '../actions/utils';

export const getSearchText = (state) => state.search.text;

export const getIsFetchingSearch = (state) => state.search.isFetching;

export const getSearchUsers = (state) => hashTableToArray(state.search.users);
export const getSearchCollaborations = (state) =>
  hashTableToArray(state.search.collaborations);

export const getSearchQuery = (state) => state.search.searchQuery;
export const getCurrentFilter = (state) => state.search.filters;
