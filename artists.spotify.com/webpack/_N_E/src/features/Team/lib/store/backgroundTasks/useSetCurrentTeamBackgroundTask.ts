import { useEffect } from 'react';
import { useCurrentTeamOrNull } from '../../api/useCurrentTeamOrNull';
export var useSetCurrentTeamBackgroundTask = function useSetCurrentTeamBackgroundTask(_ref) {
  var setCurrentTeam = _ref.setCurrentTeam;
  var currentTeam = useCurrentTeamOrNull();
  useEffect(function () {
    return setCurrentTeam(currentTeam);
  }, [currentTeam, setCurrentTeam]);
};