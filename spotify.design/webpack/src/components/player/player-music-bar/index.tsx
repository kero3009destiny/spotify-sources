import React, { forwardRef } from 'react';
import style from './style.module.css';

interface Props {
  className?: string;
}

export const PlayerMusicBar = forwardRef((props: Props, ref) => {
  return (
    <div className={`${style.track} ${props.className}`}>
      <div className={style.bar} ref={ref} />
    </div>
  );
});

PlayerMusicBar.displayName = 'player-music-bar';

PlayerMusicBar.defaultProps = {
  className: '',
};
