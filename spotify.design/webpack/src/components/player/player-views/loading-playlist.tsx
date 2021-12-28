import React from 'react';
import { InertElement } from '../../utilities/inert-element';
import { IllustrationMusic } from '../player-illustrations/music';
import sharedStyle from './style.module.css';
import style from './loading-playlist.module.css';

interface Props {
  className?: string;
  show?: boolean;
}

export const LoadingPlaylist = ({ className, show }: Props) => {
  const showClass = show ? `${sharedStyle.show} ${style.show}` : '';

  return (
    <InertElement
      inert={!show}
      className={`${sharedStyle.view} ${className} ${showClass}`}
    >
      <div className={sharedStyle.container}>
        <IllustrationMusic className={style.illustration} />
        <span className="t-display-4">Loading playlist</span>
      </div>
    </InertElement>
  );
};

LoadingPlaylist.defaultProps = {
  className: '',
};
