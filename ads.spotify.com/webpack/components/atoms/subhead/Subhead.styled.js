import styled from 'styled-components';

import { minWidth } from 'styles/media-queries';
import { Headline } from 'components/atoms';

export const Container = styled.div`
  position: relative;

  ${minWidth.lg`
    grid-column: 1 / span 3;
    height: ${({ withHeight }) => (withHeight ? 'auto' : 0)};
  `}
`;

export const Subhead = styled(Headline)`
  margin-bottom: ${props => (props.withIntro ? '3.2rem' : 0)};
  overflow-wrap: break-word; /* Fallback for safari */
  overflow-wrap: anywhere;

  ${minWidth.lg`
    margin-bottom: 0;
  `}
`;
