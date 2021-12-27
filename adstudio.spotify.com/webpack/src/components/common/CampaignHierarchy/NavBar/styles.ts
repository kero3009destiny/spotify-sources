import { Link } from 'react-router';
import styled from 'styled-components';

import { plum } from '@spotify-internal/encore-advertising-web/cjs/styles/colors';
import { spacer32 } from '@spotify-internal/encore-foundation';
import {
  ButtonIcon,
  ButtonTertiary,
  NavBarList,
  NavBarListItem,
  NavPillListItem,
  Popover,
  spacer4,
  spacer8,
  spacer12,
  spacer24,
} from '@spotify-internal/encore-web';

import { Coachmark } from 'components/common/Coachmark/Coachmark';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const NavPillContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LabelContainer = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacer8};
  text-transform: none;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
`;

export const StyledNavPillLink = styled(Link)`
  display: flex;
  gap: ${spacer4};
  text-transform: none;
`;

export const StyledButtonIcon = styled(ButtonIcon)`
  display: flex;
  gap: ${spacer4};
  text-transform: none;
`;

// FIXME: the typecasting was required based on the versions of typescript and styled components (https://github.com/microsoft/TypeScript/issues/37597#). When we upgrade to styled components 5, "as TSFixMe" can be removed
export const StyledNavBarList = styled(NavBarList as any)`
  justify-self: start;
  margin-bottom: ${spacer24};
  align-items: center;
`;

export const StyledNavBarListItem = styled(NavBarListItem)<{
  condensed: boolean;
}>`
  margin-left: ${props => (props.condensed ? 0 : spacer32)} !important;
  padding-right: ${spacer12};
`;

export const StyledNavPillListItem = styled(NavPillListItem)`
  padding: ${spacer4} ${spacer8};
  background-color: ${plum};
`;

export const StyledCoachmark = styled(Coachmark)`
  width: 354px;
`;

export const StyledTabsTooltip = styled(Popover)`
  position: absolute;
  top: 0;
  left: 375px;
  user-select: none;
  border-radius: 4px;
  width: 280px;
  min-height: 120px;
  z-index: 2001;
`;

export const NextButton = styled(ButtonTertiary)`
  position: absolute;
  bottom: 0;
  right: 16px;
`;
