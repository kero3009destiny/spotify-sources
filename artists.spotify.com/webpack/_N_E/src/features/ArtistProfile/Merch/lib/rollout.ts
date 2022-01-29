import { S4AWebProfileMerchRolloutBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export function useMerchRollout() {
  return useRemoteProperty(S4AWebProfileMerchRolloutBool);
}