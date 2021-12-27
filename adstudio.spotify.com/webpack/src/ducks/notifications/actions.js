import * as types from './types';

export const DEFAULT_DISPLAY_TIME = 5000;

export function displayNotification(
  notificationText,
  notificationType,
  displayTimeMs = DEFAULT_DISPLAY_TIME,
  bannerCustomization = {},
) {
  return {
    type: types.DISPLAY_NOTIFICATION,
    payload: {
      notificationText,
      notificationType,
      displayTimeMs,
      bannerCustomization,
    },
  };
}

export function hideNotification() {
  return {
    type: types.HIDE_NOTIFICATION,
  };
}
