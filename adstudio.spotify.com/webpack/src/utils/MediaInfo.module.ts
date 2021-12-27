import MediaInfo from 'mediainfo.js';

// @ts-ignore
const MediaInfoModule = new MediaInfo({
  format: 'object',
  locateFile: url => `/assets/${url}`, // path to .wasm so Firefox can find it.
});

export default MediaInfoModule;
