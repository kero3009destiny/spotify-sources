import {
  LAST_ACTIVE_DEVICE_INFO_CHANGED,
  PLAYER_CONTEXT_PLAYER_STATE_CHANGED,
  TRACK_PROGRESS_CHANGED,
} from '../actions/types';
import Utils from '../../utils/Utils';

const initialState = {
  playerState: {
    artist: '',
    song: '',
    volume: 0,
    device: '',
    duration: 0,
    position: 0,
    paused: false,
    shuffle: false,
    repeatMode: 0,
  },
};

const artistFromState = (payload) => {
  if (Utils.exists(payload.track_window, payload.track_window.current_track, payload.track_window.current_track.artists)) {
    return payload.track_window.current_track.artists[0].name;
  }
  return '{Album missing}';
};

const songFromState = (payload) => {
  if (Utils.exists(payload.track_window, payload.track_window.current_track, payload.track_window.current_track)) {
    return payload.track_window.current_track.name;
  }
  return '{Song missing}';
};

const durationFromState = (state) => {
  if (Utils.exists(state.track_window, state.track_window.current_track, state.track_window.current_track)) {
    return state.track_window.current_track.duration_ms;
  }
  return '{Song missing}';
};

export default function(state = initialState, action) {
  const updatedPlayerState = { ...state.playerState};
  if (!Utils.exists(action.payload)) {
    updatedPlayerState.artist = '';
    updatedPlayerState.song = '';
    return {
      playerState: {
        ...updatedPlayerState,
      },
    };
  }
  switch (action.type) {
    case PLAYER_CONTEXT_PLAYER_STATE_CHANGED: {
      updatedPlayerState.artist = artistFromState(action.payload);
      updatedPlayerState.song = songFromState(action.payload);
      updatedPlayerState.duration = durationFromState(action.payload);
      updatedPlayerState.paused = action.payload.paused;
      updatedPlayerState.shuffle = action.payload.shuffle;
      updatedPlayerState.position = action.payload.position;
      updatedPlayerState.repeatMode = action.payload.repeat_mode;
      return {playerState: {
        ...updatedPlayerState,
      },
      };
    }
    case LAST_ACTIVE_DEVICE_INFO_CHANGED: {
      if (Utils.exists(action.payload)) {
        updatedPlayerState.device = action.payload.name;
        updatedPlayerState.volume = isNaN(action.payload.volume) ? 0 : action.payload.volume;
      }
      return {playerState: {
        ...updatedPlayerState,
      },
      };
    }
    case TRACK_PROGRESS_CHANGED: {
      updatedPlayerState.position = action.payload.position;
      return {playerState: {
        ...updatedPlayerState,
      },
      };
    }
    default:
      return state;
  }
}
