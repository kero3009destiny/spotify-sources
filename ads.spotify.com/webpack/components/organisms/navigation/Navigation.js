import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes, { any } from 'prop-types';
import { useRouter } from 'next/router';

import FocusTrap from 'focus-trap-react';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import { ThemeProvider } from 'styled-components';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import { Cta, Icon } from 'components/atoms';
import { ICONS } from 'constants/icons';
import { isMLargeToXLarge } from 'styles/media-queries';
import { useAppContext, ACTION_TYPES } from 'contexts/app-context';
import { useTranslation } from 'i18n/nexti18n';
import { getLinkProps } from 'utils/get-link-props';
import {
  eventTrack,
  NAVIGATION_LOGO_CLICK,
  NAVIGATION_BURGER_MENU_TOGGLE,
  getMultiCtaAction,
  NAVIGATION_MULTI_CTA,
} from 'utils/google-tag-manager';

import { SubNav } from './SubNav';
import * as Styled from './Navigation.styled';

/**
 * Global Navigation Component, creates the top global navigation of the page.
 * @param {Object} props.data The Navigation Component data to create the
 *    different links of the global navigation.
 * @param {string} props.collectionName The dynamic collection name.
 * @return {ReactComponent}
 */
const Navigation = ({ data, collectionName }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [appState, appDispatch] = useAppContext();
  const { locale, isNavigationOpen } = appState;
  const [navigationItem] = get(data, `${collectionName}.items`, []);
  const navigationItems = get(
    navigationItem,
    'navigationItemsCollection.items',
    [],
  );
  const ctaItems = get(navigationItem, 'ctasCollection.items', []);
  const overlayElement = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [contentMaxHeight, setContentMaxHeight] = useState(-Infinity);

  const handleToggleOverlay = () => {
    appDispatch({
      type: ACTION_TYPES.NAVIGATION_TOGGLE,
      status: !isNavigationOpen,
    });
    appDispatch({
      type: ACTION_TYPES.MODAL_FORM_TOGGLE,
      status: false,
    });
    eventTrack(NAVIGATION_BURGER_MENU_TOGGLE, { isOpen: !isNavigationOpen });
  };

  const getToggleButtonAriaLabel = () =>
    isNavigationOpen
      ? t('navigationOverlay.close')
      : t('navigationOverlay.open');

  const closeOverlay = () =>
    appDispatch({
      type: ACTION_TYPES.NAVIGATION_TOGGLE,
      status: false,
    });

  const closeOnDesktop = () => {
    if (isMLargeToXLarge()) closeOverlay();
  };

  /**
   * Debounce implementation for navigation:
   * Implements a 100ms debounce
   * Sets the resizing property to true while the resize is happening
   * Sets the resizing property to false when the timer ends
   * Calls a closeOnDesktop function when the timer ends
   */
  let resizeTimer = null;

  const timeOutFunction = useCallback(() => {
    closeOnDesktop();
    setResizing(false);
    setDocumentHeight(window.innerHeight);
  }, []);

  const debouncedCloseOnDesktop = useCallback(() => {
    setResizing(true);
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(timeOutFunction, 100);
  }, []);

  // Change open state on resize.
  useEffect(() => {
    setDocumentHeight(window.innerHeight);
    window.addEventListener('resize', debouncedCloseOnDesktop);

    return () => {
      window.removeEventListener('resize', debouncedCloseOnDesktop);
    };
  }, []);

  // Disable, enable scroll on overlay open / close
  useEffect(() => {
    if (isNavigationOpen) {
      disableBodyScroll(overlayElement.current);
    } else {
      enableBodyScroll(overlayElement.current);
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isNavigationOpen]);

  // Set aria-hidden for nav
  useEffect(() => {
    setNavHidden(!(isNavigationOpen || isMLargeToXLarge()));
  }, [isNavigationOpen, resizing]);

  return (
    <ThemeProvider theme={{ open: isNavigationOpen, resizing }}>
      <FocusTrap
        active={isNavigationOpen}
        focusTrapOptions={{
          onDeactivate: closeOverlay, // This function is being triggered on ESC key press.
          allowOutsideClick: () => true,
        }}
      >
        <Styled.Header>
          <Styled.Container>
            <Styled.Content>
              <Styled.Logo
                href="/[locale]"
                asLink={`/${locale}`}
                onClick={() => {
                  eventTrack(NAVIGATION_LOGO_CLICK, { path: router.asPath });
                  closeOverlay();
                }}
              >
                <span className="sr-only">{t('spotifyAdvertising')}</span>
                <Icon name={ICONS.SPOTIFY_ADVERTISING} />
              </Styled.Logo>
              <Styled.Toggle
                onClick={handleToggleOverlay}
                aria-label={getToggleButtonAriaLabel()}
                aria-expanded={isNavigationOpen}
              >
                <Icon
                  className="nav-icon nav-icon-close"
                  name={ICONS.CLOSE_MARK}
                />
                <Icon
                  className="nav-icon nav-icon-hamburger"
                  name={ICONS.HAMBURGER}
                />
              </Styled.Toggle>
            </Styled.Content>
            <Styled.NavContainer documentHeight={documentHeight}>
              <Styled.Nav aria-hidden={navHidden}>
                <Styled.NavElement ref={overlayElement} scrollable>
                  {navigationItems.map(item => (
                    <SubNav
                      key={get(item, 'sys.id', '')}
                      item={item}
                      onClick={closeOverlay}
                      locale={locale}
                      onLayout={height => {
                        setContentMaxHeight(prevHeight =>
                          Math.max(prevHeight, height),
                        );
                      }}
                      listHeight={contentMaxHeight}
                    />
                  ))}
                </Styled.NavElement>
                <Styled.NavElement>
                  {ctaItems.map(
                    ({ title, url, type, overrideFunctionality }) => {
                      const { href, asLink } = getLinkProps(url);
                      const ctaClickTrack = event => {
                        const { isModalFormOpen } = get(event, 'data', {});
                        const actionText = getMultiCtaAction(
                          { overrideFunctionality, url },
                          isModalFormOpen,
                        );

                        eventTrack(NAVIGATION_MULTI_CTA, {
                          event,
                          actionText,
                        });
                        closeOverlay();
                      };

                      return (
                        <Styled.CtaContainer key={kebabCase(`${title}-${url}`)}>
                          <Cta
                            type={type}
                            overrideFunctionality={overrideFunctionality}
                            onClick={ctaClickTrack}
                            href={href}
                            asLink={asLink}
                          >
                            {title}
                          </Cta>
                        </Styled.CtaContainer>
                      );
                    },
                  )}
                </Styled.NavElement>
              </Styled.Nav>
            </Styled.NavContainer>
          </Styled.Container>
          <Styled.Backdrop onClick={closeOverlay} />
        </Styled.Header>
      </FocusTrap>
    </ThemeProvider>
  );
};

Navigation.propTypes = {
  /**
   * Navigation Component data to create the different links of the global
   * navigation.
   */
  data: PropTypes.objectOf(any).isRequired,
  /**
   * The dynamic collection name.
   */
  collectionName: PropTypes.string.isRequired,
};

export default Navigation;
