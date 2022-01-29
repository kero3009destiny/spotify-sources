// ignore-string-externalization
import { matchPath, useLocation } from 'react-router';
import { useMemo } from 'react';
import { isTeamType, TeamType } from '../model/Team';
export var useCurrentTeamOrNull = function useCurrentTeamOrNull() {
  var location = useLocation();
  var match = matchPath(location.pathname, {
    path: [// including accept-invite to prevent it from being mistaken for teamType
    '/team/accept-invite/', '/team/access/label', '/team/access/artist', '/team/:teamType/:teamId', '/artist/:artistId', '/activity/:teamType/:teamId', '/access/artist/:artistId', '/access/artist/:artistId/verify']
  });

  var _ref = match ? match.params : {
    artistId: undefined,
    teamType: undefined,
    teamId: undefined
  },
      artistId = _ref.artistId,
      teamType = _ref.teamType,
      teamId = _ref.teamId;

  return useMemo(function () {
    if (!artistId && !teamType && !teamId) {
      return null;
    }

    var _ref2 = function () {
      if (artistId) {
        return {
          type: TeamType.artist,
          id: artistId
        };
      } else if (teamType && teamId) {
        return {
          type: isTeamType(teamType) ? teamType : TeamType.artist,
          id: teamId
        };
      }

      return {
        type: null,
        id: null
      };
    }(),
        type = _ref2.type,
        id = _ref2.id;

    if (type === null || id === null) {
      return null;
    }

    return {
      type: type,
      id: id,
      uri: "spotify:".concat(type, ":").concat(id)
    };
  }, [artistId, teamType, teamId]);
};