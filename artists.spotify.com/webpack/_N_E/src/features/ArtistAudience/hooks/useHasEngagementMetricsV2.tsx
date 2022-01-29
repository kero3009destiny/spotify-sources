// ignore-string-externalization
import { EngagementMetricsBoolV2, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export function useHasEngagementMetricsV2() {
  return useRemoteProperty(EngagementMetricsBoolV2);
}