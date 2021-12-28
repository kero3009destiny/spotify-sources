import {
  API_ENDPOINT,
  AUTHENTICATION,
  CLIENT_ID,
  ERROR_MESSAGES,
} from '../constants/player';
import { ROUTE } from '../constants/routes';
import { PlaylistCardData } from '../../components/card/playlistCard';
import { ORIGIN } from '../constants/seo';
import { hasWindow } from './hasWindow';
import { sendTrackingEvent } from './sendTrackingEvent';
import { ContentfulListenPlaylist } from '../../../typings/graphql-types';
import { formatDate } from './formateDate';

/** Authentication. */

function formatRedirectURI(uri: string): string {
  let formattedUri = uri;
  // Remove the trailing slash.
  if (formattedUri.endsWith('/')) formattedUri = formattedUri.slice(0, -1);
  // Convert illegal characters to entities.
  formattedUri = encodeURIComponent(formattedUri);

  return formattedUri;
}

export function authenticationRequestUrl(
  forceReauthenticate = false,
  playlistID = ''
): string {
  const { ENDPOINT, RESPONSE_TYPE, SCOPES } = AUTHENTICATION;
  const { origin } = window.location;

  const scopes = encodeURIComponent(SCOPES.join(' '));
  const callback = formatRedirectURI(`${origin}/${ROUTE.LISTEN}`);

  let endpoint = `${ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${callback}&scope=${scopes}&response_type=${RESPONSE_TYPE}`;
  // Enforce bringing up the dialog.
  if (forceReauthenticate) endpoint += '&show_dialog=true';
  // Add state so we know which playlist to request.
  if (playlistID) endpoint += `&state=${playlistID}`;

  return endpoint;
}

export async function getUser(accessToken: string) {
  if (!hasWindow) return;
  const response = await fetch(API_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data;
}

export function authenticate(forceReauthenticate = false, playlistID = '') {
  sendTrackingEvent('listen', 'requesting authentication', playlistID);
  window.location.href = authenticationRequestUrl(
    forceReauthenticate,
    playlistID
  );
}

export function canReAuthenticate(error: string): boolean {
  const { AUTH_FAILED, USER_DENIED_AUTH, CHANGED_NETWORK } = ERROR_MESSAGES;
  return (
    error === AUTH_FAILED ||
    error === USER_DENIED_AUTH ||
    error === CHANGED_NETWORK
  );
}

/** Playlist & Tracks GET. */

const PLAYLIST_ENDPOINT = `/playlist/`;

export async function getPlaylist(
  id: string
): Promise<SpotifyApi.PlaylistObjectFull | undefined> {
  if (!hasWindow) return;
  const origin = window.location.origin || ORIGIN;
  const endpoint = `${origin}${PLAYLIST_ENDPOINT}${id}`;
  const response = await fetch(endpoint, { method: 'GET' });
  const json = await response.json();

  return json;
}

export function getTrackFromPlaylist(
  playlist: SpotifyApi.PlaylistObjectFull,
  index: number
): SpotifyApi.TrackObjectFull {
  return playlist?.tracks?.items[index]?.track;
}

/** Player. */

function getEndpoint(device?: string): string {
  let endpoint = `${API_ENDPOINT}/player/play`;
  if (device) endpoint += `?device_id=${device}`;

  return endpoint;
}

export async function playPlaylist(
  accessToken: string,
  contextURI: string,
  deviceID: string,
  trackIndex: number
) {
  if (hasWindow && accessToken && contextURI && deviceID) {
    const endpoint = getEndpoint(deviceID);

    sendTrackingEvent('listen', 'requesting playlist', contextURI);

    await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        // eslint-disable-next-line @typescript-eslint/camelcase
        context_uri: contextURI,
        offset: {
          position: trackIndex,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    return false;
  }
}

/** Other. */

export function spotifyDeeplinkToURL(uri: string): string {
  let url = uri;

  // Get everything between ":" and ":"
  const deeplinkType = /:([^:]+):/.exec(url);

  if (deeplinkType?.length) {
    const deeplinkSelector = `spotify${deeplinkType[0] || ''}`;

    if (url.startsWith(deeplinkSelector)) {
      const urlStart = `https://open.spotify.com/${deeplinkType[1]}/`;
      url = url.replace(deeplinkSelector, urlStart);
    }
  }

  return url;
}

/**
 * When requesting a specific track from a playlist, it may not always return
 * the exact track shown in the playlist. Presumably this has to do with
 * multi-releases and/or Single & Album versions of a track. Or some internal
 * Spotify functionality that allows for easier tracking of songs.
 * `name` seems to be the only property that matches between these versions.
 */
export function isSameTrack(
  trackA: SpotifyApi.TrackObjectFull,
  trackB: SpotifyApi.TrackObjectFull
): boolean {
  const idsMatch = trackA.id === trackB.id;
  const namesMatch = trackA.name === trackB.name;
  return idsMatch || namesMatch;
}

export function formatTrackTitle(track: Spotify.Track): string {
  const name = track?.name;
  const firstArtist = track?.artists[0]?.name;
  return `${name} - ${firstArtist}`;
}

export function contentfulPlaylistToCard(
  playlist: ContentfulListenPlaylist
): PlaylistCardData {
  const {
    title,
    description,
    image,
    spotifyUri,
    genres,
    publishdate,
  } = playlist;

  const playlistID = spotifyUri
    ? spotifyUri.replace('spotify:playlist:', '')
    : '';
  const href = spotifyDeeplinkToURL(spotifyUri as string);
  const tags = genres?.map(genre => {
    return {
      title: genre?.genre as string,
      parentCategory: ROUTE.LISTEN,
      href: `/${ROUTE.LISTEN}/${genre?.slug}`,
    };
  });

  return {
    title,
    description,
    href,
    playlist: playlistID,
    tags,
    image,
    publishDate: publishdate,
  };
}

export function spotifyPlaylistToCard(
  playlist: SpotifyApi.PlaylistObjectFull
): PlaylistCardData {
  const { description, images, name, id } = playlist;

  return {
    title: name,
    description,
    href: playlist.external_urls.spotify,
    playlist: id,
    image: {
      src: images[0].url,
    },
  };
}
