// ignore-string-externalization
import { useMemo } from 'react';
import { useCurrentArtistId } from './useCurrentArtistId';
import { useArtist } from './useArtist';
import { formatArtist } from './formatArtist';
export function useCurrentArtist() {
  var artistId = useCurrentArtistId();
  var fallback = useMemo(function () {
    return formatArtist({
      uri: "spotify:artist:".concat(artistId),
      imageUrl: '',
      name: artistId
    });
  }, [artistId]);
  return useArtist(artistId) || fallback;
}