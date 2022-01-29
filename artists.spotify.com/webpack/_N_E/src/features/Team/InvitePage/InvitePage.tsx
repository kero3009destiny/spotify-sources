import _toConsumableArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useMemo, useState } from 'react';
import { ButtonSecondary, Type, ButtonTertiary } from '@spotify-internal/encore-web';
import { TeamPage } from '../components/TeamPage';
import { useTeamStore } from '../lib/store/useTeamStore';
import { TeamMemberDetailsForm } from '../components/TeamMemberDetailsForm';
import { TeamBreadcrumb, TeamRosterBreadcrumb } from '../components/Breadcrumbs';
import { ButtonSecondaryAsLink } from '../../EncoreCreatorWebHelpers';
import { AccessLevel } from '../lib/model/AccessLevel';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var BelowTitle = styled.div.withConfig({
  displayName: "InvitePage__BelowTitle",
  componentId: "sc-1nufgz5-0"
})(["width:75%;"]);
export var InvitePage = function InvitePage() {
  var _useTeamStore = useTeamStore(),
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      layoutType = _useTeamStore.layoutType,
      prepopulatedInviteDetails = _useTeamStore.prepopulatedInviteDetails,
      taskStatus = _useTeamStore.taskStatus,
      sendInvite = _useTeamStore.sendInvite,
      goToTeamPage = _useTeamStore.goToTeamPage,
      currentTeam = _useTeamStore.currentTeam;

  var t = useT();

  var _useState = useState(null),
      sendingTaskId = _useState[0],
      setSendingTaskId = _useState[1];

  var isSendingInvite = !!(sendingTaskId && taskStatus[sendingTaskId] === 'running');
  var initialDetails = useMemo(function () {
    return _objectSpread(_objectSpread({}, prepopulatedInviteDetails), {}, {
      accessLevel: prepopulatedInviteDetails.accessLevel || AccessLevel.Reader
    });
  }, [prepopulatedInviteDetails]);
  var currentTeamName = currentTeamDetails ? currentTeamDetails.name : undefined;

  if (!currentTeam) {
    return null;
  }

  var submitButtonText = t('TEAM_INVITE_PAGE_SUBMIT_BUTTON_TEXT', 'Send invite', 'Team invite page submit button for sending invite');
  var teamPageTitleText = t('TEAM_INVITE_PAGE_TITLE_TEXT', 'Invite', 'Team invite page title text');

  var belowTitle = function belowTitle() {
    return /*#__PURE__*/_jsx(BelowTitle, {
      children: /*#__PURE__*/_jsxs(Type, {
        as: "p",
        variant: "body3",
        semanticColor: "textSubdued",
        children: [/*#__PURE__*/_jsx("div", {
          dangerouslySetInnerHTML: {
            __html: t('TEAM_INVITE_PAGE_TITLE', "You're inviting a new team member to the <strong>{currentTeamName}</strong> team. Enter their information as accurately as you can. They can change it later.", 'invite page below title description', {
              currentTeamName: currentTeamName
            })
          }
        }), layoutType === 'compact' && t('TEAM_INVITE_PAGE_TITLE_COMPACT_LAYOUT', ' Bulk invitations are available on desktop only.', 'Team invite page title for compact layout')]
      })
    });
  };

  return /*#__PURE__*/_jsx(TeamPage, {
    title: teamPageTitleText,
    documentTitle: [t('TEAM_INVITE_PAGE_DOC_TITLE', 'Invite team member', 'Team invite page document title')].concat(_toConsumableArray(currentTeamName ? [currentTeamName] : [])),
    belowTitle: belowTitle(),
    breadcrumbs: currentTeamDetails ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(TeamRosterBreadcrumb, {}), /*#__PURE__*/_jsx(TeamBreadcrumb, {
        team: currentTeamDetails
      })]
    }) : null,
    actions: layoutType === 'full' && /*#__PURE__*/_jsx(ButtonSecondaryAsLink, {
      buttonSize: ButtonSecondary.md,
      to: "/team/".concat(currentTeam.type, "/").concat(currentTeam.id, "/bulkinvite"),
      children: t('TEAM_INVITE_PAGE_BULK_INVITE', 'Bulk invite', 'Bulk invite button on invite page')
    }),
    children: /*#__PURE__*/_jsx(TeamMemberDetailsForm, {
      currentTeamName: currentTeamName,
      currentTeamType: currentTeam.type,
      disableSendWhenClean: false,
      submitButtonText: submitButtonText,
      isSubmitting: isSendingInvite,
      initialDetails: initialDetails,
      otherButtons: /*#__PURE__*/_jsx(ButtonTertiary, {
        "data-testid": "cancel",
        type: "button",
        buttonSize: layoutType === 'compact' ? ButtonTertiary.sm : ButtonTertiary.md,
        onClick: function onClick() {
          return goToTeamPage(currentTeam);
        },
        children: t('TEAM_INVITE_PAGE_CANCEL_BUTTON', 'Cancel', 'Cancel button on team invite page')
      }),
      onSubmit: function onSubmit(d) {
        return setSendingTaskId(sendInvite(d, currentTeam, t));
      },
      submitMessage: t('TEAM_INVITE_PAGE_SUBMIT_MESSAGE', 'Sending invite', 'Submit message when an invite is sent'),
      layoutType: layoutType
    })
  });
};