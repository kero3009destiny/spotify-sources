// ignore-string-externalization
import { useCurrentArtistId } from '../../../features/artists/src/useCurrentArtistId';
import { useCurrentSongId } from './useCurrentSongId';
import { useSongRightsData } from './useSongRightsData';
export function useHasAnyAccessToRecording() {
  var artistId = useCurrentArtistId();
  var trackId = useCurrentSongId();
  var userSongRights = useSongRightsData(artistId, trackId);
  return !userSongRights.status || userSongRights.status === 200;
}