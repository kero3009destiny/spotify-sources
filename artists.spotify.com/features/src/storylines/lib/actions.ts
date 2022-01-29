// ignore-string-externalization
import {
  defaultWebgateHeaders,
  webgateFetch,
  webgateFetchJson,
} from '@mrkt/features/webgate-fetch';

import { generateCanvas } from './canvas';
import { STORYLINES_UPLOAD_API } from './constants';
import {
  DecoratedStorylineV1,
  ImageUpload4Response,
  Storyline,
  StorylineArtist,
  StorylineCard,
  StorylineEditorCard,
  StorylineEntity,
  StorylineMetadataResponse,
  StorylinePreviewCard,
  StorylineStatusV1,
} from './types';

export const getStorylineV1 = async (
  artist: StorylineArtist,
  entity: StorylineEntity,
): Promise<Storyline> => {
  const storylineEndpoint = `${STORYLINES_UPLOAD_API}/v1/storylines/${artist.id}/entity/${entity.uri}`;

  try {
    const data: DecoratedStorylineV1 = await webgateFetchJson(
      storylineEndpoint,
    );

    const cards: StorylineCard[] = data.cards.map(card => ({
      artist,
      imageUrl: card.cdn_uri,
      width: card.width,
    }));

    return {
      cards,
      entity,
      status: data.status,
    };
  } catch (e: any) {
    if (e.message.startsWith('404')) {
      return {
        cards: [],
        entity,
        status: StorylineStatusV1.NotFound,
      };
    }
    throw e;
  }
};

/*
  This action calls an endpoint that will remove the storyline for all
  trackUris associated with the same recording group.
*/
export const deleteStorylineV1 = async (
  artistId: string,
  entityUri: string,
) => {
  const storylineDeleteEndpoint = `${STORYLINES_UPLOAD_API}/v1/storylines/${artistId}/entity/${entityUri}`;

  await webgateFetch(storylineDeleteEndpoint, { method: 'DELETE' });
};

/*
  This action iterates through a set of StorylineEditorCards and validates
  their contents.
  It is intended to execute prior to generating HTML5 canveses for preview.
*/
export const validateStorylineCards = (
  cards: StorylineEditorCard[],
): boolean => {
  const cardsHaveImages = cards.every(c => c.image.file);
  return !!cards.length && cardsHaveImages;
};

/*
  This action calls out to an HTML5 canvas-generating function
  to convert the incoming StorylineEditorCard into a saveable image asset
*/
export const generateCanvases = (
  cards: StorylineEditorCard[],
): Promise<StorylinePreviewCard[]> => {
  return Promise.all(cards.map(card => generateCanvas(card)));
};

export const uploadStorylineV1 = async (
  binaries: ArrayBuffer[],
  artistId: string,
  entityUri: string,
) => {
  const baseEndpoint = `${STORYLINES_UPLOAD_API}/v1/storylines/${artistId}/entity/${entityUri}`;
  const publishCardBaseEndpoint = `${STORYLINES_UPLOAD_API}/v1/storylines/card`;
  const publishStorylineBaseEndpoint = `${STORYLINES_UPLOAD_API}/v1/storylines/storyline`;

  const metadata: StorylineMetadataResponse = await webgateFetchJson(
    baseEndpoint,
    {
      method: 'POST',
      body: JSON.stringify({
        numberOfCards: binaries.length,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (metadata) {
    const cards = metadata.cards;

    const cardUploads = await Promise.all<ImageUpload4Response>(
      cards.map(async card => {
        const uploadUrl = card.upload_uri;
        const imageData = binaries[card.position];
        const omitHeaders = Object.keys(defaultWebgateHeaders);

        return await webgateFetchJson(
          uploadUrl,
          {
            method: 'POST',
            body: imageData,
            headers: {
              Accept: '*/*',
              'Content-Type': 'image/jpeg',
              // 'Content-Type': 'application/octet-stream',
            },
          },
          omitHeaders,
        );
      }),
    );

    // Wait for all individual card publication
    await Promise.all(
      cardUploads.map(async result => {
        const uploadToken = result.uploadToken;
        const cardId = cards[cardUploads.indexOf(result)].card_id;
        await webgateFetchJson(`${publishCardBaseEndpoint}/${cardId}`, {
          method: 'POST',
          body: JSON.stringify({ uploadToken: uploadToken }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }),
    );

    // Once all cards have been published, publish the Storyline
    await webgateFetchJson(
      `${publishStorylineBaseEndpoint}/${metadata.storyline_id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      },
    );
  } else {
    throw new Error('something went wrong with card metadata request');
  }
};
