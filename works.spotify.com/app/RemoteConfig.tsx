import { useMemo, FunctionComponent } from 'react';
import { RemoteConfigProvider, useBool } from '@spotify-internal/remote-config-resolver-react';
import { getPersistedAccessToken } from 'libs/services/auth';
import { internalAdmin, inProgressFeatures } from './properties';

// https://backstage.spotify.net/experimentation/rollout/overview/3959
export const useInternalAdmin = () => useBool(internalAdmin);

// https://backstage.spotify.net/experimentation/rollout/overview/13177
export const useInProgressFeatures = () => useBool(inProgressFeatures);

const RemoteConfig: FunctionComponent<{ userName: string }> = ({ userName, children }) => {
  const token = useMemo(getPersistedAccessToken, []);

  return (
    <RemoteConfigProvider
      token={token || undefined}
      context={{ userKey: userName }}
      clientId="s4p-webapp"
    >
      {children}
    </RemoteConfigProvider>
  );
};

export default RemoteConfig;
