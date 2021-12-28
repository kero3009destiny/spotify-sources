import {
  NOTIFICATION_ADD,
  NOTIFICATION_HIDE
} from '../actions/notificationAction';
import uuid from 'uuid/v4';

export default function notificationReducer(state = {}, action:any) {
  switch(action.type) {
    case NOTIFICATION_ADD:
      return {
        ...state,
        ...action.payload,
        show: true,
        id: uuid()
      }
      break;
    case NOTIFICATION_HIDE:
      return {
        ...state,
        show: false
      }
    default:
      return state;
  }
}