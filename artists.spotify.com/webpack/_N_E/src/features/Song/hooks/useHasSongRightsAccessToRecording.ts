// ignore-string-externalization
import has from 'lodash/has';
import { useSongRightsData } from './useSongRightsData';
import { useCurrentArtistId } from '../../../features/artists/src/useCurrentArtistId';
import { useCurrentSongId } from './useCurrentSongId';
export function useHasSongRightsAccessToRecording() {
  var artistId = useCurrentArtistId();
  var songId = useCurrentSongId();
  var songRightsResponse = useSongRightsData(artistId, songId);
  return songRightsResponse && has(songRightsResponse, 'isSplitRights') && !!songRightsResponse.isSplitRights;
}