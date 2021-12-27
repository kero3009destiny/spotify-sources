import {
  permissionsMap,
  RolePermissions,
} from '@spotify-internal/adstudio-shared/lib/config/permissions';

import { AdAccountMetadata } from 'ducks/accounts/types';

import { hasImpersonation } from 'utils/remoteconfig/remoteConfigHelpers';

import { ACCOUNT_ROLES } from '../config/account';

import { SuperUserData, SuperUserRole } from '../ducks/account/types';

const accountLevelRoles = [
  ACCOUNT_ROLES.ADMIN,
  ACCOUNT_ROLES.CONTRIBUTOR,
  ACCOUNT_ROLES.VIEWER,
];
// because Portcullis does not have a super admin role but only admin, we have
// to allow mapping from admin to super admin when admin is returned as the
// super user role
const superUserRoles = [
  SuperUserRole.SUPER_ADMIN,
  SuperUserRole.SUPERVIEWER,
  ACCOUNT_ROLES.ADMIN,
];

const getAccountLevelPermissions = (role: string) => {
  return permissionsMap[role];
};

export const mapPermissionsPerAccount = (
  accounts: Array<AdAccountMetadata>,
) => {
  return accounts.map((account: AdAccountMetadata) =>
    accountLevelRoles.includes(account.role)
      ? {
          ...account,
          permissions: getAccountLevelPermissions(account.role),
        }
      : account,
  );
};

const getSuperUserPerms = (superUserRole: string) => {
  // TODO: ASMIR-723 remove mapping of admin role to superAdmin
  const mappedRole =
    superUserRole === ACCOUNT_ROLES.ADMIN
      ? SuperUserRole.SUPER_ADMIN
      : superUserRole;
  return permissionsMap[mappedRole];
};

const filterActionsForImpersonation = (permission: RolePermissions) => {
  const stopActions = [
    RolePermissions.FLIGHT_STOP,
    RolePermissions.CAMPAIGN_STOP,
    RolePermissions.CREATIVE_STOP,
    RolePermissions.FLIGHT_CREATE,
    RolePermissions.CREATIVE_CREATE,
  ];
  return !stopActions.includes(permission);
};

export const mapSuperUserPerms = (
  superUserData: SuperUserData,
): SuperUserData => {
  return superUserData.rolenames.length > 0 &&
    superUserRoles.includes(superUserData.rolenames[0])
    ? {
        ...superUserData,
        // Will be removed with follow up work in ASMIR-900 once we remove impersonation flag. We want to remove the permissions for
        // any stop actions when a super user is impersonating but can't do that for all super users until fully launched.
        // once launced we can update the permissions map in adstudio-shared directly.
        permissions: hasImpersonation()
          ? getSuperUserPerms(superUserData.rolenames[0]).filter(permission =>
              filterActionsForImpersonation(permission),
            )
          : getSuperUserPerms(superUserData.rolenames[0]),
      }
    : superUserData;
};
