// ignore-string-externalization
import { usePageLocation } from '../../page';
import { useCurrentSongIdOrNull } from './useCurrentSongIdOrNull';
export function useCurrentSongId() {
  var songIdOrNull = useCurrentSongIdOrNull();
  var location = usePageLocation();

  if (!songIdOrNull) {
    throw new Error("".concat(location.pathname, " doesn't match /artist/:artistId/song/:songId"));
  }

  return songIdOrNull;
}