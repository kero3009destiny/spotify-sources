import React, { useCallback, useContext, useLayoutEffect, useRef } from 'react';
import { useTrail, animated } from 'react-spring';
import { AppContext } from '../../../common/context.app';
import { PlayerContext } from '../../../common/context.player';
import {
  getTrackFromPlaylist,
  isSameTrack,
} from '../../../common/utils/player';
import { InertElement } from '../../utilities/inert-element';
import { PlayerMusicEntry } from '../player-music-entry';
import { PlayerPlaylistHeader } from '../player-playlist-header';
import style from './style.module.css';

interface Props {
  show?: boolean;
  entries: SpotifyApi.PlaylistTrackObject[];
  containerClass: string;
  scrollContainer?: HTMLDivElement;
  headerRevealed: Function;
}

export const PlayerPlaylist = ({
  entries,
  show,
  containerClass,
  scrollContainer,
  headerRevealed,
}: Props) => {
  const { prefersReducedMotion } = useContext(AppContext);
  const {
    currentTrack,
    playTrack,
    playing,
    setPlaying,
    activePlaylist,
    premium,
  } = useContext(PlayerContext);
  const activeClass = show ? style.show : '';
  const headerRef = useRef<Element>(null);
  const headerHeightRef = useRef<number>(null);

  const resetAnimation =
    !prefersReducedMotion && show && premium && !currentTrack;
  const maxToAnimate = (entries?.length || 0) + 1;
  const animation = useTrail(maxToAnimate, {
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 32 },
    reset: resetAnimation,
    reverse: !show,
    immediate: prefersReducedMotion,
  });

  const handlePlayPause = useCallback(
    (index: number) => {
      const trackToPlay = getTrackFromPlaylist(activePlaylist, index);

      let shouldTogglePlay = false;
      if (currentTrack && trackToPlay) {
        shouldTogglePlay = isSameTrack(currentTrack, trackToPlay);
      }

      if (shouldTogglePlay) {
        setPlaying(!playing);
      } else {
        playTrack(index);
      }
    },
    [setPlaying, playing, playTrack, currentTrack]
  );

  const handleResize = useCallback(() => {
    const header = headerRef.current;

    if (header && scrollContainer) {
      (headerHeightRef as React.MutableRefObject<
        number
      >).current = header.getBoundingClientRect().height;
    }
  }, [headerRef, headerHeightRef, scrollContainer]);

  const handleScroll = useCallback(
    (event: Event) => {
      const header = headerRef.current;
      const headerHeight = headerHeightRef.current;

      if (header && headerHeight && headerRevealed) {
        const { scrollTop } = event.target as HTMLDivElement;
        headerRevealed(scrollTop < headerHeight - 100);
      }
    },
    [headerRef, headerHeightRef, headerRevealed]
  );

  useLayoutEffect(() => {
    const header = headerRef.current;

    if (scrollContainer && header) {
      window.addEventListener('resize', handleResize);
      scrollContainer.addEventListener('scroll', handleScroll);
      handleResize();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, scrollContainer, activePlaylist, headerRef]);

  return (
    <InertElement inert={!show}>
      {activePlaylist && (
        <div ref={headerRef}>
          <animated.div
            style={{
              opacity: animation[0].opacity,
              transform: animation[0].y.interpolate(
                y => `translate3d(0,${y}px,0)`
              ),
            }}
          >
            <PlayerPlaylistHeader
              className={containerClass}
              playlist={activePlaylist}
            />
          </animated.div>
        </div>
      )}
      <ul
        className={`unstyled-list ${style.playlist} ${containerClass} ${activeClass}`}
      >
        {entries?.map(({ track }: SpotifyApi.PlaylistTrackObject, i) => {
          const anim = animation[i + 1];

          // First track is active by default.
          let active = i === 0;
          // Unless a track is already playing.
          if (currentTrack) active = isSameTrack(currentTrack, track);

          return (
            <animated.li
              key={track.id}
              style={{
                opacity: anim.opacity,
                transform: anim.y.interpolate(y => `translate3d(0,${y}px,0)`),
              }}
            >
              <PlayerMusicEntry
                active={active}
                artists={track.artists}
                album={track.album}
                title={track.name}
                uri={track.uri}
                premium={premium}
                playing={active && playing}
                onPlayPause={() => handlePlayPause(i)}
              />
            </animated.li>
          );
        })}
      </ul>
    </InertElement>
  );
};
