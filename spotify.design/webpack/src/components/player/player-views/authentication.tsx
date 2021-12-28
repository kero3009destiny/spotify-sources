import React from 'react';
import { InertElement } from '../../utilities/inert-element';
import { IllustrationAuthentication } from '../player-illustrations/authentication';
import sharedStyle from './style.module.css';
import style from './authentication.module.css';

interface Props {
  className?: string;
  show?: boolean;
}

export const Authentication = ({ className, show }: Props) => {
  const showClass = show ? `${sharedStyle.show} ${style.show}` : '';

  return (
    <InertElement
      inert={!show}
      className={`${sharedStyle.view} ${className} ${showClass}`}
    >
      <div className={sharedStyle.container}>
        <IllustrationAuthentication className={style.illustration} />
        <span className="t-display-4">Authenticating</span>
      </div>
    </InertElement>
  );
};

Authentication.defaultProps = {
  className: '',
};
