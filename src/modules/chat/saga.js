import { put, race, take, takeLatest } from 'redux-saga/effects';
// types
import { SEND_FIRST_MESSAGE } from './types';
import * as types from '../../actions/types';
// actions
import { joinToChatRequest } from '../../actions/chat';
import { sendMessageRequest } from '../../actions/message';
// utils
import { proceedError } from '../../actions/utils';
import { formatFirstMessage } from './utils';

function* sendFirstMessage(action) {
  try {
    const { message, userId } = action.payload;

    const formattedMessage = formatFirstMessage(message);

    yield put(joinToChatRequest(userId, message.title, false, true));

    const [chatSuccess, chatError] = yield race([
      take(types.JOIN_TO_CHAT_SUCCESS),
      take(types.JOIN_TO_CHAT_FAILURE),
    ]);

    if (chatError) {
      throw Error('Error with creating chat!');
    }

    yield put(sendMessageRequest(formattedMessage));
  } catch (error) {
    yield proceedError(error.message);
  }
}

export default function*() {
  yield takeLatest(SEND_FIRST_MESSAGE, sendFirstMessage);
}
