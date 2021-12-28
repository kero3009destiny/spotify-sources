import styled from 'styled-components';

import {
  introTypographyXsToMd,
  introTypographyLgToXl,
} from 'components/molecules/intro/Intro.styled';
import { colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';

export const SuccessState = styled.div`
  background-color: ${colors.black};
  color: ${colors.white};
`;

export const Copy = styled.p`
  ${introTypographyXsToMd}

  margin-bottom: 3.2rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${minWidth.lg`
    ${introTypographyLgToXl}

    margin-bottom: 4rem;
  `}
`;
