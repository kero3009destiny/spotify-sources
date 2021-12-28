import styled from 'styled-components';

import { columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

export const Entry = styled.div`
  display: block;
  margin-bottom: 4.8rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: repeat(12, 1fr);
    margin-bottom: 8rem;
  `}
`;

export const ImageContainer = styled.div`
  margin-bottom: 2.4rem;

  ${minWidth.lg`
    grid-column: span 6;
    margin-bottom: 0;
  `}
`;

export const Content = styled.div`
  ${minWidth.lg`
    grid-column: 7 / span 6;
  `}
`;

export const EyebrowContainer = styled.div`
  margin-bottom: 0.8rem;

  ${minWidth.lg`
    margin-bottom: 1.6rem;
  `}
`;

export const HeadlineContainer = styled.div`
  margin-bottom: 1.6rem;

  ${minWidth.lg`
    margin-bottom: 3.2rem;
  `}
`;

export const ParagraphContainer = styled.div`
  margin-bottom: 3.2rem;

  ${minWidth.lg`
    margin-bottom: 4rem;
  `}
`;
