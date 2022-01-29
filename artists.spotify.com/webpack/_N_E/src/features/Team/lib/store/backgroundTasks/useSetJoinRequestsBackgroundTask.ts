import { useEffect } from 'react';
import { joinRequestsLoader } from '../../api/joinRequestsLoader';
export var useSetJoinRequestsBackgroundTask = function useSetJoinRequestsBackgroundTask(_ref, _ref2) {
  var setJoinRequests = _ref.setJoinRequests;
  var currentTeam = _ref2.currentTeam;
  useEffect(function () {
    if (!currentTeam) {
      return function () {};
    }

    var isTerminated = false;
    setJoinRequests(null);
    joinRequestsLoader.load({
      teamUri: currentTeam.uri
    }).then(function (result) {
      if (isTerminated) {
        return;
      }

      setJoinRequests(result.accessRequests);
    });
    return function () {
      isTerminated = true;
    };
  }, [currentTeam, setJoinRequests]);
};