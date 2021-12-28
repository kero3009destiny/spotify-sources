import styled from 'styled-components';

import { CuratedList as CuratedListComponent } from 'components/organisms/curated-list';

import { minWidth } from 'styles/media-queries';

export const Container = styled.div``;

export const CuratedList = styled(CuratedListComponent)`
  padding-bottom: 2rem;
  padding-top: 2rem;

  &:first-child {
    padding-top: 6.4rem;
  }

  &:last-child {
    padding-bottom: 8rem;
  }

  ${minWidth.lg`
    padding-bottom: 4rem;
    padding-top: 4rem;

    &:first-child {
      padding-top: 11.2rem;
    }

    &:last-child {
      padding-bottom: 12rem;
    }
  `}
`;
