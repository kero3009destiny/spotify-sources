import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { matchPath, useLocation } from 'react-router';
import { useEffect } from 'react';
import { pendingInviteDetailsLoader } from '../../api/pendingInviteDetailsLoader';
import { useArtists } from '../../../../artists';
export var useSetPendingInviteBackgroundTask = function useSetPendingInviteBackgroundTask(_ref) {
  var _matchPath;

  var setPendingInvite = _ref.setPendingInvite;
  var location = useLocation();
  var isFirstTeam = useArtists().length === 0;
  var inviteUuid = ((_matchPath = matchPath(location.pathname, '/team/accept-invite/:inviteUuid')) === null || _matchPath === void 0 ? void 0 : _matchPath.params.inviteUuid) || null;
  useEffect(function () {
    if (!inviteUuid) {
      return function () {};
    }

    var isTerminated = false;
    pendingInviteDetailsLoader.load({
      inviteUuid: inviteUuid
    }).then(function (pendingInviteDetails) {
      if (isTerminated) {
        return;
      }

      setPendingInvite(_objectSpread(_objectSpread({}, pendingInviteDetails), {}, {
        didAcceptTerms: false,
        submitError: null,
        isFirstTeam: isFirstTeam
      }));
    });
    return function () {
      isTerminated = true;
    };
  }, [setPendingInvite, inviteUuid, isFirstTeam]);
};