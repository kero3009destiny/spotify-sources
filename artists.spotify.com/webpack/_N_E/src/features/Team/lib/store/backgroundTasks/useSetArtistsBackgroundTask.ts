import { useEffect } from 'react';
import { ArtistsResource } from '../../../../artists/src/useArtists';
export var useSetArtistsBackgroundTask = function useSetArtistsBackgroundTask(_ref) {
  var setArtists = _ref.setArtists;
  useEffect(function () {
    setArtists(ArtistsResource.read());
  }, [setArtists]);
};