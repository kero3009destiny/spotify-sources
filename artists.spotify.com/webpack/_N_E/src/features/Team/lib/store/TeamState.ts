// ignore-string-externalization
import { defaultOnboardingState } from '../../Onboarding/store';
import { defaultArtistsTabState } from '../../ArtistsTab/store/ArtistsTabState';
import { defaultActivityState } from '../../Activity/lib/store/ActivityState';
import { defaultBillingContactState } from '../../BillingContact/lib/store/BillingContactState';
import { emptyAddTeamsState } from '../../AddTeams/store/AddTeamsState';
import { defaultBulkInviteState } from '../../BulkInvitePage/store/BulkInviteState';
export var defaultTeamState = {
  artists: null,
  confirmTeamMemberRemoval: null,
  confirmJoinRequestApproval: null,
  confirmJoinRequestRemoval: null,
  currentTeam: null,
  currentTeamDetails: null,
  currentTeamMembers: null,
  currentTeamMemberCount: null,
  currentUser: null,
  isEmployee: false,
  hasGodMode: false,
  adminAccessRequests: false,
  joinRequests: null,
  joinTableIsExpanded: false,
  layoutType: 'full',
  pendingInvite: null,
  prepopulatedInviteDetails: {},
  platform: null,
  selectedTeamMember: null,
  selectedTeamMemberUsername: null,
  teams: null,
  taskStatus: {},
  taskPromises: {},
  taskErrors: {},
  yourTeamsPageView: 'table',
  // Extended state
  activity: defaultActivityState,
  addTeams: emptyAddTeamsState,
  artistsTab: defaultArtistsTabState,
  bulkInvite: defaultBulkInviteState,
  onboarding: defaultOnboardingState,
  billingContact: defaultBillingContactState
};