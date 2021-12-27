import styled from 'styled-components';
import { gray20, gray70, spacer20, spacer24, white } from '@spotify-internal/encore-web';

export const UserLink = styled.a`
  color: ${gray70};
  display: flex;
  width: 100%;
  align-items: center;
  padding: ${spacer20} ${spacer24};
  position: relative;
  background-color: transparent;
  border: none;

  svg {
    margin-left: 6px;
    margin-right: 6px;
  }

  &:hover,
  &:focus {
    color: ${white};
    background-color: ${gray20};
    /** Force overrides the 1px borders above/below */
    box-shadow: 0 1px 0 0 ${gray20}, 0 -1px 0 0 ${gray20};
    outline: none;
    z-index: 1;
  }
`;
