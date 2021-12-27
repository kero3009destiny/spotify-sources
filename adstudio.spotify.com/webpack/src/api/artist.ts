import { webgateFetch } from '@spotify-internal/adstudio-webgate-fetch';

export function fetchArtist(id: string): Promise<SpotifyApi.Artist> {
  const url = `https://api.spotify.com/v1/artists/${id}`;

  return webgateFetch(url).then((r: Response) => {
    if (!r.ok) return Promise.reject(r.statusText);
    return r.json();
  });
}
