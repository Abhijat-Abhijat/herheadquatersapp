import { hashTableToArray } from '../actions/utils';
import { createSelector } from 'reselect';
import { isDiffInOneDay } from '../actions/utils';

const MessageState = (state) => state.message;

const getList = (state) => hashTableToArray(state.message.list);

export const getListMessages = createSelector(getList, (messages) => {
  return messages
    .reverse()
    .reduce((acc, message) => {
      if (acc.length) {
        if (isDiffInOneDay(message.createdAt, acc[acc.length - 1].createdAt)) {
          message.newDay = true;
        }
      }

      acc.push(message);

      return acc;
    }, [])
    .reverse();
});

export const getPaginationMessage = (state) => state.message.pagination;
export const getIsFetchingMessage = (state) => state.message.isFetching;

export const getUnreadMessages = (state) => state.message.unreadMessages;

export const isMessageContextMenuOpen = createSelector(
  MessageState,
  (state) => state.modals.contextMenu,
);

export const getCurrentMessage = createSelector(
  MessageState,
  (state) => state.currentMessage,
);

export const getMessageContextOptions = createSelector(
  MessageState,
  (state) => state.modals.contextMenuOptions,
);
