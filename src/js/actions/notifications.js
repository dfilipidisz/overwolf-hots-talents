import { CLOSE_NOTIFICATION } from '../constants';

export function closeNotification() {
  return {
    type: CLOSE_NOTIFICATION,
  };
}
