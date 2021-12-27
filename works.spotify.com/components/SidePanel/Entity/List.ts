import styled from 'styled-components';
import { gray20, spacer24 } from '@spotify-internal/encore-web';

export const EntityList = styled.ul`
  padding-bottom: 0;
  margin-right: ${spacer24};
  margin-left: ${spacer24};

  &:not(:first-child) {
    border-top: 1px solid ${gray20};
  }
`;
