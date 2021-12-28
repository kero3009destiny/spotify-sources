import styled from 'styled-components';

import { Headline } from 'components/atoms';
import { colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import { columnsGutter, container } from 'styles/grid';
import { levels } from 'styles/z-index';

export const Container = styled.section`
  background-color: ${colors.black};
  position: relative;
  z-index: ${levels.base};
`;

export const Content = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding-top: 4.8rem;
  padding-bottom: 4.8rem;

  ${minWidth.lg`
    padding-top: 12rem;
    padding-bottom: 12rem;
  `}
`;

export const Title = styled(Headline)`
  color: ${colors.white};
  grid-column: span 12;

  ${minWidth.lg`
    grid-column: span 6;
  `}
`;

export const FormContainer = styled.div`
  grid-column: span 12;
  margin-top: 3.2rem;

  ${minWidth.lg`
    grid-column: 7 / span 5;
    margin-top: 0;
  `}
`;
