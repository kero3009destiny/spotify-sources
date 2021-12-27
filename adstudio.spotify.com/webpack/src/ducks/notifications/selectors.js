export const showNotification = state =>
  state && state.notifications && state.notifications.showNotification;
export const getNotificationText = state =>
  state && state.notifications && state.notifications.notificationText;
export const getNotificationType = state =>
  state && state.notifications && state.notifications.notificationType;
export const getDisplayTimeMs = state =>
  state && state.notifications && state.notifications.displayTimeMs;
export const getBannerCustomization = state =>
  state && state.notifications && state.notifications.bannerCustomization;
