import { defineBool } from '@spotify-internal/remote-config-resolver';

// In order to upload a new property to remote config, you can add
// a new property here and then run `yarn publish-props`
// https://backstage.spotify.net/docs/remote-configuration-js-sdk/with-typescript/

export const internalAdmin = defineBool({
  name: 'internal-admin',
  description: 'Rollout group to specify all internal admin users for Spotify Publishing Analytics',
  default: false,
});

export const inProgressFeatures = defineBool({
  name: 'in-progress-features',
  description: 'Rollout group to specify users who have access to incomplete features.',
  default: false,
});
