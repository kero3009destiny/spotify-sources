import styled from 'styled-components';

import { Headline } from 'components/atoms';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { ICONS } from 'constants/icons';
import { colors, animations, cssFragments } from 'styles/variables';

export const Root = styled.div`
  ${container}
  ${columnsGutter}

  margin: 1.6rem auto;
  padding-bottom: ${({ collapseAll }) => (collapseAll ? '0' : '4')}rem;
  padding-top: ${({ expandAll }) => (expandAll ? '0' : '4')}rem;

  ${minWidth.lg`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    margin: 4rem auto;
  `}
`;

export const Container = styled.div`
  ${minWidth.lg`
    grid-column: 4 / span 6;
  `}
`;

export const Entries = styled.div`
  border-top: 1px solid ${colors.grey500};
`;

export const Entry = styled.div`
  border-bottom: 1px solid ${colors.grey500};
  padding: 1.6rem 0;
`;

export const Button = styled.button`
  position: relative;
  text-align: left;
  width: 100%;

  ${cssFragments.defaultFocusState}
`;

export const ButtonAll = styled.button`
  font-size: 14px;
  height: 4rem;
  line-height: 24px;
  text-align: right;
  width: 100%;

  ${minWidth.lg`
    font-size: 16px;
    line-height: 24px;
  `}

  ${cssFragments.defaultFocusState}
`;

export const Title = styled(Headline).attrs({
  tag: 'h5',
  styling: 'Display4',
})`
  font-weight: 900;
  padding-right: 1.2rem;

  &:after {
    background-image: url(/svg/${({ active }) =>
        active ? ICONS.MINUS : ICONS.PLUS}.svg);
    content: '';
    height: ${({ active }) => (active ? '0.2' : '1.2')}rem;
    position: absolute;
    right: 0;
    top: calc(50% - ${({ active }) => (active ? '0.1' : '0.6')}rem);
    width: 1.2rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const Description = styled.p`
  box-sizing: content-box;
  margin-bottom: ${({ active }) => (active ? '0.8rem' : 0)};
  max-height: ${({ active, maxHeight }) => (active ? `${maxHeight}px` : 0)};
  opacity: ${({ active }) => (active ? 1 : 0)};
  overflow: hidden;
  padding-top: ${({ active }) => (active ? '0.8rem' : 0)};
  pointer-events: all;
  transition: max-height ${animations.defaultTransition};

  ${minWidth.lg`
    margin-bottom: ${({ active }) => (active ? '1.6rem' : 0)};
    padding-top: ${({ active }) => (active ? '1.6rem' : 0)};
  `}
`;
