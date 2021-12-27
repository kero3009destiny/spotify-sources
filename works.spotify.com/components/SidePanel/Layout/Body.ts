import styled from 'styled-components';
import { gray20, spacer24 } from '@spotify-internal/encore-web';

export const Body = styled.section`
  flex: 1;
  overflow: auto;
  position: relative;

  &::before {
    border-top: 1px solid ${gray20};
    width: calc(100% - (${spacer24} * 2));
    content: '';
    display: block;
    height: 1px;
    position: sticky;
    top: 0;
    left: ${spacer24};
    z-index: 1;
  }
`;
