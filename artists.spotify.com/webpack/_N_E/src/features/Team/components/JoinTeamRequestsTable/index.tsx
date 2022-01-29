import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ButtonPrimary, IconFollow, LoadingIndicator, Table, TableCell, TableHeaderCell, TableRow, Type, gray85, spacer64, spacer80, gray30, gray70, gray95, kleinBlue, spacer24, spacer4, spacer48, EmptyState, EmptyStateTitle, EmptyStateText, createBasicColorSet } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { MaybeJoinRequestRemovalDialog } from '../MaybeJoinRequestRemovalDialog';
import { AccessLevelDropdown } from './AccessLevelDropdown';
import { isToday } from '../../lib/util/formatDateLocal';
import { ExpandCollapseButton } from './ExpandCollapseButton';
import { MaybeJoinRequestApprovalDialog } from '../MaybeJoinRequestApprovalDialog';
import { useDateTimeFormatter, useT } from '@mrkt/features/i18n';
import { IconBadgeWithText } from '../IconBadge/IconBadgeWithText';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var MAX_COLLAPSED_REQUESTS = 3;
var TableContainer = styled.div.withConfig({
  displayName: "JoinTeamRequestsTable__TableContainer",
  componentId: "sc-1467ufa-0"
})(["margin-bottom:", ";"], spacer80);
var EmptyStateContainer = styled.div.withConfig({
  displayName: "JoinTeamRequestsTable__EmptyStateContainer",
  componentId: "sc-1467ufa-1"
})(["margin-bottom:", ";"], spacer64);
var ActionsContainer = styled(TableCell).withConfig({
  displayName: "JoinTeamRequestsTable__ActionsContainer",
  componentId: "sc-1467ufa-2"
})(["display:flex;padding-top:", ";float:right;"], spacer24);
var StatusContainer = styled(TableCell).withConfig({
  displayName: "JoinTeamRequestsTable__StatusContainer",
  componentId: "sc-1467ufa-3"
})(["padding:", ";float:right;color:", ";"], spacer24, gray70);
var RequestsTableHeader = styled(TableHeaderCell).withConfig({
  displayName: "JoinTeamRequestsTable__RequestsTableHeader",
  componentId: "sc-1467ufa-4"
})(["width:40%;"]);
var TimeTableHeader = styled(TableHeaderCell).withConfig({
  displayName: "JoinTeamRequestsTable__TimeTableHeader",
  componentId: "sc-1467ufa-5"
})(["width:25%;"]);
var TimeContainerCompact = styled.div.withConfig({
  displayName: "JoinTeamRequestsTable__TimeContainerCompact",
  componentId: "sc-1467ufa-6"
})(["padding-left:", ";"], spacer48);
var ActionContainerCompact = styled.div.withConfig({
  displayName: "JoinTeamRequestsTable__ActionContainerCompact",
  componentId: "sc-1467ufa-7"
})(["display:flex;float:right;"]);
var ButtonContainer = styled.div.withConfig({
  displayName: "JoinTeamRequestsTable__ButtonContainer",
  componentId: "sc-1467ufa-8"
})(["padding-left:", ";padding-right:", ";"], spacer4, spacer4); // focusing on the 4th item after the table is expanded to solve:
// a11y/focus-order issue https://bbc.github.io/gel/components/load-more

var useExpandedFocus = function useExpandedFocus(ref, isExpanded, index) {
  useEffect(function () {
    ref.current && isExpanded && index === 3 && ref.current.focus();
  }, [index, isExpanded, ref]);
};

var JoinTeamRequestTableRow = function JoinTeamRequestTableRow(_ref) {
  var request = _ref.request,
      currentTeamDetails = _ref.currentTeamDetails,
      index = _ref.index;

  var _useTeamStore = useTeamStore(),
      showJoinRequestApprovalConfirmation = _useTeamStore.showJoinRequestApprovalConfirmation,
      showJoinRequestRemovalConfirmation = _useTeamStore.showJoinRequestRemovalConfirmation,
      approveJoinRequest = _useTeamStore.approveJoinRequest,
      taskStatus = _useTeamStore.taskStatus,
      layoutType = _useTeamStore.layoutType,
      joinTableIsExpanded = _useTeamStore.joinTableIsExpanded;

  var t = useT();

  var _useState = useState(null),
      approveTaskId = _useState[0],
      setApproveTaskId = _useState[1];

  var isProcessing = approveTaskId && taskStatus[approveTaskId] === 'running';
  var tableRowRef = useRef(null);
  var formatter = useDateTimeFormatter({
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  var todayFormatter = useDateTimeFormatter({
    timeStyle: 'short'
  });
  var formattedDate = isToday(request.timestamp) ? t('JOIN_REQUEST_TABLE_TIMESTAMP', 'Today, {time}', 'This request was made today', {
    time: todayFormatter.format(new Date(request.timestamp))
  }) : formatter.format(new Date(request.timestamp));
  useExpandedFocus(tableRowRef, joinTableIsExpanded, index);
  return /*#__PURE__*/_jsxs(TableRow, {
    "data-testid": "join-request-table-row",
    ref: tableRowRef,
    tabIndex: 0,
    children: [/*#__PURE__*/_jsxs(TableCell, {
      truncate: true,
      children: [/*#__PURE__*/_jsx(IconBadgeWithText, {
        "data-testid": "request",
        text: "".concat(request.fullName, " \u2022 ").concat(request.role).concat(request.company ? ", ".concat(request.company) : ''),
        secondaryText: request.businessEmail
      }), layoutType === 'compact' && /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(TimeContainerCompact, {
          children: /*#__PURE__*/_jsx(Type, {
            as: "span",
            variant: "body2",
            condensed: true,
            children: formattedDate
          })
        }), /*#__PURE__*/_jsxs(ActionContainerCompact, {
          children: [/*#__PURE__*/_jsx(ButtonContainer, {
            children: /*#__PURE__*/_jsx(ButtonPrimary, {
              "data-testid": "deny-request-button",
              buttonSize: "sm",
              onClick: function onClick() {
                return showJoinRequestRemovalConfirmation(request);
              },
              UNSAFE_colorSet: createBasicColorSet(gray95, gray30),
              children: t('JOIN_REQUEST_DENY_BUTTON', 'Deny', 'Deny this request')
            })
          }), /*#__PURE__*/_jsx(ButtonContainer, {
            children: /*#__PURE__*/_jsx(ButtonPrimary, {
              "data-testid": "approve-request-button",
              buttonSize: "sm",
              onClick: function onClick() {
                return showJoinRequestApprovalConfirmation(request);
              },
              UNSAFE_colorSet: createBasicColorSet('#EFF1FF', kleinBlue),
              children: t('JOIN_REQUEST_APPROVE_BUTTON', 'Approve', 'Approve this request')
            })
          })]
        })]
      })]
    }), layoutType === 'full' && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(TableCell, {
        truncate: true,
        children: /*#__PURE__*/_jsx(Type, {
          as: "span",
          variant: "body2",
          condensed: true,
          children: formattedDate
        })
      }), /*#__PURE__*/_jsx(TableCell, {
        children: /*#__PURE__*/_jsx(AccessLevelDropdown, {
          request: request
        })
      }), isProcessing && /*#__PURE__*/_jsx(StatusContainer, {
        children: /*#__PURE__*/_jsx(LoadingIndicator, {})
      }), !isProcessing && /*#__PURE__*/_jsxs(ActionsContainer, {
        children: [/*#__PURE__*/_jsx(ButtonContainer, {
          children: /*#__PURE__*/_jsx(ButtonPrimary, {
            "data-testid": "deny-request-button",
            "data-slo-id": "deny-request-button",
            buttonSize: "sm",
            onClick: function onClick() {
              return showJoinRequestRemovalConfirmation(request);
            },
            UNSAFE_colorSet: createBasicColorSet(gray95, gray30),
            children: t('JOIN_REQUEST_DENY_BUTTON', 'Deny', 'Deny this request')
          })
        }), /*#__PURE__*/_jsx(ButtonContainer, {
          children: /*#__PURE__*/_jsx(ButtonPrimary, {
            "data-testid": "approve-request-button",
            disabled: !request.accessLevel,
            buttonSize: "sm",
            onClick: function onClick() {
              return setApproveTaskId(approveJoinRequest(request, currentTeamDetails, t));
            },
            UNSAFE_colorSet: createBasicColorSet('#EFF1FF', kleinBlue),
            children: t('JOIN_REQUEST_APPROVE_BUTTON', 'Approve', 'Approve this request')
          })
        })]
      })]
    })]
  });
};

export var JoinTeamRequestsTable = function JoinTeamRequestsTable() {
  var _useTeamStore2 = useTeamStore(),
      joinRequests = _useTeamStore2.joinRequests,
      currentTeamDetails = _useTeamStore2.currentTeamDetails,
      joinTableIsExpanded = _useTeamStore2.joinTableIsExpanded,
      layoutType = _useTeamStore2.layoutType;

  var t = useT();

  if (!joinRequests || !currentTeamDetails) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {
      "data-testid": "join-request-table-loading"
    });
  }

  var requests = joinTableIsExpanded ? joinRequests : joinRequests.slice(0, MAX_COLLAPSED_REQUESTS);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Type, {
      as: "h2",
      variant: "heading2",
      children: joinRequests ? t('JOIN_REQUESTS_TABLE_HEADING', 'Requests ({numRequests})', 'Join request table heading', {
        numRequests: joinRequests.length
      }) : t('JOIN_REQUESTS_EMPTY_TABLE_HEADING', 'Requests', 'Join request table heading')
    }), joinRequests.length === 0 ? /*#__PURE__*/_jsx(EmptyStateContainer, {
      "data-testid": "join-requests-table-empty-state",
      children: /*#__PURE__*/_jsxs(EmptyState, {
        icon: IconFollow,
        iconBackgroundColor: gray85,
        variant: "contextual",
        children: [/*#__PURE__*/_jsx(EmptyStateTitle, {
          children: t('JOIN_REQUESTS_TABLE_EMPTY_STATE_TITLE', 'No new requests', 'There are no new requests')
        }), /*#__PURE__*/_jsx(EmptyStateText, {
          children: t('JOIN_REQUESTS_TABLE_EMPTY_STATE_BODY', 'When someone requests to join your team, they’ll be listed here for your review.', 'Join requests for this team will be listed here')
        })]
      })
    }) : /*#__PURE__*/_jsxs(TableContainer, {
      children: [/*#__PURE__*/_jsx(MaybeJoinRequestRemovalDialog, {}), /*#__PURE__*/_jsx(MaybeJoinRequestApprovalDialog, {}), /*#__PURE__*/_jsxs(Table, {
        "data-testid": "join-requests-table",
        children: [/*#__PURE__*/_jsx("thead", {
          children: /*#__PURE__*/_jsxs(TableRow, {
            children: [/*#__PURE__*/_jsx(RequestsTableHeader, {
              scope: "col",
              children: t('JOIN_REQUEST_TABLE_HEADING_REQUEST', 'Request', 'Table heading for Request column')
            }), layoutType === 'full' && /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(TimeTableHeader, {
                scope: "col",
                children: t('JOIN_REQUEST_TABLE_HEADING_DATE', 'Date', 'Table heading for Date column')
              }), /*#__PURE__*/_jsx(TableHeaderCell, {
                scope: "col",
                children: t('JOIN_REQUEST_TABLE_HEADING_ACCESS_LEVEL', 'Access level', 'Table heading for Access Level column')
              }), /*#__PURE__*/_jsx(TableHeaderCell, {
                scope: "col",
                align: "right",
                children: t('JOIN_REQUEST_TABLE_HEADING_MANAGE', 'Manage', 'Table heading for Manage column')
              })]
            })]
          })
        }), /*#__PURE__*/_jsx("tbody", {
          children: requests.map(function (request, index) {
            return /*#__PURE__*/_jsx(JoinTeamRequestTableRow, {
              index: index,
              request: request,
              currentTeamDetails: currentTeamDetails
            }, request.id);
          })
        })]
      }), joinRequests.length > MAX_COLLAPSED_REQUESTS && /*#__PURE__*/_jsx(ExpandCollapseButton, {})]
    })]
  });
};