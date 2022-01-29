// ignore-string-externalization
import { useMemo } from 'react';
import { useSong } from '@mrkt/features/song-hooks';
import { useCurrentSongId } from './useCurrentSongId';

function formatSong(songData) {
  var id = songData.id,
      name = songData.name,
      album = songData.album;
  var images = album.images,
      releaseDate = album.release_date;
  return {
    id: id,
    name: name,
    images: images,
    releaseDate: releaseDate
  };
}

export function useCurrentSong() {
  var currentSongId = useCurrentSongId();
  var song = useSong(currentSongId);
  return useMemo(function () {
    return formatSong(song);
  }, [song]);
}