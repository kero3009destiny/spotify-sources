import debug from 'debug';
import { EventChannel, eventChannel } from 'redux-saga';

import { GcsChannelEvent, GcsFileInfo } from 'types/common/state/api/upload';

export const log = debug('sagas:uploads');

// TODO: keeping this temporarily from uploadsV2 duck until bulksheets + audience creation use
// hook-based uploader pattern.
export function uploadFileToStorage(
  data: GcsFileInfo,
  req = new XMLHttpRequest(),
): EventChannel<GcsChannelEvent> {
  return eventChannel(emitter => {
    req.upload.addEventListener('progress', e => {
      log(`Progress event fired. Loaded: %s; Total: %s`, e.loaded, e.total);
      const progress = (100.0 * e.loaded) / e.total;
      emitter({ progress, done: false });
    });

    req.addEventListener('loadstart', () => {
      log(`File upload to ${data.bucket} started`);
      emitter({ progress: 0, done: false });
    });

    req.addEventListener('load', () => {
      log(`File upload to ${data.bucket} completed`);
      emitter({ progress: 100, done: true });
    });

    req.addEventListener('error', error => {
      log('File upload failed:', error);
      emitter(new Error('upload file failed'));
    });

    req.addEventListener('abort', error => {
      log('File upload aborted:', error);
      emitter(new Error('upload file failed'));
    });
    req.open('put', data.url);
    req.send(data.file);

    return () => req.abort();
  });
}
