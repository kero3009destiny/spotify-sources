import React, { useState } from 'react';
import { FormCheckbox, FormGroup, FormHelpText } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { TeamType } from '../lib/model/Team';
import { assertUnreachable } from '../lib/util/assertUnreachable';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Container = styled(FormGroup).withConfig({
  displayName: "AcceptInviteLegal__Container",
  componentId: "gfecq9-0"
})(["padding-bottom:0;"]);
var Label = styled.span.withConfig({
  displayName: "AcceptInviteLegal__Label",
  componentId: "gfecq9-1"
})(["font-size:12px;"]);
export var AcceptInviteLegal = function AcceptInviteLegal(_ref) {
  var didAcceptTerms = _ref.didAcceptTerms,
      _onChange = _ref.onChange,
      error = _ref.error,
      forceError = _ref.forceError,
      teamType = _ref.teamType;

  var _useState = useState(false),
      touched = _useState[0],
      setTouched = _useState[1];

  var termsUrl = function () {
    switch (teamType) {
      case TeamType.artist:
        return 'https://spotify.com/us/legal/spotify-for-artists-terms-and-conditions';

      case TeamType.label:
        return 'https://spotify.com/us/legal/spotify-analytics-terms-and-conditions';

      default:
        return assertUnreachable(teamType);
    }
  }();

  var t = useT();
  return /*#__PURE__*/_jsx(Container, {
    children: /*#__PURE__*/_jsxs(FormCheckbox, {
      "data-testid": "invite-accept-terms",
      id: "invite-accept-terms",
      name: "terms",
      checked: didAcceptTerms,
      onChange: function onChange(e) {
        _onChange(e.target.checked);

        setTouched(true);
      },
      children: [/*#__PURE__*/_jsx(Label, {
        dangerouslySetInnerHTML: {
          __html: t('ACCEPT_INVITE_TERMS_TEXT', 'By clicking "I ACCEPT" you agree to <a href="https://www.spotify.com/legal/privacy-policy/" target="_BLANK" rel="noopener noreferrer">Spotify\'s privacy policy</a> and <a href={termsUrl} target="_BLANK" rel="noopener noreferrer"> terms and conditions </a>', 'text with embedded links about terms and privacy policies', {
            termsUrl: termsUrl
          })
        }
      }), error && (touched || forceError) && /*#__PURE__*/_jsx(FormHelpText, {
        "data-testid": "legal-error",
        error: true,
        children: error
      })]
    })
  });
};