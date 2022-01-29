// ignore-string-externalization
import React, { useState } from 'react';
import { ActivityTable } from './components/ActivityTable';
import { TeamMemberSearchCombobox } from './components/TeamMemberSearchCombobox';
import { useActivityFeed } from './lib/hooks/useActivityFeed';
import { useTeamStore } from '../lib/store/useTeamStore';
import { ActivityEmptyState } from './components/ActivityEmptyState';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var Activity = function Activity() {
  var _activityFeed$data;

  var _useTeamStore = useTeamStore(),
      selectedTeamMember = _useTeamStore.activity.selectedTeamMember,
      currentTeamDetails = _useTeamStore.currentTeamDetails;

  var activityFeed = useActivityFeed(selectedTeamMember === null || selectedTeamMember === void 0 ? void 0 : selectedTeamMember.username, currentTeamDetails === null || currentTeamDetails === void 0 ? void 0 : currentTeamDetails.uri);
  var queryState = useState(selectedTeamMember ? selectedTeamMember.name : '');
  var emptyState = ((_activityFeed$data = activityFeed.data) === null || _activityFeed$data === void 0 ? void 0 : _activityFeed$data.pages[0].activity.length) === 0;
  var showEmptyStateMessage = emptyState && !selectedTeamMember;
  var showEmptySearchResultMessage = !!(emptyState && selectedTeamMember);

  if (showEmptyStateMessage) {
    return /*#__PURE__*/_jsx(ActivityEmptyState, {});
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(TeamMemberSearchCombobox, {
      queryState: queryState
    }), showEmptySearchResultMessage ? /*#__PURE__*/_jsx(ActivityEmptyState, {
      withSearch: true,
      setQuery: queryState[1]
    }) : /*#__PURE__*/_jsx(ActivityTable, {
      activityFeed: activityFeed
    })]
  });
};