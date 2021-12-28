import React from 'react';
import { IconClose } from '../../utilities/ui-icons';
import style from './style.module.css';

interface Props {
  onClose: Function;
  revealed?: boolean;
  className?: string;
  children?: React.ReactNode;
}
export const PlayerOverlayHeader = ({
  className,
  onClose,
  revealed,
  children,
}: Props) => {
  const revealClass = revealed ? style.show : '';

  return (
    <div className={`${style.header} ${className} ${revealClass}`}>
      {children}

      <button
        type="button"
        className={style.close}
        onClick={() => onClose()}
        aria-label="Close"
      >
        <IconClose />
      </button>
    </div>
  );
};

PlayerOverlayHeader.defaultProps = {
  className: '',
};
