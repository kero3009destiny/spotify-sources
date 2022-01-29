// ignore-string-externalization
import { matchPath, useLocation } from 'react-router';
import { useMemo } from 'react';
export var OrgType;

(function (OrgType) {
  OrgType["artist"] = "artist";
  OrgType["label"] = "label";
})(OrgType || (OrgType = {}));

export var useCurrentOrgOrNull = function useCurrentOrgOrNull() {
  var location = useLocation();
  var match = matchPath(location.pathname, {
    path: ['/team/:orgType/:orgId', '/artist/:artistId', '/activity/:orgType/:orgId', '/add-artist', '/access/artist/:artistId']
  });

  var _ref = match ? match.params : {
    artistId: undefined,
    orgType: undefined,
    orgId: undefined
  },
      artistId = _ref.artistId,
      orgType = _ref.orgType,
      orgId = _ref.orgId;

  return useMemo(function () {
    if (!artistId && !orgType && !orgId) {
      return null;
    }

    var _ref2 = function () {
      if (artistId) {
        return {
          type: OrgType.artist,
          id: artistId
        };
      } else if (orgType && orgId) {
        return {
          type: isOrgType(orgType) ? orgType : OrgType.artist,
          id: orgId
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
  }, [artistId, orgType, orgId]);
};
export var isOrgType = function isOrgType(type) {
  return type in OrgType;
};