export const NOTIFICATION_ADD   = 'NOTIFICATION_ADD';
export const NOTIFICATION_HIDE  = 'NOTIFICATION_HIDE'

type TNotification = {
  status: string,
  type: string,
  message: string
}

export const setNotification = (notification:TNotification) => ({
  type: NOTIFICATION_ADD,
  payload: notification
});

export const hideNotification = () => ({
  type: NOTIFICATION_HIDE
})