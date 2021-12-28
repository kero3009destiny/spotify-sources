import styled from 'styled-components';

import { colors } from 'styles/variables';

export const Container = styled.div`
  line-height: 2.4rem;

  & span,
  & a {
    color: ${colors.grey400};
    font-size: 1.6rem;
  }

  & a {
    color: ${colors.azure};
    text-decoration: none;

    &:hover {
      color: ${colors.azure};
      text-decoration: underline;
    }
  }
`;
