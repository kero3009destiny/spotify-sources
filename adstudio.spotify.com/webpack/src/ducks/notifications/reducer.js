import { DISPLAY_NOTIFICATION, HIDE_NOTIFICATION } from './types';

export const defaultState = {
  showNotification: false,
  notificationText: null,
  notificationType: 'base',
  displayTimeMs: 0,
  bannerCustomization: {},
};

export default function network(state = defaultState, action) {
  switch (action.type) {
    case DISPLAY_NOTIFICATION:
      return {
        ...state,
        showNotification: true,
        ...action.payload,
      };

    case HIDE_NOTIFICATION:
      return {
        ...state,
        showNotification: false,
      };

    default:
      return state;
  }
}
