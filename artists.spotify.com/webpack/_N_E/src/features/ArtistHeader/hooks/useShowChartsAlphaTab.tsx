// ignore-string-externalization
import { ShowChartsAlphaTabBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export var useShowChartsAlphaTab = function useShowChartsAlphaTab() {
  return useRemoteProperty(ShowChartsAlphaTabBool);
};