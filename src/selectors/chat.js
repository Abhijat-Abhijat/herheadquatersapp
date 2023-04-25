import { createSelector } from 'reselect';
import { hashTableToArray } from '../actions/utils';

export const getListChat = (state) => hashTableToArray(state.chat.list);
export const getPaginationChat = (state) => state.chat.pagination;
export const getIsFetchingChat = (state) => state.chat.isFetching;

export const getChat = (state) => state.chat.chat;

const getChatId = (state, props) => props.id;

export const isChatProccessing = createSelector(
  [getChatId, getIsFetchingChat],
  (idChat, isFetching) => isFetching.delete === idChat,
);
