import { Container } from '@mrkt/features/badge/BadgeWithText/Container';
import { TextContainer } from '@mrkt/features/badge/BadgeWithText/TextContainer';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LoadingIndicator, black, PopoverTrigger, PopoverNavigation, Popover, PopoverNavigationItem, ButtonIcon, IconMoreAndroid, spacer4 } from '@spotify-internal/encore-web';
import { gray50 } from '@spotify-internal/tokens';
import { accessLevelName, isActiveTeamMember } from '../../../lib';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { PopoverNavigationLinkAsLink } from '../../../../EncoreCreatorWebHelpers';
import { useT } from '@mrkt/features/i18n';
import { useActivityEditTeamMemberNavigateLogger, useActivityTeamMemberContextMenuLogger } from '../../lib/hooks/useActivityUbi';
import { IconBadge } from '../../../components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Divider = styled.span.withConfig({
  displayName: "TeamMemberCell__Divider",
  componentId: "dlkwy7-0"
})(["display:inline-block;"]);
var ActivityText = styled.span.withConfig({
  displayName: "TeamMemberCell__ActivityText",
  componentId: "dlkwy7-1"
})(["color:", ";display:inline-block;"], black);
var ActionContainer = styled.div.withConfig({
  displayName: "TeamMemberCell__ActionContainer",
  componentId: "dlkwy7-2"
})(["padding-top:", ";margin-inline-start:auto;"], spacer4);
var TeamMemberInfo = styled.span.withConfig({
  displayName: "TeamMemberCell__TeamMemberInfo",
  componentId: "dlkwy7-3"
})(["color ", ";"], gray50);
export var DotDivider = function DotDivider() {
  return /*#__PURE__*/_jsx(Divider, {
    children: "\u22C5"
  });
};
export var TeamMemberCell = function TeamMemberCell(_ref) {
  var activity = _ref.activity,
      currentTeamDetails = _ref.currentTeamDetails;

  var _useTeamStore = useTeamStore(),
      currentTeamMembers = _useTeamStore.currentTeamMembers;

  var _useState = useState(false),
      isPopoverVisible = _useState[0],
      setPopoverState = _useState[1];

  var t = useT();
  var editTeamMemberUrl = currentTeamDetails && "/team/".concat(currentTeamDetails.type, "/").concat(currentTeamDetails.id, "/").concat(activity.actor.username);
  var logContextMenuPopoverReveal = useActivityTeamMemberContextMenuLogger();
  var logEditTeamMemberNavigate = useActivityEditTeamMemberNavigateLogger(editTeamMemberUrl);

  if (!currentTeamDetails || !currentTeamMembers) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var teamMember = currentTeamMembers.find(function (tm) {
    return isActiveTeamMember(tm) && tm.username === activity.actor.username;
  });
  var ariaControlsId = teamMember === null || teamMember === void 0 ? void 0 : teamMember.id;
  var actorName = activity.actor.name === '' ? activity.actor.username : activity.actor.name;
  return /*#__PURE__*/_jsxs(Container, {
    children: [/*#__PURE__*/_jsx(IconBadge, {
      size: "24px",
      bgColor: "#F59B23"
    }), /*#__PURE__*/_jsx(TextContainer, {
      children: /*#__PURE__*/_jsxs(ActivityText, {
        children: [teamMember && teamMember.fullName !== '' ? teamMember.fullName : actorName, ' ', /*#__PURE__*/_jsxs(TeamMemberInfo, {
          children: [teamMember ? /*#__PURE__*/_jsxs(_Fragment, {
            children: [accessLevelName(teamMember.accessLevel, t), " "]
          }) : /*#__PURE__*/_jsx(_Fragment, {
            children: t('ACTIVITY_INACTIVE_USER', 'Inactive', 'this user is not on the team')
          }), ' ', /*#__PURE__*/_jsx(DotDivider, {}), " ", currentTeamDetails.name]
        })]
      })
    }), teamMember && /*#__PURE__*/_jsx(ActionContainer, {
      children: /*#__PURE__*/_jsx(PopoverTrigger, {
        placement: PopoverTrigger.bottomLeft,
        onShow: function onShow() {
          setPopoverState(true);
          logContextMenuPopoverReveal();
        },
        onHide: function onHide() {
          return setPopoverState(false);
        },
        overlay: isPopoverVisible && currentTeamDetails && /*#__PURE__*/_jsx(PopoverNavigation, {
          id: ariaControlsId,
          arrow: Popover.topRight,
          children: /*#__PURE__*/_jsx(PopoverNavigationItem, {
            children: /*#__PURE__*/_jsx(PopoverNavigationLinkAsLink, {
              "data-testid": "edit-team-member-link",
              to: {
                pathname: editTeamMemberUrl
              },
              onClick: function onClick(e) {
                logEditTeamMemberNavigate();
                e.stopPropagation();
              },
              children: t('ACTIVITY_EDIT_TEAM_MEMBER_BUTTON', 'Edit team member', 'go to the edit team member page')
            })
          })
        }),
        children: /*#__PURE__*/_jsx(ButtonIcon, {
          "aria-expanded": isPopoverVisible,
          "aria-controls": ariaControlsId,
          type: "button",
          "data-testid": "context-menu",
          children: /*#__PURE__*/_jsx(IconMoreAndroid, {
            iconSize: 16,
            "aria-label": "More"
          })
        })
      })
    })]
  });
};