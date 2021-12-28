export const SET_GLOBAL_VOICE_OVER_URL = 'SET_GLOBAL_VOICE_OVER_URL';
export const SET_GLOBAL_VOICE_OVER_PLAYING = 'SET_GLOBAL_VOICE_OVER_PLAYING';
export const SET_GLOBAL_VOICE_OVER_STOPPED = 'SET_GLOBAL_VOICE_OVER_STOPPED';
export const SET_GLOBAL_VOICE_OVER_PAUSED = 'SET_GLOBAL_VOICE_OVER_PAUSED';
export const SET_GLOBAL_VOICE_OVER_VOLUME = 'SET_GLOBAL_VOICE_OVER_VOLUME';
export const SET_GLOBAL_VOICE_OVER_DURATION = 'SET_GLOBAL_VOICE_OVER_DURATION';

export const setGlobalVoiceOverUrl = (url: string) => ({
  type: SET_GLOBAL_VOICE_OVER_URL,
  payload: {
    url
  }
})

export const setGlobalVoiceOverPlaying = () => ({
  type: SET_GLOBAL_VOICE_OVER_PLAYING,
  payload: {
    status: 'PLAYING'
  }
})

export const setGlobalVoiceOverStopped = () => ({
  type: SET_GLOBAL_VOICE_OVER_STOPPED,
  payload: {
    status: 'STOPPED'
  }
})

export const setGlobalVoiceOverPaused = () => ({
  type: SET_GLOBAL_VOICE_OVER_PAUSED,
  payload: {
    status: 'PAUSED'
  }
})

export const setGlobalVoiceOverVolume = (volumeInteger: number) => ({
  type: SET_GLOBAL_VOICE_OVER_VOLUME,
  payload: {
    volume: volumeInteger
  }
});

export const setGlobalVoiceOverDuration = (durationSeconds: number | null) => ({
  type: SET_GLOBAL_VOICE_OVER_DURATION,
  payload: {
    duration: durationSeconds
  }
})

