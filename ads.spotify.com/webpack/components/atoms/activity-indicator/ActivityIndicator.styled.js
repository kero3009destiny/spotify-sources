import styled, { css } from 'styled-components';

import { getModifierStyles } from 'utils/get-modifier-styles';
import { colors } from 'styles/variables';

const spinnerWidthHeight = 8;
const spinnerBorderWidth = 0.3;

export const MODIFIERS = {
  FULL_SCREEN: 'full-screen',
  INLINE: 'inline',
};

const ROOT_FULL_SCREEN = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SPINNER_WRAPPER_FULL_SCREEN = css`
  height: ${spinnerWidthHeight}rem;
  left: calc(50vw - (${spinnerWidthHeight / 2}rem));
  padding: 0 ${spinnerBorderWidth * 2}rem ${spinnerBorderWidth * 2}rem 0;
  top: calc(50vh - (${spinnerWidthHeight / 2}rem));
  width: ${spinnerWidthHeight}rem;
`;

const SPINNER_FULL_SCREEN = css`
  border: ${spinnerBorderWidth}rem solid ${colors.translucent25};
  border-radius: 50%;
  border-top-color: ${colors.advertisingLavender};
`;

const ROOT_INLINE = css`
  bottom: 0.3rem;
  display: inline;
  position: relative;
`;

const SPINNER_WRAPPER_INLINE = css`
  height: ${spinnerWidthHeight / 4}rem;
  width: ${spinnerWidthHeight / 4}rem;
`;

const SPINNER_INLINE = css`
  border: ${spinnerBorderWidth / 1.5}rem solid ${colors.translucent25};
  border-radius: 50%;
  border-top-color: ${colors.advertisingLavender};
`;

// Style modifier map
const STYLE_MAP = {
  Root: {
    [MODIFIERS.FULL_SCREEN]: ROOT_FULL_SCREEN,
    [MODIFIERS.INLINE]: ROOT_INLINE,
  },
  SpinnerWrapper: {
    [MODIFIERS.FULL_SCREEN]: SPINNER_WRAPPER_FULL_SCREEN,
    [MODIFIERS.INLINE]: SPINNER_WRAPPER_INLINE,
  },
  Spinner: {
    [MODIFIERS.FULL_SCREEN]: SPINNER_FULL_SCREEN,
    [MODIFIERS.INLINE]: SPINNER_INLINE,
  },
};

export const Root = styled.div`
  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Root)}
`;

export const SpinnerWrapper = styled.div`
  position: relative;
  display: inline-block;

  ${props =>
    props.modifier && getModifierStyles(props, STYLE_MAP.SpinnerWrapper)}
`;

export const Spinner = styled.div`
  animation: rotate 0.75s ease-in-out infinite;
  height: 100%;
  width: 100%;

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Spinner)}
`;
