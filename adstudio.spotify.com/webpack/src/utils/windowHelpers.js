import debug from 'debug';
import { window } from 'global';
import { parse } from 'querystring';

import { jsonStringify } from './storageHelpers';

const log = debug('utils:windowHelpers');

export function getURLParams() {
  const params = window.location.search
    ? parse(window.location.search.replace('?', ''))
    : {};
  log('parsed url params: %s', jsonStringify(params));
  return params;
}

export function getURLParam(key) {
  return getURLParams()[key];
}

export function clickedOutsideElement(event, element) {
  return (
    element &&
    event.type === 'mousedown' &&
    event.target !== element &&
    !element.contains(event.target)
  );
}

export function downloadUrlWithFilename(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  const node = document.body.appendChild(a);
  node.click();
  node.remove();
}

export function replaceLocation(url) {
  window.location.replace(url);
}
