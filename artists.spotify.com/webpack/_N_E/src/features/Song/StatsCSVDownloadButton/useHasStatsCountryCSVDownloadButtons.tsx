// ignore-string-externalization
import { CountryStatsCsvDownloadButtonBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export var useHasStatsCountryCSVDownloadButtons = function useHasStatsCountryCSVDownloadButtons() {
  return useRemoteProperty(CountryStatsCsvDownloadButtonBool);
};