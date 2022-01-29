import { useRead } from '@spotify-internal/creator-data-loading';
import { useCurrentArtist } from '../../../features/artists';
import { artistProfileLoader } from '../artistProfileLoader';
export function useCurrentArtistProfile() {
  var currentArtist = useCurrentArtist();
  return useRead(artistProfileLoader, currentArtist.id);
}