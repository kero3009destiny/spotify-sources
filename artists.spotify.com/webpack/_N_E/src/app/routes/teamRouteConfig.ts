import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { PageId } from '../../features/PlatformEvents/PageId';
import { LazyTeamRoute } from '../../features/Team';
import { LazyTeamHeader } from '../../features/TeamHeader';
import { LazyArtistFooter } from '../Artist/LazyArtistFooter';
export var defaultTeamProps = {
  header: LazyTeamHeader,
  body: LazyTeamRoute,
  footer: LazyArtistFooter
};
export var teamRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.TeamManagement,
  path: '/team'
});
export var addTeamRouteConfig = {
  pageId: PageId.AddTeam,
  body: LazyTeamRoute,
  path: '/add-team',
  exact: true
};
export var addTeamFlowRouteConfig = {
  pageId: PageId.AddTeam,
  body: LazyTeamRoute,
  path: '/add-team/:step',
  exact: true
};
export var teamAcceptInviteRouteConfig = {
  pageId: PageId.TeamManagementAcceptInvite,
  body: LazyTeamRoute,
  path: '/team/accept-invite/:inviteId'
};
export var teamLabelJoinRouteConfig = {
  pageId: PageId.TeamAccessLabel,
  body: LazyTeamRoute,
  path: '/team/access/label',
  exact: true
};
export var teamAccessArtistRouteConfig = {
  pageId: PageId.TeamAccessArtist,
  body: LazyTeamRoute,
  path: '/team/access/artist',
  exact: true
};
export var teamAccessSelectedArtistRouteConfig = {
  pageId: PageId.TeamAccessArtist,
  body: LazyTeamRoute,
  path: '/team/access/artist/:artistId',
  exact: true
};
export var teamAccessArtistVerifyRouteConfig = {
  pageId: PageId.TeamAccessArtist,
  body: LazyTeamRoute,
  path: '/team/access/artist/:artistId/verify',
  exact: true
};
export var teamArtistRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.TeamManagementTeamDetails,
  path: '/team/artist/:artistId',
  exact: true
});
export var teamLabelArtistsRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.TeamLabelArtists,
  path: '/team/label/:labelId/artists',
  exact: true
});
export var teamLabelBillingRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.Billing,
  path: '/team/label/:labelId/billing',
  exact: true
});
export var teamArtistBillingRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.Billing,
  path: '/team/artist/:artistId/billing',
  exact: true
});
export var teamArtistDetailsRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.TeamManagementTeamDetails,
  path: '/team/artist/:artistId/details',
  exact: true
});
export var teamArtistInviteRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.TeamManagementInvite,
  path: '/team/artist/:artistId/invite',
  exact: true
});
export var teamLabelInviteRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.TeamManagementInvite,
  path: '/team/label/:labelId/invite',
  exact: true
});
export var teamArtistBulkInviteRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.TeamManagementBulkInvite,
  path: '/team/artist/:artistId/bulkinvite',
  exact: true
});
export var teamLabelBulkInviteRouteConfig = _objectSpread(_objectSpread({}, defaultTeamProps), {}, {
  pageId: PageId.TeamManagementBulkInvite,
  path: '/team/label/:labelId/bulkinvite',
  exact: true
});