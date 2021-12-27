import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gray10, gray15, white, spacer24 } from '@spotify-internal/encore-web';

export const EntityLink = styled(Link)`
  color: inherit;
  padding: 14px ${spacer24};
  display: flex;
  align-items: center;
  position: relative;

  &:hover,
  &:focus {
    background-color: ${gray15};
    color: ${white};
    /** Force overrides the 1px borders above/below */
    box-shadow: 0 1px 0 0 ${gray10}, 0 -1px 0 0 ${gray10};
    outline: none;
    z-index: 1;
  }
`;
