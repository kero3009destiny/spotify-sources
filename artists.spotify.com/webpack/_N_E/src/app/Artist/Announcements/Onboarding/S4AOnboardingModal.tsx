import React from 'react';
import { Backdrop, DialogConfirmation } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { S4AControls, S4ADescription } from './S4A';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function S4AOnboardingModal(_ref) {
  var updateAnnouncements = _ref.updateAnnouncements,
      twitterInstantAccess = _ref.twitterInstantAccess;
  var t = useT();
  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: updateAnnouncements,
    "data-testid": "onboarding-modal",
    children: /*#__PURE__*/_jsx(DialogConfirmation, {
      dialogTitle: /*#__PURE__*/_jsx("span", {
        children: t('S4A_ONBOARDING_WELCOME_MODAL_HEADING', 'Welcome to Spotify for Artists!', 'Heading for s4a onboarding modal')
      }),
      body: /*#__PURE__*/_jsxs("div", {
        children: [twitterInstantAccess && /*#__PURE__*/_jsx("p", {
          children: t('TWITTER_ACCOUNT_ACCESS_TEXT', 'Your Twitter account got you instant access.', 'Descriptive label that shows an artist that their twitter account got them access.')
        }), /*#__PURE__*/_jsx(S4ADescription, {})]
      }),
      footer: /*#__PURE__*/_jsx(S4AControls, {
        primaryAction: updateAnnouncements
      })
    })
  });
}