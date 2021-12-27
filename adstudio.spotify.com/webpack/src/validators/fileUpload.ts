// File upload validators
import { FieldValidator } from 'final-form';
import i18n from 'i18next';

import MediaInfoModule from 'utils/MediaInfo.module';

import { UploadInfo } from 'types/common/state/api/upload';

export const fileUploadRequired: FieldValidator<
  UploadInfo | undefined
> = value => {
  if (!value || !value.gcsUri || !value.id) {
    return i18n.t('I18N_PLEASE_UPLOAD_A_FILE', 'Please upload a file.');
  }
};

export const getMediaMetadata = async (file: File) => {
  const getSize = () => file.size;
  const readChunk = (chunkSize: number, offset: number) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        if (event.target!.error) {
          reject(event.target!.error);
        }
        // @ts-ignore
        resolve(new Uint8Array(event.target.result));
      };
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
    }) as Promise<Uint8Array>;

  // @ts-ignore
  const mediaInfo = await MediaInfoModule;
  const rawMetadata = await mediaInfo.analyzeData(getSize, readChunk);
  let metadata = [];
  // @ts-ignore
  if (rawMetadata.media) {
    // @ts-ignore
    metadata = rawMetadata.media.track;
  }
  return metadata;
};
