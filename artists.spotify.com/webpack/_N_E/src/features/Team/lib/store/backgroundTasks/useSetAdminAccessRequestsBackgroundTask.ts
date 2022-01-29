import { useEffect } from 'react';
import { manageTeamsPermissionsLoader } from '../../api/manageTeamPermissionsLoader';
export var useSetAdminAccessRequestBackgroundTask = function useSetAdminAccessRequestBackgroundTask(_ref, _ref2) {
  var setAdminAccessRequests = _ref.setAdminAccessRequests;
  var currentTeam = _ref2.currentTeam;
  useEffect(function () {
    if (!currentTeam) {
      return function () {};
    }

    var isTerminated = false;
    var organizationUri = currentTeam.uri;
    manageTeamsPermissionsLoader.load({
      organizationUri: organizationUri
    }).then(function (perms) {
      if (isTerminated) {
        return;
      }

      setAdminAccessRequests(perms.adminAccessRequests);
    });
    return function () {
      isTerminated = true;
    };
  }, [currentTeam, setAdminAccessRequests]);
};