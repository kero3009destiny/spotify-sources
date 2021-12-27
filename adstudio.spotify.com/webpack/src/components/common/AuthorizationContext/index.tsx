import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';

import {
  getPermissionsForAccount,
  getPermissionsForSuperUser,
} from 'ducks/account/selectors';

import { DEFAULT_PERMISSIONS_VALUES } from './constants';

export interface StateProps {
  permissions: Array<RolePermissions>;
}

export interface AuthProviderProps {
  children: JSX.Element | React.ReactElement | Array<JSX.Element>;
  permissions: Array<RolePermissions>;
}

export const AuthContext = React.createContext<Array<RolePermissions>>(
  DEFAULT_PERMISSIONS_VALUES,
);

export const AuthContextConsumer = AuthContext.Consumer;

export const AuthContextProvider = (props: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={props.permissions}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const mapStateToProps = (state: TSFixMe): StateProps => {
  // this logic assumes that the permissions for the active account take
  // precendent over any super user permissions. This may need to change.
  const permissionsForActiveAccount = getPermissionsForAccount(state);
  return {
    permissions: !isEmpty(permissionsForActiveAccount)
      ? permissionsForActiveAccount
      : getPermissionsForSuperUser(state),
  };
};

export const ConnectedAuthProvider = connect<StateProps>(mapStateToProps)(
  AuthContextProvider,
);
