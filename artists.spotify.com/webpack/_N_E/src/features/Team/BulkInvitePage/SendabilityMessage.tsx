import React from 'react';
import { ErrSpan as Err } from './layout/ErrSpan';
import { useT } from '@mrkt/features/i18n';
import { BulkInviteStage } from './store/BulkInviteState';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var SendabilityMessage = function SendabilityMessage(_ref) {
  var numInvitesSent = _ref.numInvitesSent,
      numInvitesWithError = _ref.numInvitesWithError,
      numInvitesToSend = _ref.numInvitesToSend,
      numInvitesOmitted = _ref.numInvitesOmitted,
      stage = _ref.stage;
  var t = useT();

  var baseMessage = function () {
    // all groups are present
    if ([numInvitesSent, numInvitesToSend, numInvitesWithError].some(function (total) {
      return total > 0;
    })) {
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [numInvitesToSend > 0 && /*#__PURE__*/_jsx("div", {
          children: t('TEAM_BULK_INVITES_DRAFTED_INVITES', "\n                {numInvitesToSend, plural,\n                  one {{numInvitesToSend} invitation}\n                  other {{numInvitesToSend} invitations}} drafted.", 'Number of drafted invites.', {
            numInvitesToSend: numInvitesToSend
          })
        }), numInvitesSent > 0 && /*#__PURE__*/_jsx("div", {
          children: t('TEAM_BULK_INVITES_SENT_INVITES', "\n                {numInvitesSent, plural,\n                  one {{numInvitesSent} invitation}\n                  other {{numInvitesSent} invitations}} sent.", 'Number of sent invites.', {
            numInvitesSent: numInvitesSent
          })
        }), numInvitesWithError > 0 && /*#__PURE__*/_jsx(Err, {
          children: t('TEAM_BULK_INVITES_ERRORED_INVITES', "\n                {numInvitesWithError, plural,\n                  one {{numInvitesWithError} incomplete invitation}\n                  other {{numInvitesWithError} incomplete invitations}}.", 'Number of invites with error and incomplete.', {
            numInvitesWithError: numInvitesWithError
          })
        })]
      });
    } // no groups are present (not applicable) or file hasn't been uploaded


    return null;
  }(); // The 100-limit message isn't shown when status is "Sent" since they've moved on from
  // the upload + verify stage where it's relevant


  if (numInvitesOmitted === 0 || stage === BulkInviteStage.Sent) {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: baseMessage
    });
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("b", {
      children: t('TEAM_BULK_INVITE_NOTES', "\n            First 100 invitations imported. Last {numInvitesOmitted} {numInvitesOmitted, plural,\n        one {wasn't}\n        other {weren't}} imported. Add the rest\n        in your next batch.", '100 Invite note about remaining invites', {
        numInvitesOmitted: numInvitesOmitted
      })
    }), /*#__PURE__*/_jsx("br", {}), " ", baseMessage]
  });
};