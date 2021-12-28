import React, { MouseEventHandler } from 'react';
import style from './controls.module.css';

interface Props {
  onClick?: MouseEventHandler;
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
}

export const Controls = ({ onClick, children, label, disabled }: Props) => {
  return (
    <button
      type="button"
      aria-label={label}
      className={style.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}

      <span aria-hidden="true" className={`t-ui-4 ${style.label}`}>
        {label}
      </span>
    </button>
  );
};

Controls.defaultProps = {
  onClick: () => undefined,
};
