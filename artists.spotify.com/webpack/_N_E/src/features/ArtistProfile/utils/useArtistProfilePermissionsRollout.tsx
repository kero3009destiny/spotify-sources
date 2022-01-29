import { S4AWebProfile1pRolloutBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export function useArtistProfilePermissionsRollout() {
  return useRemoteProperty(S4AWebProfile1pRolloutBool);
}