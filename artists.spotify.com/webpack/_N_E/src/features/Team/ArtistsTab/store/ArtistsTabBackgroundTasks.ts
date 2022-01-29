import { useSetArtistTeamsBackgroundTask } from '../backgroundTasks/useSetArtistTeamsBackgroundTask';
export var useArtistsTabBackgroundTasks = function useArtistsTabBackgroundTasks(teamState, dispatchers) {
  useSetArtistTeamsBackgroundTask(dispatchers, teamState);
};