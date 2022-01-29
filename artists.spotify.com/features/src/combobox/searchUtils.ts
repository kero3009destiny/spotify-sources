import qs from 'query-string';

import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import {
  EntityGroupLabel,
  EntityPacket,
  RawResult,
  EntityType,
  EntityResponse,
} from './sharedTypes';

import { matchUri } from '@mrkt/features/shared/lib/urlHelpers';

interface ResultItem {
  type: EntityType;
  entity: RawResult;
  RESULT_TYPE: 'result item';
}

const groupLabel = (type: EntityType): EntityGroupLabel => ({
  name: `${type}s`,
  value: `group-${type}`,
  RESULT_TYPE: 'group label',
});

const groupedEntities = (
  results: EntityResponse,
  type: EntityType,
): (EntityGroupLabel | ResultItem)[] => {
  const entries = resultEntities(results, type);
  if (!entries.length) {
    return [];
  }

  return [groupLabel(type), ...entries];
};

const resultEntities = (
  results: EntityResponse,
  type: EntityType,
): ResultItem[] => {
  // webapi adds an 's' to the types: if you give it 'artist', it'll repond with an 'artists' property
  const entityResult = results[`${type}s`] ?? [];
  const entries: RawResult[] =
    'items' in entityResult ? entityResult.items : entityResult;

  return (
    entries.map(entity => ({
      type,
      entity,
      RESULT_TYPE: 'result item',
    })) ?? []
  );
};

type RunSearchOptions = {
  limit: number;
  useProxy?: boolean;
  onComplete?: (results: EntityResponse) => void;
};

export async function runSearch(
  types: EntityType[],
  searchTerm: string,
  { limit, useProxy, onComplete }: RunSearchOptions,
) {
  const trimmedInputValue = searchTerm.trim();
  if (!trimmedInputValue) {
    onComplete?.({});
    return {};
  }

  const params = {
    q: trimmedInputValue,
    type: types.join(','),
    limit,
  };

  const baseUrl = useProxy ? `/api/webapi/v1` : `https://api.spotify.com/v1`;

  const [uriMatch, uriPath] = getSpotifyUrlEndpoint(trimmedInputValue, types);
  const searchPath = `search?${qs.stringify(params, false)}`;

  const endpoint = `${baseUrl}/${uriPath || searchPath}`;

  let results = await webgateFetchJson(endpoint);
  // playlist results come back a bit differently, unfortunately, so they require some special handling
  if (uriMatch?.type === 'playlist') {
    results = { playlists: [results] };
  }

  onComplete?.(results);
  return results;
}

export const adjustEntityResponse = (
  types: EntityType[],
  results: EntityResponse,
): (EntityPacket | EntityGroupLabel)[] => {
  const allResults: (EntityGroupLabel | ResultItem)[] =
    types.length > 1
      ? types.flatMap(type => groupedEntities(results, type))
      : resultEntities(results, types[0]);

  const result: (EntityPacket | EntityGroupLabel)[] = allResults.map(item => {
    if (item.RESULT_TYPE === 'group label') {
      return item;
    }
    const { type, entity } = item;
    const { id, name, images } = entity;

    const trackImageUrl =
      entity?.album?.images?.[entity.album.images.length - 1]?.url;

    const imageUrl = entity?.images?.[entity.images.length - 1]?.url;

    return {
      id,
      name: name,
      value: id,
      imageUrl: trackImageUrl ?? imageUrl ?? '',
      entity: entity as any, // TODO:
      variant: type,
      RESULT_TYPE: 'entity',
    };
  });

  return result;
};

type UriMatch = {
  type: EntityType;
  v2?: string;
};

const getSpotifyUrlEndpoint = (
  value: string,
  type: EntityType[],
): [UriMatch | null, string] => {
  const uriMatch = matchUri(value);

  const uriMatchIsCatalogueEntity =
    uriMatch &&
    ['album', 'track', 'artist', 'show', 'episode'].includes(uriMatch.type);

  const uriMatchPlaylist =
    uriMatch && uriMatch.type === 'playlist' && !uriMatch.v2;
  const uriMatchPlaylistV2 =
    uriMatch && uriMatch.type === 'playlist' && uriMatch.v2;

  const uriMatchPodcast =
    uriMatch && ['show', 'episode'].includes(uriMatch.type);

  // Don't look up URI entities that aren't desired
  if (uriMatch && !type.includes(uriMatch.type) && !uriMatchPodcast) {
    return [null, ''];
  }

  if (uriMatchIsCatalogueEntity) {
    const params = { ids: [uriMatch.id] };
    return [uriMatch, `${uriMatch.type}s?${qs.stringify(params, false)}`];
  }

  if (uriMatchPlaylist) {
    return [
      uriMatch,
      `users/${uriMatch.username}/playlists/${uriMatch.playlistId}`,
    ];
  }

  if (uriMatchPlaylistV2) {
    return [uriMatch, `playlists/${uriMatch.playlistId}`];
  }

  if (uriMatchPodcast) {
    return [uriMatch, `${uriMatch.type}s/${uriMatch.id}`];
  }
  return [null, ''];
};
