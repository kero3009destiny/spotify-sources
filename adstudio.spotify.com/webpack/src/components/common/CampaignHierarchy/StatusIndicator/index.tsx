import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { gray85 } from '@spotify-internal/encore-foundation';
import {
  StatusIndicator as EncoreStatusIndicator,
  Type,
} from '@spotify-internal/encore-web';

import { EntityState, getStatusText, STATUS_COLOR_MAP } from './constants';

export interface StatusIndicatorProps {
  status: EntityState;
  variant?: typeof Type.body1 | typeof Type.body2;
  className?: string;
}

const Container = styled.div``;

export const StatusIndicator: FunctionComponent<StatusIndicatorProps> = ({
  status,
  className,
  variant,
}: StatusIndicatorProps) => {
  const statusText = getStatusText(status);
  const color = STATUS_COLOR_MAP[status] || gray85;
  const typeVariant = variant ? variant : Type.body1;

  return (
    <Container className={className}>
      <EncoreStatusIndicator color={color}>
        <Type variant={typeVariant}>{statusText}</Type>
      </EncoreStatusIndicator>
    </Container>
  );
};
