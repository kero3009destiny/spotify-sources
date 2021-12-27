import React from 'react';
import { connect } from 'react-redux';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { withRemoteConfig } from '@spotify-internal/remote-config-resolver-react';

import {
  advertiserHasDraftImpersonation as advertiserHasDraftImpersonationSelector,
  canCreate,
} from 'ducks/account/selectors';

import { AuthContextConsumer } from '../AuthorizationContext';

interface OwnProps {
  yes: () => React.ReactNode;
  no?: () => React.ReactNode;
}

interface ResolvedProps {
  hasImpersonation: boolean;
}

interface StateProps {
  hasAccountWritePermissions: boolean;
  advertiserHasDraftImpersonation: boolean;
}

type CanAccessBuilderProps = OwnProps & ResolvedProps & StateProps;

/*
 * Condtionally render based on whether the user can build campaigns/flights/creatives
 * Note that this is different from creation permissions; the user may only have draft creation
 * permissions but should still be able to access the 'build' pages.
 *
 * TODO(ASMIR-830): Simplify this logic once impersonation is fully launched. It should be
 * sufficient to remove this component entirely and use <Can> directly to check for DRAFT_CREATE.
 */
export const CanAccessBuilderComponent = ({
  yes,
  no,
  hasAccountWritePermissions,
  hasImpersonation,
  advertiserHasDraftImpersonation,
}: CanAccessBuilderProps) => {
  // Only allow draft creation when both the admin and advertiser account are opted in
  const canImpersonatorBuild =
    hasImpersonation && advertiserHasDraftImpersonation;

  return hasAccountWritePermissions || canImpersonatorBuild ? (
    <AuthContextConsumer>
      {permissions => (
        <Can
          perform={[RolePermissions.DRAFT_CREATE]}
          permissions={permissions}
          yes={yes}
          no={no}
        />
      )}
    </AuthContextConsumer>
  ) : (
    <>{no && no()}</>
  );
};

const mapStateToProps = (state: TSFixMe): StateProps => {
  return {
    hasAccountWritePermissions: canCreate(state),
    advertiserHasDraftImpersonation: advertiserHasDraftImpersonationSelector(
      state,
    ),
  };
};

const mapResolverToProps = (resolver: {
  getBool: (arg: string) => boolean;
}): ResolvedProps => ({
  hasImpersonation: resolver && resolver.getBool('impersonation'),
});

const WrappedWithRemoteConfig = withRemoteConfig<ResolvedProps>(
  mapResolverToProps,
  {
    blockRendering: true,
  },
)(CanAccessBuilderComponent);

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(
  WrappedWithRemoteConfig,
);
