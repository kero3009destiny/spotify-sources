import styled from 'styled-components';

import { container, columnsGutter } from 'styles/grid';
import { Cta as CtaComponent, Headline } from 'components/atoms';
import { animations, colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';

export const Root = styled.div`
  background-color: ${colors.advertisingLavender};
  color ${colors.white};
  display: flow-root;
  text-align: center;
`;

export const Container = styled.div`
  ${container}
  ${columnsGutter}

  margin: 8.7rem auto;

  ${minWidth.lg`
    margin: 16rem auto;
  `}
`;

export const Eyebrow = styled(Headline).attrs({
  tag: 'h2',
  styling: 'h4',
})`
  margin-bottom: 6.4rem;

  ${minWidth.lg`
    margin-bottom: 11.2rem;
  `}
`;

export const TitleSection = styled(Headline).attrs({
  tag: 'h3',
  styling: 'h6',
})`
  font-size: 1.6rem;
  margin: 3.9rem auto 1.6rem;

  ${minWidth.lg`
    font-size: 2.4rem;
    margin: 5.6rem auto 4rem;
  `}
`;

export const Cta = styled(CtaComponent).attrs(({ onMouseMove }) => ({
  onMouseMove,
}))`
  display: block;
  font-size: 40px;
  font-weight: 900;
  line-height: 40px;
  position: relative;
  text-decoration: unset;
  z-index: 1;

  ${minWidth.lg`
    font-size: 96px;
    line-height: 96px;
  `}

  &:hover {
    color: inherit;
    text-decoration: underline;
  }
`;

export const Image = styled.div.attrs(props => ({
  role: 'img',
  'aria-label': props.alt,
}))`
  height: 30rem;
  overflow: hidden;
  position: fixed;
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  width: 40rem;
  z-index: 0;

  &::before {
    background: no-repeat 50% / cover ${props => `url(${props['data-src']})`};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: transform ${animations.defaultTransition};
    will-change: transform;
  }
`;
