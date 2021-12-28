import styled from 'styled-components';

import { Eyebrow, Headline, Cta as CtaComponent } from 'components/atoms';
import { Markdown as MarkdownComponent } from 'components/molecules/markdown';
import { ratioPercentage, colors, cssFragments } from 'styles/variables';
import { columnsGutter, container } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

import { multiple } from 'components/atoms/cta/Cta.styled';

// Styled components
export const InlineCard = styled.section`
  background-color: ${colors.grey800};
  color: ${colors.black};
  padding: 5.6rem 0;

  ${minWidth.lg`
    padding: 11.2rem 0;
  `}
`;

export const Container = styled.div`
  ${container}

  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: repeat(12, 1fr);

    ${props =>
      props.theme.hasImage &&
      `
      align-items: center;
    `}
  `}
`;

export const Image = styled.div.attrs(props => ({
  role: props.alt ? 'img' : 'presentation',
  'aria-label': props.alt,
}))`
  display: block;
  margin-bottom: 4rem;
  overflow: hidden;
  padding-top: ${ratioPercentage.fourThree}%;
  position: relative;

  &::before {
    ${cssFragments.backgroundScaledImage}

    background-position: 50% center;
    background-repeat: no-repeat;
    background-size: cover;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  ${minWidth.lg`
    grid-column: 4 / span 3;
    margin-bottom: 0;
  `}
`;

export const Content = styled.div`
  ${minWidth.lg`
    display: flex;
    flex-direction: column;
    grid-column: 4 / span 6;

    ${props =>
      props.theme.hasImage &&
      `
      grid-column: 7 / span 5;
    `}
  `}
`;

export const HeadlineContainer = styled.div`
  margin-bottom: 1.6rem;

  ${minWidth.lg`
    grid-column: span 5;
    margin-bottom: 0;
    margin-bottom: 2.4rem;
  `}
`;

export const TitleEyebrow = styled(Eyebrow)`
  margin-bottom: 1.6rem;
`;

export const Title = styled(Headline).attrs({
  tag: 'h4',
  styling: 'h4',
})`
  color: ${colors.black};
`;

export const DescriptionContainer = styled.div`
  font-size: 1.4rem;

  ${minWidth.lg`
    font-size: 1.6rem;
    grid-column: 7 / span 5;
  `}
`;

export const Markdown = styled(MarkdownComponent)`
  span {
    display: block;
  }

  span,
  p,
  li {
    font-size: 1.4rem;
    line-height: 2.4rem;

    ${minWidth.lg`
      font-size: 1.6rem;
      line-height: 2.4rem;
    `}
  }
`;

export const CtasContainer = styled.div`
  margin-top: 3.2rem;
`;

export const Cta = styled(CtaComponent)`
  ${multiple};
`;
