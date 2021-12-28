import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { PlayerContext } from '../../../common/context.player';
import { spotifyDeeplinkToURL } from '../../../common/utils/player';
import { IconPause, IconPlay } from '../../utilities/ui-icons';
import { PlayerMusicBar } from '../player-music-bar';
import { MusicEntryArtwork } from './artwork';
import { Artists } from './artists';
import style from './style.module.css';

interface Props {
  /** Spotify track URI. */
  uri: string;
  /** Song name. */
  title: string;
  /** Song artists. */
  artists: Spotify.Artist[];
  /** Artwork metadata. */
  album: Spotify.Album;
  /** Whether the user is on Spotify's paid plan. */
  premium?: boolean;
  /** Whether the song is currently active. */
  active?: boolean;
  /** Whether the song is actively playing. */
  playing?: boolean;
  /** Handler for when the play/pause button is interacted with. */
  onPlayPause?: Function;
  className?: string;
}

export const PlayerMusicEntry = ({
  uri,
  title,
  artists,
  album,
  premium,
  active,
  playing,
  onPlayPause,
  className,
}: Props) => {
  const { player } = useContext(PlayerContext);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rAF = useRef<number>(null);
  const activeClass = active ? style.active : undefined;

  const handlePlayPause = useCallback(
    (uri: string) => {
      if (onPlayPause) onPlayPause(uri);
    },
    [onPlayPause, premium]
  );

  useEffect(() => {
    const progressBar = progressBarRef.current;
    const shouldLoop = player && active && playing && progressBar;
    async function loop() {
      const state = await player.getCurrentState();

      /** State may not be defined if playing a track from a different device. */
      if (state) {
        const { position, duration } = state;
        const progress = position / duration;
        const transform = `translate3d(${-100 + progress * 100}%, 0, 0)`;
        if (progressBar) progressBar.style.transform = transform;
        if (shouldLoop) rAF.current = requestAnimationFrame(loop);
      }
    }

    if (shouldLoop) loop();

    return () => {
      if (rAF.current) cancelAnimationFrame(rAF.current);
    };
  }, [playing, player, active, rAF, progressBarRef]);

  return (
    <div className={`${style.musicEntry} ${activeClass} ${className}`}>
      <MusicEntryArtwork album={album} className={style.artwork} />

      <div>
        <h3 title={title} className={`t-heading-2 ${style.title}`}>
          {title}
        </h3>
        <Artists artists={artists} className={`t-subhead-2 ${style.artist}`} />
        {active && (
          <PlayerMusicBar ref={progressBarRef} className={style.track} />
        )}
      </div>

      {premium ? (
        <button
          type="button"
          aria-label={playing ? 'pause current track' : `play ${title}`}
          className={style.playPause}
          onClick={() => handlePlayPause(uri)}
        >
          <div className={style.playPauseTrigger}>
            {playing ? <IconPause /> : <IconPlay />}
          </div>
        </button>
      ) : (
        <a
          href={spotifyDeeplinkToURL(uri)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`play ${title}`}
          className={style.playPause}
        >
          <IconPlay />
        </a>
      )}
    </div>
  );
};

PlayerMusicEntry.defaultProps = {
  className: '',
  onPlayPause: () => undefined,
};
