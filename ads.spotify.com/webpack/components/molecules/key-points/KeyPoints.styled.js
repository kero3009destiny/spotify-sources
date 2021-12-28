import styled from 'styled-components';

import { columnsGutter, container } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { Cta as CtaComponent } from 'components/atoms';

import { multiple } from 'components/atoms/cta/Cta.styled';

export const KeyPoints = styled.div`
  ${container}

  margin-bottom: 8.5rem;
  margin-top: 4.1rem;

  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: repeat(12, 1fr);
    margin-bottom: 16rem;
    margin-top: 8rem;
  `}
`;

export const Content = styled.div`
  margin-bottom: 5.6rem;

  ${minWidth.lg`
    grid-column: 1 / span 5;
    margin-bottom: 0;
  `}
`;

export const HeadlineContainer = styled.div`
  margin-bottom: 1.6rem;

  ${minWidth.lg`
    margin-bottom: 2.4rem;
  `}
`;

export const ParagraphContainer = styled.div`
  margin-bottom: 3.25rem;

  ${minWidth.lg`
    margin-bottom: 4.8rem;
  `}
`;

export const Cta = styled(CtaComponent)`
  ${multiple};
`;

export const Body = styled.div`
  ${minWidth.lg`
    grid-column: 7 / span 6;
  `}
`;
