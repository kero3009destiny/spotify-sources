export const SET_GLOBAL_TRACK_URL = 'SET_GLOBAL_TRACK_URL';
export const SET_GLOBAL_TRACK_PLAYING = 'SET_GLOBAL_TRACK_PLAYING';
export const SET_GLOBAL_TRACK_STOPPED = 'SET_GLOBAL_TRACK_STOPPED';
export const SET_GLOBAL_TRACK_PAUSED = 'SET_GLOBAL_TRACK_PAUSED';
export const SET_GLOBAL_TRACK_VOLUME = 'SET_GLOBAL_TRACK_VOLUME';
export const SET_GLOBAL_TRACK_DURATION = 'SET_GLOBAL_TRACK_DURATION';

export const setGlobalTrackUrl = (url: string) => ({
  type: SET_GLOBAL_TRACK_URL,
  payload: {
    url
  }
})

export const setGlobalTrackPlaying = () => ({
  type: SET_GLOBAL_TRACK_PLAYING,
  payload: {
    status: 'PLAYING'
  }
})

export const setGlobalTrackStopped = () => ({
  type: SET_GLOBAL_TRACK_STOPPED,
  payload: {
    status: 'STOPPED'
  }
})

export const setGlobalTrackPaused = () => ({
  type: SET_GLOBAL_TRACK_PAUSED,
  payload: {
    status: 'PAUSED'
  }
})

export const setGlobalTrackVolume = (volumeInteger: number) => ({
  type: SET_GLOBAL_TRACK_VOLUME,
  payload: {
    volume: volumeInteger
  }
});

export const setGlobalTrackDuration = (durationSeconds: number) => ({
  type: SET_GLOBAL_TRACK_DURATION,
  payload: {
    duration: durationSeconds
  }
})

