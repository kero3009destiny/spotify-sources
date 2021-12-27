export const UPLOADED_COVER_ART = 'image';
export const UPLOADED_VIDEO = 'video';
export const UPLOADED_STATUS = 'uploaded';
export const UPLOADED_INFO = 'uploadInfo';
export const FILE_PROPERTIES = 'fileProperties';
export const FILE_TYPE_PROP = 'type';
export const FILE_SIZE_PROP = 'size';
export const FILE_FAIL = 'fail';
export const IMAGE_DIMENSIONS = 'imageDimensions';
export const AUDIO_DURATION = 'audioDuration';

export function createDefaultFileProperties() {
  return {
    [FILE_TYPE_PROP]: '',
    [FILE_SIZE_PROP]: 0,
    [FILE_FAIL]: false,
  };
}

export function createDefaultImageProperties() {
  return {
    ...createDefaultFileProperties(),
    [IMAGE_DIMENSIONS]: '',
  };
}

export function createDefaultAudioProperties() {
  return {
    ...createDefaultFileProperties(),
    [AUDIO_DURATION]: '',
  };
}

export function createDefaultUploadObj() {
  return {
    [UPLOADED_STATUS]: false,
    [UPLOADED_INFO]: {
      id: '',
      action: '',
      fields: {},
      uri: '',
    },
  };
}

export function createDefaultAudioUploadObj() {
  const audioUpload = createDefaultUploadObj();
  audioUpload[FILE_PROPERTIES] = createDefaultFileProperties();
  return audioUpload;
}

export function createDefaultImageUploadObj() {
  const imageUpload = createDefaultUploadObj();
  imageUpload[FILE_PROPERTIES] = createDefaultImageProperties();
  return imageUpload;
}

export function createDefaultVideoUploadObj() {
  const videoUpload = createDefaultUploadObj();
  videoUpload[FILE_PROPERTIES] = createDefaultFileProperties();
  return videoUpload;
}
