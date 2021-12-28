import styled from 'styled-components';

import { Headline as HeadlineComponent } from 'components/atoms';
import { Stat } from 'components/molecules/stat';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

export const Root = styled.div`
  background-color: ${props => props.backgroundColor || 'transparent'};
  margin: 3.2rem auto;

  ${minWidth.lg`
    margin: 6.4rem auto;
  `}

  ${props =>
    props.backgroundColor
      ? `
      margin: 0 auto;
      padding-top: 8rem; padding-bottom: 8rem;`
      : ''}

  ${minWidth.lg`
    ${props =>
      props.backgroundColor
        ? `
      margin: 0 auto;
      padding-top: 16rem; padding-bottom: 16rem;`
        : ''}
  `}
`;

export const Stats = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const getStatGridColumn = numStats => {
  switch (numStats) {
    case 1:
      return 'span 8';
    case 2:
      return 'span 4';
    default:
      return 'span 3';
  }
};

export const StatList = styled.ul`
  ${columnsGutter}

  display: grid;
  grid-column: span 12;
  grid-template-columns: repeat(12, 1fr);
  grid-row-gap: 3.2rem;

  ${minWidth.md`
    grid-column: 1 / 13;
  `}

  ${minWidth.lg`
    grid-column: 4 / 12;
    grid-template-columns: ${props =>
      props.numStats < 3 ? 'repeat(8, 1fr)' : 'repeat(9, 1fr)'};
  `}
`;

export const StatListItem = styled(Stat)`
  grid-column: span 12;
  ${minWidth.md`
    grid-column: span ${props => (props.numStats < 3 ? 12 : 4)};
  `}
  ${minWidth.lg`
    grid-column: ${({ numStats }) => getStatGridColumn(numStats)}
  `}
`;

export const Headline = styled(HeadlineComponent).attrs({
  tag: 'h3',
  styling: 'h4',
})`
  grid-column: 1 / 13;
  margin-bottom: 3.2rem;

  ${props => (props.color ? `color: ${props.color};` : '')}
  ${minWidth.lg`
    grid-column: 4 / 12;
    margin-bottom: ${props => props.numStats < 3 && '6.4rem'};
  `}
`;
