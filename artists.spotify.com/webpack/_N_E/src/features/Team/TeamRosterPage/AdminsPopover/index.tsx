import React, { useState } from 'react';
import { CollapseButton, Popover, PopoverTrigger, spacer8, Type, cssColorValue } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { AccessLevel } from '../../lib';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { IconBadge } from '../../components/IconBadge/IconBadge';
import { useWebTeamsTableDataRowAdminCellRevealLogger } from '../../lib/hooks/useWebTeamsUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var AdminNameContainer = styled.div.withConfig({
  displayName: "AdminsPopover__AdminNameContainer",
  componentId: "sc-15ju873-0"
})(["display:flex;align-items:center;margin:", ";"], spacer8);
var StyledText = styled.div.withConfig({
  displayName: "AdminsPopover__StyledText",
  componentId: "sc-15ju873-1"
})(["color:", ";"], cssColorValue('textSubdued'));
var StyledWrapper = styled.div.withConfig({
  displayName: "AdminsPopover__StyledWrapper",
  componentId: "sc-15ju873-2"
})(["div{display:flex;}span{color:", ";}"], cssColorValue('textSubdued'));
var StyledCollapseButton = styled(CollapseButton).withConfig({
  displayName: "AdminsPopover__StyledCollapseButton",
  componentId: "sc-15ju873-3"
})(["padding:0;"]);
export var AdminsPopover = function AdminsPopover(_ref) {
  var admins = _ref.admins,
      accessLevel = _ref.accessLevel,
      teamName = _ref.teamName;

  var _useTeamStore = useTeamStore(),
      currentUser = _useTeamStore.currentUser;

  var _useState = useState(false),
      isOpen = _useState[0],
      setIsOpen = _useState[1];

  var shortenedListOfAdmins = [];
  var t = useT();
  var logAdminPopoverReveal = useWebTeamsTableDataRowAdminCellRevealLogger(teamName);

  if (!admins) {
    return null;
  }

  var showSingleAdmin = admins.length <= 1;
  var currentUserIsAdmin = accessLevel === AccessLevel.Admin;

  if (currentUserIsAdmin && currentUser) {
    shortenedListOfAdmins = admins.filter(function (admin) {
      return admin !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.name);
    }).slice(0, 9);
    shortenedListOfAdmins.unshift(currentUser.name);
  } else {
    shortenedListOfAdmins = admins.slice(0, 10);
  }

  var formatAdminNames = function formatAdminNames(admin) {
    var firstName = admin.split(' ')[0];

    if (currentUser && currentUser.name === admin) {
      return /*#__PURE__*/_jsx(StyledWrapper, {
        dangerouslySetInnerHTML: {
          __html: t('TEAM_ROSTER_PAGE_ADMIN_LIST_CURRENT_USER', '<div>{firstName} <span>&nbsp;(You)</span></div>', 'When the current user is an admin of a team they will see "(You)" displayed next to their name', {
            firstName: firstName
          })
        }
      });
    }

    return firstName;
  };

  var formatSingleAdmin = function formatSingleAdmin() {
    if (admins.length === 1) {
      return /*#__PURE__*/_jsx(StyledText, {
        children: admins[0] === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.name) ? t('CURRENT_USER_IS_ADMIN', 'You', 'Text shown when current user is admin of a team') : formatAdminNames(admins[0])
      });
    }

    return /*#__PURE__*/_jsx(StyledText, {
      children: t('ZERO_ADMINS', '0 admins', 'When a team has zero admins')
    });
  };

  return showSingleAdmin ? formatSingleAdmin() : /*#__PURE__*/_jsx(PopoverTrigger, {
    onClick: function onClick(e) {
      /*
       * Clicks in this cell are interactions that shouldn't invoke
       * the row's click handler
       */
      e.stopPropagation();
    },
    title: "Admins",
    placement: PopoverTrigger.bottom,
    onShow: function onShow() {
      setIsOpen(true);
      logAdminPopoverReveal();
    },
    onHide: function onHide() {
      return setIsOpen(false);
    },
    overlay: isOpen && /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsxs(Popover, {
        id: "admin-names-popover",
        "data-testid": "admin-names-popover",
        onClick: function onClick() {
          return setIsOpen(false);
        },
        children: [shortenedListOfAdmins.map(function (admin, index) {
          return /*#__PURE__*/_jsxs(AdminNameContainer, {
            "data-testid": "admin-popover-name-container",
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/_jsx(IconBadge, {}), /*#__PURE__*/_jsx("div", {
              children: formatAdminNames(admin)
            })]
          }, index);
        }), admins.length > 10 ? /*#__PURE__*/_jsx(StyledText, {
          children: "+".concat(admins.length - 10)
        }) : /*#__PURE__*/_jsx(_Fragment, {})]
      })
    }),
    children: /*#__PURE__*/_jsx(StyledCollapseButton, {
      "data-testid": "admins-popover-trigger",
      children: /*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: "body2",
        semanticColor: "textSubdued",
        condensed: true,
        children: t('TEAM_ROSTER_PAGE_NUM_ADMINS', '{numAdmins} admins', 'A string displaying the number of admins a team has', {
          numAdmins: admins.length
        })
      })
    })
  });
};