import styled, { css } from 'styled-components';
import { animations, colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';

// Basic states
const cta = css`
  border-radius: 5rem;
  border-style: solid;
  border-width: 0.1rem;
  cursor: pointer;
  display: inline-block;
  font-size: 1.4rem;
  height: 4rem;
  letter-spacing: 0.1rem;
  line-height: 1.6rem;
  padding: 1.2rem 2.4rem;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color ${animations.defaultTransition},
    border-color ${animations.defaultTransition},
    color ${animations.defaultTransition};

  ${props => (props.minWidth ? `min-width: ${props.minWidth}rem;` : '')}
`;

const ctaActiveState = css`
  border-color: ${colors.grey200};
  background-color: ${colors.grey200};
  color: ${colors.white};
`;

export const ctaHoverState = css`
  background-color: ${colors.grey300};
  border-color: ${colors.grey300};
  color: ${colors.white};
`;

export const textLinkHoverState = css`
  color: ${colors.grey400};
  text-decoration: none;
`;

// Styled Components
// Primary Cta gets the inverse treatment for dark theme
export const PrimaryCta = styled.a`
  ${cta}

  background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? colors.white : colors.black};
  border-color: ${({ isDarkTheme }) =>
    isDarkTheme ? colors.white : colors.black};
  color: ${({ isDarkTheme }) => (isDarkTheme ? colors.black : colors.white)};

  &:active {
    ${ctaActiveState}
  }

  &:hover {
    ${ctaHoverState}
  }

  &[disabled],
  &[aria-disabled='true'] {
    background-color: ${colors.grey700};
    border-color: ${colors.grey700};
    color: ${colors.grey300};
    pointer-events: none;
  }
`;

export const SecondaryCta = styled.a`
  ${cta}

  background-color: ${colors.white};
  border-color: ${colors.black};
  color: ${colors.black};

  &:active {
    ${ctaActiveState}
  }

  &:hover {
    ${ctaHoverState}
  }

  &[disabled],
  &[aria-disabled='true'] {
    background-color: ${colors.white};
    border-color: ${colors.grey400};
    color: ${colors.grey400};
    pointer-events: none;
  }
`;

export const Tertiary = styled.a`
  ${cta}

  background-color: transparent;
  border-color: ${props => (props.isDarkTheme ? colors.white : colors.black)};
  color: ${props => (props.isDarkTheme ? colors.white : colors.black)};

  &:active {
    background-color: ${props =>
      props.isDarkTheme ? colors.white : colors.black};
    border-color: ${props => (props.isDarkTheme ? colors.white : colors.black)};
    color: ${props => (props.isDarkTheme ? colors.grey200 : colors.grey600)};
  }

  &:hover {
    background-color: ${props =>
      props.isDarkTheme ? colors.white : colors.black};
    border-color: ${props => (props.isDarkTheme ? colors.white : colors.black)};
    color: ${props => (props.isDarkTheme ? colors.black : colors.white)};
  }

  &[disabled],
  &[aria-disabled='true'] {
    background-color: transparent;
    border-color: ${props => (props.isDarkTheme ? colors.white : colors.black)};
    color: ${props => (props.isDarkTheme ? colors.white : colors.black)};
    opacity: 0.7;
  }
`;

export const TextLink = styled.a`
  color: inherit;
  transition: color ${animations.defaultTransition},
    text-decoration ${animations.defaultTransition};
  text-decoration: underline;

  &:hover {
    ${textLinkHoverState}
  }

  &:active {
    color: ${colors.grey300};
    text-decoration: none;
  }

  &[disabled],
  &[aria-disabled='true'] {
    pointer-events: none;
  }
`;

export const WrapperLink = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const multiple = css`
  margin-bottom: 1.6rem;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  vertical-align: top;
  white-space: nowrap;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }

  ${minWidth.md`
    margin-right: 1.6rem;
    max-width: 40.8rem;
    width: auto;
  `}
`;
