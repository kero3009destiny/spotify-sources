// ignore-string-externalization
/* eslint-disable @spotify/best-practices/no-discouraged-words */

import { WEBGATE_DOMAIN } from '@mrkt/features/webgate-fetch';

export const CANVAS_API = `${WEBGATE_DOMAIN}/canvaz-view`;
export const ACCESS_API = `${WEBGATE_DOMAIN}/s4x-access`;

export const CANVAS_TYPE_IMAGE = 'IMAGE';
export const CANVAS_TYPE_VIDEO = 'VIDEO';
export const CANVAS_TYPE_VIDEO_LOOPING = 'VIDEO_LOOPING';
export const CANVAS_TYPE_VIDEO_LOOPING_RANDOM = 'VIDEO_LOOPING_RANDOM';
export const CANVAS_TYPE_GIF = 'GIF';

export const CANVAS_STATUS_READY = 'READY';
export const CANVAS_STATUS_METADATA_UPLOADED = 'METADATA_UPLOADED';
export const CANVAS_STATUS_CANVAS_UPLOADED = 'CANVAS_UPLOADED';
export const CANVAS_STATUS_TRANSCODING_FAILED = 'TRANSCODING_FAILED';
export const CANVAS_STATUS_UNKNOWN = 'UNKNOWN';
export const CANVAS_STATUS_BLACKLISTED = 'BLACKLISTED';

export const CANVAS_RELEASE_STATUS_UNKNOWN = 'UNKNOWN_RELEASE_STATUS';
export const CANVAS_RELEASE_STATUS_RELEASED = 'RELEASED';
export const CANVAS_RELEASE_STATUS_UNRELEASED = 'UNRELEASED';

export const TEAMSWITCHER_CANVAS_ACTION = 'canvas.edit.v1';

export const CANVAS_PERMISSION_EDITOR = 'canvas.isEditable';
export const CANVAS_PERMISSION_VIEWER = 'canvas.isViewable';
