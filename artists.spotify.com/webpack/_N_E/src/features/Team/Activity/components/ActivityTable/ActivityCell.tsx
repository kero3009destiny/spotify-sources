import React, { useState } from 'react';
import { TextContainer } from '@mrkt/features/badge/BadgeWithText/TextContainer';
import { Container } from '@mrkt/features/badge/BadgeWithText/Container';
import { black, ButtonIcon, gray50, IconChevronRight, IconMoreAndroid, LoadingIndicator, Popover, PopoverNavigation, PopoverNavigationItem, PopoverTrigger, spacer4, spacer8 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { Avatar } from './Avatar';
import { isActiveTeamMember, TeamType } from '../../../lib';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { isToday } from '../../../lib/util/formatDateLocal';
import { DotDivider } from './TeamMemberCell';
import { PopoverNavigationLinkAsLink } from '../../../../EncoreCreatorWebHelpers';
import { useDateTimeFormatter, useT } from '@mrkt/features/i18n';
import { useActivityEditTeamMemberNavigateLogger, useActivityTeamMemberContextMenuLogger } from '../../lib/hooks/useActivityUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledIconChevron = styled(IconChevronRight).attrs({
  semanticColor: 'textSubdued'
}).withConfig({
  displayName: "ActivityCell__StyledIconChevron",
  componentId: "sc-1kzv1s9-0"
})(["padding-top:", ";margin-bottom:-", ";"], spacer8, spacer4);
var ActionContainer = styled.div.withConfig({
  displayName: "ActivityCell__ActionContainer",
  componentId: "sc-1kzv1s9-1"
})(["padding-top:", ";margin-inline-start:auto;"], spacer4);
var ActivityText = styled.div.withConfig({
  displayName: "ActivityCell__ActivityText",
  componentId: "sc-1kzv1s9-2"
})(["color:", ";overflow-wrap:anywhere;"], black);
var TeamMemberAndTimestampText = styled.div.withConfig({
  displayName: "ActivityCell__TeamMemberAndTimestampText",
  componentId: "sc-1kzv1s9-3"
})(["color:", ";margin-top:", ";"], gray50, spacer8);

var capitalize = function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export var ActivityCell = function ActivityCell(_ref) {
  var activity = _ref.activity,
      currentTeamDetails = _ref.currentTeamDetails;

  var _useTeamStore = useTeamStore(),
      layoutType = _useTeamStore.layoutType,
      currentTeamMembers = _useTeamStore.currentTeamMembers;

  var _useState = useState(false),
      isPopoverVisible = _useState[0],
      setPopoverState = _useState[1];

  var t = useT();
  var editTeamMemberUrl = "/team/".concat(currentTeamDetails.type, "/").concat(currentTeamDetails.id, "/").concat(activity.actor.username);
  var logContextMenuPopoverReveal = useActivityTeamMemberContextMenuLogger();
  var logEditTeamMemberNavigate = useActivityEditTeamMemberNavigateLogger(editTeamMemberUrl);
  var formatter = useDateTimeFormatter({
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  var todayFormatter = useDateTimeFormatter({
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  var formattedDate = isToday(activity.timestamp) ? t('ACTIVITY_TABLE_TIMESTAMP', 'Today, {time}', 'This activity happened today', {
    time: todayFormatter.format(new Date(activity.timestamp))
  }) : formatter.format(new Date(activity.timestamp));
  var childNameIsRelevant = activity.target.child.name !== activity.actor.name && activity.target.child.name !== activity.target.parent.name; // if the target.child is the same as the activity.actor or target.parent,
  // don't show the name twice

  var showTeamIcon = activity.feature === 'Manage Team';

  if (!currentTeamMembers || !currentTeamDetails) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var teamMember = currentTeamMembers.find(function (tm) {
    return isActiveTeamMember(tm) && tm.username === activity.actor.username;
  });
  var ariaControlsId = teamMember === null || teamMember === void 0 ? void 0 : teamMember.id;
  var actorName = activity.actor.name === '' ? activity.actor.username : activity.actor.name;
  return /*#__PURE__*/_jsxs(Container, {
    "data-testid": "activity-avatar",
    children: [/*#__PURE__*/_jsx(Avatar, {
      imageUrl: activity.target.image && activity.target.image.url,
      showTeamIcon: showTeamIcon,
      isLabelTeam: currentTeamDetails.type === TeamType.label
    }), /*#__PURE__*/_jsxs(TextContainer, {
      children: [/*#__PURE__*/_jsxs(ActivityText, {
        children: [showTeamIcon ? 'Team' : activity.target.parent.name, ' ', /*#__PURE__*/_jsx(StyledIconChevron, {}), " ", capitalize(activity.action), ' ', childNameIsRelevant && "\u22C5 ".concat(activity.target.child.name)]
      }), layoutType === 'compact' && /*#__PURE__*/_jsxs(TeamMemberAndTimestampText, {
        children: [teamMember && teamMember.fullName !== '' ? teamMember.fullName : actorName, ' ', /*#__PURE__*/_jsx(DotDivider, {}), " ", formattedDate]
      })]
    }), layoutType === 'compact' && teamMember && /*#__PURE__*/_jsx(ActionContainer, {
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
              to: {
                pathname: editTeamMemberUrl
              },
              onClick: function onClick(e) {
                e.stopPropagation();
                logEditTeamMemberNavigate();
              },
              children: t('ACTIVITY_EDIT_TEAM_MEMBER_BUTTON', 'Edit team member', 'go to the edit team member page')
            })
          })
        }),
        children: /*#__PURE__*/_jsx(ButtonIcon, {
          "aria-expanded": isPopoverVisible,
          "aria-controls": ariaControlsId,
          type: "button",
          children: /*#__PURE__*/_jsx(IconMoreAndroid, {
            iconSize: 16,
            "aria-label": "More"
          })
        })
      })
    })]
  });
};