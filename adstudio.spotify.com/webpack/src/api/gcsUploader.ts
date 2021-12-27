import { GcsFileInfo, GcsUploaderOptions } from 'types/common/state/api/upload';

export function uploadToGcs(
  data: GcsFileInfo,
  options: GcsUploaderOptions,
  req = new XMLHttpRequest(),
): () => void {
  req.upload.addEventListener('progress', e => {
    if (options.log)
      options.log(
        `Progress event fired. Loaded: %s; Total: %s`,
        e.loaded,
        e.total,
      );
    const progress = (100.0 * e.loaded) / e.total;
    options.onProgress({ progress, done: false });
  });

  req.addEventListener('loadstart', () => {
    if (options.log) options.log(`File upload to ${data.bucket} started`);
    options.onLoadStart({ progress: 0, done: false });
  });

  req.addEventListener('load', () => {
    if (options.log) options.log(`File upload to ${data.bucket} completed`);
    options.onLoad({ progress: 100, done: true });
  });

  req.addEventListener('error', error => {
    if (options.log) options.log('File upload failed:', error);
    options.onError(new Error('upload file failed'));
  });

  req.addEventListener('abort', error => {
    if (options.log) options.log('File upload aborted:', error);
    options.onAbort(new Error('upload file failed'));
  });

  req.open('put', data.url);
  req.send(data.file);

  return () => req.abort();
}
