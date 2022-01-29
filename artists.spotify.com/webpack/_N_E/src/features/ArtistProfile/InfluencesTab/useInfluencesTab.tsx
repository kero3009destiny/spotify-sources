import { InfluencesTabBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
/* This will check if the user is flagged to see the influences tab */

export function useInfluencesTab() {
  return useRemoteProperty(InfluencesTabBool);
}