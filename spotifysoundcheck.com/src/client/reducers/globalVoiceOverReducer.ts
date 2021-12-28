import {
  SET_GLOBAL_VOICE_OVER_URL,
  SET_GLOBAL_VOICE_OVER_PLAYING,
  SET_GLOBAL_VOICE_OVER_STOPPED,
  SET_GLOBAL_VOICE_OVER_PAUSED,
  SET_GLOBAL_VOICE_OVER_VOLUME,
  SET_GLOBAL_VOICE_OVER_DURATION
} from '../actions/globalVoiceOverActions';

type GlobalVoiceOverType = {
  url: string,
  status: 'PLAYING' | 'PAUSED' | 'STOPPED',
  volume: number,
  duration: number
}

const initialState: GlobalVoiceOverType = {
  url: '',
  status: 'PLAYING',
  volume: 50,
  duration: 0
}

const globalVoiceOverReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_GLOBAL_VOICE_OVER_URL:
    case SET_GLOBAL_VOICE_OVER_PLAYING:
    case SET_GLOBAL_VOICE_OVER_STOPPED:
    case SET_GLOBAL_VOICE_OVER_PAUSED:
    case SET_GLOBAL_VOICE_OVER_VOLUME:
    case SET_GLOBAL_VOICE_OVER_DURATION:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default globalVoiceOverReducer;
