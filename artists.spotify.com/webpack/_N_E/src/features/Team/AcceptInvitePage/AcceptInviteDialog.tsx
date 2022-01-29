import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import { ButtonPrimary, DialogConfirmation, LoadingIndicator } from '@spotify-internal/encore-web';
import { AcceptInviteLegal } from './AcceptInviteLegal';
import { AcceptInviteTitle } from './AcceptInviteTitle';
import { AcceptInviteBody } from './AcceptInviteBody';
import { useTeamStore } from '../lib/store/useTeamStore';
import { usePendingInviteValidationErrors } from '../lib/selectors/usePendingInviteError';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export var AcceptInviteDialog = function AcceptInviteDialog() {
  var _useTeamStore = useTeamStore(),
      pendingInvite = _useTeamStore.pendingInvite,
      setPendingInvite = _useTeamStore.setPendingInvite,
      acceptInvite = _useTeamStore.acceptInvite,
      taskStatus = _useTeamStore.taskStatus;

  var _useState = useState(null),
      acceptingTaskId = _useState[0],
      setAcceptingTaskId = _useState[1];

  var forceError = !!(pendingInvite !== null && pendingInvite !== void 0 && pendingInvite.submitError) || !!acceptingTaskId;
  var errors = usePendingInviteValidationErrors(pendingInvite);
  var isAccepting = !!(acceptingTaskId && taskStatus[acceptingTaskId] === 'running');
  var t = useT();
  var buttonText = isAccepting ? t('ACCEPT_INVITE_BUTTON_TEXT_ACCEPTING_TERMS', 'Accepting...', 'user is accepting terms') : t('ACCEPT_INVITE_BUTTON_TEXT', 'I accept', 'the user clicks the button to accept terms');

  if (!pendingInvite) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {
      className: "encore-creator-dark-theme",
      "data-testid": "invite-loading"
    });
  }

  return /*#__PURE__*/_jsx(DialogConfirmation, {
    dialogTitle: /*#__PURE__*/_jsx(AcceptInviteTitle, {
      teamName: pendingInvite.teamName,
      teamType: pendingInvite.teamType
    }),
    body: /*#__PURE__*/_jsx(AcceptInviteBody, {
      pendingInvite: pendingInvite,
      onChange: function onChange(update) {
        return setPendingInvite(_objectSpread(_objectSpread({}, pendingInvite), update));
      },
      forceError: forceError,
      errors: errors
    }),
    legal: /*#__PURE__*/_jsx(AcceptInviteLegal, {
      didAcceptTerms: pendingInvite.didAcceptTerms,
      onChange: function onChange(didAcceptTerms) {
        return setPendingInvite(_objectSpread(_objectSpread({}, pendingInvite), {}, {
          didAcceptTerms: didAcceptTerms
        }));
      },
      error: errors.get('didAcceptTerms'),
      forceError: forceError,
      teamType: pendingInvite.teamType
    }),
    legalStrict: true,
    footer: /*#__PURE__*/_jsx(ButtonPrimary, {
      "data-testid": "accept-invite-button",
      disabled: errors.size > 0 || isAccepting,
      onClick: function onClick() {
        return setAcceptingTaskId(acceptInvite(pendingInvite, t));
      },
      children: buttonText
    })
  });
};