// ignore-string-externalization
import { useMemo } from 'react';
import { withHooks } from '@mrkt/features/withHooks';
import { useCurrentArtist } from './useCurrentArtist';
import { useCurrentArtistPermissions } from './useCurrentArtistPermissions';
export var withDeprecatedCurrentArtist = withHooks(function () {
  var currentArtist = useCurrentArtist();
  var permissions = useCurrentArtistPermissions();
  var artist = useMemo(function () {
    return {
      id: currentArtist.id,
      name: currentArtist.name,
      imageUrl: currentArtist.imageUrl,
      permissions: permissions
    };
  }, [currentArtist, permissions]);
  return {
    artist: artist
  };
}, 'DeprecatedCurrentArtist');