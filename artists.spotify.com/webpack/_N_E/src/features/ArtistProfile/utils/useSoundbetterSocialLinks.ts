import { S4AWebProfileUseSoundbetterSocialLinksBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export function useSoundbetterSocialLinks() {
  return useRemoteProperty(S4AWebProfileUseSoundbetterSocialLinksBool);
}