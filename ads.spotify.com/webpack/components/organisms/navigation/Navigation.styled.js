import styled from 'styled-components';

import {
  Cta,
  DropdownMenu,
  DropdownMenuContainer,
  Icon,
  Tooltip,
  TooltipContainer,
} from 'components/atoms';
import { animations, colors, fontWeights, navHeight } from 'styles/variables';
import { levels } from 'styles/z-index';
import { minWidth } from 'styles/media-queries';
import { container } from 'styles/grid';

/* Transitions, Constants */
const opacityTransition = 'opacity 0.7s ease-in-out';
const opacityTransitionDelay = '0.8s';

const transformTransition = 'transform 1s ease-in-out';
const transformTransitionDelay = '0.5s';

const itemContentDelay = `0.3s`;
const expandCollapseTransition = '0.5s ease-in-out';

const SUB_NAVIGATION_TOP_OFFSET = 1.6;

/* Dropdown menu children list elements height constants for mobile */
const childrenHeight = 52;
const mdChildrenHeight = 88;

/* Styled Components */
export const Header = styled.header`
  align-items: center;
  background-color: ${colors.white};
  border-bottom: 0.1rem solid ${colors.grey600};
  display: flex;
  position: fixed;
  width: 100%;
  z-index: ${levels.prompt};
`;

export const Container = styled.div`
  ${container}

  align-items: center;
  background-color: ${colors.white};
  display: flex;
  justify-content: space-between;
  z-index: ${levels.highlight};
`;

export const Content = styled.div`
  align-items: center;
  background-color: ${colors.white};
  display: flex;
  height: ${`${navHeight.smToLg}rem`};
  justify-content: space-between;
  width: 100%;
  z-index: ${levels.highlight};

  ${minWidth.md`
    height: ${navHeight.mlUp}rem;
  `}

  ${minWidth.lg`
    width: auto;
  `}
`;

export const Logo = styled(Cta).attrs({ type: 'textlink' })`
  display: block;

  /* ReactSVG adds extra div wrapper */
  div,
  svg {
    height: 3rem;
    width: 19.3rem;

    ${minWidth.md`
      height: 3.6rem;
      width: 23.13rem;
    `}
  }
`;

export const Toggle = styled.button`
  height: 4.4rem;
  position: relative;
  width: 4.4rem;

  /* IE Icon position fix */
  div {
    align-items: center;
    display: flex;
    height: 4.4rem;
    justify-content: center;
    width: 4.4rem;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  .nav-icon {
    position: absolute;
    top: 0;
  }

  .nav-icon-close {
    opacity: 0;
  }

  .nav-icon-hamburger {
    opacity: 1;
    transition: ${opacityTransition};
    transition-delay: ${opacityTransitionDelay};
  }

  ${props =>
    props.theme.open &&
    `
    .nav-icon-close {
      opacity: 1;
      transition: ${opacityTransition};
      transition-delay: ${opacityTransitionDelay};
    }

    .nav-icon-hamburger {
      opacity: 0;
      transition: none;
    }
  `}

  ${minWidth.lg`
    display: none;
  `}
`;

export const NavContainer = styled.div`
  ${container}

  background-color: ${colors.white};
  font-size: 1.4rem;
  height: ${`calc(100vh - ${navHeight.smToLg}rem)`};
  ${props =>
    props.documentHeight
      ? `height: calc(${props.documentHeight}px - ${navHeight.smToLg}rem);`
      : ''};
  left: 0;
  padding-bottom: 4rem;
  padding-top: 3.15rem;
  position: absolute;
  top: ${`${navHeight.smToLg}rem`};
  transform: ${`translateY(calc(-100% - ${navHeight.smToLg}rem))`};
  transition-delay: ${transformTransitionDelay};
  transition: ${transformTransition};
  width: 100%;
  z-index: ${levels.base};

  ${props =>
    props.theme.open &&
    `
      transform: translateY(0);
      transition-delay: 0s;
  `}

  ${props => props.theme.resizing && `transition: none;`}

  ${minWidth.md`
    height: ${`calc(100vh - ${navHeight.mlUp}rem)`};
    padding-top: 3.45rem;
    top: ${navHeight.mlUp}rem;
    transform: translateY(calc(-100% - ${navHeight.mlUp}rem));

    ${props =>
      props.theme.open &&
      `
      transform: translateY(0);
    `}
  `}

  ${minWidth.lg`
    height: ${navHeight.mlUp}rem;
    padding: 0;
    position: relative;
    top: 0;
    transform: translateY(0);
    transition: none;
  `}
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  opacity: 0;
  transition: ${opacityTransition};

  ${props =>
    props.theme.open &&
    `
      opacity: 1;
      transition-delay: ${opacityTransitionDelay};
    `}

  ${minWidth.lg`
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    opacity: 1;
    transition: none;
  `}
`;

export const NavElement = styled.div`
  display: flex;
  flex-direction: column;

  ${props =>
    props.scrollable &&
    `
    flex: 1;
    overflow: auto;
  `}

  ${minWidth.lg`
    align-items: center;
    flex-direction: row;
    height: 100%;
    justify-content: flex-end;
    overflow: inherit;
  `}
`;

export const NavTextLinkContainer = styled.span`
  margin-bottom: 1.6rem;
  max-width: 40.8rem;
  max-height: ${props =>
    props.subNavFocused ? `${props.listHeight + childrenHeight}px` : '2.4rem'};
  transition: max-height ${expandCollapseTransition} ${itemContentDelay};

  ${minWidth.md`
    margin-bottom: 3.2rem;
    max-height: ${props =>
      props.subNavFocused
        ? `${props.listHeight + mdChildrenHeight}px`
        : '4.8rem'};
  `}

  ${minWidth.lg`
    display: flex;
    height: 100%;
    max-height: 100%;
    margin-bottom: 0;
    margin-right: 2rem;
    position: relative;

    &:hover {
      color: ${colors.grey400};
    }
  `}
`;

export const NavTextLink = styled(Cta).attrs({
  type: 'textLink',
})`
  color: ${colors.black};
  font-size: 2rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.1rem;
  line-height: 2.4rem;
  pointer-events: all;
  text-decoration: none;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${colors.black};
  }

  ${minWidth.md`
    font-size: 4.4rem;
    letter-spacing: -0.15rem;
    line-height: 4.8rem;
  `}

  ${minWidth.lg`
    align-items: center;
    display: flex;
    font-size: 1.6rem;
    font-weight: ${fontWeights.normal};
    height: 100%;
    letter-spacing: normal;
    line-height: 3.2rem;

    &:hover {
      color: inherit;
    }
  `}
`;

export const NavTextLinkDrop = styled(NavTextLink).attrs({
  tag: 'button',
})``;

export const SubNavLink = styled(NavTextLink)`
  font-size: 1.8rem;
  letter-spacing: -0.05rem;

  ${minWidth.md`
    font-size: 2.8rem;
    letter-spacing: -0.1rem;
    line-height: 3.2rem;
  `}

  ${minWidth.lg`
    display: inline-block;
    font-size: 1.6rem;
    font-weight: ${fontWeights.normal};
    letter-spacing: normal;
    line-height: 2.4rem;
  `}
`;

export const Caret = styled(Icon)`
  display: inline-block;
  font-size: 0;
  height: 1.6rem;
  margin-left: 1rem;
  transition: transform ${animations.defaultTransition};
  width: 1.6rem;

  div,
  svg {
    height: inherit;
    width: inherit;
  }

  ${minWidth.lg`
    display: block;
    margin-left: 0.8rem;
  `}
`;

export const SubNav = styled(DropdownMenu)`
  margin-bottom: 0.8rem;
  margin-left: 0.8rem;
  margin-top: 1.6rem;

  ${minWidth.md`
    margin-left: 1.6rem;
    margin-top: 3.2rem;
  `}

  ${minWidth.lg`
    margin-bottom: 0;
    margin-left: 0;
    margin-top: 0;
    top: calc(100% - ${SUB_NAVIGATION_TOP_OFFSET}rem);
    transform: translateY(-1rem);
    transition: transform ${animations.defaultTransition}, opacity ${animations.defaultTransition};
  `};
`;

export const SubNavContainer = styled(DropdownMenuContainer)`
  pointer-events: ${({ subNavFocused }) => `${subNavFocused ? 'all' : 'none'}`};
  ${Caret} {
    transform: ${({ subNavFocused }) =>
      `${subNavFocused ? 'rotate(-180deg)' : 'unset'}`};
  }

  ${minWidth.lg`
    ${SubNav} {
      transform: ${({ subNavFocused }) =>
        `${subNavFocused ? 'translateY(0)' : 'translateY(-1rem)'}`};
    }
  `}
`;

export const SubNavItem = styled.li`
  margin-bottom: 0.8rem;

  ${minWidth.md`
    margin-bottom: 2.4rem;
  `}

  ${minWidth.lg`
    margin-bottom: 0.8rem;
  `}

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CtaContainer = styled.span`
  margin-top: 4rem;
  max-width: 40.8rem;

  a,
  button {
    text-align: center;
    width: 100%;
  }

  ${minWidth.md`
    margin-top: 4.8rem;
  `}

  ${minWidth.lg`
    margin-right: 2rem;
    margin-top: 0;
    max-width: 100%;

    &:last-child {
      margin-right: 0;
    }

    a {
      width: auto;
    }
  `}
`;

// Use for Nav CTA Tooltip
export const NavTooltipContainer = styled(TooltipContainer)`
  display: flex;
  flex-direction: column-reverse;

  ${minWidth.lg`
    display: inline-block;
  `}
`;

// Use for Nav CTA Tooltip
export const NavTooltip = styled(Tooltip)`
  margin-bottom: 2.4rem;

  ${minWidth.md`
    margin-bottom: 3.2rem;
  `}

  ${minWidth.lg`
    margin-bottom: 0;
  `}
`;

export const Backdrop = styled.div`
  background-color: ${colors.black};
  bottom: 0;
  cursor: pointer;
  height: 100vh;
  left: 0;
  opacity: ${props => (props.theme.open ? 0.5 : 0)};
  pointer-events: ${props => (props.theme.open ? 'all' : 'none')};
  position: absolute;
  right: 0;
  top: 0;
  transition: ${opacityTransition};
  width: 100vw;

  ${minWidth.lg`
    display: none;
    transition: none;
  `}
`;
