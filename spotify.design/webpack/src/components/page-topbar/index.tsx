import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'gatsby';

import { AppContext } from '../../common/context.app';
import { PlayerContext } from '../../common/context.player';
import { TOP_BAR_ID } from '../../common/constants/a11y';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';
import { Logo } from '../utilities/ui-icons';
import { SkipToMainContent } from '../utilities/skip-to-main-content';

import { PlayerCurrentPlaylist } from '../player/player-current-playlist';
import { PageNavigation } from '../page-navigation';
import { NavigationOverlay } from '../page-navigation/navigation-overlay';
import { Hamburger } from './hamburger';
import style from './style.module.css';

interface Props {
  reveal?: boolean;
}

export const PageTopBar = ({ reveal }: Props): JSX.Element => {
  const { isDesktop, overlayOpen } = useContext(AppContext);
  const { currentTrack, activePlaylist } = useContext(PlayerContext);
  const [navOpen, setNavOpen] = useState(false);
  const focusedNavToggle = useRef<HTMLElement>(null);
  const overlayOpenClass = overlayOpen ? style.open : '';
  const revealClass = reveal ? style.revealed : '';

  const handleNavToggle = useCallback(() => {
    if (!isDesktop) {
      /**
       * If the nav is going to open:
       *    1. Store the current element that has focus.
       *    2. Open the nav.
       * If the nav is going to close:
       *    1. Close the nav
       *    2. Re-focus the element that opened it.
       */
      if (!navOpen) {
        (focusedNavToggle as React.MutableRefObject<Element | null>).current = document.activeElement as HTMLElement;
        setNavOpen(true);
      } else {
        setNavOpen(false);

        if (focusedNavToggle.current) {
          focusedNavToggle.current.focus();
          (focusedNavToggle as React.MutableRefObject<Element | null>).current = null;
        }
      }
    }
  }, [isDesktop, navOpen, setNavOpen]);

  // onMediaEvent
  useEffect(() => {
    if (isDesktop) setNavOpen(false);
  }, [isDesktop, setNavOpen]);

  const playerCurrentLabel = currentTrack
    ? `${currentTrack?.name} ∙ ${currentTrack?.artists[0].name}`
    : activePlaylist?.name;

  return (
    <header
      id={TOP_BAR_ID}
      className={`sd-container ${style.topBar} ${overlayOpenClass} ${revealClass}`}
    >
      <div className="sd-container-inner">
        <SkipToMainContent />
        <div className={style.inner}>
          <Link
            to="/"
            aria-label="Go to homepage"
            className={style.logo}
            onClick={() => {
              sendTrackingEvent('main-navigation', 'click', 'Logo');
              setNavOpen(false);
            }}
          >
            <Logo width={192} height={36} />
          </Link>

          {currentTrack && isDesktop && (
            <PlayerCurrentPlaylist
              show={!overlayOpen}
              hasTrack={!!currentTrack}
              label={playerCurrentLabel}
              opensOverlay
            />
          )}

          {isDesktop ? (
            <PageNavigation className={style.desktopNav} />
          ) : (
            <Hamburger active={navOpen} onClick={handleNavToggle} />
          )}
        </div>

        <NavigationOverlay open={navOpen} onClose={handleNavToggle}>
          <PageNavigation
            className={`sd-container ${style.mobileNav}`}
            onItemClick={handleNavToggle}
            linkClassName={`t-display-2 ${style.mobileNavItem}`}
            linkActiveClassName={style.mobileNavItemActive}
          />
        </NavigationOverlay>
      </div>
    </header>
  );
};

PageTopBar.defaultProps = {
  siteTitle: ``,
  topThreshold: 400,
};
