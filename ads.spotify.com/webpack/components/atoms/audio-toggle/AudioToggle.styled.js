import styled from 'styled-components';

import { Cta as CtaComponent } from 'components/atoms';

import { colors, animations } from 'styles/variables';
import { levels } from 'styles/z-index';

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

export const UnMuteText = styled.span.attrs(props => ({
  style: {
    ...(props.hideText ? { opacity: 0, transform: 'translateX(24px)' } : {}),
  },
}))`
  margin-right: 2.8rem;
  transition: opacity ${animations.defaultTransition},
    transform ${animations.defaultTransition};
`;

export const Button = styled(CtaComponent).attrs({
  type: 'wrapper',
  tag: 'button',
})`
  align-items: center;
  display: flex;
  height: 4rem;
  justify-content: center;
  position: relative;
  width: 4rem;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    z-index: ${levels.highlight};
  }

  &:before {
    content: '';
    position: absolute;
    background-color: ${props => props.color || colors.black};
    height: 100%;
    width: 100%;
    border-radius: 100%;
    transform: scale(${props => (props.active ? 1.1 : 1)});
    transition: transform ${animations.defaultTransition};
  }
`;

export const Circle = styled.div`
  position: absolute;
  background-color: ${props => props.color || colors.black};
  height: 100%;
  width: 100%;
  border-radius: 100%;
`;

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const Wave = styled.div`
  position: absolute;
  width: calc(100% + 32px);
  height: calc(100% + 32px);
  top: -16px;
  left: -16px;
  background-color: ${props => props.color || colors.black};
  border-radius: 100%;
  z-index: ${levels.behind};
`;
