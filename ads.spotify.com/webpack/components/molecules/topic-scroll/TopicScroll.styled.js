import styled from 'styled-components';

import {
  Headline,
  Paragraph,
  Eyebrow as EyebrowComponent,
  Cta as CtaComponent,
} from 'components/atoms';
import { colors } from 'styles/variables';
import { container, columnsGutter, gutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

export const getMarginEntry = (width, columnGap) =>
  (width - columnGap * 5) / 6 + columnGap * 2;

export const Root = styled.div`
  ${minWidth.lg`
     overflow: hidden;
  `}
`;

export const Container = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding-bottom: 8rem;
  padding-top: 8rem;

  ${minWidth.lg`
    padding-bottom: 36.8rem;
    padding-top: 20rem;
  `}
`;

export const Column = styled.div`
  grid-column: 1 / 13;

  ${minWidth.lg`
    grid-column: 4 / 12;
  `}
`;

export const ColumnRef = styled.div`
  ${minWidth.lg`
    grid-column: 4 / 10;
  `}
`;

export const Wrapper = styled.div`
  ${minWidth.lg`
    display: flex;
    position: relative;
  `}
`;

export const Entry = styled.div`
  padding-bottom: 4.8rem;

  &:last-child {
    padding-bottom: 0;
  }

  ${minWidth.lg`
    flex: ${({ width }) => `0 0 ${width}px`};
    margin-right: ${({ width }) =>
      `${getMarginEntry(width, gutter.lg) / 10}rem`};
    padding-bottom: 0;
  `}

  ${minWidth.xl`
    margin-right: ${({ width }) =>
      `${getMarginEntry(width, gutter.xl) / 10}rem`};
  `};
`;

export const Eyebrow = styled(EyebrowComponent)`
  ${({ textColor }) => textColor && `color: ${textColor};`}
  margin-bottom: 1.6rem;

  ${minWidth.lg`
    margin-bottom: 2.4rem;
  `}
`;

export const Title = styled(Headline).attrs({
  tag: 'h2',
  styling: 'h1',
})`
  color: ${({ headlineColor }) => headlineColor || colors.black};
`;

export const Description = styled(Paragraph)`
  ${({ textColor }) => textColor && `color: ${textColor};`}
  margin: 2.4rem auto;

  ${minWidth.lg`
    margin: 4rem auto;
  `}
`;

export const Cta = styled(CtaComponent).attrs({
  type: 'TextLink',
})`
  ${({ textColor }) => textColor && `color: ${textColor};`}
`;
