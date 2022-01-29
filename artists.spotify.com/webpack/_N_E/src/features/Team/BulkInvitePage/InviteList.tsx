import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import styled from 'styled-components';
import { Type, gray40, spacer24, spacer72 } from '@spotify-internal/encore-web';
import { ButtonContainer } from './layout';
import { EditInviteCard } from './EditInviteCard';
import { ViewInviteCard } from './ViewInviteCard';
import { SendButton } from './SendButton';
import { ButtonPrimaryAsLink } from '../../EncoreCreatorWebHelpers';
import { useTeamStore } from '../lib/store/useTeamStore';
import { bulkInvite } from '../lib/events';
import { useT } from '@mrkt/features/i18n';
import { useBulkInviteEditButtonLogger } from './hooks/useBulkInviteUbi';
import { InviteState } from './store/BulkInviteState';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Container = styled.div.withConfig({
  displayName: "InviteList__Container",
  componentId: "sc-5634vr-0"
})(["margin-top:", ";"], spacer72);
var LegalText = styled(Type.p).withConfig({
  displayName: "InviteList__LegalText",
  componentId: "sc-5634vr-1"
})(["color:", ";font-weight:300;margin-bottom:", ";"], gray40, spacer24);
export var InviteList = function InviteList(_ref) {
  var invites = _ref.invites,
      isSending = _ref.isSending,
      teamName = _ref.teamName,
      numInvitesToSend = _ref.numInvitesToSend,
      sendabilityMessage = _ref.sendabilityMessage,
      isComplete = _ref.isComplete,
      backUrl = _ref.backUrl,
      trackEvent = _ref.trackEvent;

  var _useTeamStore = useTeamStore(),
      saveInvite = _useTeamStore.saveInvite,
      cancelUpdateInvite = _useTeamStore.cancelUpdateInvite,
      removeInvite = _useTeamStore.removeInvite,
      editInvite = _useTeamStore.editInvite;

  var t = useT();
  var logInviteEdit = useBulkInviteEditButtonLogger();

  var canEdit = function canEdit(invite) {
    return invite.state === InviteState.VIEWING && !isSending;
  };

  var renderInvite = function renderInvite(invite) {
    if (!isSending && invite.state === InviteState.EDITING) {
      return /*#__PURE__*/_jsx(EditInviteCard, {
        details: invite.details,
        onUpdate: function onUpdate(details) {
          trackEvent(bulkInvite.editedInvite(invite.validationErrors.length > 0 ? 'error' : 'valid'));
          saveInvite(_objectSpread(_objectSpread({}, invite), {}, {
            details: details
          }));
        },
        onCancel: function onCancel() {
          return cancelUpdateInvite(invite.id);
        },
        onRemove: function onRemove() {
          return removeInvite(invite.id);
        }
      }, invite.id);
    }

    return /*#__PURE__*/_jsx(ViewInviteCard, {
      invite: invite,
      onEdit: canEdit(invite) ? function () {
        editInvite(invite.id);
        logInviteEdit();
        trackEvent(bulkInvite.editInvite(invite.validationErrors.length > 0 ? 'error' : 'valid'));
      } : undefined
    }, invite.id);
  };

  var renderActionSection = function renderActionSection() {
    if (isComplete) {
      return /*#__PURE__*/_jsx(Container, {
        children: /*#__PURE__*/_jsx(ButtonContainer, {
          children: /*#__PURE__*/_jsx(ButtonPrimaryAsLink, {
            to: backUrl,
            "data-testid": "back-action",
            children: t('TEAM_BULK_INVITE_LIST_DONE_BUTTON', 'Done', 'Done Button on bulk inviting of members to the Team')
          })
        })
      });
    }

    return /*#__PURE__*/_jsxs(Container, {
      children: [/*#__PURE__*/_jsx(Type, {
        as: Type.p,
        variant: Type.body1,
        "data-testid": "sendability-message",
        children: sendabilityMessage
      }), /*#__PURE__*/_jsx(LegalText, {
        variant: Type.body3,
        children: t('TEAM_BULK_INVITE_LIST_AGREEMENT_TEXT', 'By hitting Send, you agree to grant these team members the above levels of access to {teamName} content.', 'Invite page agreement text.', {
          teamName: teamName
        })
      }), /*#__PURE__*/_jsx(ButtonContainer, {
        children: /*#__PURE__*/_jsx(SendButton, {
          isSending: isSending,
          numInvitesToSend: numInvitesToSend,
          positionForAnalytics: "bottom"
        })
      })]
    });
  };

  return /*#__PURE__*/_jsxs("div", {
    "data-testid": "invite-list",
    children: [invites.map(renderInvite), renderActionSection()]
  });
};