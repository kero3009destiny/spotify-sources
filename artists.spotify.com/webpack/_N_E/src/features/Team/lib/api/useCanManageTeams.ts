import { useRead } from '@spotify-internal/creator-data-loading';
import { canManageTeamsLoader } from './canManageTeamsLoader';
export var useCanManageTeams = function useCanManageTeams() {
  return useRead(canManageTeamsLoader, 0);
};