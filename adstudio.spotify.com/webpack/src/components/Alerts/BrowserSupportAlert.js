import React from 'react';
import i18n from 'i18next';

import { Banner } from '@spotify-internal/encore-web';

const BrowserSupportAlert = () => (
  <Banner colorSet="warning">
    {i18n.t(
      'I18N_WE_NO_LONGER_SUPPORT_THIS',
      'We no longer support this version of your browser. Please use the latest version of Chrome, Firefox, Edge, or Safari.',
    )}
  </Banner>
);

export default BrowserSupportAlert;
