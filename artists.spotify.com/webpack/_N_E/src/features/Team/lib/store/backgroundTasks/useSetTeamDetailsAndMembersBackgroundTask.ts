// ignore-string-externalization
import { useEffect } from 'react';
import { teamDetailsAndMembersLoader } from '../../api/teamDetailsAndMembersLoader';
export var useSetTeamDetailsAndMembersBackgroundTask = function useSetTeamDetailsAndMembersBackgroundTask(_ref, _ref2) {
  var setCurrentTeamMembers = _ref.setCurrentTeamMembers,
      setCurrentTeamDetails = _ref.setCurrentTeamDetails;
  var currentTeam = _ref2.currentTeam;
  useEffect(function () {
    if (!currentTeam) {
      return function () {};
    }

    var isTerminated = false;
    setCurrentTeamMembers(null, null);
    setCurrentTeamDetails(null);
    teamDetailsAndMembersLoader.load({
      teamUri: currentTeam.uri
    }).then(function (result) {
      if (isTerminated) {
        return;
      }

      var teamMemberCount = result.members.filter(function (tm) {
        return tm.status === 'active';
      }).length;
      setCurrentTeamMembers(result.members, teamMemberCount);
      setCurrentTeamDetails(result);
    });
    return function () {
      isTerminated = true;
    };
  }, [setCurrentTeamMembers, setCurrentTeamDetails, currentTeam]);
};