// ignore-string-externalization
import { useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
var actions = ['invite', 'bulkinvite', 'activity', 'billing', 'artists'];
export var useSetSelectedTeamMemberUsernameBackgroundTask = function useSetSelectedTeamMemberUsernameBackgroundTask(_ref) {
  var setSelectedTeamMemberUsername = _ref.setSelectedTeamMemberUsername;

  var _ref2 = useRouteMatch('/team/:teamType/:teamId/:usernameOrAction') || {
    params: {}
  },
      _ref2$params$username = _ref2.params.usernameOrAction,
      usernameOrAction = _ref2$params$username === void 0 ? '' : _ref2$params$username;

  useEffect(function () {
    // The invite url also matches this route. Ignore it.
    if (actions.includes(usernameOrAction)) {
      return;
    }

    setSelectedTeamMemberUsername(usernameOrAction || null);
  }, [setSelectedTeamMemberUsername, usernameOrAction]);
};