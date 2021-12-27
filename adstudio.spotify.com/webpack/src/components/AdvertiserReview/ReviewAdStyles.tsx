import React from 'react';
import { Link } from 'react-router';
import styled, { css } from 'styled-components';

import { plum } from '@spotify-internal/encore-advertising-web/cjs/styles/colors';
import {
  gray10,
  semanticColors,
  spacer8,
  spacer16,
  spacer32,
  Type,
} from '@spotify-internal/encore-web';

export enum Variant {
  APPROVE_REVISE,
  APPROVE,
  REVIEW,
}

export const thumbnailSize = '68px';

export const ReviewAdRow = styled.div<{
  hideThumbnail?: boolean;
}>`
  ${({ hideThumbnail }) => {
    return css`
      width: 100%;
      display: flex;
      grid-gap: ${spacer32};
      align-items: center;
      justify-content: space-between;
      padding: ${spacer16} ${spacer16} ${spacer16} 0;

      > div:first-of-type {
        width: ${thumbnailSize};
      }

      > div:nth-of-type(2) {
        flex: 1;
      }

      > div:last-of-type {
        display: flex;
        grid-gap: ${spacer16};
        align-items: center;
        justify-content: flex-end;
        min-width: 130px;
      }

      ${hideThumbnail &&
        css`
          > div:first-of-type {
            display: none;
          }
        `}
    `;
  }}
`;

export const CreativeImageThumbnail = styled.img`
  width: ${thumbnailSize};
  height: ${thumbnailSize};
`;

export const CtaTextLink = styled(Link)`
  cursor: pointer;
  color: ${gray10};
  text-decoration: none;
  &:active,
  &:hover {
    color: ${props => props.theme.colors.primaryColor};
  }
`;

export const CenterColumnLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:active,
  &:hover {
    text-decoration: underline;
  }
`;

export const CenterColumnText = ({
  children,
  variant = Type.body3,
}: {
  children: any;
  variant?: typeof Type.body2 | typeof Type.body3;
}) => (
  <Type condensed variant={variant} semanticColor={semanticColors.textSubdued}>
    {children}
  </Type>
);

export const DocumentThumbnailDiv = styled.div`
  background: ${plum};
  border-radius: ${spacer8};
  text-align: center;
  width: ${thumbnailSize};
  height: ${thumbnailSize};
  padding-top: 16px;
`;
