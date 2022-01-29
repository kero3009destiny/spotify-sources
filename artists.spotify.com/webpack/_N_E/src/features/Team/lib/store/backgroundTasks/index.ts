import { useSetLayoutTypeBackgroundTask } from './useSetLayoutTypeBackgroundTask';
import { useSetCurrentTeamBackgroundTask } from './useSetCurrentTeamBackgroundTask';
import { useSetPrepopulatedInviteDetailsBackgroundTask } from './useSetPrepopulatedInviteDetailsBackgroundTask';
import { useSetSelectedTeamMemberUsernameBackgroundTask } from './useSetSelectedTeamMemberUsernameBackgroundTask';
import { useSetSelectedTeamMemberBackgroundTask } from './useSetSelectedTeamMemberBackgroundTask';
import { useSetCurrentUserBackgroundTask } from './useSetCurrentUserBackgroundTask';
import { useSetTeamsBackgroundTask } from './useSetTeamsBackgroundTask';
import { useSetTeamDetailsAndMembersBackgroundTask } from './useSetTeamDetailsAndMembersBackgroundTask';
import { useSetPendingInviteBackgroundTask } from './useSetPendingInviteBackgroundTask';
import { useRedirectOnUnmanageableTeamBackgroundTask } from './useRedirectOnUnmanageableTeamBackgroundTask';
import { useArtistsTabBackgroundTasks } from '../../../ArtistsTab/store/ArtistsTabBackgroundTasks';
import { useSetJoinRequestsBackgroundTask } from './useSetJoinRequestsBackgroundTask';
import { useSetArtistsBackgroundTask } from './useSetArtistsBackgroundTask';
import { useSetIsEmployeeBackgroundTask } from './useSetIsEmployeeBackgroundTask';
import { useBillingContactBackgroundTasks } from '../../../BillingContact/lib/store/BillingContactBackgroundTasks';
import { useSetAdminAccessRequestBackgroundTask } from './useSetAdminAccessRequestsBackgroundTask';
import { useAddTeamsBackgroundTasks } from '../../../AddTeams/store/AddTeamsBackgroundTasks';
import { useSetPlatformBackgroundTask } from './useSetPlatformBackgroundTask';
import { useBulkInviteBackgroundTasks } from '../../../BulkInvitePage/store/BulkInviteBackgroundTasks';
import { useOnboardingBackgroundTasks } from '../../../Onboarding/store/OnboardingBackgroundTasks';
/**
 * BackgroundTasks are async store updates triggered by a change to state
 * (e.g. by an external hook like useCurrentUser). Pretty much all of the
 * time they achieve this via useEffect.
 *
 * Some BackgroundTasks update the store in response to a change in the store's
 * state (e.g. by fetching the selectedUser in response to a change to
 * selectedUsername).
 *
 * To perform an async store update via a function call, use Tasks instead.
 */

var useGlobalBackgroundTasks = function useGlobalBackgroundTasks(state, dispatchers) {
  useSetArtistsBackgroundTask(dispatchers);
  useSetCurrentTeamBackgroundTask(dispatchers);
  useSetIsEmployeeBackgroundTask(dispatchers);
  useSetLayoutTypeBackgroundTask(dispatchers);
  useSetCurrentUserBackgroundTask(dispatchers);
  useSetJoinRequestsBackgroundTask(dispatchers, state);
  useSetTeamDetailsAndMembersBackgroundTask(dispatchers, state);
  useSetPrepopulatedInviteDetailsBackgroundTask(dispatchers);
  useSetPlatformBackgroundTask(dispatchers);
  useSetSelectedTeamMemberUsernameBackgroundTask(dispatchers);
  useSetSelectedTeamMemberBackgroundTask(dispatchers, state);
  useSetTeamsBackgroundTask(dispatchers, state);
  useSetPendingInviteBackgroundTask(dispatchers);
  useRedirectOnUnmanageableTeamBackgroundTask(dispatchers, state);
  useSetAdminAccessRequestBackgroundTask(dispatchers, state);
};

export var useTeamBackgroundTasks = function useTeamBackgroundTasks(state, dispatchers) {
  useGlobalBackgroundTasks(state, dispatchers);
  useAddTeamsBackgroundTasks(state, dispatchers);
  useArtistsTabBackgroundTasks(state, dispatchers);
  useBillingContactBackgroundTasks(state, dispatchers);
  useBulkInviteBackgroundTasks(state, dispatchers);
  useOnboardingBackgroundTasks(state, dispatchers);
};