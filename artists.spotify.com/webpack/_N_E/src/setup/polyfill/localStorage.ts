// ignore-string-externalization
import storage from 'local-storage-fallback';

if (!('localStorage' in window)) {
  // @ts-ignore
  window.localStorage = storage;
}