// ignore-string-externalization
import { GlobalStatsCsvDownloadButtonBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export var useHasStatsGlobalCSVDownloadButtons = function useHasStatsGlobalCSVDownloadButtons() {
  return useRemoteProperty(GlobalStatsCsvDownloadButtonBool);
};