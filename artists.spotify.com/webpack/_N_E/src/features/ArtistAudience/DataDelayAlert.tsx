import React from 'react';
import { PageAlert } from '../../shared/components/PageAlert';
import { useT } from '@mrkt/features/i18n';
import { useImpressionUBILogger } from '@mrkt/features/ubi';
import { ubiAudienceSpec } from './ubiAudienceSpec';
import { jsx as _jsx } from "react/jsx-runtime";
export var DataDelayAlert = function DataDelayAlert() {
  var t = useT();
  var impressionFactory = ubiAudienceSpec().dataDelayBannerFactory();

  var _useImpressionUBILogg = useImpressionUBILogger(impressionFactory),
      ref = _useImpressionUBILogg.ref;

  return /*#__PURE__*/_jsx(PageAlert, {
    type: "warning",
    title: t('DATA_DELAY_ALERT_69cad6', 'We’re having trouble updating stats in Spotify for Artists.', ''),
    subtitle: t('DATA_DELAY_ALERT_6dce52', 'Hang tight while we fix a problem on our end.', ''),
    ref: ref
  });
};