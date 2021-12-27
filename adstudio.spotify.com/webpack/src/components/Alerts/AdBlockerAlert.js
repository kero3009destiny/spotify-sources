import React from 'react';
import i18n from 'i18next';

import { Banner } from '@spotify-internal/encore-web';

const AdBlockerAlert = () => (
  <Banner colorSet="warning">
    <strong>
      {i18n.t('I18N_AD_BLOCKER_DETECTED', 'Ad Blocker Detected.')}
    </strong>{' '}
    {i18n.t(
      'I18N_PLEASE_DISABLE_ANY_AD_BLO',
      'Please disable any ad blocking software as it interferes with our ad creation system.',
    )}
  </Banner>
);

export default AdBlockerAlert;
