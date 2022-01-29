// ignore-string-externalization
/* eslint-disable @spotify/best-practices/no-discouraged-words */

import { webgateFetch, webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { CropInfo } from '@mrkt/features/mediahelpers/types';
import {
  DecoratedCanvas,
  CanvasType,
  CanvasCreateRequest,
  CanvasCreateResponse,
  CanvasAlternateEntity,
  DecoratedAlbum,
} from '../types/canvas';

import {
  CANVAS_API,
  CANVAS_STATUS_METADATA_UPLOADED,
  CANVAS_STATUS_BLACKLISTED,
} from './constants';
import { contentTypeForCanvas, CanvasProcessingError } from './canvasHelpers';

export const getCanvases = async (
  artistId: string,
  entityUris: string[],
  teamUri?: string,
) => {
  const params = `?uris=${entityUris.join(',')}${
    teamUri ? `&teamUri=${teamUri}` : ''
  }`;
  const CANVAS_ENDPOINT = `${CANVAS_API}/v1/artist/${artistId}/canvas${params}`;
  const response: {
    canvases: DecoratedCanvas[];
  } = await webgateFetchJson(`${CANVAS_ENDPOINT}`, { method: 'GET' });

  return response.canvases;
};

export const getAlbumMetadata = async (albumUri: string) => {
  const albumId = albumUri.split(':')[2];
  const METADATA_ENDPOINT = `${CANVAS_API}/v1/metadata/album/${albumId}`;
  const response: DecoratedAlbum = await webgateFetchJson(METADATA_ENDPOINT, {
    method: 'GET',
  });
  return response;
};

export const getCanvasAlternates = async (
  artistId: string,
  entityUri: string,
  teamUri?: string,
) => {
  const params = teamUri ? `?teamUri=${teamUri}` : '';
  const CANVAS_ENDPOINT = `${CANVAS_API}/v1/artist/${artistId}/canvas/${entityUri}/alternates${params}`;
  try {
    const response: {
      alternates: CanvasAlternateEntity[];
    } = await webgateFetchJson(CANVAS_ENDPOINT, { method: 'GET' });
    return response.alternates;
  } catch (e) {
    return [];
  }
};
export type CanvasPermissionsResponse = {
  permissions: string[];
  trackUri?: string;
};

export const getCanvasPermissions = async (
  artistId: string,
  entityUri?: string,
) => {
  const PERMISSIONS_ENDPOINT = entityUri
    ? `${CANVAS_API}/v1/artist/${artistId}/canvas/${entityUri}/permissions`
    : `${CANVAS_API}/v1/artist/${artistId}/canvas/permissions`;

  const response = await webgateFetch(PERMISSIONS_ENDPOINT, { method: 'GET' });

  if (response.status >= 500) {
    throw new Error(`${response.status} ${response.url}`);
  }

  if (response.status >= 400) {
    return [];
  }

  const { permissions } =
    await (response.json() as Promise<CanvasPermissionsResponse>);
  return permissions;
};

export const saveCanvas = (
  canvasDetails: any,
  artistId: string,
  teamUri?: string,
) => {
  return uploadCanvas(canvasDetails, artistId, teamUri);
};

const uploadCanvas = async (
  canvasDetails: {
    type: CanvasType;
    cropInfo: CropInfo;
    entityUri: string;
    binary: BinaryType;
  },
  artistId: string,
  teamUri?: string,
) => {
  const CANVAS_ENDPOINT = `${CANVAS_API}/v1/artist/${artistId}/canvas`;
  const { type, cropInfo, entityUri, binary } = canvasDetails;

  const body: CanvasCreateRequest = {
    type,
    availableFrom: new Date().toISOString(),
    cropInfo,
    entityUri,
    teamUri,
  };

  const metadata: CanvasCreateResponse = await webgateFetchJson(
    CANVAS_ENDPOINT,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );

  if (metadata && metadata.status === CANVAS_STATUS_METADATA_UPLOADED) {
    await webgateFetch(metadata.uploadUrl, {
      method: 'PUT',
      body: binary,
      headers: {
        'Content-Type': contentTypeForCanvas(metadata.type),
        'x-goog-meta-entity-uri': metadata.entityUri,
      },
    });

    return metadata;
  }

  if (metadata && metadata.status === CANVAS_STATUS_BLACKLISTED) {
    throw new CanvasProcessingError('This song is blacklisted from Canvas.');
  }

  throw new Error('Something went wrong with the metadata request');
};

export const removeCanvases = async (
  artistId: string,
  canvasIds: string[],
  entityUri: string,
  teamUri?: string,
) => {
  const params = teamUri ? `?teamUri=${teamUri}` : '';
  await Promise.all(
    canvasIds.map(canvasId => {
      const CANVAS_ENDPOINT = `${CANVAS_API}/v1/artist/${artistId}/canvas/${entityUri}/${canvasId}${params}`;
      return webgateFetch(CANVAS_ENDPOINT, { method: 'DELETE' });
    }),
  );
};

export const getTermsUrl = async (
  artistId: string,
  entityUri: string,
  teamUri?: string,
) => {
  const params = teamUri ? `?teamUri=${teamUri}` : '';
  const TERMS_ENDPOINT = `${CANVAS_API}/v1/uploadtc/${artistId}/${entityUri}${params}`;

  // retry the request once since this is otherwise blocking the component from rendering
  const response = await webgateFetchJson(TERMS_ENDPOINT, {
    method: 'GET',
  }).catch(async () => webgateFetchJson(TERMS_ENDPOINT, { method: 'GET' }));
  if (response && response.url) {
    return response.url;
  }

  throw new Error('Could not fetch the terms and conditions URL.');
};
