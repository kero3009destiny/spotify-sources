import { ButtonTertiary, EmptyState, EmptyStateTitle, EmptyStateText } from '@spotify-internal/encore-web';
import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ActivityEmptyState = function ActivityEmptyState(_ref) {
  var _ref$withSearch = _ref.withSearch,
      withSearch = _ref$withSearch === void 0 ? false : _ref$withSearch,
      setQuery = _ref.setQuery;

  var _useTeamStore = useTeamStore(),
      selectActivityTeamMember = _useTeamStore.selectActivityTeamMember;

  var t = useT();
  return /*#__PURE__*/_jsx("div", {
    "data-testid": "activity-empty-state",
    children: /*#__PURE__*/_jsxs(EmptyState, {
      variant: "contextual",
      iconColorSet: "announcement",
      children: [/*#__PURE__*/_jsx(EmptyStateTitle, {
        children: withSearch ? t('ACTIVITY_EMPTY_STATE_WITH_SEARCH_TITLE', 'Try a different search', 'empty state with search title, try a different search') : t('ACTIVITY_EMPTY_STATE_TITLE', 'No activity yet', 'empty state title, no activities available for this team')
      }), /*#__PURE__*/_jsx(EmptyStateText, {
        children: withSearch ? t('ACTIVITY_EMPTY_STATE_WITH_SEARCH_BODY', "There's no activity for this team member.", 'empty state with search body, your search might be too specific') : t('ACTIVITY_EMPTY_STATE_BODY', 'All your team actions, like pitching a new release, will show up here.', 'there are no activities for this team yet')
      }), setQuery && /*#__PURE__*/_jsx(ButtonTertiary, {
        semanticColor: "textBrightAccent",
        onClick: function onClick() {
          selectActivityTeamMember(null);
          setQuery && setQuery('');
        },
        children: t('ACTIVITY_EMPTY_STATE_RESET_FILTERS_BUTTON', 'Reset filters', 'reset the team member search filter')
      })]
    })
  });
};