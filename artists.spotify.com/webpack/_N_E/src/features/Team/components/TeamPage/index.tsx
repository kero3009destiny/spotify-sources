import React, { useState } from 'react';
import styled from 'styled-components';
import { Type, spacer16, spacer32, gray40, spacer8, screenXsMin, screenXxsMax, PopoverTrigger, Popover, ButtonTertiary, CollapseButton } from '@spotify-internal/encore-web';
import { DocumentTitle } from '@mrkt/features/document-title';
import { PageContainer as BasePageContainer } from '../../../page/Container';
import { Breadcrumbs } from '../Breadcrumbs';
import AdminSvg from '../../components/TeamMemberDetailsForm/images/Admin.svg';
import { isActiveTeamMember } from '../../lib';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { Badge } from '@mrkt/features/badge';
import { MaybeLeaveTeamDialog } from '../MaybeLeaveTeamDialog';
import { useT } from '@mrkt/features/i18n';
import { OnlyAdminSpeedbumpDialog } from '../OnlyAdminSpeedbumpDialog';
import { useWebTeamAccessLevelPopoverLeaveTeamRevealLogger, useWebTeamAccessLevelPopoverRevealLogger } from '../../lib/hooks/useWebTeamUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var PageContainer = styled(BasePageContainer).withConfig({
  displayName: "TeamPage__PageContainer",
  componentId: "sc-1npowvo-0"
})(["padding-top:", ";"], function (_ref) {
  var hasBreadcrumbs = _ref.hasBreadcrumbs;
  return hasBreadcrumbs ? '0' : spacer32;
});
var HeadingSection = styled.div.withConfig({
  displayName: "TeamPage__HeadingSection",
  componentId: "sc-1npowvo-1"
})(["display:flex;justify-content:space-between;margin-bottom:", ";@media (max-width:", "){display:block;}"], spacer8, screenXsMin);
var TitleContainer = styled(Type.h1).withConfig({
  displayName: "TeamPage__TitleContainer",
  componentId: "sc-1npowvo-2"
})(["flex-shrink:1;width:100%;"]);
var ActionCenterer = styled.div.withConfig({
  displayName: "TeamPage__ActionCenterer",
  componentId: "sc-1npowvo-3"
})(["display:flex;flex-direction:column;flex-shrink:0;justify-content:center;"]);
var ActionContainer = styled.div.withConfig({
  displayName: "TeamPage__ActionContainer",
  componentId: "sc-1npowvo-4"
})(["display:flex;> *:not(:last-child){margin-right:", ";}@media (max-width:", "){margin-top:", ";}"], spacer16, screenXxsMax, spacer8);
var AboveTitle = styled.div.withConfig({
  displayName: "TeamPage__AboveTitle",
  componentId: "sc-1npowvo-5"
})(["color:", ";font-size:14px;font-weight:300;margin-bottom:4px;margin-top:-19px;"], gray40);
var BelowTitle = styled.div.withConfig({
  displayName: "TeamPage__BelowTitle",
  componentId: "sc-1npowvo-6"
})(["font-size:18px;font-weight:bold;line-height:26px;"]);
var PopoverStyled = styled(Popover).withConfig({
  displayName: "TeamPage__PopoverStyled",
  componentId: "sc-1npowvo-7"
})(["padding-left:0px;padding-right:0px;"]);
var PopoverBody = styled.div.withConfig({
  displayName: "TeamPage__PopoverBody",
  componentId: "sc-1npowvo-8"
})(["padding-left:", ";padding-right:", ";"], spacer16, spacer16);
var ButtonTertiaryStyled = styled(ButtonTertiary).withConfig({
  displayName: "TeamPage__ButtonTertiaryStyled",
  componentId: "sc-1npowvo-9"
})(["padding:0px;"]);
/**
 * A page layout that resembles the home page.
 */

export var TeamPage = function TeamPage(_ref2) {
  var children = _ref2.children,
      aboveTitle = _ref2.aboveTitle,
      title = _ref2.title,
      belowTitle = _ref2.belowTitle,
      actions = _ref2.actions,
      documentTitle = _ref2.documentTitle,
      breadcrumbs = _ref2.breadcrumbs,
      showAccessLevel = _ref2.showAccessLevel;
  var t = useT();
  var logAccessLevelPopoverReveal = useWebTeamAccessLevelPopoverRevealLogger();
  var logLeaveTeamPopoverReveal = useWebTeamAccessLevelPopoverLeaveTeamRevealLogger();

  var _useState = useState(false),
      isOpen = _useState[0],
      setIsOpen = _useState[1];

  var _useState2 = useState(false),
      showIsOnlyAdminSpeedbump = _useState2[0],
      setShowIsOnlyAdminSpeedbump = _useState2[1];

  var _useState3 = useState(false),
      isIsOnlyAdminWithNoTeamMembers = _useState3[0],
      setIsOnlyAdminWithNoTeamMembers = _useState3[1];

  var _useTeamStore = useTeamStore(),
      billingContactId = _useTeamStore.billingContact.billingContactId,
      currentUser = _useTeamStore.currentUser,
      currentTeamMembers = _useTeamStore.currentTeamMembers,
      showBillingContactSpeedbump = _useTeamStore.showBillingContactSpeedbump,
      showTeamMemberRemovalConfirmation = _useTeamStore.showTeamMemberRemovalConfirmation;

  var isBillingContact = function isBillingContact(cu) {
    return cu && cu.username === billingContactId;
  };

  var isOnlyAdmin = function isOnlyAdmin() {
    if (currentTeamMembers) {
      var admins = currentTeamMembers.filter(function (member) {
        return member.accessLevel.includes('Full Access') && member.status === 'active';
      });
      return admins.length === 1 && isActiveTeamMember(admins[0]) && admins[0].username === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.username);
    }

    return false;
  }; // TODO: extract remove team member logic to a task to reduce duplication in TeamListPage.tsx


  var handleOnClick = function handleOnClick() {
    var currentUserAsActiveTeamMember = currentTeamMembers === null || currentTeamMembers === void 0 ? void 0 : currentTeamMembers.find(function (tm) {
      return tm.status === 'active' && tm.id === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.username);
    });

    if (isOnlyAdmin()) {
      setIsOnlyAdminWithNoTeamMembers((currentTeamMembers === null || currentTeamMembers === void 0 ? void 0 : currentTeamMembers.length) === 1);
      setShowIsOnlyAdminSpeedbump(true);
    } else if (isBillingContact(currentUser)) {
      showBillingContactSpeedbump(currentUserAsActiveTeamMember, true);
    } else {
      showTeamMemberRemovalConfirmation(currentUserAsActiveTeamMember);
    }
  };

  return /*#__PURE__*/_jsxs(PageContainer, {
    "data-testid": "team-page",
    className: "encore-creator-light-theme",
    hasBreadcrumbs: !!breadcrumbs,
    children: [breadcrumbs && /*#__PURE__*/_jsx(Breadcrumbs, {
      children: breadcrumbs
    }), showAccessLevel && /*#__PURE__*/_jsxs(PopoverTrigger, {
      title: t('ACCESS_LEVEL_TITLE', 'Access Level', 'Title of the access level popup'),
      placement: PopoverTrigger.bottomRight,
      onShow: function onShow() {
        setIsOpen(true);
        logAccessLevelPopoverReveal();
      },
      onHide: function onHide() {
        setIsOpen(false);
      },
      overlay: isOpen && /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsxs(PopoverStyled, {
          id: "access-level-popover",
          "data-testid": "access-level-popover",
          onClick: function onClick() {
            return setIsOpen(false);
          },
          children: [/*#__PURE__*/_jsx(PopoverBody, {
            children: t('ACCESS_LEVEL_DESCRIPTION', 'You can add, update, and remove team members, billing info, and artist info.', "Description of what a user's access level can perform.")
          }), /*#__PURE__*/_jsx("hr", {}), /*#__PURE__*/_jsx(PopoverBody, {
            children: /*#__PURE__*/_jsx(ButtonTertiaryStyled, {
              onClick: function onClick() {
                handleOnClick();
                logLeaveTeamPopoverReveal();
              },
              buttonSize: ButtonTertiary.md,
              children: t('LEAVE_TEAM_BUTTON', 'Leave team', 'Button to leave a team')
            })
          })]
        })
      }),
      children: [/*#__PURE__*/_jsx(Badge, {
        imgSrc: AdminSvg
      }), /*#__PURE__*/_jsx(CollapseButton, {
        "data-testid": "access-level",
        children: t('ACCESS_LEVEL', 'Admin', 'Access level name')
      })]
    }), showIsOnlyAdminSpeedbump && /*#__PURE__*/_jsx(OnlyAdminSpeedbumpDialog, {
      onClose: function onClose() {
        return setShowIsOnlyAdminSpeedbump(false);
      },
      isOnlyAdminWithNoTeamMembers: isIsOnlyAdminWithNoTeamMembers
    }), /*#__PURE__*/_jsx(MaybeLeaveTeamDialog, {}), /*#__PURE__*/_jsxs(DocumentTitle, {
      title: documentTitle ? "".concat(documentTitle.join(' - '), " - Spotify for Artists") : 'Spotify for Artists',
      children: [/*#__PURE__*/_jsxs("header", {
        children: [aboveTitle && /*#__PURE__*/_jsx(AboveTitle, {
          "data-testid": "above-title",
          children: aboveTitle
        }), /*#__PURE__*/_jsxs(HeadingSection, {
          children: [/*#__PURE__*/_jsx(TitleContainer, {
            variant: Type.heading1,
            condensed: true,
            "data-testid": "title",
            "data-slo-id": "team-page-".concat(title),
            children: title
          }), actions && /*#__PURE__*/_jsx(ActionCenterer, {
            children: /*#__PURE__*/_jsx(ActionContainer, {
              "data-testid": "page-actions",
              children: actions
            })
          })]
        }), belowTitle && /*#__PURE__*/_jsx(BelowTitle, {
          "data-testid": "below-title",
          children: belowTitle
        })]
      }), children]
    })]
  });
};