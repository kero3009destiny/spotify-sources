// ignore-string-externalization
export var isActiveTeamMember = function isActiveTeamMember(tm) {
  return tm.status === 'active';
};
export var isInvitedTeamMember = function isInvitedTeamMember(tm) {
  return tm.status !== 'active';
};