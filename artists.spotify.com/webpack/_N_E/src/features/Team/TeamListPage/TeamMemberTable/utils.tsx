import styled from 'styled-components';
import { ButtonIcon, IconHelpAlt, Tooltip, spacer4, spacer8 } from '@spotify-internal/encore-web';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var HeaderTooltipTrigger = styled(TooltipTrigger).withConfig({
  displayName: "utils__HeaderTooltipTrigger",
  componentId: "sc-1mz9van-0"
})(["height:0;margin-bottom:-8px;margin-left:", ";margin-top:-8px;position:relative;text-transform:initial;top:", ";"], spacer8, spacer4);
export var StatusToolTip = function StatusToolTip() {
  var t = useT();
  return /*#__PURE__*/_jsx(HeaderTooltipTrigger, {
    tooltipId: "invite-status-tooltip",
    tooltip: /*#__PURE__*/_jsx(Tooltip, {
      children: t('TEAM_LIST_PAGE_HEADER_TOOLTIP', 'Invitations expire after 7 days.', 'Tooltip for status header on team list page')
    }),
    placement: "bottom",
    children: /*#__PURE__*/_jsx(ButtonIcon, {
      component: "a",
      href: "#",
      children: /*#__PURE__*/_jsx(IconHelpAlt, {
        iconSize: 16,
        "aria-label": "Help"
      })
    })
  });
};
export var SortOrder;

(function (SortOrder) {
  SortOrder["ASC"] = "asc";
  SortOrder["DESC"] = "desc";
})(SortOrder || (SortOrder = {}));

export var useGenerateHeaders = function useGenerateHeaders(layoutType, showStatusColumn) {
  var t = useT();
  var columns = ['fullName', 'role', 'accessLevel', showStatusColumn && 'status', 'manage'];
  var fullLayoutColWidth = showStatusColumn ? 25 : 30;
  var isFullLayout = layoutType === 'full';
  var colgroup = [{
    key: columns[0],
    colWidth: isFullLayout ? "".concat(fullLayoutColWidth + 10, "%") : '50%'
  }, isFullLayout && {
    key: columns[1],
    colWidth: "".concat(fullLayoutColWidth - 10, "%")
  }, {
    key: columns[2],
    colWidth: isFullLayout ? "".concat(fullLayoutColWidth, "%") : '40%'
  }, isFullLayout && showStatusColumn && {
    key: columns[3],
    colWidth: '25%'
  }, {
    key: columns[4],
    colWidth: isFullLayout ? '10%' : '*'
  }].filter(function (d) {
    return d;
  });
  var headers = [{
    title: t('TEAM_LIST_PAGE_HEADER_NAME', 'name', 'Team list page header - name'),
    key: columns[0],
    isSortable: true,
    align: 'left',
    truncate: !isFullLayout
  }, isFullLayout && {
    title: t('TEAM_LIST_PAGE_HEADER_ROLE', 'role', 'Team list page header - role'),
    key: columns[1],
    isSortable: true,
    align: 'left'
  }, {
    title: t('TEAM_LIST_PAGE_HEADER_ACCESS_LEVEL', 'access level', 'Team list page header - access level'),
    key: columns[2],
    isSortable: true,
    align: 'left'
  }, isFullLayout && showStatusColumn && {
    title: /*#__PURE__*/_jsxs(_Fragment, {
      children: [t('TEAM_LIST_PAGE_HEADER_STATUS', 'status', 'Team list page header - status'), /*#__PURE__*/_jsx(StatusToolTip, {})]
    }),
    key: columns[3],
    isSortable: true,
    align: 'center'
  }, {
    title: isFullLayout ? t('TEAM_LIST_PAGE_HEADER_MANAGE', 'manage', 'Team list page header - manage') : '',
    key: columns[4],
    isSortable: false,
    align: 'right'
  }].filter(function (d) {
    return d;
  });
  return {
    headers: headers,
    colgroup: colgroup
  };
};
export var sort = function sort(data, sortKey, sortOrder) {
  if (!sortKey) return data;
  return data.slice().sort(function (a, b) {
    var aValue = a[sortKey] != null ? a[sortKey] : 0;
    var bValue = b[sortKey] != null ? b[sortKey] : 0;
    var elementA = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
    var elementB = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

    if (elementA && elementB && elementA !== elementB) {
      if (sortOrder === SortOrder.DESC) {
        return elementA < elementB ? 1 : -1;
      }

      return elementA < elementB ? -1 : 1;
    }

    return 0;
  });
};
export var statusDisplayString = function statusDisplayString(teamMember, t) {
  switch (teamMember.status) {
    case 'invited':
      return t('TEAM_LIST_PAGE_INVITE_STATUS_PENDING', 'Pending', 'Invite status - pending');

    case 'invite-expired':
      return t('TEAM_LIST_PAGE_INVITE_STATUS_EXPIRED', 'Expired', 'Invite status - expired');

    default:
      return t('TEAM_LIST_PAGE_INVITE_STATUS_ACCEPTED', 'Accepted', 'Invite status - accepted');
  }
};