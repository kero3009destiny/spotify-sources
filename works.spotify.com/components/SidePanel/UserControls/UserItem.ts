import styled from 'styled-components';
import { gray70, spacer24, spacer48, gray20 } from '@spotify-internal/encore-web';

export const UserItem = styled.li`
  color: ${gray70};
  position: relative;

  &::after {
    content: '';
    height: 1px;
    width: calc(100% - ${spacer48});
    background-color: ${gray20};
    position: absolute;
    top: 0;
    left: ${spacer24};
  }
`;
