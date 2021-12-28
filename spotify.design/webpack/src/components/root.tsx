/**
 * @fileoverview
 * Used exclusively in `gatsby-browser.js` and `gatsby-ssr.js`.
 */
import React, { useEffect, useState } from 'react';
import { MAIN_CONTENT_ID } from '../common/constants/a11y';
import { ROUTE } from '../common/constants/routes';
import { getThemeFromPathname } from '../common/utils/getThemeFromPathname';
import { getThemeForHome } from '../common/utils/getThemeForHome';
import { getPathname } from '../common/utils/getPathname';
import { AppContextProvider } from '../common/context.app';
import { PlayerContextProvider } from '../common/context.player';
import { PageFooter } from './page-footer';
import { PageTopBar } from './page-topbar';
import { HeroBurstAnimated } from './utilities/decorative-bursts/hero-burst-animated';
import { HeroHome } from './hero-home';
import { PlayerOverlay } from './player/player-overlay';

interface Props {
  children: React.ReactNode;
  pathname: string;
}

export const Root = ({ children, pathname }: Props) => {
  const path = pathname || getPathname() || '/';
  const isHome = path === ROUTE.HOME;

  /** If its the homepage, start off with the loading screen/ */
  const [isLoading, setIsLoading] = useState(isHome);
  const initialTheme = isHome ? getThemeForHome() : getThemeFromPathname(path);

  useEffect(() => {
    const loading = isLoading;

    /** Focus-visible progressively enhances focus-states for keyboard users. */
    // @ts-ignore
    import('focus-visible');

    /**
     * HTMLElement.inert polyfill.
     * Allows you to `element.setAttribute('inert', '')` to hide this element
     *    from the accessibility tree. (aria-hidden, no-focus, no-screenreader)
     */
    // @ts-ignore
    import('wicg-inert');

    /**
     * document.blockingElements polyfill.
     * document.blockingElements is an array of HTMLElements.
     * If the length is larger than 0, ALL other elements will be marked inert.
     * This allows you to do focus-trapping on the element you mark blocking.
     */
    import('blocking-elements');

    if (loading) {
      /**
       * https://github.com/gatsbyjs/gatsby/issues/11006
       * There is a bug in gatsby's service-worker plugin that fails to set
       *    initial state (only on cached content).
       * We fix it by enforcing a state-refresh on hydration.
       */
      setIsLoading(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsLoading(loading);
        });
      });
    }
  }, []);

  return (
    <AppContextProvider initialTheme={initialTheme} isLoading={isLoading}>
      <PlayerContextProvider>
        <div>
          <HeroBurstAnimated />

          <HeroHome
            active={isLoading}
            onTransitionEnd={() => setIsLoading(false)}
          />

          <div hidden={isLoading}>
            <PageTopBar reveal={!isLoading} />
            <main id={MAIN_CONTENT_ID} tabIndex={-1}>
              {children}
            </main>
            <PageFooter />
          </div>

          <PlayerOverlay />
        </div>
      </PlayerContextProvider>
    </AppContextProvider>
  );
};
