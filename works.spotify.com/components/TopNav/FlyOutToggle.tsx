import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { breakpoint, spacer, color } from '@spotify-internal/encore-web';

import { UnstyledButton } from './UnstyledButton';

export const Trigger = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  text-align: left;
  height: 100%;
  margin-right: ${spacer.spacer12};
  padding-left: ${spacer.spacer20};
  padding-right: 28px;
  outline: none;
  color: ${color.white};
  z-index: 1; /** Forces the trigger to sit above the container for navigation list items */
  &:hover {
    background-color: ${color.gray15};
  }
  &:focus {
    background-color: ${color.gray20};
  }
  &:active {
    background-color: transparent;
  }
  @media (min-width: ${breakpoint.screenMdMin}) {
    position: absolute;
    left: 0;
  }
  @media (max-width: ${breakpoint.screenSmMax}) {
    margin-left: -${spacer.spacer20};
  }
`;

export function FlyOutToggle({
  children,
  onClick,
  sidePanelId,
  shouldShowSidePanel,
}: {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sidePanelId: string;
  shouldShowSidePanel: boolean;
}) {
  return (
    <Trigger aria-controls={sidePanelId} aria-expanded={shouldShowSidePanel} onClick={onClick}>
      {children}
    </Trigger>
  );
}
