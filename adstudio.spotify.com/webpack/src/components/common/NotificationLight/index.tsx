import React, { FunctionComponent, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { kleinBlue, white } from '@spotify-internal/encore-foundation';

export interface NotificationLightProps {
  className?: string;
  children: ReactNode;
  show?: boolean;
}

const RelativeContainer = styled.div`
  position: relative;
`;

const expandingLightAnimation = css`
  animation: expandingblip 2s linear 1;

  @keyframes expandingblip {
    0% {
      transform: scale(0);
    }
    33% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const radarPingAnimation = css`
  animation: radarping 2s linear 3;

  @keyframes radarping {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    33% {
      transform: scale(1);
      opacity: 0.5;
    }
    66% {
      transform: scale(3);
      opacity: 0.1;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
`;

const notificationLightAfter = css`
  :after {
    position: absolute;
    top: -2px;
    right: -2px;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid ${white};
    background-color: ${kleinBlue};
    ${expandingLightAnimation}
  }
`;

const notificationLightBefore = css`
  :before {
    position: absolute;
    top: -2px;
    right: 16px;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${kleinBlue};
    ${radarPingAnimation}
  }
`;

const NotificationLightContainer = styled.div<{ show: boolean }>`
  ${props => props.show && notificationLightBefore}
  ${props => props.show && notificationLightAfter}
`;

export const NotificationLight: FunctionComponent<NotificationLightProps> = ({
  className,
  children,
  show,
}) => {
  return (
    <RelativeContainer>
      <NotificationLightContainer
        className={className}
        show={show!}
        data-test={show ? 'notification-light-on' : 'notification-light-off'}
      >
        {children}
      </NotificationLightContainer>
    </RelativeContainer>
  );
};
