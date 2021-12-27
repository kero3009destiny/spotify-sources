import React from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import { debounce } from 'lodash';

import { semanticColors, TextLink } from '@spotify-internal/encore-web';

import {
  DCM_URL_PATTERN,
  URL_VALIDATION_DEBOUNCE_TIME_MILLIS,
} from 'components/CreativeForm/Fields/ImpressionTracking/constants';

import { validateDoubleClickTrackingUrl } from 'api/creatives';

import { EXTERNAL_FAQ_ADDRESS } from 'config/routes';

const HELP_CENTER_LINK =
  EXTERNAL_FAQ_ADDRESS[i18n.language]?.AD_CREATION ||
  EXTERNAL_FAQ_ADDRESS.en_US.AD_CREATION;

const INVALID_ERROR = (
  <Trans i18nKey="I18N_INVALID_TRACKING_CODE">
    Invalid tracking code. See our &nbsp;
    <TextLink
      href={HELP_CENTER_LINK}
      target="_blank"
      semanticColor={semanticColors.textBrightAccent}
    >
      Help Center
    </TextLink>
    &nbsp; for more information on implementing tracking tags.
  </Trans>
);

const URL_NOT_FOUND_ERROR = (
  <Trans i18nKey="I18N_TRACKING_URL_NOT_FOUND">
    Tracking code not found. See our &nbsp;
    <TextLink
      href={HELP_CENTER_LINK}
      target="_blank"
      semanticColor={semanticColors.textBrightAccent}
    >
      Help Center
    </TextLink>
    &nbsp; for more information on implementing tracking tags.
  </Trans>
);

// IAS tracking URL must start with https://pixel.adsafeprotected and end in skeleton.gif,
// with optional https at the beginning
export function validateIasTrackingUrl(value: string) {
  const URL_PATTERN = /^(https:\/\/)?pixel\.adsafeprotected\..*skeleton.gif$/;

  if (!value.match(URL_PATTERN)) {
    return INVALID_ERROR;
  }

  return undefined;
}

// Impression tracking url must start with https://ad.doubleclick.net,
export function validateImpressionTrackingUrl(value: string) {
  if (!value.match(DCM_URL_PATTERN)) {
    return INVALID_ERROR;
  }

  return undefined;
}

export async function validateTrackingUrlExists(url: string) {
  return validateDoubleClickTrackingUrl(url)
    .then(_resp => {
      // Successful response is valid
      return undefined;
    })
    .catch(err => {
      if (err.status === 400) {
        return URL_NOT_FOUND_ERROR;
      }
      return INVALID_ERROR;
    });
}

export const validateTrackingUrlExistsDebounced = debounce(
  validateTrackingUrlExists,
  URL_VALIDATION_DEBOUNCE_TIME_MILLIS,
  {
    leading: true,
    trailing: true,
  },
);
