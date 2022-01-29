import React, { useState } from 'react';
import { ButtonPrimary, NavBar, NavBarList, NavBarListItem, Type, screenXxsMax, spacer12, spacer16, spacer32, spacer40, spacer80 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { isActiveTeamMember } from '../lib';
import { useTeamStore } from '../lib/store/useTeamStore';
import { TeamMemberTable } from './TeamMemberTable';
import { TeamPage } from '../components/TeamPage';
import { MaybeTeamMemberRemovalDialog } from '../components/MaybeTeamMemberRemovalDialog';
import { MaybeBillingContactUpdateDialog } from '../BillingContact/components/MaybeBillingContactUpdateDialog';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { TeamRosterBreadcrumb } from '../components/Breadcrumbs';
import { JoinTeamRequestsTable } from '../components/JoinTeamRequestsTable';
import { ButtonPrimaryAsLink } from '../../EncoreCreatorWebHelpers';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { ArtistsTabRoute } from '../ArtistsTab';
import { TeamType } from '../lib/model/Team';
import { ActivityRoute } from '../Activity/ActivityRoute';
import { BillingPage } from '../BillingPage';
import { OnlyAdminSpeedbumpDialog } from '../components/OnlyAdminSpeedbumpDialog';
import { useT } from '@mrkt/features/i18n';
import { useWebTeamTeamPageActivityTabNavigateLogger, useWebTeamTeamPageBillingTabNavigateLogger, useWebTeamTeamPageTeamMemberTabNavigateLogger } from '../lib/hooks/useWebTeamUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export var TeamTab;

(function (TeamTab) {
  TeamTab[TeamTab["MEMBERS"] = 0] = "MEMBERS";
  TeamTab[TeamTab["ACTIVITY"] = 1] = "ACTIVITY";
  TeamTab[TeamTab["BILLING"] = 2] = "BILLING";
  TeamTab[TeamTab["ARTISTS"] = 3] = "ARTISTS";
})(TeamTab || (TeamTab = {}));

var StyledNavBar = styled(NavBar).withConfig({
  displayName: "TeamListPage__StyledNavBar",
  componentId: "sc-6jxxkw-0"
})(["margin-top:", ";margin-bottom:", ";@media (max-width:", "){margin-top:", ";}"], spacer32, spacer40, screenXxsMax, spacer12);
var LoadingContainer = styled.div.withConfig({
  displayName: "TeamListPage__LoadingContainer",
  componentId: "sc-6jxxkw-1"
})(["padding-top:", ";"], spacer80);
var StyledButtonPrimaryAsLink = styled(ButtonPrimaryAsLink).withConfig({
  displayName: "TeamListPage__StyledButtonPrimaryAsLink",
  componentId: "sc-6jxxkw-2"
})(["@media (max-width:", "){margin-top:", ";}"], screenXxsMax, spacer16);
export var TeamListPage = function TeamListPage(_ref) {
  var _ref$activeTab = _ref.activeTab,
      activeTab = _ref$activeTab === void 0 ? TeamTab.MEMBERS : _ref$activeTab;
  var viewport = useViewport();
  var isSmallScreen = viewport === Viewport.XS;
  var t = useT();

  var _useTeamStore = useTeamStore(),
      billingContactId = _useTeamStore.billingContact.billingContactId,
      layoutType = _useTeamStore.layoutType,
      currentTeam = _useTeamStore.currentTeam,
      currentTeamMembers = _useTeamStore.currentTeamMembers,
      currentTeamMemberCount = _useTeamStore.currentTeamMemberCount,
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      adminAccessRequests = _useTeamStore.adminAccessRequests,
      _revokeInvite = _useTeamStore.revokeInvite,
      showBillingContactSpeedbump = _useTeamStore.showBillingContactSpeedbump,
      showTeamMemberRemovalConfirmation = _useTeamStore.showTeamMemberRemovalConfirmation,
      goToTeamPage = _useTeamStore.goToTeamPage,
      goToActivityPage = _useTeamStore.goToActivityPage,
      goToBillingPage = _useTeamStore.goToBillingPage,
      goToArtistsPage = _useTeamStore.goToArtistsPage;

  var _useState = useState(false),
      showIsOnlyAdminSpeedbump = _useState[0],
      setShowIsOnlyAdminSpeedbump = _useState[1];

  var _useState2 = useState(false),
      isIsOnlyAdminWithNoTeamMembers = _useState2[0],
      setIsOnlyAdminWithNoTeamMembers = _useState2[1];

  var teamName = currentTeamDetails && currentTeamDetails.name || '';
  var isLabelTeam = (currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.type) === TeamType.label;
  var hasArtistTeams = isLabelTeam;

  var isBillingContact = function isBillingContact(tm) {
    return tm.id === billingContactId;
  };

  var isOnlyAdmin = function isOnlyAdmin(tm) {
    if (currentTeamMembers) {
      var admins = currentTeamMembers.filter(function (member) {
        return member.status === 'active' && member.accessLevel.includes('Full Access');
      });
      return admins.length === 1 && isActiveTeamMember(admins[0]) && admins[0].username === tm.username;
    }

    return false;
  };

  var logTeamMembersTabNavigate = useWebTeamTeamPageTeamMemberTabNavigateLogger("/team/".concat(currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.type, "/").concat(currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.id));
  var logActivityTabNavigate = useWebTeamTeamPageActivityTabNavigateLogger("/team/".concat(currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.type, "/").concat(currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.id, "/activity"));
  var logBillingTabNavigate = useWebTeamTeamPageBillingTabNavigateLogger("/team/".concat(currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.type, "/").concat(currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.id, "/billing"));

  var _removeTeamMember = function removeTeamMember(tm) {
    if (isOnlyAdmin(tm)) {
      setIsOnlyAdminWithNoTeamMembers((currentTeamMembers === null || currentTeamMembers === void 0 ? void 0 : currentTeamMembers.length) === 1);
      setShowIsOnlyAdminSpeedbump(true);
    } else if (isBillingContact(tm)) {
      showBillingContactSpeedbump(tm, true);
    } else {
      showTeamMemberRemovalConfirmation(tm);
    }
  };

  if (!currentTeam) {
    return /*#__PURE__*/_jsx(LoadingContainer, {
      children: /*#__PURE__*/_jsx(LoadingIndicator, {})
    });
  }

  var showAccessRequests = adminAccessRequests;
  var teamUrlBase = "/team/".concat(currentTeam.type, "/").concat(currentTeam.id);
  var yourTeamsDocTitle = t('TEAM_LIST_PAGE_DOC_TITLE', 'Your teams', 'Document title of team list page');
  return /*#__PURE__*/_jsxs(TeamPage, {
    title: teamName,
    documentTitle: teamName ? [yourTeamsDocTitle, teamName] : [yourTeamsDocTitle],
    breadcrumbs: currentTeamDetails && /*#__PURE__*/_jsx(TeamRosterBreadcrumb, {}),
    showAccessLevel: true,
    actions: activeTab === TeamTab.MEMBERS && /*#__PURE__*/_jsx(StyledButtonPrimaryAsLink, {
      "data-slo-id": "invite-button",
      buttonSize: isSmallScreen ? ButtonPrimary.sm : ButtonPrimary.md,
      to: "".concat(teamUrlBase, "/invite"),
      onClick: function onClick() {
        sendEvent({
          eventCategory: 'TeamEdit',
          eventAction: 'Invite',
          eventLabel: 'FlowStart'
        });
      },
      children: t('TEAM_LIST_PAGE_INVITE', 'Invite', 'Invite button on team list page')
    }),
    children: [/*#__PURE__*/_jsx(MaybeTeamMemberRemovalDialog, {}), /*#__PURE__*/_jsx(MaybeBillingContactUpdateDialog, {}), showIsOnlyAdminSpeedbump && /*#__PURE__*/_jsx(OnlyAdminSpeedbumpDialog, {
      onClose: function onClose() {
        return setShowIsOnlyAdminSpeedbump(false);
      },
      isOnlyAdminWithNoTeamMembers: isIsOnlyAdminWithNoTeamMembers
    }), /*#__PURE__*/_jsx(StyledNavBar, {
      list: /*#__PURE__*/_jsxs(NavBarList, {
        children: [/*#__PURE__*/_jsx(NavBarListItem, {
          sentenceCase: true,
          active: activeTab === TeamTab.MEMBERS,
          label: t('TEAM_LIST_PAGE_TEAM_MEMBERS_TAB', 'Team members', 'Team members tab on team list page'),
          onClick: function onClick() {
            goToTeamPage(currentTeam, {
              replace: true
            });
            logTeamMembersTabNavigate();
          }
        }), /*#__PURE__*/_jsx(NavBarListItem, {
          sentenceCase: true,
          active: activeTab === TeamTab.ACTIVITY,
          label: t('TEAM_LIST_PAGE_ACTIVITY_TAB', 'Activity', 'Activity tab on team list page'),
          onClick: function onClick() {
            goToActivityPage(currentTeam, {
              replace: true
            });
            logActivityTabNavigate();
          }
        }), hasArtistTeams && /*#__PURE__*/_jsx(NavBarListItem, {
          sentenceCase: true,
          active: activeTab === TeamTab.ARTISTS,
          label: t('TEAM_LIST_PAGE_ARTISTS_TAB', 'Artists', 'Artists tab on team list page'),
          onClick: function onClick() {
            return goToArtistsPage(currentTeam, {
              replace: true
            });
          },
          "data-testid": "artist-nav-link"
        }), /*#__PURE__*/_jsx(NavBarListItem, {
          sentenceCase: true,
          active: activeTab === TeamTab.BILLING,
          label: t('TEAM_LIST_PAGE_BILLING_TAB', 'Billing', 'Billing tab on team list page'),
          onClick: function onClick() {
            goToBillingPage(currentTeam, {
              replace: true
            });
            logBillingTabNavigate();
          }
        })]
      })
    }), activeTab === TeamTab.MEMBERS && showAccessRequests && /*#__PURE__*/_jsx(JoinTeamRequestsTable, {}), activeTab === TeamTab.MEMBERS && /*#__PURE__*/_jsxs(_Fragment, {
      children: [showAccessRequests && /*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: "heading2",
        children: t('TEAM_LIST_PAGE_TEAM_MEMBER_TABLE', 'Members', 'Team member table heading on team list page')
      }), /*#__PURE__*/_jsx(TeamMemberTable, {
        currentTeamMemberCount: currentTeamMemberCount,
        layoutType: layoutType,
        teamMembers: currentTeamMembers,
        teamUrlBase: teamUrlBase,
        removeTeamMember: function removeTeamMember(tm) {
          return _removeTeamMember(tm);
        },
        revokeInvite: function revokeInvite(tm) {
          return _revokeInvite(tm, currentTeam, t);
        }
      })]
    }), activeTab === TeamTab.ACTIVITY && /*#__PURE__*/_jsx(ActivityRoute, {}), activeTab === TeamTab.ARTISTS && /*#__PURE__*/_jsx(ArtistsTabRoute, {
      currentTeam: currentTeam
    }), activeTab === TeamTab.BILLING && /*#__PURE__*/_jsx(BillingPage, {})]
  });
};