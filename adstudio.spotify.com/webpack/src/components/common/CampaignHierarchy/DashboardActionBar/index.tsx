import React, { forwardRef } from 'react';
import Draggable from 'react-draggable';

import {
  addColorSet,
  IconX,
  semanticColors,
} from '@spotify-internal/encore-web';

import {
  ActionBarContainer,
  ActionButtonContainer,
  CloseButton,
} from './styles';

import {
  DASHBOARD_ACTION_BAR_CLOSE_TEST_ID,
  DASHBOARD_ACTION_BAR_CONTAINER_TEST_ID,
} from './constants';

export interface DashboardActionBarProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const DashboardActionBar = forwardRef<
  HTMLDivElement,
  DashboardActionBarProps
>(({ onClose, children }: DashboardActionBarProps, ref) => {
  return (
    <Draggable>
      <ActionBarContainer
        ref={ref}
        data-test={DASHBOARD_ACTION_BAR_CONTAINER_TEST_ID}
        className={addColorSet('invertedDark')}
      >
        <ActionButtonContainer>{children}</ActionButtonContainer>
        <CloseButton
          data-test={DASHBOARD_ACTION_BAR_CLOSE_TEST_ID}
          onClick={onClose}
        >
          <IconX semanticColor={semanticColors.textBase} />
        </CloseButton>
      </ActionBarContainer>
    </Draggable>
  );
});
