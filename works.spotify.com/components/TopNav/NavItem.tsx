import { ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { screenXsMax, Type } from '@spotify-internal/encore-web';
import { HideMenuContext } from './NavItemList';
import { useViewport, Viewport } from '../../libs/utils/useViewport';

export const ListItem = styled.li<{ isDisabled?: boolean }>`
  font-weight: ${Type.bold};
  position: relative;

  a {
    text-decoration: none;
  }

  @media (max-width: ${screenXsMax}) {
    font-size: 18px;
    line-height: 26px;
  }
`;

// children of this component should not stop event propagation, as the click handler here will close the mobile overlay when a link is selected
export const NavItem = ({ children }: { children: ReactNode }) => {
  const hideMenu = useContext(HideMenuContext);
  const viewport = useViewport();
  const viewportXs = viewport === Viewport.XS;
  return <ListItem onClick={viewportXs ? () => hideMenu() : () => {}}>{children}</ListItem>;
};
