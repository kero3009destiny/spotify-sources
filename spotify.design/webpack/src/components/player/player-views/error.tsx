import React, { useCallback } from 'react';
import { InertElement } from '../../utilities/inert-element';
import sharedStyle from './style.module.css';
import style from './error.module.css';

interface Props {
  message: string;
  className?: string;
  show?: boolean;
  canRetry?: boolean;
  onRetry?: Function;
}

export const Error = ({
  className,
  show,
  message,
  canRetry,
  onRetry,
}: Props) => {
  const showClass = show ? sharedStyle.show : '';

  const handleRetry = useCallback(() => {
    if (onRetry) onRetry();
  }, [onRetry]);

  return (
    <InertElement
      inert={!show}
      className={`${sharedStyle.view} ${className} ${showClass}`}
    >
      <div className={`${sharedStyle.container} ${style.error}`}>
        <span className="t-heading-1">{message}</span>

        {canRetry && (
          <button className="t-ui-4" onClick={handleRetry}>
            Please try again
          </button>
        )}
      </div>
    </InertElement>
  );
};

Error.defaultProps = {
  className: '',
};
