import React from 'react';
import style from './container.module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
}

export const PlayerOverlayContainer = ({
  children,
  className,
  show,
}: Props) => {
  const showClass = show ? style.show : '';
  return (
    <div className={`sd-grid ${className}`}>
      <div className={`theme-listen ${style.container} ${showClass}`}>
        {children}
      </div>
    </div>
  );
};

PlayerOverlayContainer.defaultProps = {
  className: '',
};
