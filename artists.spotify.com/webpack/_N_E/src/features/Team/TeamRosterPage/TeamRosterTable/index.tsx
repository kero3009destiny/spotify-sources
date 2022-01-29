import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import { PaginationControls, TablePagination, Type } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { BadgeWithText } from '@mrkt/features/badge';
import { TeamType } from '../../lib/model/Team';
import { useHistory } from 'react-router';
import { generateHeaders, sort, SortOrder } from './utils';
import { AccessLevel, accessLevelName } from '../../lib';
import { usePagination } from '../../lib/util/usePagination';
import { SortTable } from '@mrkt/features/stats-components';
import { useT } from '@mrkt/features/i18n';
import { AdminsPopover } from '../AdminsPopover';
import { NoTeamAccessDialog } from '../NoTeamAccessDialog';
import { IconBadgeWithText } from '../../components/IconBadge/IconBadgeWithText';
import { useWebTeamsNameHeaderSortLogger, useWebTeamsTableDataRowClickLogger, useWebTeamsTypeHeaderSortLogger } from '../../lib/hooks/useWebTeamsUbi';
import { AccessLevelIcons } from '../constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledSortTable = styled(SortTable).withConfig({
  displayName: "TeamRosterTable__StyledSortTable",
  componentId: "dqdvyl-0"
})(["position:relative;z-index:0;margin-top:32px;"]);
export var TeamRosterTable = function TeamRosterTable(_ref) {
  var layoutType = _ref.layoutType,
      teams = _ref.teams,
      pageSize = _ref.pageSize;
  var t = useT();
  var history = useHistory();
  var isCompactLayout = layoutType === 'compact';

  var isLabelTeam = function isLabelTeam(team) {
    return team.uri.split(':')[1] === 'label';
  };

  var ASC = SortOrder.ASC,
      DESC = SortOrder.DESC;

  var _useState = useState({
    sortKey: 'name',
    sortOrder: ASC,
    isSorting: false
  }),
      sortState = _useState[0],
      setSort = _useState[1];

  var _useState2 = useState(''),
      tableDataRowUrl = _useState2[0],
      setTableDataRowUrl = _useState2[1];

  var logTeamNameHeaderSort = useWebTeamsNameHeaderSortLogger();
  var logTeamTypeHeaderSort = useWebTeamsTypeHeaderSortLogger();
  var logTableDataRowClick = useWebTeamsTableDataRowClickLogger(tableDataRowUrl);

  var onSort = function onSort(sortKey) {
    var oldSortKey = sortState.sortKey,
        oldSortOrder = sortState.sortOrder;
    var sortOrder = oldSortOrder === DESC && sortKey === oldSortKey ? ASC : DESC;
    setSort({
      sortKey: sortKey,
      sortOrder: sortOrder,
      isSorting: true
    });

    if (sortKey === 'name') {
      logTeamNameHeaderSort();
    }

    if (sortKey === 'type') {
      logTeamTypeHeaderSort();
    }
  };

  var sortedData = sort(teams, sortState.sortKey, sortState.sortOrder).map(function (d, i) {
    var _d$adminFullNames;

    return _objectSpread(_objectSpread({}, d), {}, {
      rowTitle: d.name,
      name: isCompactLayout ? /*#__PURE__*/_jsx(IconBadgeWithText, {
        imgSrc: d.imageUrl,
        circle: true,
        text: d.name,
        variant: isLabelTeam(d) ? 'label' : 'user',
        secondaryText: isLabelTeam(d) ? t('TEAM_ROSTER_PAGE_TEAM_TYPE_LABEL', 'Label', 'Team type for label teams') : t('TEAM_ROSTER_PAGE_TEAM_TYPE_ARTIST', 'Artist', 'Team type for artist teams')
      }) : /*#__PURE__*/_jsx(IconBadgeWithText, {
        "data-slo-id": "team-roster:".concat(d.name),
        imgSrc: d.imageUrl,
        text: d.name,
        circle: true,
        variant: isLabelTeam(d) ? 'label' : 'user'
      }),
      type: isLabelTeam(d) ? t('TEAM_ROSTER_PAGE_TEAM_TYPE_LABEL', 'Label', 'Team type for label teams') : t('TEAM_ROSTER_PAGE_TEAM_TYPE_ARTIST', 'Artist', 'Team type for artist teams'),
      teamType: isLabelTeam(d) ? TeamType.label : TeamType.artist,
      accessLevel: /*#__PURE__*/_jsx(BadgeWithText, {
        imgSrc: AccessLevelIcons[d.group ? d.group : AccessLevel.Reader],
        secondaryText: accessLevelName(d.group, t)
      }),
      accessLevelName: d.group,
      admin: /*#__PURE__*/_jsx(AdminsPopover, {
        admins: (_d$adminFullNames = d.adminFullNames) === null || _d$adminFullNames === void 0 ? void 0 : _d$adminFullNames.sort(function () {
          return Math.random() - Math.random();
        }),
        accessLevel: d.group,
        teamName: d.name
      }, i),
      index: i,
      rank: i + 1,
      key: "".concat(i)
    });
  });

  var _usePagination = usePagination(sortedData, pageSize),
      pageItems = _usePagination.pageItems,
      next = _usePagination.next,
      previous = _usePagination.previous,
      range = _usePagination.range,
      hasNext = _usePagination.hasNext,
      hasPrevious = _usePagination.hasPrevious;

  var _generateHeaders = generateHeaders(layoutType, t),
      headers = _generateHeaders.headers,
      colgroup = _generateHeaders.colgroup;

  var _useState3 = useState(false),
      showNoTeamAccessDialog = _useState3[0],
      setShowNoTeamAccessDialog = _useState3[1];

  var _useState4 = useState(''),
      noAccessPopupBody = _useState4[0],
      setNoAccessPopupBody = _useState4[1];

  var onClick = function onClick(d) {
    var team = sortedData[d.index];

    if (!team || !team.name) {
      return;
    }

    if (team.accessLevelName !== AccessLevel.Admin) {
      if (team.accessLevelName === 'Edit Access') {
        setNoAccessPopupBody(t('NO_ACCESS_POPUP_BODY_EDITOR', 'As an editor, you can add, update, and remove artist info, pitches, and campaigns. Ask the team’s admin to update your access level if you need to take team actions.', 'Body text of popup for editor teams.'));
        setTableDataRowUrl("edit access ".concat(team.id));
      } else if (team.accessLevelName === 'View-only Access') {
        setNoAccessPopupBody(t('NO_ACCESS_POPUP_BODY_READER', 'As a reader, you can can check out stats and artist profiles. Ask the team’s admin to update your access level if you need to take team actions.', 'Body text of popup for reader teams'));
        setTableDataRowUrl("view-only access ".concat(team.id));
      }

      setShowNoTeamAccessDialog(true);
      logTableDataRowClick();
      return;
    }

    var userUrl = "/team/".concat(team.teamType, "/").concat(team.id);
    setTableDataRowUrl(userUrl);
    logTableDataRowClick();
    history.push(userUrl);
  };

  var showEmptyMessage = pageItems.length === 0;
  return /*#__PURE__*/_jsxs("div", {
    "data-slo-id": "team-roster-table",
    children: [!showEmptyMessage && /*#__PURE__*/_jsx(StyledSortTable, {
      "data-testid": "team-roster-table",
      "data-slo-id": "team-roster-table",
      stickyHeader: false,
      bordered: true,
      hover: true,
      onSort: onSort,
      sortKey: sortState.sortKey,
      sortOrder: sortState.sortOrder,
      colgroup: colgroup,
      headers: headers,
      data: pageItems,
      onRowClick: onClick
    }), showNoTeamAccessDialog && /*#__PURE__*/_jsx(NoTeamAccessDialog, {
      bodyText: noAccessPopupBody,
      onClose: function onClose() {
        return setShowNoTeamAccessDialog(false);
      }
    }), teams.length > pageSize && /*#__PURE__*/_jsxs(TablePagination, {
      children: [/*#__PURE__*/_jsx(Type, {
        "data-testid": "pagination",
        children: t('TEAM_ROSTER_PAGE_ROWS_PER_PAGE', 'Rows per page: {pageItems}', 'Text displaying how many rows of data are shown per page.', {
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