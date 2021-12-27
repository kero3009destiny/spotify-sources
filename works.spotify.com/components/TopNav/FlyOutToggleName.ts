import styled from 'styled-components';
import { Type, breakpoint } from '@spotify-internal/encore-web';

export const FlyOutToggleName = styled(Type).attrs({
  variant: 'body2',
  weight: Type.bold,
})`
  overflow-y: hidden;
  /** The following max widths represent limiting the length of an artist name
  and due to centering nav items in the screenMd range we need to slightly
  shorten the overall length. */
  @media (max-width: ${breakpoint.screenXsMax}) {
    max-height: 38px;
  }
  @media (max-width: ${breakpoint.screenSmMax}) {
    max-width: 200px;
  }
  @media (min-width: ${breakpoint.screenSmMin}) {
    max-height: 58px;
  }
  @media (min-width: ${breakpoint.screenMdMin}) and (max-width: ${breakpoint.screenMdMax}) {
    max-width: 160px;
  }
  @media (min-width: ${breakpoint.screenLgMin}) {
    max-width: 200px;
  }
`;
