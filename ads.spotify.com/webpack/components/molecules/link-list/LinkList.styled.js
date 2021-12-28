import styled from 'styled-components';

import { Cta as CtaComponent, Icon, Headline } from 'components/atoms';
import { animations, colors, fontWeights } from 'styles/variables';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

export const LinkList = styled.section`
  ${container}

  margin: 4rem auto 5.6rem;

  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: repeat(12, 1fr);
    margin: 8rem auto 11.2rem;
  `}
`;

export const Content = styled.div`
  ${minWidth.lg`
    grid-column: 4 / span 6;
  `}
`;

export const Eyebrow = styled(Headline).attrs({
  tag: 'h4',
})`
  font-size: 1.6rem;
  font-weight: ${fontWeights.bold};
  letter-spacing: -0.025rem;
  line-height: 2.4rem;
  margin-bottom: 2.4rem;

  ${minWidth.lg`
    font-size: 2rem;
    letter-spacing: -0.05rem;
    line-height: 3.2rem;
    margin-bottom: 3.15rem;
  `}
`;

export const Title = styled(Headline).attrs({
  tag: 'span',
  styling: 'h3',
})`
  opacity: 1;
  margin-right: 1.8rem;
  transition: opacity ${animations.defaultTransition};

  ${minWidth.lg`
    margin-right: 8rem;
  `}
`;

export const Arrow = styled(Icon)`
  height: 3.2rem;
  position: absolute;
  right: 0;
  transition: transform ${animations.defaultTransition};
  width: 3.2rem;

  div,
  svg {
    height: inherit;
    width: inherit;
  }

  ${minWidth.lg`
    height: 4.8rem;
    width: 4.8rem;
  `}
`;

export const Cta = styled(CtaComponent).attrs({
  type: 'TextLink',
})`
  border-top: 0.1rem solid ${colors.grey500};
  display: flex;
  padding: 1.5rem 0 1.6rem;
  position: relative;
  text-decoration: none;

  &:hover {
    color: ${colors.black};

    ${Title} {
      opacity: 0.5;
    }

    ${Arrow} {
      transform: translateX(-1.6rem);
    }
  }

  ${minWidth.lg`
    padding: 2.35rem 0;
  `}
`;
