import { useEffect } from 'react';
import { teamMemberLoader } from '../../api/teamMemberLoader';
import { useT } from '@mrkt/features/i18n';
export var useSetSelectedTeamMemberBackgroundTask = function useSetSelectedTeamMemberBackgroundTask(_ref, _ref2) {
  var setSelectedTeamMember = _ref.setSelectedTeamMember,
      goToTeamPage = _ref.goToTeamPage,
      showWarningBanner = _ref.showWarningBanner;
  var selectedTeamMemberUsername = _ref2.selectedTeamMemberUsername,
      currentTeam = _ref2.currentTeam;
  var t = useT();
  useEffect(function () {
    if (!currentTeam || !selectedTeamMemberUsername) {
      setSelectedTeamMember(null);
      return function () {};
    }

    var isTerminated = false;
    setSelectedTeamMember(null);
    teamMemberLoader.load({
      username: selectedTeamMemberUsername,
      teamUri: currentTeam.uri
    }).then(function (tm) {
      if (isTerminated) {
        return;
      }

      setSelectedTeamMember(tm);
    }).catch(function () {
      // Using replace here stops encountering the redirect again when hitting 'back'
      goToTeamPage(currentTeam, {
        replace: true
      });
      showWarningBanner(t('SELECTED_TEAM_MEMBER_ERROR_NOT_FOUND', 'Team Member not found', 'The team member was not found. There is no selected team member.'));
    });
    return function () {
      isTerminated = true;
    };
  }, [currentTeam, goToTeamPage, selectedTeamMemberUsername, setSelectedTeamMember, showWarningBanner]);
};