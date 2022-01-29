// ignore-string-externalization
import { matchPath, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
export function useCurrentArtistIdOrNull() {
  var location = useLocation();
  var match = useMemo(function () {
    return matchPath(location.pathname, {
      path: ['/artist/:artistId', '/team/artist/:artistId', '/access/artist/:artistId']
    });
  }, [location.pathname]);

  if (!match) {
    return null;
  }

  return match.params.artistId;
}