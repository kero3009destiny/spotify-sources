import styled from 'styled-components';

import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { colors } from 'styles/variables';
import { Headline, Paragraph } from 'components/atoms';

export const Root = styled.div`
  background-color: ${props => props.backgroundColor || colors.white};
  padding-bottom: 6.4rem;
  padding-top: 4.8rem;

  ${minWidth.lg`
    padding-bottom: 16rem;
    padding-top: 11.2rem;
  `}
`;

export const Container = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

export const TopSection = styled.div`
  grid-column: span 12;
  margin-bottom: 5.6rem;

  ${minWidth.lg`
    grid-column: span 5;
    margin-bottom: 16rem;
  `}
`;

export const Code = styled(Headline).attrs({
  tag: 'h1',
  styling: 'h5',
})`
  color: ${props => props.color || colors.black};
  margin-bottom: 1.6rem;

  ${minWidth.lg`
    margin-bottom: 2.3rem;
  `}
`;

export const Description = styled(Paragraph)`
  color: ${props => props.color || colors.black};
`;

export const Message = styled(Headline).attrs({
  tag: 'h2',
  styling: 'Display1',
})`
  color: ${props => props.messageColor || colors.messageColor};
  letter-spacing: -0.24rem;

  ${minWidth.lg`
    letter-spacing: -1rem;
  `}
`;

export const BottomSection = styled.div`
  grid-column: span 12;
`;
