// ignore-string-externalization
import { QualtricsBannerBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export var useShowQualtricsBanner = function useShowQualtricsBanner() {
  return useRemoteProperty(QualtricsBannerBool);
};