// ignore-string-externalization
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoggedIn } from '../../shared/components/LoggedIn';
import { HasAccess } from '../../shared/components/HasAccess';
import { EditDetailsPage } from './EditDetailsPage';
import { InvitePage } from './InvitePage';
import { AcceptInvitePage } from './AcceptInvitePage';
import { TeamListPage, TeamTab } from './TeamListPage';
import { HasTeamManagementAccess } from './components/HasTeamManagementAccess';
import { BulkInvitePage } from './BulkInvitePage';
import { ProvideTeamStore } from './lib/store/useTeamStore';
import { TeamRosterPage } from './TeamRosterPage';
import { LabelAccessFlow } from './Onboarding/LabelAccessFlow';
import { ArtistAccessFlow } from './Onboarding/ArtistAccessFlow';
import { AddTeams } from './AddTeams';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var AccessRequiredTeamRoutes = function AccessRequiredTeamRoutes() {
  var getActiveTab = function getActiveTab(pathname) {
    if (pathname.endsWith('/activity')) return TeamTab.ACTIVITY;
    if (pathname.endsWith('/billing')) return TeamTab.BILLING;
    if (pathname.endsWith('/artists')) return TeamTab.ARTISTS;
    return TeamTab.MEMBERS;
  };

  return /*#__PURE__*/_jsx(HasAccess, {
    children: /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        exact: true,
        path: "/team/roster",
        component: TeamRosterPage
      }), /*#__PURE__*/_jsx(Route, {
        exact: true,
        path: ['/add-team', '/add-team/:step'],
        component: AddTeams
      }), /*#__PURE__*/_jsx(Route, {
        path: "/add-team",
        render: function render(_ref) {
          var match = _ref.match;
          return /*#__PURE__*/_jsx(Redirect, {
            to: match.url
          });
        }
      }), /*#__PURE__*/_jsx(HasTeamManagementAccess, {
        children: /*#__PURE__*/_jsxs(Switch, {
          children: [/*#__PURE__*/_jsx(Route, {
            path: "/team/:teamType/:artistId/invite",
            component: InvitePage
          }), /*#__PURE__*/_jsx(Route, {
            path: "/team/:teamType/:teamId/bulkinvite",
            component: BulkInvitePage
          }), /*#__PURE__*/_jsx(Route, {
            exact: true,
            path: ['/team/:teamType/:teamId', '/team/:teamType/:teamId/activity', '/team/:teamType/:teamId/billing', '/team/:teamType/:teamId/artists'],
            render: function render(_ref2) {
              var pathname = _ref2.location.pathname;
              return /*#__PURE__*/_jsx(TeamListPage, {
                activeTab: getActiveTab(pathname)
              });
            }
          }), /*#__PURE__*/_jsx(Route, {
            exact: true,
            path: "/team/:teamType/:teamId/:username",
            component: EditDetailsPage
          })]
        })
      })]
    })
  });
};

var TeamRoute = function TeamRoute() {
  return (
    /*#__PURE__*/

    /**
     * WARNING!!
     *
     * You probably want to add your route to AccessRequiredTeamRoutes instead of here, since
     * these routes don't check for access.
     */
    _jsx(LoggedIn, {
      children: /*#__PURE__*/_jsx(ProvideTeamStore, {
        children: /*#__PURE__*/_jsxs(Switch, {
          children: [/*#__PURE__*/_jsx(Route, {
            exact: true,
            path: "/team/accept-invite/:inviteToken",
            component: AcceptInvitePage
          }), /*#__PURE__*/_jsx(Route, {
            exact: true,
            path: "/team/access/label",
            component: LabelAccessFlow
          }), /*#__PURE__*/_jsx(Route, {
            exact: true,
            path: "/team/access/artist/:artistId",
            component: ArtistAccessFlow
          }), /*#__PURE__*/_jsx(Route, {
            exact: true,
            path: "/team/access/artist/:artistId/verify",
            component: ArtistAccessFlow
          }), /*#__PURE__*/_jsx(Route, {
            exact: true,
            path: "/team/access/artist",
            component: ArtistAccessFlow
          }), /*#__PURE__*/_jsx(Route, {
            path: "/",
            component: AccessRequiredTeamRoutes
          })]
        })
      })
    })
  );
}; // Needed for lazy-loading

/* eslint-disable-next-line import/no-default-export */


export default TeamRoute;