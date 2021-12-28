import React from 'react';
import style from './hamburger.module.css';

interface Props {
  active?: boolean;
  onClick?: Function;
}

export const Hamburger = ({ active, onClick }: Props) => (
  <button
    type="button"
    aria-pressed={active}
    aria-label={`${active ? 'Close' : 'Open'} navigation`}
    onClick={() => (onClick ? onClick() : () => undefined)}
    className={`hidden-without-js ${style.hamburger} ${
      active ? style.open : ''
    }`}
  >
    <span />
    <span />
    <span />
  </button>
);
