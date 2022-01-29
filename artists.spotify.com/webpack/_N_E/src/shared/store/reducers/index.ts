// ignore-string-externalization

/**
 * Reducers
 *
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { combineReducers } from 'redux';
import { alert } from './alert';
import { announcements } from './announcements';
import { artistHistory } from './artistHistory';
import { concertView } from './concertView';
import { currentSong } from './currentSong';
export var reducer = combineReducers({
  alert: alert,
  announcements: announcements,
  artistHistory: artistHistory,
  concertView: concertView,
  currentSong: currentSong
});