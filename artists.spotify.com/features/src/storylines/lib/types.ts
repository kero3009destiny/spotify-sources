// ignore-string-externalization
/* eslint-disable @spotify/best-practices/no-discouraged-words */

export enum StorylineStatus {
  Ready = 'READY', // storyline cards are ready for consumers
  StorylineCardsUploaded = 'STORYLINE_CARDS_UPLOADED', // storyline cards has been uploaded to gcs, transcoding is in progress
  TranscodingFailed = 'TRANSCODING_FAILED', // transcoding failed
  Unknown = 'UNKNOWN', // no storyline cards exists or status is not known
  Blacklisted = 'BLACKLISTED', // storyline is not allowed for this user
}

export enum StorylineStatusV1 {
  Invalid = 'INVALID',
  Initial = 'INITIAL',
  Processing = 'PROCESSING',
  Failed = 'FAILED',
  Published = 'PUBLISHED',
  Moderated = 'MODERATED',
  Deleted = 'DELETED',
  // frontend only
  NotFound = 'NOT_FOUND',
}

export enum StorylineCardStatus {
  Invalid = 'INVALID',
  Initial = 'INITIAL',
  Failed = 'FAILED',
  Published = 'PUBLISHED',
}

export type DecoratedStorylineCard = {
  uri: string;
  imageId: string;
  width: number;
  height: number;
  type: string;
  size: string;
};

export type DecoratedStorylineV1 = {
  storyline_id: string;
  entity_uri: string;
  artist_id: string;
  available_date: string;
  creation_date: string;
  last_update: string;
  updated_by: string;
  cards: DecoratedStorylineCardV1[];
  status: StorylineStatusV1;
};

export type DecoratedStorylineCardV1 = {
  storyline_id: string;
  card_id: string;
  original_id: string;
  cdn_uri: string;
  width: number;
  height: number;
  position: number;
  status: StorylineCardStatus;
};

export type StorylineArtist = {
  id: string;
  uri: string;
  name: string;
  imageUrl?: string;
};

export type StorylineCard = {
  artist?: StorylineArtist;
  imageUrl: string;
  width?: number;
};

export type StorylineEditorCard = {
  key: string; // used for React's rendering (`key` prop)
  image: StorylineImageEditor;
  text: StorylineTextEditor;
};

export type StorylinePreviewCard = {
  imageUrl: string;
  binary: ArrayBuffer;
};

export type StorylineEntity = {
  uri: string;
  name: string;
  imageUrl?: string;
};

export type Storyline = {
  cards: StorylineCard[];
  entity: StorylineEntity;
  status: StorylineStatus | StorylineStatusV1;
};

export type TextAlignment = 'left' | 'center' | 'right';
export type TextColor = string;
export type TextPosition = 'top' | 'middle' | 'bottom';
export type TextProperties = {
  align: TextAlignment;
  color: TextColor;
  position: TextPosition;
};
export type StorylineTextEditor = {
  content: string;
  properties: TextProperties;
};

export type ImageProperties = {
  zoom: number;
  x: number;
  y: number;
};
export type StorylineImageEditor = {
  file?: string;
  properties: ImageProperties;
};

export type StorylineMetadataResponse = {
  storyline_id: string;
  cards: StorylineCardMetadataResponse[];
};

export type StorylineCardMetadataResponse = {
  card_id: string;
  upload_uri: string;
  position: number;
};

export type ImageUpload4Response = {
  uploadToken: string;
};
