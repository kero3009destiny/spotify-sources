import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { AppContext } from '../../../common/context.app';
import { PlayerContext } from '../../../common/context.player';
import { CLASSNAME_NO_SCROLL } from '../../../common/constants';
import { canReAuthenticate } from '../../../common/utils/player';

import { Overlay } from '../../utilities/overlay';
import { PlayerOverlayHeader } from '../player-overlay-header';
import { Authentication } from '../player-views/authentication';
import { LoadingPlaylist } from '../player-views/loading-playlist';
import { Error } from '../player-views/error';
import { PlayerPlaylist } from '../player-playlist';
import { PlayerCurrentPlaylist } from '../player-current-playlist';
import { PlayerOverlayContainer } from './container';

import style from './style.module.css';

const TIMEOUT = 320;
const AUTH_TIMEOUT = 1500;

export const PlayerOverlay = () => {
  const { prefersReducedMotion } = useContext(AppContext);
  const {
    authenticated,
    accessToken,
    error,
    activePlaylist,
    overlayOpen,
    setOverlayOpen,
    requestAuthentication,
    currentTrack,
  } = useContext(PlayerContext);
  const [playlistHeaderRevealed, setPlaylistHeaderRevealed] = useState(true);
  const [showUI, setShowUI] = useState(false);
  const animationTimeoutRef = useRef<number>(null);
  const authenticationTimeoutRef = useRef<number>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const showAuth = showUI && !authenticated && !error && !accessToken;
  const showError = showUI && !!error;

  const showPlaylistLoading =
    showUI && accessToken && !error && !activePlaylist;
  const showPlaylist = showUI && activePlaylist && !error;
  const showingPlaylistClass = showPlaylist ? style.headerBackground : '';
  const revealClass = overlayOpen ? style.reveal : '';

  const handleClose = useCallback(() => {
    if (setOverlayOpen) setOverlayOpen(false);
  }, [setOverlayOpen]);

  const delayAuthentication = () => {
    if (authenticationTimeoutRef.current) {
      window.clearTimeout(authenticationTimeoutRef.current);
    }

    if (showAuth) {
      (authenticationTimeoutRef as React.MutableRefObject<
        number
      >).current = window.setTimeout(requestAuthentication, AUTH_TIMEOUT);
    }
  };
  useEffect(delayAuthentication, [authenticated, accessToken, error, showUI]);

  /** Delay the UI from showing until the overlay is part animated in. */
  const delayUIFromShowing = () => {
    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    if (overlayOpen) {
      if (prefersReducedMotion) {
        setShowUI(true);
      } else {
        (animationTimeoutRef as React.MutableRefObject<
          number
        >).current = window.setTimeout(() => setShowUI(true), TIMEOUT);
      }
    } else {
      setShowUI(false);
    }

    return () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
      }
    };
  };
  useEffect(delayUIFromShowing, [overlayOpen, setShowUI]);

  useLayoutEffect(() => {
    if (showPlaylist && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [scrollContainerRef, showPlaylist]);

  useLayoutEffect(() => {
    if (overlayOpen) {
      document.body.classList.add(CLASSNAME_NO_SCROLL);
    } else {
      document.body.classList.remove(CLASSNAME_NO_SCROLL);
    }

    return () => document.body.classList.remove(CLASSNAME_NO_SCROLL);
  }, [overlayOpen]);

  const handlePlaylistHeaderRevealed = useCallback(
    (revealed: boolean) => {
      if (revealed !== playlistHeaderRevealed) {
        setPlaylistHeaderRevealed(revealed);
      }
    },
    [setPlaylistHeaderRevealed, playlistHeaderRevealed]
  );

  return (
    <Overlay
      fullscreen
      backdrop
      aboveNav
      open={overlayOpen}
      contentClass={style.overlay}
      onClose={handleClose}
    >
      <PlayerOverlayContainer
        show={overlayOpen}
        className={`${style.overlayContainer} ${revealClass}`}
      >
        <PlayerOverlayHeader
          revealed={showUI}
          onClose={handleClose}
          className={`${style.contentContainer} ${style.header} ${showingPlaylistClass}`}
        >
          <PlayerCurrentPlaylist
            show={showPlaylist}
            hasTrack={showPlaylist && !!currentTrack}
            label={
              playlistHeaderRevealed ? 'Now Playing' : activePlaylist?.name
            }
            linkOut={
              playlistHeaderRevealed
                ? undefined
                : activePlaylist?.external_urls?.spotify
            }
          />
        </PlayerOverlayHeader>

        <div className={`${style.viewWrapper}`} ref={scrollContainerRef}>
          <PlayerPlaylist
            show={showPlaylist}
            entries={activePlaylist?.tracks?.items}
            containerClass={style.contentContainer}
            scrollContainer={scrollContainerRef.current || undefined}
            headerRevealed={handlePlaylistHeaderRevealed}
          />
          <LoadingPlaylist show={showPlaylistLoading} className={style.view} />
          <Authentication show={showAuth} className={style.view} />
          <Error
            show={showError}
            message={error}
            canRetry={canReAuthenticate(error)}
            onRetry={() => requestAuthentication(true)}
            className={style.view}
          />
        </div>
      </PlayerOverlayContainer>
    </Overlay>
  );
};
