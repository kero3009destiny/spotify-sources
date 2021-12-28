import styled from 'styled-components';

import { fontWeights } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import { SocialIcons } from 'components/molecules/social-icons';

export const Container = styled.div`
  position: relative;
  margin-bottom: ${props => (props.withIntro ? '3.2rem' : 0)};

  ${minWidth.lg`
    grid-column: 1 / span 3;
    margin-bottom: 0;
    height: ${props => (props.withHeight ? 'auto' : 0)};
  `}
`;

export const Byline = styled.div`
  overflow-wrap: break-word; /* Fallback for safari */
  overflow-wrap: anywhere;
`;

export const PublishDate = styled.span`
  font-weight: ${fontWeights.black};
  letter-spacing: -0.05rem;
  margin-bottom: 3.2rem;

  ${minWidth.lg`
    margin-bottom: 4rem;
  `}
`;

export const Social = styled(SocialIcons)`
  &:not(:first-child) {
    margin-top: 3.2rem;
  }

  ${minWidth.lg`
    &:not(:first-child) {
      margin-top: 4rem;
    }
  `}
`;
