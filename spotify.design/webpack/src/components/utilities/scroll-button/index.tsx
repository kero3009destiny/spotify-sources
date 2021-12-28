import React from 'react';
import style from './style.module.css';
import buttonStyle from '../../buttons/style.module.css';
import { scrollToDestination } from '../../../common/utils/scrollToElement';

interface Props {
  onClick?: Function;
  className?: string;
  children: React.ReactNode;
  label?: string;
  top: number;
}

export const ScrollButton = ({
  onClick,
  className,
  children,
  label,
  top,
}: Props) => {
  return (
    <button
      type="button"
      className={`hidden-without-js ${className}`}
      aria-label={label || 'Scroll Down'}
      onClick={() => {
        scrollToDestination(top);
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

ScrollButton.defaultProps = {
  ariaLabel: 'Scroll down',
};

export const StylizedScrollButton = ({
  onClick,
  className,
  children,
  label,
  top,
}: Props) => (
  <ScrollButton
    top={top}
    className={`${buttonStyle.buttonBig} ${className}`}
    label={label}
    onClick={onClick}
  >
    {label && <span className={`t-ui-4 ${style.label}`}>{label}</span>}
    <span className={buttonStyle.icon}>
      <div className={buttonStyle.background} />
      {children}
    </span>
  </ScrollButton>
);
