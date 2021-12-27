export enum AccessGroup {
  PublishingAdmin = 'Publishing Admins',
  PublishingEditor = 'Publishing Editors',
  SongwriterAdmin = 'Songwriter Team Admin',
  SongwriterEditor = 'Songwriter Team Editor',
}

export enum InviteStatus {
  PENDING = 'INVITE_STATUS_PENDING',
  REDEEMED = 'INVITE_STATUS_REDEEMED',
  REVOKED = 'INVITE_STATUS_REVOKED',
  EXPIRED = 'INVITE_STATUS_EXPIRED',
}

export type Invite = {
  inviteId: string;
  email: string;
  fullName: string;
  role: string;
  status: InviteStatus;
  company: string;
  accessGroup: AccessGroup;
  organizationUri: string;
};

export type InvitedMember = {
  inviteId: string;
  email: string;
  fullName: string;
  role: string;
  company: string;
  accessGroup: AccessGroup;
  hasExistingProfile: boolean;
  orgName: string;
  organizationUri: string;
};

export type InviteTeamMemberRequest = {
  fullName: string;
  email: string;
  group: AccessGroup;
  role: string;
  company: string;
};

export type InviteSongwriterOrgMemberRequest = {
  fullName: string;
  email: string;
  group: AccessGroup;
};

export type AcceptInviteRequest = {
  company: string;
  fullName: string;
  email: string;
  role: string;
};
