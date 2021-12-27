import styled from 'styled-components';
import {
  gray70,
  gray20,
  screenXsMax,
  screenSmMin,
  spacer24,
  spacer20,
  spacer12,
  white,
} from '@spotify-internal/encore-web';

export const UserControlsToggle = styled.button`
  background-color: transparent;
  border: 0;
  color: inherit;
  line-height: 1;
  letter-spacing: inherit;
  padding: 0;

  &:focus {
    outline: 0;
  }

  color: ${gray70};
  padding-left: ${spacer24};
  padding-right: ${spacer24};
  width: 100%;
  position: relative;
  height: 80px;
  flex-shrink: 0;

  @media (max-width: ${screenXsMax}) {
    padding-top: ${spacer12};
    padding-bottom: ${spacer12};
  }

  @media (min-width: ${screenSmMin}) {
    padding-top: ${spacer20};
    padding-bottom: ${spacer20};
  }

  &:hover,
  &:focus {
    color: ${white};
    background: ${gray20};
    /** Force overrides the 1px borders above/below */
    box-shadow: 0 1px 0 0 ${gray20}, 0 -1px 0 0 ${gray20};
    z-index: 1;
  }
`;
