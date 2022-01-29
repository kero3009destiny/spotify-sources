import React from 'react';
import { Banner } from '@spotify-internal/encore-web';
import { createErrorLoggerHook } from '@mrkt/features/Platform';
import { merchExperience } from '@mrkt/features/experience-definitions';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var useLogError = createErrorLoggerHook({
  experience: merchExperience,
  view: 'merch-tab'
});
export function MerchErrorBanner(_ref) {
  var error = _ref.error,
      message = _ref.message;
  var t = useT();
  useLogError(error);
  return /*#__PURE__*/_jsx(Banner, {
    colorSet: "negative",
    children: message || t('artistprofile_merch_merchtab_errorbanner_1', 'Something went wrong', '')
  });
}