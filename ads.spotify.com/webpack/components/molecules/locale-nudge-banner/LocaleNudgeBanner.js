import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useAppContext, ACTION_TYPES } from 'contexts/app-context';
import { Banner } from 'components/organisms';
import { Cta } from 'components/atoms/cta';
import { getCookieObject } from 'utils/get-cookie-object';
import { useTranslation } from 'i18n/nexti18n';
import { COOKIE_LOCALE_NAME, COOKIE_VALUE } from 'constants/cookies';
import * as Styled from './LocaleNudgeBanner.styled';

/**
 * Renders a Locale Nudge Banner Component. Displayed until dismissed by a user.
 * Once accepted/dismissed, a cookie is set hiding the component
 * @param {string|null} className The component class name.
 * @returns {ReactElement}
 */
const LocaleNudgeBanner = ({ className = null }) => {
  const [acceptance, setAcceptance] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const { t } = useTranslation();
  const [appState, appDispatch] = useAppContext();
  const { localeNudge, cookieBannerVisibility } = appState;

  useEffect(() => {
    const cookieObject = getCookieObject(document.cookie);
    const isLocaleAccepted = cookieObject[COOKIE_LOCALE_NAME] === COOKIE_VALUE;

    setShowBanner(
      !!localeNudge && !cookieBannerVisibility && !isLocaleAccepted,
    );
    setAcceptance(isLocaleAccepted);
  }, [cookieBannerVisibility, acceptance]);

  const closeLocaleNudge = useCallback(() => {
    if (!acceptance) {
      document.cookie = `${COOKIE_LOCALE_NAME}=${COOKIE_VALUE}`;
      setAcceptance(true);
    }
  });

  const ctaClick = useCallback(event => {
    event.preventDefault();
    appDispatch({
      type: ACTION_TYPES.SET_MODAL_LOCALE_VISIBLE,
      visible: true,
    });
    closeLocaleNudge();
  });

  return (
    showBanner && (
      <Banner className={className} onClose={closeLocaleNudge}>
        <Styled.Description>
          {t('localeNudgeBanner.description')}
        </Styled.Description>
        <Styled.CtaContainer>
          <Cta type="Secondary" onClick={ctaClick}>
            {t('localeNudgeBanner.ctaText')}
          </Cta>
        </Styled.CtaContainer>
      </Banner>
    )
  );
};

LocaleNudgeBanner.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
};

export default LocaleNudgeBanner;
