import { useState } from 'react';

import { uploadToGcs } from 'api/gcsUploader';

import {
  GcsFileInfo,
  UploadProgressEvent,
} from 'types/common/state/api/upload';

interface UploadState extends UploadProgressEvent {
  uploading: boolean;
  error: Error | null;
}

type UseUploaderValue = [UploadState, (fileInfo: GcsFileInfo) => Promise<void>];

export function useUploader(): UseUploaderValue {
  const [uploadState, setUploadState] = useState<UploadState>({
    progress: 0,
    done: false,
    error: null,
    uploading: false,
  });
  // TODO: Find a consistent way to incorporate url signing into the hook. The shape of url signing responses varies by service, so would need to determine a neutral way of handling the logic.
  const uploadFile = (fileInfo: GcsFileInfo): Promise<void> => {
    return new Promise((resolve, reject) => {
      uploadToGcs(fileInfo, {
        onProgress: evt => {
          setUploadState({ ...evt, uploading: true, error: null });
        },
        onLoadStart: evt => {
          setUploadState({ ...evt, uploading: true, error: null });
        },
        onLoad: evt => {
          setUploadState({ ...evt, uploading: false, error: null });
          resolve();
        },
        onError: error => {
          setUploadState({ ...uploadState, uploading: false, error });
          reject(error);
        },
        onAbort: error => {
          setUploadState({ ...uploadState, uploading: false, error });
          reject(error);
        },
      });
    });
  };

  return [uploadState, uploadFile];
}
