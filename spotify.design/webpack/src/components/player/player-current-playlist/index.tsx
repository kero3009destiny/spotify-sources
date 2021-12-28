import React, { useContext } from 'react';
import { PlayerContext } from '../../../common/context.player';
import { PlayerEqualiser } from '../player-equaliser';
import style from './style.module.css';
import { sendTrackingEvent } from '../../../common/utils/sendTrackingEvent';

interface Props {
  hasTrack?: boolean;
  label?: string;
  show?: boolean;
  opensOverlay?: boolean;
  linkOut: string;
}

export const PlayerCurrentPlaylist = ({
  label,
  hasTrack,
  show,
  opensOverlay,
  linkOut,
}: Props) => {
  const { currentTrack, playing, setPlaying, setOverlayOpen } = useContext(
    PlayerContext
  );

  const showEqualiser = hasTrack;
  const revealClass = show ? style.show : '';

  return (
    <div className={`${style.playlist} ${revealClass}`}>
      <button
        type="button"
        tabIndex={currentTrack ? undefined : -1}
        aria-label={playing ? 'Pause current track' : 'Play current track'}
        className={`${style.equaliser} ${showEqualiser ? style.show : ''}`}
        onClick={() => setPlaying(!playing)}
      >
        <PlayerEqualiser active={playing} />
      </button>

      {opensOverlay && (
        <button
          type="button"
          className={style.mask}
          aria-label="Open playlist"
          onClick={() => {
            sendTrackingEvent('mini-player', 'click', label);
            setOverlayOpen(true);
          }}
        >
          {label && <span className={`t-ui-4 ${style.label}`}>{label}</span>}
        </button>
      )}

      {linkOut && !opensOverlay && (
        <a
          href={linkOut}
          rel="noopener noreferrer"
          target="_blank"
          className={style.mask}
        >
          {label && <span className={`t-ui-4 ${style.label}`}>{label}</span>}
        </a>
      )}

      {!linkOut && !opensOverlay && (
        <div className={style.mask}>
          {label && <span className={`t-ui-4 ${style.label}`}>{label}</span>}
        </div>
      )}
    </div>
  );
};

PlayerCurrentPlaylist.defaultProps = {
  show: true,
};
