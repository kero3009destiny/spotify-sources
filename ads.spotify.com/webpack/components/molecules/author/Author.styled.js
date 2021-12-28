import styled from 'styled-components';

import { Paragraph } from 'components/atoms/paragraph';
import { fontWeights } from 'styles/variables';

export const Container = styled(Paragraph)`
  display: flex;
  flex-direction: column;
`;

export const Info = styled.span`
  font-weight: ${fontWeights.black};
  letter-spacing: -0.05rem;
`;
