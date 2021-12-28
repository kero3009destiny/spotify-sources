// @ts-nocheck
// this is not preferred when using TS but as this is just an example, we are
// using it to avoid need to convert styles/media-queries to TS

import styled from 'styled-components';

import { colors, fontWeights } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import { Icon } from 'components/atoms/icon';

export const Label = styled.label`
  align-items: center;
  color: inherit;
  display: inline-block;
  position: relative;
`;

export const Span = styled.span`
  margin-right: 1rem;
`;

export const Dropdown = styled.select`
  appearance: none;
  background: transparent;
  border: none;
  color: inherit;
  filter: none;
  font-weight: inherit;
  max-width: 100%;
  overflow: hidden;
  padding-right: 3rem;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::-ms-expand {
    display: none;
  }

  // Override for firefox and edge
  option {
    color: ${colors.black};
    font-size: initial;
    font-weight: initial;
    letter-spacing: initial;
    line-height: initial;
  }
`;

export const DropdownAsInput = styled(Dropdown)`
  border-bottom: 0.1rem solid ${colors.grey400};
  border-radius: 0;
  font-size: 1.8rem;
  font-weight: ${fontWeights.normal};
  min-height: 3.3rem;
  ${minWidth.lg`
    min-height: 4.7rem;
  `}

  &:required:invalid {
    box-shadow: none;
    color: ${colors.grey400};
    opacity: 1;
    outline: none;
  }

  &:focus {
    border-color: ${colors.spotifyGreen};
    outline: none;
  }
`;

export const Caret = styled(Icon)`
  height: 100%;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;

  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }

  svg {
    position: absolute;
    right: 0;
  }
`;

export const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`;
