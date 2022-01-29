import React from 'react';
import { TeamPage } from '../components/TeamPage';
import { TeamRosterTable } from './TeamRosterTable';
import { useTeamStore } from '../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { ButtonPrimary, spacer16, spacer80, FormGroup, spacer32, FormInputIcon, IconSearch, ButtonIcon, IconX, FormInput, spacer48, screenXsMax, IconListView, IconGridView, Type } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useYourTeams } from '../lib/hooks/useYourTeams';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { useFilter } from '../lib/util/useFilter';
import { TeamRosterGrid } from './TeamRosterGrid';
import { useWebTeamsAddTeamButtonLogger, useWebTeamsClearSearchBoxLogger, useWebTeamsSearchBoxLogger, useWebTeamsTableGridViewToggleButtonLogger } from '../lib/hooks/useWebTeamsUbi';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledEmptyStateContainer = styled.div.withConfig({
  displayName: "TeamRosterPage__StyledEmptyStateContainer",
  componentId: "sc-1t3uqqg-0"
})(["padding-top:", ";"], 32);
var StyledEmptyStateTitleContainer = styled.div.withConfig({
  displayName: "TeamRosterPage__StyledEmptyStateTitleContainer",
  componentId: "sc-1t3uqqg-1"
})(["margin-bottom:", ";"], spacer16);
var StyledSearchFormGroup = styled(FormGroup).withConfig({
  displayName: "TeamRosterPage__StyledSearchFormGroup",
  componentId: "sc-1t3uqqg-2"
})(["width:450px;@media (max-width:", "){padding-left:", ";width:100%;}"], screenXsMax, spacer32);
var LoadingContainer = styled.div.withConfig({
  displayName: "TeamRosterPage__LoadingContainer",
  componentId: "sc-1t3uqqg-3"
})(["padding-top:", ";"], spacer80);
var FilterContainer = styled.div.withConfig({
  displayName: "TeamRosterPage__FilterContainer",
  componentId: "sc-1t3uqqg-4"
})(["margin-top:", ";margin-bottom:", ";display:flex;"], spacer32, spacer32);
var StyledSearchBar = styled(FormInput).withConfig({
  displayName: "TeamRosterPage__StyledSearchBar",
  componentId: "sc-1t3uqqg-5"
})(["padding-left:", ";width:450px;@media (max-width:", "){padding-left:", ";width:100%;}"], spacer48, screenXsMax, spacer32);
var StyledViewToggleButtonContainer = styled.div.withConfig({
  displayName: "TeamRosterPage__StyledViewToggleButtonContainer",
  componentId: "sc-1t3uqqg-6"
})(["margin-left:auto;margin-top:auto;margin-bottom:auto;display:flex;"]);
var StyledButtonIcon = styled(ButtonIcon).withConfig({
  displayName: "TeamRosterPage__StyledButtonIcon",
  componentId: "sc-1t3uqqg-7"
})(["align-items:center;display:flex;width:", ";height:", ";border-radius:50%;background-color:", ";justify-content:center;"], spacer48, spacer48, function (props) {
  return props.selected ? '#f5f5f5' : '#FFF';
});
var TABLE_VIEW = 'table';
var GRID_VIEW = 'grid';
var PAGE_SIZE = 25;
export var TeamRosterPage = function TeamRosterPage() {
  var _useTeamStore = useTeamStore(),
      layoutType = _useTeamStore.layoutType,
      yourTeamsPageView = _useTeamStore.yourTeamsPageView,
      setYourTeamsPageView = _useTeamStore.setYourTeamsPageView;

  var t = useT();
  var history = useHistory();

  var _useYourTeams = useYourTeams(),
      isLoading = _useYourTeams.isLoading,
      data = _useYourTeams.data,
      error = _useYourTeams.error;

  var _useTeamStore2 = useTeamStore(),
      showErrorBanner = _useTeamStore2.showErrorBanner;

  var isRtl = useRtl();
  var logAddTeamButton = useWebTeamsAddTeamButtonLogger('/add-team?continue=/team/roster');
  var logSearchBoxKeystroke = useWebTeamsSearchBoxLogger();
  var logClearSearchBox = useWebTeamsClearSearchBoxLogger();
  var logTableViewToggle = useWebTeamsTableGridViewToggleButtonLogger('table view');
  var logGridViewToggle = useWebTeamsTableGridViewToggleButtonLogger('grid view');

  if (error) {
    showErrorBanner(t('TEAM_ROSTER_PAGE_ERROR_BANNER', 'Something went wrong, please try again.', 'Error message when there is an issue'));
  }

  var _useFilter = useFilter(data || [], function (team, value) {
    return (team.name || '').toLowerCase().includes(value.toLowerCase()) || (team.type || '').toLowerCase().includes(value.toLowerCase());
  }),
      filteredItems = _useFilter.filteredItems,
      setFilter = _useFilter.setFilter,
      filter = _useFilter.filter;

  if (!data || isLoading) {
    return /*#__PURE__*/_jsxs(LoadingContainer, {
      "data-testid": "team-roster-page-loading",
      children: [/*#__PURE__*/_jsx(LoadingIndicator, {}), ";"]
    });
  }

  var showEmptyMessage = filteredItems.length === 0;
  return /*#__PURE__*/_jsxs(TeamPage, {
    title: t('YOUR_TEAMS_PAGE_TITLE', 'Your teams', 'all of your teams'),
    "data-testid": "team-roster-page",
    actions: /*#__PURE__*/_jsx(ButtonPrimary, {
      buttonSize: layoutType === 'compact' ? ButtonPrimary.sm : ButtonPrimary.md,
      "data-testid": "add-team-entry-point",
      onClick: function onClick() {
        history.push('/add-team?continue=/team/roster');
        logAddTeamButton();
      },
      children: t('ADD_TEAM_BUTTON_ROSTER_PAGE', 'Add team', 'click this button to request to join a new team')
    }),
    children: [/*#__PURE__*/_jsxs(FilterContainer, {
      children: [/*#__PURE__*/_jsx(StyledSearchFormGroup, {
        label: t('TEAM_ROSTER_PAGE_SEARCH_LABEL', 'Search teams', 'Label for search bar on Team Roster Page'),
        labelFor: "team-search-input",
        children: /*#__PURE__*/_jsx(FormInputIcon, {
          iconLeading: /*#__PURE__*/_jsx(IconSearch, {}),
          iconTrailing: filter !== '' && !isRtl ? /*#__PURE__*/_jsx(ButtonIcon, {
            onClick: function onClick() {
              setFilter('');
              logClearSearchBox();
            },
            children: /*#__PURE__*/_jsx(IconX, {
              iconSize: 24
            })
          }) : undefined,
          children: /*#__PURE__*/_jsx(StyledSearchBar, {
            id: "team-search-input",
            "WAI-aria": "Search members of this team" // added a WAI-aria description to make autoFocusing more accessible

            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            ,
            autoFocus: false,
            "data-testid": "search",
            onChange: function onChange(e) {
              setFilter(e.target.value);
              logSearchBoxKeystroke();
            },
            value: filter
          })
        })
      }), layoutType === 'full' && /*#__PURE__*/_jsxs(StyledViewToggleButtonContainer, {
        children: [/*#__PURE__*/_jsx(StyledButtonIcon, {
          "data-testid": "table-view-button",
          onClick: function onClick() {
            setYourTeamsPageView(TABLE_VIEW);
            logTableViewToggle();
          },
          selected: yourTeamsPageView === TABLE_VIEW,
          children: /*#__PURE__*/_jsx(IconListView, {})
        }), /*#__PURE__*/_jsx(StyledButtonIcon, {
          "data-testid": "grid-view-button",
          onClick: function onClick() {
            setYourTeamsPageView(GRID_VIEW);
            logGridViewToggle();
          },
          selected: yourTeamsPageView === GRID_VIEW,
          children: /*#__PURE__*/_jsx(IconGridView, {})
        })]
      })]
    }), yourTeamsPageView === TABLE_VIEW || layoutType === 'compact' ? /*#__PURE__*/_jsx(TeamRosterTable, {
      teams: filteredItems,
      layoutType: layoutType,
      pageSize: PAGE_SIZE
    }) : /*#__PURE__*/_jsx(TeamRosterGrid, {
      teams: filteredItems,
      pageSize: PAGE_SIZE
    }), showEmptyMessage && /*#__PURE__*/_jsxs(StyledEmptyStateContainer, {
      "data-testid": "empty-state",
      children: [/*#__PURE__*/_jsx(StyledEmptyStateTitleContainer, {
        children: /*#__PURE__*/_jsx(Type, {
          variant: Type.heading3,
          weight: Type.bold,
          children: t('TEAM_ROSTER_PAGE_EMPTY_STATE_TITLE', 'No results available', 'Title of empty state container when no results are available')
        })
      }), /*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: Type.body2,
        children: t('TEAM_ROSTER_PAGE_EMPTY_STATE_BODY', 'Your search might be too specific.', 'Body text of empty state container when no results are available')
      })]
    })]
  });
};