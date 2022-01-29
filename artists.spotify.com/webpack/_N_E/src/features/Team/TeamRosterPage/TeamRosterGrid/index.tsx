import { AccessLevel, accessLevelName } from '../../lib';
import { useTeamStore } from '../../lib/store/useTeamStore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { spacer16, Type, spacer24, TablePagination, PaginationControls } from '@spotify-internal/encore-web';
import { BadgeWithText } from '@mrkt/features/badge';
import { useT } from '@mrkt/features/i18n';
import { useHistory } from 'react-router';
import { NoTeamAccessDialog } from '../NoTeamAccessDialog';
import { usePagination } from '../../lib/util/usePagination';
import { IconBadge } from '../../components/IconBadge/IconBadge';
import { useWebTeamsTableDataRowClickLogger } from '../../lib/hooks/useWebTeamsUbi';
import { AccessLevelIcons } from '../constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var StyledAccessLevelBadge = styled(BadgeWithText).withConfig({
  displayName: "TeamRosterGrid__StyledAccessLevelBadge",
  componentId: "sc-17m2hc3-0"
})(["height:", ";margin:", ";"], spacer24, spacer16);
var GridContainer = styled.div.withConfig({
  displayName: "TeamRosterGrid__GridContainer",
  componentId: "sc-17m2hc3-1"
})(["display:flex;flex-wrap:wrap;"]);
var TeamCardContainer = styled.div.withConfig({
  displayName: "TeamRosterGrid__TeamCardContainer",
  componentId: "sc-17m2hc3-2"
})(["width:300px;height:280px;border:1px solid #dedede;box-sizing:border-box;border-radius:4px;margin:12px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;&:hover{background-color:#f5f5f5;}"]);
var TextContainer = styled.div.withConfig({
  displayName: "TeamRosterGrid__TextContainer",
  componentId: "sc-17m2hc3-3"
})(["margin-left:16px;margin-right:16px;margin-bottom:18px;"]);
var BadgeContainer = styled.div.withConfig({
  displayName: "TeamRosterGrid__BadgeContainer",
  componentId: "sc-17m2hc3-4"
})(["display:flex;justify-content:space-between;"]);
var StyledIconBadge = styled(IconBadge).withConfig({
  displayName: "TeamRosterGrid__StyledIconBadge",
  componentId: "sc-17m2hc3-5"
})(["margin:", ";"], spacer16);
var TeamName = styled(Type).attrs({
  forwardedAs: 'h1',
  variant: 'heading2'
}).withConfig({
  displayName: "TeamRosterGrid__TeamName",
  componentId: "sc-17m2hc3-6"
})(["padding-bottom:12px;display:block;display:-webkit-box;max-width:100%;max-height:87px;margin:0 auto;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;"]);
var TeamType = styled(Type).attrs({
  forwardedAs: 'p',
  variant: 'body1'
}).withConfig({
  displayName: "TeamRosterGrid__TeamType",
  componentId: "sc-17m2hc3-7"
})(["padding:0;"]);
var Admins = styled(Type).attrs({
  forwardedAs: 'p',
  variant: 'body3',
  semanticColor: 'textSubdued'
}).withConfig({
  displayName: "TeamRosterGrid__Admins",
  componentId: "sc-17m2hc3-8"
})(["padding:0;"]);

var teamTypeFromUri = function teamTypeFromUri(team) {
  return team.uri.split(':')[1];
};

var TeamCard = function TeamCard(_ref) {
  var _team$adminFullNames;

  var team = _ref.team,
      _onClick = _ref.onClick,
      index = _ref.index;
  var t = useT();

  var _useTeamStore = useTeamStore(),
      currentUser = _useTeamStore.currentUser;

  var isLabelTeam = team.uri.split(':')[1] === 'label';
  var randomizedAdmins = (_team$adminFullNames = team.adminFullNames) === null || _team$adminFullNames === void 0 ? void 0 : _team$adminFullNames.sort(function () {
    return Math.random() - Math.random();
  });
  var currentUserIsAdmin = team.group === AccessLevel.Admin;
  var shortenedListOfAdmins = [];

  if (currentUserIsAdmin && currentUser && randomizedAdmins) {
    shortenedListOfAdmins = randomizedAdmins.filter(function (admin) {
      return admin !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.name);
    }).slice(0, 1).map(function (name) {
      return name.split(' ')[0];
    });
    shortenedListOfAdmins.unshift(t('TEAM_ROSTER_GRID_ADMIN_LIST', 'You', 'You are an admin on this team.'));
  } else if (randomizedAdmins) {
    shortenedListOfAdmins = randomizedAdmins.slice(0, 2).map(function (name) {
      return name.split(' ')[0];
    });
  }

  var admins = function admins() {
    var adminList = "".concat(shortenedListOfAdmins.join(', ')).concat(randomizedAdmins && randomizedAdmins.length > 2 ? ", +".concat(randomizedAdmins.length - 2) : '');

    if (shortenedListOfAdmins.length === 0) {
      return t('TEAM_ROSTER_GRID_NO_ADMINS', 'Admin: No admin', 'There are no admins on this team.');
    } else if (shortenedListOfAdmins.length === 1) {
      return t('TEAM_ROSTER_GRID_ONE_ADMIN', 'Admin: {adminName}', 'There is one admin on this team.', {
        adminName: shortenedListOfAdmins[0]
      });
    }

    return t('TEAM_ROSTER_GRID_TWO_OR_MORE_ADMINS', 'Admins: {adminList}', 'There are two or more admins on this team.', {
      adminList: adminList
    });
  };

  var truncateTeamName = function truncateTeamName(teamName) {
    if (teamName.length > 30) {
      return "".concat(teamName.slice(0, 30), "...");
    }

    return teamName;
  };

  return /*#__PURE__*/_jsxs(TeamCardContainer, {
    onClick: function onClick() {
      return _onClick(index);
    },
    "data-testid": "team-card",
    children: [/*#__PURE__*/_jsxs(BadgeContainer, {
      children: [/*#__PURE__*/_jsx(StyledIconBadge, {
        circle: true,
        size: "72px",
        imgSrc: team.imageUrl,
        variant: isLabelTeam ? 'label' : 'user'
      }), /*#__PURE__*/_jsx(StyledAccessLevelBadge, {
        imgSrc: AccessLevelIcons[team.group ? team.group : AccessLevel.Reader],
        secondaryText: accessLevelName(team.group, t)
      })]
    }), /*#__PURE__*/_jsxs(TextContainer, {
      children: [/*#__PURE__*/_jsx(TeamName, {
        children: team.name
      }), /*#__PURE__*/_jsx(TeamType, {
        children: teamTypeFromUri(team) === 'label' ? t('TEAM_ROSTER_GRID_TEAM_TYPE_LABEL', 'Label', 'Team type for label teams') : t('TEAM_ROSTER_GRID_TEAM_TYPE_ARTIST', 'Artist', 'Team type for artist teams')
      }), /*#__PURE__*/_jsx(Admins, {
        children: admins()
      })]
    })]
  });
};

export var TeamRosterGrid = function TeamRosterGrid(_ref2) {
  var teams = _ref2.teams,
      pageSize = _ref2.pageSize;
  var showEmptyMessage = teams.length === 0;
  var t = useT();
  var history = useHistory();

  var _useState = useState(false),
      showNoTeamAccessDialog = _useState[0],
      setShowNoTeamAccessDialog = _useState[1];

  var _useState2 = useState(''),
      noAccessPopupBody = _useState2[0],
      setNoAccessPopupBody = _useState2[1];

  var _useState3 = useState(''),
      tableDataRowUrl = _useState3[0],
      setTableDataRowUrl = _useState3[1];

  var logTableDataRowClick = useWebTeamsTableDataRowClickLogger(tableDataRowUrl);
  var sortedTeams = teams.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  var _usePagination = usePagination(sortedTeams, pageSize),
      pageItems = _usePagination.pageItems,
      next = _usePagination.next,
      previous = _usePagination.previous,
      range = _usePagination.range,
      hasNext = _usePagination.hasNext,
      hasPrevious = _usePagination.hasPrevious;

  var onClick = function onClick(index) {
    var team = teams[index];

    if (!team || !team.name) {
      return;
    }

    if (team.group !== AccessLevel.Admin) {
      if (team.group === 'Edit Access') {
        setNoAccessPopupBody(t('NO_ACCESS_POPUP_BODY_EDITOR', 'As an editor, you can add, update, and remove artist info, pitches, and campaigns. Ask the team’s admin to update your access level if you need to take team actions.', 'Body text of popup for editor teams.'));
        setTableDataRowUrl("edit access ".concat(team.id));
      } else if (team.group === 'View-only Access') {
        setNoAccessPopupBody(t('NO_ACCESS_POPUP_BODY_READER', 'As a reader, you can can check out stats and artist profiles. Ask the team’s admin to update your access level if you need to take team actions.', 'Body text of popup for reader teams'));
        setTableDataRowUrl("view-only access ".concat(team.id));
      }

      setShowNoTeamAccessDialog(true);
      logTableDataRowClick();
      return;
    }

    var userUrl = "/team/".concat(teamTypeFromUri(team), "/").concat(team.id);
    setTableDataRowUrl(userUrl);
    logTableDataRowClick();
    history.push(userUrl);
  };

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!showEmptyMessage && /*#__PURE__*/_jsx(GridContainer, {
      children: pageItems.map(function (team, i) {
        return /*#__PURE__*/_jsx(TeamCard, {
          index: i,
          team: team,
          onClick: onClick
        }, i);
      })
    }), showNoTeamAccessDialog && /*#__PURE__*/_jsx(NoTeamAccessDialog, {
      bodyText: noAccessPopupBody,
      onClose: function onClose() {
        return setShowNoTeamAccessDialog(false);
      }
    }), teams.length > pageSize && /*#__PURE__*/_jsxs(TablePagination, {
      children: [/*#__PURE__*/_jsx(Type, {
        "data-testid": "pagination",
        children: t('TEAM_ROSTER_PAGE_ITEMS_PER_PAGE', 'Teams per page: {pageItems}', 'Text displaying how many teams are shown per page.', {
          pageItems: pageItems.length
        })
      }), /*#__PURE__*/_jsx(PaginationControls, {
        onIncrement: hasNext ? function () {
          return next();
        } : undefined,
        onDecrement: hasPrevious ? function () {
          return previous();
        } : undefined,
        children: t('TEAM_ROSTER_PAGE_PAGINATION_RANGE', '{range} of {filteredItems}', 'Text which displays the range of items being shown on the page', {
          range: range,
          filteredItems: teams.length
        })
      })]
    })]
  });
};