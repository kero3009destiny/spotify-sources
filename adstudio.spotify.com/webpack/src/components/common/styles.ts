import styled, { css } from 'styled-components';

import {
  addColorSet,
  cssColorValue,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

export const translucentOverlay = css`
  background: rgba(250, 250, 250, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Centered = styled.div`
  display: grid;
  justify-content: center;
`;

export const BreakWord = styled(Type as TSFixMe)`
  word-break: break-word;
`;

export const formRadioOverrides = css`
  label {
    display: flex;
  }

  input:checked + label > span:first-of-type {
    background-color: ${cssColorValue(semanticColors.essentialBrightAccent)};
    &:before {
      background-color: ${cssColorValue(semanticColors.backgroundBase)};
    }
  }
`;

export const iconColorSet = (active: boolean) => {
  return active ? addColorSet('brightAccent') : addColorSet('base');
};
