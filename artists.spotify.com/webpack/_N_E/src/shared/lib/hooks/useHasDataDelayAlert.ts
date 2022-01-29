// ignore-string-externalization
import { DataDelayAlertBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export function useHasDataDelayAlert() {
  return useRemoteProperty(DataDelayAlertBool);
}