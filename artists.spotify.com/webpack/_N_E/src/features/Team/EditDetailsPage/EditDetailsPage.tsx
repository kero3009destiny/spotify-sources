import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonTertiary, LoadingIndicator, Type, screenSmMin, spacer4, spacer8, spacer16, spacer24, spacer48, spacer64, screenXsMax } from '@spotify-internal/encore-web';
import { TeamPage } from '../components/TeamPage';
import { getNames } from '../lib';
import { useTeamStore } from '../lib/store/useTeamStore';
import { TeamMemberDetailsForm } from '../components/TeamMemberDetailsForm';
import { TeamBreadcrumb, TeamRosterBreadcrumb } from '../components/Breadcrumbs';
import { MaybeTeamMemberRemovalDialog } from '../components/MaybeTeamMemberRemovalDialog';
import { MaybeBillingContactUpdateDialog } from '../BillingContact/components/MaybeBillingContactUpdateDialog';
import { useHistory } from 'react-router';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var InputContainer = styled.div.withConfig({
  displayName: "EditDetailsPage__InputContainer",
  componentId: "m521gv-0"
})(["@media (min-width:", "){display:flex;flex-wrap:wrap;}"], screenSmMin);
export var RemovalText = styled(Type.h1).withConfig({
  displayName: "EditDetailsPage__RemovalText",
  componentId: "m521gv-1"
})(["padding-top:", ";"], spacer48);
export var HorizontalLine = styled.hr.withConfig({
  displayName: "EditDetailsPage__HorizontalLine",
  componentId: "m521gv-2"
})(["margin-top:", ";margin-bottom:", ";"], spacer64, spacer24);
var StyledHeaderContainer = styled.div.withConfig({
  displayName: "EditDetailsPage__StyledHeaderContainer",
  componentId: "m521gv-3"
})(["hyphens:auto;overflow-wrap:break-word;margin-right:", ";word-wrap:break-word;@media (max-width:", "){margin-top:", ";margin-bottom:", ";}"], spacer16, screenXsMax, spacer4, spacer8);
var StyledLoadingIndicatorContainer = styled.div.withConfig({
  displayName: "EditDetailsPage__StyledLoadingIndicatorContainer",
  componentId: "m521gv-4"
})(["margin-top:20%;text-align:center;"]);
export var EditDetailsPage = function EditDetailsPage() {
  var _useTeamStore = useTeamStore(),
      billingContactId = _useTeamStore.billingContact.billingContactId,
      currentTeam = _useTeamStore.currentTeam,
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      selectedTeamMember = _useTeamStore.selectedTeamMember,
      currentUser = _useTeamStore.currentUser,
      layoutType = _useTeamStore.layoutType,
      showBillingContactSpeedbump = _useTeamStore.showBillingContactSpeedbump,
      showTeamMemberRemovalConfirmation = _useTeamStore.showTeamMemberRemovalConfirmation,
      saveTeamMemberDetails = _useTeamStore.saveTeamMemberDetails,
      taskStatus = _useTeamStore.taskStatus,
      selectActivityTeamMember = _useTeamStore.selectActivityTeamMember;

  var _useState = useState(null),
      submittingTaskId = _useState[0],
      setSubmittingTaskId = _useState[1];

  var history = useHistory();
  var t = useT();
  var isSubmitting = !!(submittingTaskId && taskStatus[submittingTaskId] === 'running');

  if (!selectedTeamMember || !currentTeam || !currentUser) {
    return /*#__PURE__*/_jsx(StyledLoadingIndicatorContainer, {
      children: /*#__PURE__*/_jsx(LoadingIndicator, {
        "data-testid": "edit-details-page-loading"
      })
    });
  }

  var fullName = selectedTeamMember.fullName,
      username = selectedTeamMember.username,
      selectedTeamMemberId = selectedTeamMember.id;
  var teamType = currentTeam.type,
      teamId = currentTeam.id;
  var firstName = fullName === '' ? username : getNames(fullName).firstName;
  var teamMemberIsBillingContact = selectedTeamMemberId === billingContactId;
  var teamMemberIsCurrentUser = username === currentUser.username;

  var headerFragment = /*#__PURE__*/_jsx(StyledHeaderContainer, {
    children: fullName || username
  });

  var handleOnSave = function handleOnSave(updatedTeamMember) {
    if (teamMemberIsBillingContact) {
      var removeMember = false;
      showBillingContactSpeedbump(selectedTeamMember, removeMember);
    } else {
      setSubmittingTaskId(saveTeamMemberDetails(currentTeam, selectedTeamMember, _objectSpread(_objectSpread({}, selectedTeamMember), updatedTeamMember), teamMemberIsCurrentUser, t));
    }
  };

  return /*#__PURE__*/_jsxs(TeamPage, {
    title: headerFragment,
    breadcrumbs: currentTeamDetails ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(TeamRosterBreadcrumb, {}), /*#__PURE__*/_jsx(TeamBreadcrumb, {
        team: currentTeamDetails
      })]
    }) : null,
    documentTitle: currentTeamDetails ? [fullName, currentTeamDetails.name] : [fullName],
    actions: /*#__PURE__*/_jsx(ButtonTertiary, {
      condensed: true,
      semanticColor: "textBrightAccent",
      onClick: function onClick() {
        selectActivityTeamMember({
          username: username,
          name: fullName || username
        });
        history.push("/team/".concat(teamType, "/").concat(teamId, "/activity"));
      },
      children: t('EDIT_DETAILS_SEE_ACTIVITY_LINK', 'See activity', "See this team member's activity on this team")
    }),
    children: [/*#__PURE__*/_jsx(TeamMemberDetailsForm, {
      layoutType: layoutType,
      initialDetails: selectedTeamMember,
      disabledFields: teamMemberIsCurrentUser ? new Set() : new Set(['firstName', 'lastName', 'businessEmail']),
      submitButtonText: t('EDIT_DETAILS_SAVE_BUTTON', 'Save', 'Save team member details'),
      onSubmit: handleOnSave,
      currentTeamName: currentTeamDetails && currentTeamDetails.name,
      currentTeamType: currentTeam.type,
      isSubmitting: isSubmitting
    }), !teamMemberIsCurrentUser && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(HorizontalLine, {}), /*#__PURE__*/_jsx(RemovalText, {
        variant: Type.heading3,
        children: t('EDIT_DETAILS_REMOVE_TEAM_MEMBER_HEADING', 'Remove team member', 'Remove team member section heading')
      }), /*#__PURE__*/_jsx(Type.p, {
        children: currentTeamDetails ? t('EDIT_DETAILS_REMOVE_TEAM_MEMBER_DESCRIPTION_WITH_TEAM_NAME', "This will remove {firstName}'s access to {teamName}", 'Removing a team member will remove their access to the team', {
          firstName: firstName,
          teamName: currentTeamDetails.name
        }) : t('EDIT_DETAILS_REMOVE_TEAM_MEMBER_DESCRIPTION', "This will remove {firstName}'s access to the team", 'Removing a team member will remove their access to the team', {
          firstName: firstName
        })
      }), /*#__PURE__*/_jsx(ButtonTertiary, {
        semanticColor: "textNegative",
        "data-testid": "remove-modal",
        condensed: true,
        onClick: function onClick() {
          if (teamMemberIsBillingContact) {
            var removeMember = true;
            showBillingContactSpeedbump(selectedTeamMember, removeMember);
          } else {
            showTeamMemberRemovalConfirmation(selectedTeamMember);
          }
        },
        children: t('EDIT_DETAILS_REMOVE_BUTTON', 'Remove', 'Remove this team member')
      })]
    }), /*#__PURE__*/_jsx(MaybeTeamMemberRemovalDialog, {}), /*#__PURE__*/_jsx(MaybeBillingContactUpdateDialog, {})]
  });
};