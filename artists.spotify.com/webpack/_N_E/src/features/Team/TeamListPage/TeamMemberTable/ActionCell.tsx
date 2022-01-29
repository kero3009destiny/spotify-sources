import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React, { useState } from 'react';
import { ButtonIcon, IconMore, Popover, PopoverNavigation, PopoverNavigationItem, PopoverNavigationLink, PopoverTrigger } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useHistory } from 'react-router';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var LinkAction = function LinkAction(_ref) {
  var path = _ref.path,
      children = _ref.children;
  var history = useHistory();
  return /*#__PURE__*/_jsx(PopoverNavigationItem, {
    children: /*#__PURE__*/_jsx(PopoverNavigationLink, {
      onClick: function onClick() {
        return history.push(path);
      },
      children: children
    })
  });
};

var ClickAction = function ClickAction(_ref2) {
  var onClick = _ref2.onClick,
      children = _ref2.children;
  return /*#__PURE__*/_jsx(PopoverNavigationItem, {
    children: /*#__PURE__*/_jsx(PopoverNavigationLink, {
      "data-slo-id": "click-action",
      component: "button",
      onClick: onClick,
      children: children
    })
  });
};

var ActionList = function ActionList(_ref3) {
  var teamMember = _ref3.teamMember,
      teamUrlBase = _ref3.teamUrlBase,
      removeTeamMember = _ref3.removeTeamMember,
      revokeInvite = _ref3.revokeInvite;
  var t = useT();

  switch (teamMember.status) {
    case 'active':
      return /*#__PURE__*/_jsxs("div", {
        "data-testid": "active-team-member-action-list",
        children: [/*#__PURE__*/_jsx(LinkAction, {
          path: "".concat(teamUrlBase, "/").concat(teamMember.username),
          children: t('TEAM_LIST_PAGE_EDIT_ACTION', 'Edit', 'Link to the edit team member page for this team member')
        }), /*#__PURE__*/_jsx(ClickAction, {
          onClick: function onClick() {
            return removeTeamMember(teamMember);
          },
          children: t('TEAM_LIST_PAGE_REMOVE_ACTION', 'Remove', 'Remove this team member from the team.')
        })]
      });

    case 'invited':
      return /*#__PURE__*/_jsx("div", {
        "data-testid": "invited-team-member-action-list",
        children: /*#__PURE__*/_jsx(ClickAction, {
          onClick: function onClick() {
            return revokeInvite(teamMember);
          },
          children: t('TEAM_LIST_PAGE_CANCEL_INVITE_ACTION', 'Cancel invitation', "Cancel this team member's invitation to join the team.")
        })
      });

    case 'invite-expired':
      return /*#__PURE__*/_jsxs("div", {
        "data-testid": "expired-team-member-action-list",
        children: [/*#__PURE__*/_jsx(ClickAction, {
          onClick: function onClick() {
            return revokeInvite(teamMember);
          },
          children: t('TEAM_LIST_PAGE_CLEAR_EXPIRED_INVITE_ACTION', 'Clear', "Cancel this team member's expired invitation to join the team.")
        }), /*#__PURE__*/_jsx(LinkAction, {
          path: "".concat(teamUrlBase, "/invite"),
          children: t('TEAM_LIST_PAGE_RESEND_INVITE_ACTION', 'Resend invitation', "Resend this team member's invitation to join the team, since their original invitation has expired.")
        })]
      });

    default:
      return /*#__PURE__*/_jsx("i", {
        children: t('TEAM_LIST_PAGE_NO_ACTIONS_MESSAGE', 'No actions available', 'No actions are available.')
      });
  }
};

export var ActionCell = function ActionCell(props) {
  var _useState = useState(false),
      isOpen = _useState[0],
      setIsOpen = _useState[1];

  var teamMember = props.teamMember;
  var ariaControlsId = "".concat(teamMember.id, "-actions-menu");
  return /*#__PURE__*/_jsx(PopoverTrigger, {
    onClick: function onClick(e) {
      /*
       * Clicks in this cell are interactions that shouldn't invoke
       * the row's click handler
       */
      e.stopPropagation();
    },
    title: "Manage",
    placement: PopoverTrigger.bottomLeft,
    onShow: function onShow() {
      return setIsOpen(true);
    },
    onHide: function onHide() {
      return setIsOpen(false);
    },
    overlay: isOpen && /*#__PURE__*/_jsx(PopoverNavigation, {
      id: ariaControlsId,
      arrow: Popover.topRight,
      onClick: function onClick() {
        return setIsOpen(false);
      },
      children: /*#__PURE__*/_jsx(ActionList, _objectSpread({}, props))
    }),
    children: /*#__PURE__*/_jsx(ButtonIcon, {
      "aria-expanded": isOpen,
      "aria-controls": ariaControlsId,
      "data-testid": "team-member-action-button",
      "data-slo-id": "".concat(props.teamMember.status, "-actions"),
      children: /*#__PURE__*/_jsx(IconMore, {
        "aria-label": "Actions"
      })
    })
  });
};