// ignore-string-externalization

import React from 'react';
import styled, { css } from 'styled-components';

import { gray20, gray50, cssColorValue } from '@spotify-internal/encore-web';

import { CardStyles } from '../Card';
import { CARD_PADDING, DEFAULT_CARD_WIDTH } from '../../lib/constants';

const EmptyCard = styled.div<{ entered?: boolean; width: number }>`
  ${CardStyles}
  align-items: center;
  background-color: ${gray20};
  color: ${cssColorValue('textSubdued')};
  display: flex;
  margin: 0 auto 52px;
  padding: ${CARD_PADDING}px;

  ${props =>
    props.entered &&
    css`
      background-color: rgba(255, 255, 255, 0.2);
      background-clip: border-box;
    `}
`;

type Props = {
  entered?: boolean;
  text?: string;
};

export function BlankCard({ entered, text }: Props) {
  return (
    <EmptyCard entered={entered} width={DEFAULT_CARD_WIDTH}>
      {text}
    </EmptyCard>
  );
}
