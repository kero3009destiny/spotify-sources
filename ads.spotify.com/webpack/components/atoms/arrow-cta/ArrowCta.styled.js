import styled, { css } from 'styled-components';
import { animations, colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import CtaSVG from 'assets/svg/ctaArrow.svg';

// Basic states
const cta = css`
  cursor: pointer;
  display: inline-block;
  font-size: 2rem;
  line-height: 1.6rem;
  text-decoration: none;
  transition: background-color ${animations.defaultTransition},
    border-color ${animations.defaultTransition},
    color ${animations.defaultTransition}, fill ${animations.defaultTransition};

  ${props => (props.minWidth ? `min-width: ${props.minWidth}rem;` : '')}
`;

export const CtaArrow = styled(CtaSVG)`
  width: 50px;
  transform: translateY(1.525rem);
`;

const ctaActiveState = css`
  color: ${colors.grey400};
`;

export const ctaHoverState = css`
  color: ${colors.grey400};
  fill: ${colors.grey400};
`;

export const textLinkHoverState = css`
  color: ${colors.grey400};
  text-decoration: none;
`;

// Styled Components
// Primary Cta gets the inverse treatment for dark theme
export const PrimaryCta = styled.a`
  ${cta}

  text-decoration: underline;
  text-decoration-thickness: 0.05rem;
  color: ${props => (props.isDarkTheme ? colors.white : colors.black)};
  fill: ${props => (props.isDarkTheme ? colors.white : colors.black)};

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

  color: ${props => (props.isDarkTheme ? colors.white : colors.black)};
  fill: ${props => (props.isDarkTheme ? colors.white : colors.black)};
  text-decoration: underline;
  text-decoration-thickness: 0.05rem;

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

  color: ${props => (props.isDarkTheme ? colors.white : colors.black)};
  fill: ${props => (props.isDarkTheme ? colors.white : colors.black)};
  text-decoration: underline;
  text-decoration-thickness: 0.05rem;

  &:active {
    ${ctaActiveState}
  }

  &:hover {
    ${ctaHoverState}
  }

  &[disabled],
  &[aria-disabled='true'] {
    background-color: transparent;
    color: ${props => (props.isDarkTheme ? colors.white : colors.black)};
    opacity: 0.7;
  }
`;

export const TextLink = styled.a`
  color: inherit;
  transition: color ${animations.defaultTransition},
    text-decoration ${animations.defaultTransition};
  text-decoration: underline;
  text-decoration-thickness: 0.05rem;

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
  text-align: center;
  text-overflow: ellipsis;
  vertical-align: top;
  white-space: nowrap;
  width: fit-content;

  &:last-child {
    margin-bottom: 0;
  }

  ${minWidth.md`
    max-width: 40.8rem;
    width: auto;
  `}
`;
