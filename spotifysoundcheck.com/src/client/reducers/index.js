import {combineReducers} from 'redux';
import address from './addressReducer';
import user from './userReducer';
import fab from './fabReducer';
import modal from './modalReducer';
import lessons from './lessonsReducers';
import selectedAccount from './selectedAccount';
import selectedCompany from './selectedCompany';
import contentLoading from './loadingReducer';
import notification from './notificationReducer';
import galleries from './getGalleriesReducer';
import userAccess from './checkUserAccessReducer';
import activeLesson from './activeLessonReducer';
import globalVoiceOver from './globalVoiceOverReducer';
import globalTrack from './globalTrackReducer';
import reloadIndex from './reloadIndexReducer';

export default combineReducers({
  address,
  user,
  fab,
  modal,
  lessons,
  selectedAccount,
  selectedCompany,
  contentLoading,
  notification,
  galleries,
  userAccess,
  activeLesson,
  globalVoiceOver,
  globalTrack,
  reloadIndex
});
