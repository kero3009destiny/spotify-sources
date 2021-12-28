import React from 'react';
import { Overlay } from '../utilities/overlay';
import { Timezones } from '../page-footer/timezones';
import style from './navigation-overlay.module.css';

interface Props {
  open?: boolean;
  onClose?: Function;
  children: React.ReactNode;
  className?: string;
}

export const NavigationOverlay = ({ children, open, onClose }: Props) => {
  return (
    <Overlay
      fullscreen
      backdrop
      open={open}
      onClose={() => (onClose ? onClose() : () => undefined)}
    >
      <div className={`${style.inner} ${open ? style.open : ''}`}>
        <div className={style.background} />
        {children}

        <div className={`sd-container ${style.footer}`}>
          <div className={style.social}>
            <a
              href="https://www.instagram.com/spotify.design/"
              rel="noopener noreferrer"
              target="_blank"
              className="t-subhead-1"
            >
              Instagram
            </a>
            <a
              href="https://www.twitter.com/spotify.design/"
              rel="noopener noreferrer"
              target="_blank"
              className="t-subhead-1"
            >
              Twitter
            </a>
          </div>
          <Timezones className={style.timezones} />
        </div>
      </div>
    </Overlay>
  );
};
