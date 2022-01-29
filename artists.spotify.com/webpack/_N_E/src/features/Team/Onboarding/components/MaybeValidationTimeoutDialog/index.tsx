import React, { useEffect } from 'react';
import { Backdrop, ButtonTertiary, DialogAlert } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { CodeVerificationStatus } from '../../store';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { useWebAccessEmailValidationTimeoutDismissalLogger, useWebAccessEmailValidationTimeoutLogger } from '../../store/hooks/useEmailValidationTimeoutDialog';
import { jsx as _jsx } from "react/jsx-runtime";
var InvisibleLink = styled.a.withConfig({
  displayName: "MaybeValidationTimeoutDialog__InvisibleLink",
  componentId: "sc-37084a-0"
})(["text-decoration:none;"]);
export var MaybeValidationTimeoutDialog = function MaybeValidationTimeoutDialog() {
  var _useTeamStore = useTeamStore(),
      _useTeamStore$onboard = _useTeamStore.onboarding,
      labelCodeVerificationStatus = _useTeamStore$onboard.labelAccessFlow.codeVerificationStatus,
      artistCodeVerificationStatus = _useTeamStore$onboard.artistAccessFlow.codeVerificationStatus;

  var t = useT();
  var logTimeoutDialogImpression = useWebAccessEmailValidationTimeoutLogger();
  var logDialogDismissalClick = useWebAccessEmailValidationTimeoutDismissalLogger();
  var showTimeoutDialog = labelCodeVerificationStatus === CodeVerificationStatus.timeout || artistCodeVerificationStatus === CodeVerificationStatus.timeout;
  useEffect(function () {
    if (showTimeoutDialog) {
      logTimeoutDialogImpression();
    }
  });

  if (!showTimeoutDialog) {
    return null;
  }

  var artistOrLabelUrl = artistCodeVerificationStatus === CodeVerificationStatus.timeout ? 'artist' : 'label';
  var homepageUrl = "".concat(window.location.protocol, "//").concat(window.location.host, "/c/team/access/").concat(artistOrLabelUrl);
  var logoutUrl = "https://accounts.spotify.com/logout?continue=".concat(encodeURIComponent(homepageUrl));
  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    className: "encore-creator-light-theme",
    children: /*#__PURE__*/_jsx(DialogAlert, {
      "data-testid": "validation-timeout-dialog",
      dialogTitle: t('VALIDATION_TIMEOUT_DIALOG_TITLE', 'Log in again', 'You need to log in again'),
      body: t('VALIDATION_TIMEOUT_DIALOG_DESCRIPTION', 'Your session timed out. Log back in and reconfirm your email to continue', 'Your session timed out. Please log back in and reconfirm your email'),
      footer: /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(InvisibleLink, {
          href: logoutUrl,
          children: /*#__PURE__*/_jsx(ButtonTertiary, {
            onClick: logDialogDismissalClick,
            semanticColor: "textBrightAccent",
            "data-testid": "confirm-remove-button",
            condensed: true,
            children: t('VALIDATION_TIMEOUT_DIALOG_ACTION', 'Ok', 'Ok')
          })
        })
      })
    })
  });
};