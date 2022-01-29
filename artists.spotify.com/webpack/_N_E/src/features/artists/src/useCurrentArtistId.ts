// ignore-string-externalization
import { useLocation } from 'react-router-dom';
import { useCurrentArtistIdOrNull } from './useCurrentArtistIdOrNull';
export function useCurrentArtistId() {
  var artistIdOrNull = useCurrentArtistIdOrNull();
  var location = useLocation();

  if (!artistIdOrNull) {
    throw new Error("".concat(location.pathname, " doesn't match /artist/:artistId"));
  }

  return artistIdOrNull;
}