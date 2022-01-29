// ignore-string-externalization
import { UseArtistGraphqlBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export function useArtistGraphqlBool() {
  return useRemoteProperty(UseArtistGraphqlBool);
}