import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import {
  spacer16,
  spacer8,
  spacer32,
  screenXsMax,
  white,
  KeyboardDetectionContext,
} from '@spotify-internal/encore-web';

type LinkProps = {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
  active?: string;
};

type LinkStyledProps = LinkProps & {
  active?: string;
  $isUsingKeyboard: boolean;
};

const getColor = (props: LinkStyledProps) => {
  if (props.active) {
    return 'rgba(255, 255, 255, 1)';
  }

  return 'rgba(255, 255, 255, 0.54)';
};

const LinkStyled = styled.span<LinkStyledProps>`
  color: ${(props) => getColor(props)};
  padding: ${spacer16};
  position: relative;
  display: block;

  @media (max-width: ${screenXsMax}) {
    margin-right: ${spacer8};
  }

  &:hover {
    color: rgba(255, 255, 255, 1);
  }

  &:focus {
    outline: 0;
  }

  ${(props) =>
    !props.active &&
    css`
      &:focus {
        color: rgba(255, 255, 255, 0.74);
      }

      &:active {
        color: rgba(255, 255, 255, 0.62);
      }
    `}
  /* encore web inspired ButtonTertiary focus state */
  ${({ $isUsingKeyboard }) =>
    $isUsingKeyboard &&
    css`
      &::after {
        content: '';
        display: block;
        position: absolute;
        pointer-events: none;
        border-bottom: 3px solid transparent;
        transition: border-color 200ms ease-in;
        width: calc(100% - ${spacer32});
      }
      &:focus::after {
        border-color: ${white};
      }
    `}
`;

export const NavLink = ({ children, title, onClick, active }: LinkProps) => {
  const { isUsingKeyboard } = useContext(KeyboardDetectionContext);
  return (
    <LinkStyled
      active={active}
      children={children}
      onClick={onClick}
      title={title}
      $isUsingKeyboard={isUsingKeyboard}
    />
  );
};
