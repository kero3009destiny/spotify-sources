// ignore-string-externalization
import { ReleasesFirstBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export var useHasReleasesFirst = function useHasReleasesFirst() {
  return useRemoteProperty(ReleasesFirstBool);
};