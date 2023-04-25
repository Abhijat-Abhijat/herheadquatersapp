import { SEND_FIRST_MESSAGE } from './types';

export function sendFirstMessage(message, userId) {
  return {
    type: SEND_FIRST_MESSAGE,
    payload: {
      message,
      userId,
    },
  };
}
