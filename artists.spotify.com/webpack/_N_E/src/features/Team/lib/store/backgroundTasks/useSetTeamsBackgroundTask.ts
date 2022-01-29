import { useEffect } from 'react';
import { manageableTeamsLoader } from '../../api/manageableTeamsLoader';
import { isGodMode } from '../../util/isGodMode';
export var useSetTeamsBackgroundTask = function useSetTeamsBackgroundTask(_ref, _ref2) {
  var setTeams = _ref.setTeams,
      setHasGodMode = _ref.setHasGodMode;
  var teams = _ref2.teams;
  useEffect(function () {
    if (!teams) {
      manageableTeamsLoader.load(0).then(function (teamsWithGodMode) {
        var teamsWithoutGodMode = teamsWithGodMode.filter(function (t) {
          return !isGodMode(t);
        });
        var hasGodMode = teamsWithGodMode.length !== teamsWithoutGodMode.length; // Order of these sets is important - you should be able to assume that GodMode is accurate
        // once teams are set

        setHasGodMode(hasGodMode);
        setTeams(teamsWithoutGodMode);
      });
    }
  }, [setHasGodMode, setTeams, teams]);
};