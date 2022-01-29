// ignore-string-externalization
import { useRemoteProperty, ReleaseStatsBool } from '@mrkt/features/RemoteConfig';
export function useHasReleaseStatsPage() {
  return useRemoteProperty(ReleaseStatsBool);
}