import {
  SET_GLOBAL_TRACK_URL,
  SET_GLOBAL_TRACK_PLAYING,
  SET_GLOBAL_TRACK_STOPPED,
  SET_GLOBAL_TRACK_PAUSED,
  SET_GLOBAL_TRACK_VOLUME,
  SET_GLOBAL_TRACK_DURATION
} from '../actions/globalTrackActions';

type GlobalTrackType = {
  url: string,
  status: 'PLAYING' | 'PAUSED' | 'STOPPED',
  volume: number,
  duration: number
}

const initialState: GlobalTrackType = {
  url: '',
  status: 'STOPPED',
  volume: 0,
  duration: 0
}

const globalTrackReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_GLOBAL_TRACK_URL:
    case SET_GLOBAL_TRACK_PLAYING:
    case SET_GLOBAL_TRACK_STOPPED:
    case SET_GLOBAL_TRACK_PAUSED:
    case SET_GLOBAL_TRACK_VOLUME:
    case SET_GLOBAL_TRACK_DURATION:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default globalTrackReducer;
