import React from 'react';
import i18n from 'i18next';

import { Banner } from '@spotify-internal/encore-web';

const OfflineAlert = () => (
  <Banner colorSet="warning">
    <strong>{i18n.t('I18N_COMPUTER_OFFLINE', 'Computer Offline')}</strong>{' '}
    {i18n.t(
      'I18N_PLEASE_CONNECT_TO_THE_INT',
      'Please connect to the internet to load the latest data.',
    )}
  </Banner>
);

export default OfflineAlert;
