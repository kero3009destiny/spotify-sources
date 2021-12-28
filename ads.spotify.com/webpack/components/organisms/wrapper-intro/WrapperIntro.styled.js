import styled from 'styled-components';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

export const Container = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: 1fr;
  margin: 4.8rem auto 4rem;

  ${minWidth.lg`
  grid-template-columns: repeat(12,1fr);
    margin: ${props =>
      props.withHeight || props.withIntro ? '9.6rem auto 8rem' : '0 auto'};
`}
`;
