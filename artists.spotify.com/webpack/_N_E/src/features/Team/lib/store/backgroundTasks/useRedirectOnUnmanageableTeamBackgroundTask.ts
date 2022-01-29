import { useEffect } from 'react';
import { useT } from '@mrkt/features/i18n';
export var useRedirectOnUnmanageableTeamBackgroundTask = function useRedirectOnUnmanageableTeamBackgroundTask(_ref, _ref2) {
  var goToTeamsPage = _ref.goToTeamsPage,
      showWarningBanner = _ref.showWarningBanner;
  var teams = _ref2.teams,
      currentTeam = _ref2.currentTeam,
      hasGodMode = _ref2.hasGodMode;
  var t = useT();
  useEffect(function () {
    if (!teams || !currentTeam || hasGodMode) return;

    if (!teams.find(function (team) {
      return team.uri === currentTeam.uri;
    })) {
      goToTeamsPage({
        replace: true
      });
      showWarningBanner(t('MANAGE_TEAM_ACCESS_REDIRECT_ERROR', "You can't access that team.", "You can't access that team."));
    }
  }, [teams, currentTeam, goToTeamsPage, hasGodMode, showWarningBanner]);
};