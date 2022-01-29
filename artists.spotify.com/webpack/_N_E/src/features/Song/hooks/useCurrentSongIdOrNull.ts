// ignore-string-externalization
import { matchPath } from 'react-router';
import { useMemo } from 'react';
import { usePageLocation } from '../../page';
export function useCurrentSongIdOrNull() {
  var location = usePageLocation();
  var match = useMemo(function () {
    return matchPath(location.pathname, {
      path: ['/artist/:artistId/song/:songId']
    });
  }, [location.pathname]);

  if (!match) {
    return null;
  }

  return match.params.songId;
}