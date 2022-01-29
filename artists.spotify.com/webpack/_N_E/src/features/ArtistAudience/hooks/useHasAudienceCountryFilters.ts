// ignore-string-externalization
import { AudienceCountryFiltersBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export function useHasAudienceCountryFilters() {
  return useRemoteProperty(AudienceCountryFiltersBool);
}