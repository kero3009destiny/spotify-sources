import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { Logger } from '@mrkt/features/Platform';
import { PendingInviteState } from '../model/PendingInvite';
import { MARKETPLACE_MGMT_API } from '../../../../shared/lib/api';
import { getNames } from '../util/getNames';
import { uriToMiniTeamOrThrow } from '../util/uriToMiniTeam';
import { TeamType } from '../model/Team';
import { WebgateFetchError, webgateFetchJsonWithError } from '../util/webgateFetchJsonWithError';
import { createLoader } from '@spotify-internal/creator-data-loading';

var serverResponseToPendingInviteDetails = function serverResponseToPendingInviteDetails(raw, inviteUuid) {
  var _uriToMiniTeamOrThrow = uriToMiniTeamOrThrow(raw.orgUri),
      teamUri = _uriToMiniTeamOrThrow.uri,
      teamId = _uriToMiniTeamOrThrow.id,
      teamType = _uriToMiniTeamOrThrow.type;

  return _objectSpread(_objectSpread({}, getNames(raw.fullName)), {}, {
    businessEmail: raw.email,
    teamName: raw.orgName,
    teamUri: teamUri,
    teamId: teamId,
    teamType: teamType,
    inviteUuid: inviteUuid,
    state: PendingInviteState.pending
  });
};

export var pendingInviteDetailsLoader = createLoader(function (_ref) {
  var inviteUuid = _ref.inviteUuid;
  return webgateFetchJsonWithError("".concat(MARKETPLACE_MGMT_API, "/v0/invite/").concat(inviteUuid)).then(function (data) {
    return serverResponseToPendingInviteDetails(data, inviteUuid);
  }) // this is a little bit hacky, but we need a way of representing expired/redeemed
  // invites that don't have any additional information
  .catch(function (e) {
    if (!(e instanceof WebgateFetchError)) {
      throw e;
    }

    var serverErrorBody = e.status === 409 ? JSON.parse(e.body) : e.body;
    Logger.logError('invalid-invite', e);

    var alreadyOnTeamState = function alreadyOnTeamState() {
      switch (serverErrorBody.group) {
        case 'Full Access':
          return PendingInviteState.admin;

        case 'Edit Access':
          return PendingInviteState.editor;

        case 'View-only Access':
          return PendingInviteState.reader;

        default:
          return PendingInviteState.reader;
      }
    };

    var redeemedOrExpiredState = function redeemedOrExpiredState() {
      return serverErrorBody === 'redeemed' ? PendingInviteState.redeemed : PendingInviteState.expired;
    };

    return {
      firstName: '',
      lastName: '',
      businessEmail: '',
      teamName: serverErrorBody.orgName || '',
      teamUri: '',
      teamId: '',
      teamType: TeamType.artist,
      inviteUuid: inviteUuid,
      state: e.status === 409 ? alreadyOnTeamState() : redeemedOrExpiredState()
    };
  });
});