import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["layoutType", "teamMembers", "currentTeamMemberCount"];

var _AccessLevelIcons;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { IconMinus, TablePagination, PaginationControls, Type, FormGroup, spacer16, spacer32, spacer80 } from '@spotify-internal/encore-web';
import { SortTable } from '@mrkt/features/stats-components';
import { usePagination } from '../../lib/util/usePagination';
import { useFilter } from '../../lib/util/useFilter';
import { SearchInput } from '../../components/SearchInput';
import { useGenerateHeaders, SortOrder, sort, statusDisplayString } from './utils';
import { NameCell } from './NameCell';
import { ActionCell } from './ActionCell';
import { LoadingIndicator } from '../../../../shared/components/LoadingIndicator';
import { AccessLevel, accessLevelName } from '../../lib/model/AccessLevel';
import { BadgeWithText } from '@mrkt/features/badge';
import AdminSvg from '../../components/TeamMemberDetailsForm/images/Admin.svg';
import EditorSvg from '../../components/TeamMemberDetailsForm/images/Editor.svg';
import ReaderSvg from '../../components/TeamMemberDetailsForm/images/Reader.svg';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var StyledEmptyStateContainer = styled.div.withConfig({
  displayName: "TeamMemberTable__StyledEmptyStateContainer",
  componentId: "bj1y87-0"
})(["padding-top:", ";"], 32);
var StyledEmptyStateTitleContainer = styled.div.withConfig({
  displayName: "TeamMemberTable__StyledEmptyStateTitleContainer",
  componentId: "bj1y87-1"
})(["margin-bottom:", ";"], spacer16);
var FilterContainer = styled.div.withConfig({
  displayName: "TeamMemberTable__FilterContainer",
  componentId: "bj1y87-2"
})(["margin-bottom:", ";"], spacer32);
var LoadingContainer = styled.div.withConfig({
  displayName: "TeamMemberTable__LoadingContainer",
  componentId: "bj1y87-3"
})(["padding-top:", ";"], spacer80);
var StyledSortTable = styled(SortTable).withConfig({
  displayName: "TeamMemberTable__StyledSortTable",
  componentId: "bj1y87-4"
})(["> table{table-layout:fixed;}"]);
var PAGE_SIZE = 25;
var MIN_AMOUNT_FOR_FILTERING = 10;
var AccessLevelIcons = (_AccessLevelIcons = {}, _defineProperty(_AccessLevelIcons, AccessLevel.Admin, AdminSvg), _defineProperty(_AccessLevelIcons, AccessLevel.Editor, EditorSvg), _defineProperty(_AccessLevelIcons, AccessLevel.Reader, ReaderSvg), _AccessLevelIcons);
export var TeamMemberTable = function TeamMemberTable(_ref) {
  var layoutType = _ref.layoutType,
      unfilteredTeamMembers = _ref.teamMembers,
      currentTeamMemberCount = _ref.currentTeamMemberCount,
      props = _objectWithoutProperties(_ref, _excluded);

  var _useFilter = useFilter(unfilteredTeamMembers || [], function (tm, value) {
    return (tm.fullName || '').toLowerCase().startsWith(value.toLowerCase()) || (tm.businessEmail || '').toLowerCase().startsWith(value.toLowerCase());
  }),
      filteredItems = _useFilter.filteredItems,
      setFilter = _useFilter.setFilter,
      filter = _useFilter.filter;

  var history = useHistory();
  var t = useT();
  var ASC = SortOrder.ASC,
      DESC = SortOrder.DESC;

  var _useState = useState({
    sortKey: 'status',
    sortOrder: DESC,
    isSorting: false
  }),
      sortState = _useState[0],
      setSort = _useState[1];

  var onSort = function onSort(sortKey) {
    var oldSortKey = sortState.sortKey,
        oldSortOrder = sortState.sortOrder;
    var sortOrder = oldSortOrder === DESC && sortKey === oldSortKey ? ASC : DESC;
    setSort({
      sortKey: sortKey,
      sortOrder: sortOrder,
      isSorting: true
    });
  };

  var sortedData = sort(filteredItems, sortState.sortKey, sortState.sortOrder).map(function (d, i) {
    return _objectSpread(_objectSpread({}, d), {}, {
      rowTitle: d.fullName,
      fullName: /*#__PURE__*/_jsx(NameCell, {
        teamMember: d
      }),
      status: statusDisplayString(d, t),
      role: d.role ? d.role : /*#__PURE__*/_jsx(IconMinus, {}),
      manage: /*#__PURE__*/_jsx(ActionCell, _objectSpread({
        teamMembers: unfilteredTeamMembers,
        teamMember: d
      }, props)),
      hover: d.status === 'active',
      accessLevel: /*#__PURE__*/_jsx(BadgeWithText, {
        imgSrc: AccessLevelIcons[d.accessLevel ? d.accessLevel : AccessLevel.Reader],
        secondaryText: accessLevelName(d.accessLevel, t)
      }),
      index: i,
      rank: i + 1,
      key: "".concat(i)
    });
  });

  var _usePagination = usePagination(sortedData, PAGE_SIZE),
      pageItems = _usePagination.pageItems,
      next = _usePagination.next,
      previous = _usePagination.previous,
      range = _usePagination.range,
      hasNext = _usePagination.hasNext,
      hasPrevious = _usePagination.hasPrevious;

  var showStatusColumn = !!(unfilteredTeamMembers && unfilteredTeamMembers.find(function (tm) {
    return tm.status !== 'active';
  }) && layoutType === 'full');

  var _useGenerateHeaders = useGenerateHeaders(layoutType, showStatusColumn),
      headers = _useGenerateHeaders.headers,
      colgroup = _useGenerateHeaders.colgroup;

  var onClick = function onClick(d) {
    var teamMember = sortedData[d.index];

    if (!teamMember || !teamMember.username) {
      return;
    }

    var userUrl = "".concat(props.teamUrlBase, "/").concat(teamMember.username);
    history.push(userUrl);
  };

  var isLoading = !unfilteredTeamMembers;
  var showEmptyMessage = !isLoading && pageItems.length === 0;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [unfilteredTeamMembers && unfilteredTeamMembers.length > MIN_AMOUNT_FOR_FILTERING && /*#__PURE__*/_jsx(FilterContainer, {
      children: /*#__PURE__*/_jsx(FormGroup, {
        label: t('TEAM_LIST_PAGE_SEARCH_LABEL', 'Search {currentTeamMemberCount} team members', 'Search box label on team list page', {
          currentTeamMemberCount: currentTeamMemberCount
        }),
        labelFor: "team-search-input",
        children: /*#__PURE__*/_jsx(SearchInput, {
          searchInputId: "team-search-input",
          ariaLabel: "Search members of this team",
          onChange: setFilter,
          enableAutoFocus: false,
          value: filter
        })
      })
    }), !showEmptyMessage && /*#__PURE__*/_jsx(StyledSortTable, {
      "data-testid": "team-member-table",
      stickyHeader: false,
      bordered: true,
      hover: false,
      onSort: onSort,
      sortKey: sortState.sortKey,
      sortOrder: sortState.sortOrder,
      colgroup: colgroup,
      headers: headers,
      data: pageItems,
      onRowClick: onClick
    }), pageItems.length === 0 && /*#__PURE__*/_jsx(LoadingContainer, {
      "data-testid": "team-member-table-loading",
      children: /*#__PURE__*/_jsx(LoadingIndicator, {})
    }), showEmptyMessage && /*#__PURE__*/_jsxs(StyledEmptyStateContainer, {
      "data-testid": "empty-state",
      children: [/*#__PURE__*/_jsx(StyledEmptyStateTitleContainer, {
        children: /*#__PURE__*/_jsx(Type, {
          variant: Type.heading3,
          weight: Type.bold,
          children: t('TEAM_LIST_PAGE_EMPTY_STATE_TITLE', 'No results available', 'Title of empty state when there are no search results')
        })
      }), /*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: Type.body2,
        children: t('TEAM_LIST_PAGE_EMPTY_STATE_BODY', 'Your search might be too specific.', 'Body of empty state when there are no search results')
      })]
    }), filteredItems.length > PAGE_SIZE && /*#__PURE__*/_jsxs(TablePagination, {
      "data-testid": "pagination",
      children: [/*#__PURE__*/_jsx(Type, {
        children: t('TEAM_LIST_PAGE_PAGINATION_ROWS', 'Rows per page: {pageItems}', 'Pagination rows text on team list page', {
          pageItems: pageItems.length
        })
      }), /*#__PURE__*/_jsx(PaginationControls, {
        onIncrement: hasNext ? function () {
          return next();
        } : undefined,
        onDecrement: hasPrevious ? function () {
          return previous();
        } : undefined,
        children: t('TEAM_LIST_PAGE_PAGINATION_RANGE', '{range} of {filteredItems}', 'Pagination range text on team list page', {
          range: range,
          filteredItems: filteredItems.length
        })
      })]
    })]
  });
};