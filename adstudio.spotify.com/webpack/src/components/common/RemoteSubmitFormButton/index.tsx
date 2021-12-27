import React, { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { document } from 'global';

import { ButtonPrimary } from '@spotify-internal/encore-web';

export interface RemoteSubmitFormButtonProps {
  htmlFormElementId: string;
  children?: ReactNode;
  className?: string;
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const RemoteSubmitFormButton: FunctionComponent<RemoteSubmitFormButtonProps &
  ComponentProps<typeof ButtonPrimary>> = ({
  htmlFormElementId,
  className,
  onClick,
  children,
  ...rest
}) => {
  return (
    <ButtonPrimary
      type="submit"
      className={className}
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        // Grab the form through the DOM and submit
        // { cancelable: true } required for Firefox
        // https://github.com/facebook/react/issues/12639#issuecomment-382519193
        document
          .getElementById(htmlFormElementId)!
          .dispatchEvent(new Event('submit', { cancelable: true }));
        if (onClick) onClick(e);
      }}
      {...rest}
      buttonLegacy
    >
      {children}
    </ButtonPrimary>
  );
};

export default RemoteSubmitFormButton;
