import React from 'react';
import style from './style.module.css';

interface Props {
  position?: 'Left' | 'Right';
  children: React.ReactNode;
}

const POSITION = {
  LEFT: 'Left',
  RIGHT: 'Right',
};

export const AsideText = ({ position, children }: Props) => {
  let positionClass = 'sd-article-aside-text--';
  positionClass += position === POSITION.LEFT ? 'left' : 'right';

  return (
    <div className={`sd-article-aside-text ${positionClass} ${style.aside}`}>
      <span className="t-heading-1">{children}</span>
    </div>
  );
};

AsideText.defaultProps = {
  position: 'Left',
};
