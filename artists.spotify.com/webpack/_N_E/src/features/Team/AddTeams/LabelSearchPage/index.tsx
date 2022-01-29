import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { Type, FormHelpText } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { LabelSearchFormCombobox } from '../../components/LabelSearchFormCombobox';
import { useHistory, useLocation } from 'react-router';
import qs from 'query-string';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var LabelSearchPage = function LabelSearchPage() {
  var _useTeamStore = useTeamStore(),
      selectAddTeamsLabel = _useTeamStore.selectAddTeamsLabel,
      canRequestAccessError = _useTeamStore.addTeams.canRequestAccessError,
      setAddTeamsFlowDetails = _useTeamStore.setAddTeamsFlowDetails;

  var t = useT();
  var history = useHistory();
  var location = useLocation();
  var continueUrl = qs.parse(location.search).continue || '/';

  var handleCreateTeam = function handleCreateTeam(inputValue) {
    setAddTeamsFlowDetails({
      newLabelTeamName: inputValue
    });
    history.push("/add-team/create-team?continue=".concat(continueUrl));
  };

  var errorMessages = {
    'already-team-member': t('ERROR_LABEL_SEARCH_ALREADY_TEAM_MEMBER', "You're already a member of this team.", ''),
    'request-already-pending': t('d2c2c7', 'You have a pending request to join this team.', ''),
    'org-invite-only': t('ab6f7c', 'This team is not accepting requests right now.', ''),
    'unknown-error': t('b1e8b3', 'Something went wrong', '')
  };
  return /*#__PURE__*/_jsxs("div", {
    "data-slo-id": "label-search-page",
    "data-testid": "label-search-page",
    children: [/*#__PURE__*/_jsx(Type, {
      as: "h1",
      variant: Type.heading2,
      children: t('ADD_TEAMS_LABEL_SEARCH_PAGE_TITLE', 'What label team are you joining?', 'select a label you want access to')
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      children: t('ADD_TEAMS_LABEL_SEARCH_PAGE_BODY', 'Use the same label or licensor name as when you submitted your music.', 'Use the same label or licensor name associated with your music on Spotify')
    }), /*#__PURE__*/_jsx(LabelSearchFormCombobox, {
      addTeamsSelectAction: selectAddTeamsLabel,
      onCreateTeamAction: handleCreateTeam
    }), /*#__PURE__*/_jsx(FormHelpText, {
      "data-testid": "label-search-error",
      error: !!canRequestAccessError,
      children: canRequestAccessError && errorMessages[canRequestAccessError]
    })]
  });
};