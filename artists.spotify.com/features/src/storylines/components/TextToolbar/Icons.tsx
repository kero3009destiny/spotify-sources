// ignore-string-externalization
import React from 'react';
import styled, { css } from 'styled-components';
import { white } from '@spotify-internal/encore-web';

import { TextAlignment, TextPosition } from '../../lib/types';
import { Icon } from './styles';

const IconContainer = styled(Icon)<{ inactive?: boolean }>`
  ${props =>
    props.inactive &&
    css`
      opacity: 0.3;

      &:hover {
        opacity: 0.7;
      }
    `}
`;

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
})<{ inactive?: boolean }>`
  fill: ${white};
`;

type IconTextPositionProps = {
  position: TextPosition;
  inactive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};
export function IconTextPosition({
  position,
  inactive,
  ...props
}: IconTextPositionProps) {
  return (
    <IconContainer {...props} inactive={inactive}>
      <Svg width="24" height="22" inactive={inactive}>
        <g fillRule="evenodd">
          {position === 'top' && (
            <path d="M0 0h24v2H0zM16.243 11H7.757L12 6.757zM11 11h2v11h-2z" />
          )}
          {position === 'bottom' && (
            <path d="M0 20h24v2H0zM7.757 11h8.486L12 15.243zM11 0h2v11h-2z" />
          )}
          {position === 'middle' && (
            <path d="M0 10h24v2H0zM7.757 0h8.486L12 4.243zM16.243 22H7.757L12 17.757z" />
          )}
        </g>
      </Svg>
    </IconContainer>
  );
}

type IconTextAlignProps = {
  align: TextAlignment;
  inactive?: boolean;
  onClick?: () => void;
};
export function IconTextAlign({
  align,
  inactive,
  ...props
}: IconTextAlignProps) {
  return (
    <IconContainer {...props} inactive={inactive}>
      <Svg width="24" height="18" inactive={inactive}>
        <g fillRule="evenodd">
          {align === 'left' && (
            <path d="M0 0h24v2H0zM0 8h12v2H0zM0 16h18v2H0z" />
          )}
          {align === 'center' && (
            <path d="M0 0h24v2H0zM6 8h12v2H6zM3 16h18v2H3z" />
          )}
          {align === 'right' && (
            <path d="M0 0h24v2H0zM12 8h12v2H12zM6 16h18v2H6z" />
          )}
        </g>
      </Svg>
    </IconContainer>
  );
}
