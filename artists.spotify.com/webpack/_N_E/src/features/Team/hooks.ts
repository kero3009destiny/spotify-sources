// ignore-string-externalization

/**
 * Resource hooks (and associated types) intended for use outside of
 * the Teams folder (within Teams, we use the TeamDataStore).
 */
import { useRead } from '@spotify-internal/creator-data-loading';
import { useMemo } from 'react';
import { manageableTeamsLoader } from './lib/api/manageableTeamsLoader';
import { useCurrentTeamOrNull } from './lib/api/useCurrentTeamOrNull';
import { teamDetailsAndMembersLoader } from './lib/api/teamDetailsAndMembersLoader';
import { isGodMode } from './lib/util/isGodMode'; // Re-exports

export { useCurrentTeamOrNull } from './lib/api/useCurrentTeamOrNull';
export { TeamType } from './lib/model/Team';
export { AccessLevel, accessLevelName } from './lib/model/AccessLevel';
export { isActiveTeamMember, isInvitedTeamMember } from './lib/model/TeamMember';
export { teamDetailsAndMembersLoader } from './lib/api/teamDetailsAndMembersLoader';
export { useTracker } from './lib/api/useTracker';
export { activity } from './lib/events'; // Type exports

// Hooks for external use
export var useManageableTeamsWithGodmode = function useManageableTeamsWithGodmode() {
  return useRead(manageableTeamsLoader, 0);
};
export var useManageableTeams = function useManageableTeams() {
  var teams = useManageableTeamsWithGodmode();
  return useMemo(function () {
    return teams.filter(function (t) {
      return t.id !== '*';
    });
  }, [teams]);
};
export var useCanManageCurrentTeam = function useCanManageCurrentTeam(team) {
  var teamFromUri = useCurrentTeamOrNull();
  var currentTeam = team ? team : teamFromUri;
  var manageableTeams = useManageableTeams();
  return !!(currentTeam && manageableTeams.find(function (t) {
    return t.uri === (currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.uri);
  }));
};
export var useHasGodModeWrite = function useHasGodModeWrite() {
  return !!useManageableTeamsWithGodmode().find(function (t) {
    return isGodMode(t);
  });
};
export var useCurrentTeamDetails = function useCurrentTeamDetails(teamOrg) {
  var _useCurrentTeamOrNull;

  var teamFromUri = (_useCurrentTeamOrNull = useCurrentTeamOrNull()) === null || _useCurrentTeamOrNull === void 0 ? void 0 : _useCurrentTeamOrNull.uri;
  var teamUri;

  if (!teamFromUri && !teamOrg) {
    teamUri = null;
  } else {
    teamUri = teamOrg ? teamOrg : teamFromUri;
  } // Return null for errors - they likely don't have permission


  return useRead(teamDetailsAndMembersLoader, {
    teamUri: teamUri
  });
};
export var useCurrentTeamMembers = function useCurrentTeamMembers(teamUriOverride) {
  var _useCurrentTeamOrNull2;

  var teamFromUri = (_useCurrentTeamOrNull2 = useCurrentTeamOrNull()) === null || _useCurrentTeamOrNull2 === void 0 ? void 0 : _useCurrentTeamOrNull2.uri;
  var teamUri = teamUriOverride ? teamUriOverride : teamFromUri;

  if (!teamUri) {
    throw new Error('No current team');
  } // Return null for errors - they likely don't have permission


  return useRead(teamDetailsAndMembersLoader, {
    teamUri: teamUri
  }).members;
};