import React, { useState, useEffect, useCallback } from 'react';
import PropTypes, { any } from 'prop-types';

import { RTE } from 'components/molecules';
import { Banner } from 'components/organisms';
import {
  eventTrack,
  COOKIE_BANNER_CLOSE,
  COOKIE_BANNER_LINK,
} from 'utils/google-tag-manager';
import { getCookieObject } from 'utils/get-cookie-object';
import { useAppContext, ACTION_TYPES } from 'contexts/app-context';
import { COOKIE_BANNER_NAME, COOKIE_VALUE } from 'constants/cookies';

/**
 * Renders a Cookie Banner Component. Displayed until dismissed by a user.
 * Once accepted/dismissed, a cookie is set hiding the component from rendering
 * on subsequent page views.
 * @param {string|null} className The component class name.
 * @param {object} data Cookie Banner data.
 * @returns {ReactElement}
 */
const CookieBanner = ({ className = null, data }) => {
  const [{ copy } = {}] = data.cookieBannerCollection.items;
  const [acceptance, setAcceptance] = useState(null);
  const [, appDispatch] = useAppContext();

  const closeDisclaimer = () => {
    if (!acceptance) {
      document.cookie = `${COOKIE_BANNER_NAME}=${COOKIE_VALUE}`;
      setAcceptance(true);
      appDispatch({
        type: ACTION_TYPES.SET_COOKIE_BANNER_VISIBILITY,
        cookieBannerVisibility: false,
      });
      eventTrack(COOKIE_BANNER_CLOSE);
    }
  };

  useEffect(() => {
    const cookieObject = getCookieObject(document.cookie);
    const isAccepted = cookieObject[COOKIE_BANNER_NAME] === COOKIE_VALUE;

    appDispatch({
      type: ACTION_TYPES.SET_COOKIE_BANNER_VISIBILITY,
      cookieBannerVisibility: !isAccepted,
    });
    setAcceptance(isAccepted);
  }, []);

  const trackingInlineLink = useCallback(event => {
    eventTrack(COOKIE_BANNER_LINK, { event });
  });

  const showBanner = acceptance === false && copy;

  return showBanner ? (
    <Banner className={className} onClose={closeDisclaimer}>
      <RTE body={copy} onCtaClick={trackingInlineLink} />
    </Banner>
  ) : (
    <></>
  );
};

CookieBanner.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * Cookie Banner data
   */
  data: PropTypes.objectOf(any).isRequired,
};

export default CookieBanner;
