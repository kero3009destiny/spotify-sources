import React from 'react';
import style from './style.module.css';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Credits = ({ children, className }: Props) => (
  <div className={`sd-article-credits ${style.credits} ${className}`}>
    <h2 className={`t-heading-1 ${style.heading}`}>Credits</h2>
    {children}
  </div>
);

Credits.defaultProps = {
  className: '',
};

export const CreditsCondensed = ({ children, className }: Props) => (
  <div
    className={`sd-article-credits--condensed ${style.creditsCondensed} ${className}`}
  >
    {children}
  </div>
);

CreditsCondensed.defaultProps = {
  className: '',
};
