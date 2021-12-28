import React, { useCallback, useMemo } from 'react';
import getConfig from 'next/config';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useTranslation } from 'i18n/nexti18n';

import endsWith from 'lodash/endsWith';

import { useAppContext, ACTION_TYPES } from 'contexts/app-context';
import { getValidProps } from 'utils/get-valid-props';
import { hasAnchorRule } from 'utils/has-anchor-rule';
import { isInPageAnchor } from 'utils/is-in-page-anchor';
import { isExternalLink } from 'utils/is-external-link';
import { urlSplit } from 'utils/url-split';
import { COMMON_LINK_PROPS } from 'constants/common-props';
import { CTA_OVERRIDES } from 'constants/cta-overrides';
import { ActivityIndicator } from 'components/atoms/activity-indicator';
import {
  eventTrack,
  LINK_CLICK,
  SUCCESSFUL_COOKIE_REDIRECT,
} from 'utils/google-tag-manager';
import { getRandomHash } from 'utils/get-random-hash';
import { getURL } from 'utils/get-url';
import { centerPopUp } from 'utils/center-pop-up';
import { AUTH_PAGE, REDIRECT_STATE, LANG_MAP } from 'constants/auth';
import { BROWSE_ADS, SPOTIFY_AUTHORIZE } from 'constants/urls';

import * as Styled from './Cta.styled';

const { publicRuntimeConfig } = getConfig() || {};

const CTA_TYPES = {
  primary: Styled.PrimaryCta,
  secondary: Styled.SecondaryCta,
  textlink: Styled.TextLink,
  wrapper: Styled.WrapperLink,
  tertiary: Styled.Tertiary,
};

function getStyledCtaByType(type) {
  return CTA_TYPES[type.toLowerCase()];
}

/**
 * CTA component
 * @param {String} href Url of the link or dynamic definition in case of dynamic link
 * @param {String} type CTA type: primary or secondary
 * @param {String} overrideFunctionality override functionality for AdStudio Login and Lead Gen Form
 * @param {String} asLink Next Link as prop
 * @param {String} tag HTML tag override in case of a non anchor cta
 * @param {boolean} isDarkTheme Flag to show the dark theme for the CTA
 * @param {String} rel a tag rel
 * @param {String} className Class to override current styles
 * @param {String} role a role
 * @param {String} ariaLabel a aria-label
 * @param {Function} onClick - on click handler function
 * @param {boolean} disabled - disabled state
 * @param {String|Array} children React Children
 */
const CtaComponent = ({
  href: hrefArg = '',
  type = 'Primary',
  overrideFunctionality = '',
  asLink: asLinkArg = '',
  tag = 'a',
  isDarkTheme = false,
  disabled = false,
  ...anchorProps
}) => {
  const {
    rel = '',
    className = null,
    role = '',
    ariaLabel = '',
    children,
    onClick = () => {},
    onMouseEnter = null,
    onMouseLeave = null,
    onMouseMove = null,
    onFocus = null,
    onBlur = null,
    tabIndex = null,
  } = anchorProps;

  const isAnchor = tag === 'a';
  const StyledCtaByType = getStyledCtaByType(type);
  const { href, asLink, hasQueryParams } = useMemo(() => {
    const hrefSplit = urlSplit(hrefArg);
    const asLinkSplit = urlSplit(asLinkArg);

    return {
      href:
        !hrefArg ||
        endsWith(hrefSplit.pathname, '/') ||
        isExternalLink(hrefArg) ||
        isInPageAnchor(hrefArg)
          ? hrefArg
          : `${hrefSplit.pathname}/${hrefSplit.search}${hrefSplit.hash}`,
      asLink:
        !asLinkArg || endsWith(asLinkSplit.pathname, '/')
          ? asLinkArg
          : `${asLinkSplit.pathname}/${asLinkSplit.search}${asLinkSplit.hash}`,
      hasQueryParams: !!hrefSplit.search,
    };
  }, [hrefArg, asLinkArg]);

  const defaultProps = {
    href,
    rel,
    className,
    role,
    ariaLabel,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onFocus,
    onBlur,
    tabIndex,
  };

  const getOverrideParams = () => {
    switch (overrideFunctionality) {
      case CTA_OVERRIDES.ADSTUDIO_LOGIN: {
        const [
          { isLoggedIn, locale, hasAdAccountData, isLoading },
        ] = useAppContext();
        const { t } = useTranslation();
        const { href: removedHref, ...overrideProps } = defaultProps;
        const lang = LANG_MAP[locale] || LANG_MAP.default;

        if (isLoading.userData) {
          return {
            isExternal: false,
            isWrapped: false,
            overrideTag: 'button',
            minWidth: 15.5,
            overrideText: (
              <ActivityIndicator
                modifier={ActivityIndicator.MODIFIERS.INLINE}
              />
            ),
            onClickOverride: event => {
              event.preventDefault();
            },
            optionalProps: overrideProps,
          };
        }

        return isLoggedIn
          ? {
              overrideTag: 'a',
              overrideText: hasAdAccountData ? t('manageAds') : t('startNow'),
              isExternal: true,
              isWrapped: false,
              optionalProps: {
                ...overrideProps,
                href: `${BROWSE_ADS}?lang=${lang}`,
              },
              onClickOverride: event => {
                eventTrack(SUCCESSFUL_COOKIE_REDIRECT);
                onClick(event);
              },
            }
          : {
              isExternal: false,
              isWrapped: false,
              overrideText: t('startNow'),
              optionalProps: overrideProps,
              overrideTag: 'button',
              onClickOverride: event => {
                event.preventDefault();
                const { hostName = '' } = getURL();
                const redirectURI = `${hostName}/${AUTH_PAGE}`;
                const scope = 'user-read-private user-read-email';
                const state = getRandomHash(`${locale}.`);
                const authURL = `${SPOTIFY_AUTHORIZE}?response_type=token&client_id=${publicRuntimeConfig.SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectURI}&state=${state}`;

                localStorage.setItem(REDIRECT_STATE, state);
                centerPopUp({ url: authURL, name: 'Spotify Auth' });
                onClick(event);
              },
            };
      }
      case CTA_OVERRIDES.STICKY_FORM: {
        const [appState, appDispatch] = useAppContext();
        const { t } = useTranslation();
        const { href: removedHref, ...overrideProps } = defaultProps;

        return {
          onClickOverride: event => {
            const { isModalFormOpen } = appState;

            appDispatch({
              type: ACTION_TYPES.MODAL_FORM_TOGGLE,
              status: !isModalFormOpen,
            });
            appDispatch({
              type: ACTION_TYPES.NAVIGATION_TOGGLE,
              status: false,
            });

            // eslint-disable-next-line no-param-reassign
            event.data = { isModalFormOpen };
            onClick(event);
          },
          optionalProps: overrideProps,
          overrideTag: 'button',
          isExternal: false,
          isWrapped: false,
          overrideText: t('letsTalk'), // Right now, they want the same value in both cases of appState.hasAdAccountData
        };
      }
      default: {
        const isExternal = isExternalLink(href);
        const isAnchorLink = hasAnchorRule(href);
        return {
          onClickOverride: null,
          optionalProps: defaultProps,
          overrideTag: tag,
          isExternal,
          isWrapped: !(
            isExternal ||
            !isAnchor ||
            isAnchorLink ||
            hasQueryParams
          ),
        };
      }
    }
  };

  const {
    overrideText,
    optionalProps,
    overrideTag,
    isExternal,
    isWrapped,
    onClickOverride,
    minWidth,
  } = getOverrideParams();

  const ctaOptionalProps = getValidProps(optionalProps);

  const onLinkClick = useCallback(
    event => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      /**
       * This is a global track for all anchor tags, even if they implement their own track event
       * in that case two events are fired and that's expected
       * Buttons and other non anchors must implement their own event track
       */
      if (isAnchor) {
        eventTrack(LINK_CLICK, {
          event,
          href: optionalProps.asLink || optionalProps.href,
        });
      }

      if (typeof onClickOverride === 'function') {
        onClickOverride(event);
      } else {
        onClick(event);
      }
    },
    [onClick, onClickOverride],
  );

  const cta = (
    <StyledCtaByType
      onClick={onLinkClick}
      as={overrideTag}
      aria-disabled={disabled}
      isDarkTheme={isDarkTheme}
      minWidth={minWidth}
      {...(isExternal
        ? {
            rel: COMMON_LINK_PROPS.NO_OPENER,
            target: COMMON_LINK_PROPS.TARGET_BLANK,
          }
        : {})}
      {...ctaOptionalProps}
    >
      {overrideText || children}
    </StyledCtaByType>
  );

  return !isWrapped ? (
    cta
  ) : (
    <Link href={href} as={asLink} passHref>
      {cta}
    </Link>
  );
};

CtaComponent.propTypes = {
  /**
   * Url of the link or dynamic definition in case of dynamic link
   */
  href: PropTypes.string,
  /**
   * Next Link as prop
   */
  asLink: PropTypes.string,
  /**
   * HTML tag override in case of a non anchor cta
   */
  tag: PropTypes.string,
  /**
   * CTA type: primary or secondary
   */
  type: PropTypes.string,
  /**
   * override functionality for AdStudio Login and Lead Gen Form
   */
  overrideFunctionality: PropTypes.string,
  /**
   * disabled state
   */
  disabled: PropTypes.bool,
  /**
   * on click handler
   */
  onClick: PropTypes.func,
  /**
   * React children node
   */
  children: PropTypes.node.isRequired,
  /**
   * Class to override current styles
   */
  className: PropTypes.string,
};

export default CtaComponent;
