/**
 * @fileoverview
 *
 * FLOW:
 * 1. Download SDK to determine whether you're on a supported OS/Device.
 * @see PlayerContextProvider.handleSDKStartedLoading
 * 2. If supported, allow for authentication.
 * @see `src/components/card/playlistCard.tsx`
 *    3.1 If not supported, cards link out to Spotify's web player.
 * 3. User navigates out to spotify auth
 * 4. User comes back with a HashString containing accessToken & playlist ID.
 * @see PlayerContextProvider.checkForAccessToken
 * 5. GET playlist/{playlistID}
 * 6. Display playlist by setting activePlaylist.
 */

import React, { Component, createContext } from 'react';
import Script from 'react-load-script';
import {
  AUTHENTICATION,
  ERROR_MESSAGES,
  PLAYER_NAME,
  PRODUCT_PLANS,
  SDK_URL,
} from './constants/player';
import {
  authenticate,
  formatTrackTitle,
  getPlaylist,
  getUser,
  playPlaylist,
} from './utils/player';
import { getHashString, removeHashString } from './utils/hashString';
import { getQueryString, removeQueryString } from './utils/queryString';
import { sendTrackingEvent } from './utils/sendTrackingEvent';

type PlayerContextState = {
  /** Whether the Spotify API can be used from the current OS/device. Initially true */
  isCompatible?: boolean;
  /** The Spotify.Player instance. Initially null */
  player: Spotify.SpotifyPlayer;
  /** Unique identifier for the instance's initializer device. Initially '' */
  deviceId: string;
  /** Whether the user is on Spotify's Premium plan. Initially false. */
  premium: boolean;
  /** Access token returned from Spotify Implicit Grant Auth. Initially ''. */
  accessToken: string;

  /** Whether the user has successfully authenticated. */
  authenticated: boolean;
  /** Utility method to request authentication. */
  requestAuthentication: Function;
  /** The currently active playlist. */
  activePlaylist: SpotifyApi.PlaylistObjectFull;
  setActivePlaylist: Function;
  /**
   * ID of the chosen playlist. Initially null.
   * This ID is given to the auth endpoint so we know which playlist to open
   *    once the user returns to the site. It also helps with re-authentication
   *    if needed (caching || token expired).
   */
  requestedPlaylist: string;
  setRequestedPlaylist: Function;

  currentTrack: Spotify.Track;
  playTrack: Function;

  playing: boolean;
  setPlaying: Function;
  error: string;

  overlayOpen: boolean;
  setOverlayOpen: Function;
};

export const PlayerContext = createContext<PlayerContextState>({});

export class PlayerContextProvider extends Component<PlayerContextState, any> {
  state = {
    isCompatible: true,
    player: null,
    deviceId: '',
    premium: false,
    accessToken: '',

    authenticated: false,
    requestAuthentication: (
      forceReauthenticate = false,
      playlistID = this.state.requestedPlaylist
    ) => {
      authenticate(forceReauthenticate, playlistID);
    },
    activePlaylist: null,
    setActivePlaylist: async (playlistID: string) => {
      this.setState({ requestedPlaylist: playlistID });

      if (this.state.deviceId && this.state.activePlaylist?.id !== playlistID) {
        // If activePlaylist, remove it. For UI management.
        if (this.state.activePlaylist) {
          this.setState({ activePlaylist: null });
        }

        // If a track is playing, pause it.
        if (this.state.currentTrack && this.state.playing) {
          await this.state.setPlaying(false);
        }

        // Get the requested playlist.
        const activePlaylist = await getPlaylist(playlistID);

        this.setState({ activePlaylist }, () => {
          sendTrackingEvent('listen', 'playlist', activePlaylist.name);
          // Play the first track.
          this.state.playTrack(0);
        });
      }
    },
    requestedPlaylist: '',
    setRequestedPlaylist: async (requestedPlaylist: string) => {
      if (requestedPlaylist === this.state.requestedPlaylist) return;
      this.setState({ requestedPlaylist });
    },

    currentTrack: null,
    playTrack: async (trackIndex = 0) => {
      const { accessToken, deviceId, activePlaylist } = this.state;
      await playPlaylist(accessToken, activePlaylist.uri, deviceId, trackIndex);
    },

    overlayOpen: false,
    setOverlayOpen: (overlayOpen: boolean) => this.setState({ overlayOpen }),

    playing: false,
    setPlaying: async (shouldPlay: boolean) => {
      if (this.state.currentTrack) {
        const player = (this.state.player as unknown) as Spotify.SpotifyPlayer;
        shouldPlay ? await player.resume() : await player.pause();
        sendTrackingEvent('listen', shouldPlay ? 'play' : 'pause');
        this.setState({ playing: shouldPlay });
        return true;
      }
    },

    error: '',
    setError: (error: Spotify.Error) => this.setState({ error: error.message }),
  };

  componentDidMount() {
    this.checkForAccessToken();
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<PlayerContextState>
  ) {
    const { error } = this.state;
    /** If an error occurred, don't check for updates, pause the music. */
    if (error && prevState.error !== error) this.state.setPlaying(false);
  }

  componentWillUnmount() {
    this.dispose();
  }

  checkForAccessToken = () => {
    const error = getQueryString('error');
    const userDeniedPermission = error === AUTHENTICATION.RESPONSE_DENIED;

    if (userDeniedPermission) {
      const errorMessage = ERROR_MESSAGES.USER_DENIED_AUTH;
      this.setState(
        { overlayOpen: true, error: errorMessage },
        removeQueryString
      );
    } else {
      const hash = getHashString();
      if (hash.access_token && hash.token_type === 'Bearer') {
        const playlistID = hash.state;

        this.setState(
          {
            accessToken: hash.access_token,
            overlayOpen: true,
          },
          () => {
            removeHashString();
            if (playlistID) this.state.setActivePlaylist(playlistID);
          }
        );
      }
    }
  };

  handlePlayerStateChange = (state: Spotify.PlaybackState) => {
    if (state) {
      const playing = !state.paused;
      const currentTrack = state.track_window.current_track;

      const playingChanged = playing !== this.state.playing;
      const trackChanged = currentTrack?.id !== this.state.currentTrack?.id;

      if (playingChanged || trackChanged) {
        this.setState({ playing, currentTrack }, () => {
          if (this.state.currentTrack) {
            if (playingChanged) {
              const label = formatTrackTitle(this.state.currentTrack);
              sendTrackingEvent(
                'listen',
                'controls',
                `${playing ? 'play' : 'pause'} - ${label}`
              );
            }

            if (trackChanged) {
              const label = formatTrackTitle(this.state.currentTrack);
              sendTrackingEvent('listen', 'track changed', label);
            }
          }
        });
      }
    }
  };

  handleReady = async (event: Spotify.WebPlaybackInstance) => {
    if (!this.state.deviceId) {
      /** Get the user's profile to detect whether we can use Premium features. */
      const user = await getUser(this.state.accessToken);
      const premium = user.product === PRODUCT_PLANS.PREMIUM;
      const deviceId = event.device_id;

      sendTrackingEvent('listen', 'authenticated');
      sendTrackingEvent('listen', `${premium ? 'premium' : 'free'}`, undefined);

      this.setState({ authenticated: true, deviceId, premium }, () => {
        if (this.state.requestedPlaylist) {
          this.state.setActivePlaylist(this.state.requestedPlaylist);
        }
      });
    }
  };

  handleNotReady = () => {
    sendTrackingEvent('listen', 'device disconnected');
    this.setState({ error: ERROR_MESSAGES.CHANGED_NETWORK });
  };

  handleSDKStartedLoading = () => {
    window.onSpotifyWebPlaybackSDKReady = this.handleSDKLoaded;
  };

  handleSDKLoaded = () => {
    if (window.Spotify?.Player && !this.state.player) {
      const player = new window.Spotify.Player({
        name: PLAYER_NAME,
        getOAuthToken: cb => cb(this.state.accessToken),
        volume: 0.5,
      });

      this.setState({ player }, () => {
        const player = (this.state.player as unknown) as Spotify.SpotifyPlayer;

        player.addListener('initialization_error', error => {
          this.dispose();
          sendTrackingEvent('listen', 'unsupported environment');
          this.setState({
            isCompatible: false,
            error: error.message,
          });
        });

        if (this.state.accessToken) this.addEventListeners(player);

        player.connect();
      });
    } else {
      this.setState({ error: ERROR_MESSAGES.CATCH_ALL });
    }
  };

  handleKeydown = (event: KeyboardEvent) => {
    if (
      event.key === ' ' &&
      this.state.activePlaylist &&
      this.state.currentTrack
    ) {
      event.preventDefault();
      this.state.setPlaying(!this.state.playing);
    }
  };

  /** ERROR MANAGEMENT */

  handleAuthenticationError = (error: Spotify.Error) => {
    if (!this.state.accessToken) {
      /**
       * If there is no accessToken present, force re-authentication.
       * The user's token either timed out or there is caching stuff going on.
       */
      authenticate(true, this.state.requestedPlaylist);
    } else {
      this.setState({ error: error.message });
    }
  };

  addEventListeners = (player: Spotify.SpotifyPlayer) => {
    const { setError } = this.state;
    player.addListener('authentication_error', this.handleAuthenticationError);
    player.addListener('account_error', setError);
    player.addListener('playback_error', setError);
    player.addListener('player_state_changed', this.handlePlayerStateChange);
    player.addListener('ready', this.handleReady);
    player.addListener('not_ready', this.handleNotReady);
    window.addEventListener('keydown', this.handleKeydown);
  };

  removeEventListeners = (player: Spotify.SpotifyPlayer) => {
    const { setError } = this.state;
    player.removeListener(
      'authentication_error',
      this.handleAuthenticationError
    );
    player.removeListener('account_error', setError);
    player.removeListener('playback_error', setError);
    player.removeListener('player_state_changed', this.handlePlayerStateChange);
    player.removeListener('ready', this.handleReady);
    player.removeListener('not_ready', this.handleNotReady);
    window.removeEventListener('keydown', this.handleKeydown);
  };

  dispose = () => {
    if (this.state.player) {
      const player = (this.state.player as unknown) as Spotify.SpotifyPlayer;
      this.removeEventListeners(player);
      player.disconnect();
    }
  };

  render() {
    const { children } = this.props;

    return (
      <PlayerContext.Provider value={this.state}>
        {children}

        <Script
          url={SDK_URL}
          onCreate={this.handleSDKStartedLoading}
          onError={(error: string) => this.setState({ error })}
          attributes={{ defer: '', async: '' }}
        />
      </PlayerContext.Provider>
    );
  }
}
