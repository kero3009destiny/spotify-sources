import styled from 'styled-components';
import { screenXsMax, screenSmMin, spacer20, spacer24, white } from '@spotify-internal/encore-web';

export const Header = styled.header`
  color: ${white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  flex-wrap: wrap;

  @media (max-width: ${screenXsMax}) {
    padding: ${spacer20} ${spacer24};
  }

  @media (min-width: ${screenSmMin}) {
    /** Force a height so the artist list overflows correctly at any viewport height */
    height: 76px;
    margin: 2px ${spacer24} 0;
  }
`;
