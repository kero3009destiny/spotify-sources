// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';

import { gray20, cssColorValue } from '@spotify-internal/encore-web';
import {
  CARD_ASPECT_RATIO,
  CARD_BORDER_RADIUS,
  CARD_PADDING,
  DEFAULT_CARD_WIDTH,
} from '../../lib/constants';

const BlankWrapper = styled.div`
  position: relative;
  user-select: none;
`;
const BlankImage = styled.div`
  align-items: center;
  background-color: ${gray20};
  border-radius: ${CARD_BORDER_RADIUS}px;
  color: ${cssColorValue('textSubdued')};
  display: inline-flex;
  height: ${DEFAULT_CARD_WIDTH / CARD_ASPECT_RATIO}px;
  padding: ${CARD_PADDING}px;
  vertical-align: bottom;
  width: ${DEFAULT_CARD_WIDTH}px;
`;

export function EmptyCard() {
  return (
    <BlankWrapper>
      <BlankImage />
    </BlankWrapper>
  );
}
