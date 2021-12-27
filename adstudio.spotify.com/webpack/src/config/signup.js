import React from 'react';
import { Trans } from 'react-i18next';
import { window } from 'global';
import i18n from 'i18next';

import {
  SIGNUP_COMPLETE_ENROLLED,
  SIGNUP_COMPLETE_VERIFICATION,
  SIGNUP_INDUSTRY_FORBIDDEN,
} from 'config/googleTagManager';
import { routes } from 'config/routes';

export const SIGNUP_REQUEST_FAILED_MESSAGE = i18n.t(
  'I18N_SOMETHING_WENT_WRONG_WHIL2',
  'Something went wrong while creating your account. Please try again. If you continue to have problems, contact us at adstudio@spotify.com.',
);

export const states = {
  REQUEST_PENDING: 'request-pending',
  REQUEST_SUCCESS: 'request-success',
  REQUEST_FAILURE: 'request-failure',
};

export const SIGNUP_STATUSES = {
  ENROLLED: 'ENROLLED',
  FUTURE_MARKET: 'FUTURE_MARKET',
  LEGACY_WAITLIST: 'LEGACY_WAITLIST',
  VAT_REQUIRED: 'VAT_REQUIRED',
  VERIFICATION_REQUIRED: 'VERIFICATION_REQUIRED',
  VERIFICATION_REQUIRED_BREXIT: 'VERIFICATION_REQUIRED_BREXIT',
  INDUSTRY_FORBIDDEN: 'INDUSTRY_FORBIDDEN',
};

export const DEFAULT_CONFIRMATION_STATUS = SIGNUP_STATUSES.LEGACY_WAITLIST;

export const SIGNUP_CONFIRMATION = {
  [SIGNUP_STATUSES.ENROLLED]: {
    gtmTag: SIGNUP_COMPLETE_ENROLLED,
    redirect: `${window.location.origin}${routes.BROWSE_ADS}${window.location.search}`,
  },

  [SIGNUP_STATUSES.FUTURE_MARKET]: {
    gtmTag: SIGNUP_COMPLETE_VERIFICATION,
    header: i18n.t('I18N_WE_LL_BE_IN_TOUCH1', "We'll be in touch"),
    subcopy: () =>
      i18n.t(
        'I18N_WE_LL_REACH_OUT_ONCE_AD_S',
        "Thank you for your interest in Spotify Ad Studio. You'll receive an invitation by email when Ad Studio is available for testing.",
      ),
  },

  [SIGNUP_STATUSES.LEGACY_WAITLIST]: {
    gtmTag: SIGNUP_COMPLETE_VERIFICATION,
    header: i18n.t(
      'I18N_WE_LL_BE_IN_TOUCH_SHORTLY1',
      "We'll be in touch shortly",
    ),
    subcopy: () =>
      i18n.t(
        'I18N_WE_RE_VERIFYING_YOUR_ACCO',
        "We're verifying your account details and will send you an email within 3-5 business days.",
      ),
  },

  [SIGNUP_STATUSES.VAT_REQUIRED]: {
    gtmTag: SIGNUP_COMPLETE_VERIFICATION,
    header: i18n.t('I18N_WE_LL_BE_IN_TOUCH1', "We'll be in touch"),
    subcopy: ({ taxIdLabel }) => {
      return `${i18n.t('I18N_A_CORRECT_IS_REQUIRED_TO', {
        taxIdLabel,
        defaultValue:
          'A correct {{taxIdLabel}} is required to finish setting up your account. Contact the Ad Studio team at adstudio@spotify.com for assistance.',
      })}`;
    },
  },

  [SIGNUP_STATUSES.VERIFICATION_REQUIRED]: {
    gtmTag: SIGNUP_COMPLETE_VERIFICATION,
    header: i18n.t(
      'I18N_WE_LL_BE_IN_TOUCH_SHORTLY1',
      "We'll be in touch shortly",
    ),
    subcopy: ({ taxIdLabel }) => {
      return `${i18n.t('I18N_WE_RE_VERIFYING_YOUR_AND', {
        taxIdLabel,
        defaultValue:
          "We're verifying your {{taxIdLabel}} and will send you an email within 3-5 business days.",
      })}`;
    },
  },

  [SIGNUP_STATUSES.VERIFICATION_REQUIRED_BREXIT]: {
    gtmTag: SIGNUP_COMPLETE_VERIFICATION,
    header: i18n.t(
      'I18N_WE_LL_BE_IN_TOUCH_SHORTLY',
      "We'll be in touch shortly.",
    ),
    subcopy: i18n.t(
      'I18N_WE_RE_VERIFIYING_YOUR_TAX_BREXIT',
      'Thank you for your interest in Ad Studio. As a result of BREXIT, we are conducting tax ID/VAT reviews manually and may be delayed in reaching out. We will send you an email validating your account within 1-3 business days. If you have any questions, please reach out to adstudio@spotify.com',
    ),
  },
  [SIGNUP_STATUSES.INDUSTRY_FORBIDDEN]: {
    gtmTag: SIGNUP_INDUSTRY_FORBIDDEN,
    header: i18n.t(
      'I18N_WE_RE_NOT_ACCEPTING_POLIT',
      'We’re not accepting political ads at this time.',
    ),
    subcopy: (
      <span>
        <Trans i18nKey="I18N_TO_LEARN_MORE_READ_OUR_U">
          To learn more, read our updated policy{' '}
          <a
            href="https://www.spotify.com/us/brands/legal/advertiser-terms-and-conditions/#s4"
            className="signup-link"
          >
            here
          </a>
          . If you have any questions, email us at
          <a href="mailto:adstudio@spotify.com" className="signup-link">
            adstudio@spotify.com
          </a>
          .
        </Trans>
      </span>
    ),
    showCta: false,
    redirect: false,
  },
};
