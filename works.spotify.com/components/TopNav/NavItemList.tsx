import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  LogoSpotifyForArtists,
  screenMdMin,
  screenSmMin,
  screenXsMax,
  spacer8,
  white,
} from '@spotify-internal/encore-web';
import { MobileContainer } from './MobileContainer';
import { useViewport, Viewport } from '../../libs/utils/useViewport';

export const StyledList = styled.ul`
  padding-bottom: 0;
  list-style-type: none;

  @media (max-width: ${screenXsMax}) {
    margin-top: ${spacer8};
  }

  @media (min-width: ${screenSmMin}) {
    display: flex;
    flex-shrink: 0;
    margin-left: auto;
  }

  @media (min-width: ${screenMdMin}) {
    margin-right: auto;
  }
`;

export const HideMenuContext = React.createContext(() => {});

type NavItemListProps = {
  children: React.ReactNode;
  logo?: React.ReactNode;
};

export const NavItemList = ({ children, logo }: NavItemListProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const viewport = useViewport();
  const viewportXs = viewport === Viewport.XS;

  const element = useRef<HTMLDivElement>(null);

  const handleEvent = (e: MouseEvent | FocusEvent) => {
    if (!element.current || (e.target instanceof Node && element.current.contains(e.target))) {
      return;
    }

    onHideMenu();
  };

  const onShowMenu = () => {
    setMenuVisible(true);
    window.addEventListener('mouseup', handleEvent, true);
    window.addEventListener('focus', handleEvent, true);
  };

  const onHideMenu = () => {
    setMenuVisible(false);
    window.removeEventListener('mouseup', handleEvent, true);
    window.removeEventListener('focus', handleEvent, true);
  };

  if (viewportXs) {
    return (
      <MobileContainer
        ref={element}
        onShowMenu={onShowMenu}
        onHideMenu={onHideMenu}
        showMenu={menuVisible}
        logo={logo || <LogoSpotifyForArtists height="25" color={white} />}
      >
        <HideMenuContext.Provider value={onHideMenu}>
          <>{children}</>
        </HideMenuContext.Provider>
      </MobileContainer>
    );
  }

  return <StyledList>{children}</StyledList>;
};
