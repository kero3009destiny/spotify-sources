// ignore-string-externalization
/* eslint-disable prefer-promise-reject-errors */

function legacyCopyTextToClipboard(textToCopy: string) {
  return new Promise((resolve, reject) => {
    // create a temporary input to hold the text value
    const elem = document.createElement('input');
    elem.value = textToCopy;

    // position it offscreen so mobile devices don't zoom in
    elem.style.cssText = 'position: absolute, left: -1000px, top: -1000px';
    document.body.appendChild(elem);

    // grab the text content and then remove the input
    elem.select();
    elem.setSelectionRange(0, textToCopy.length);
    const response = document.execCommand('copy');
    document.body.removeChild(elem);

    return response ? resolve(textToCopy) : reject(false);
  });
}

function copyTextToClipboard(textToCopy: string) {
  return navigator.clipboard.writeText(textToCopy);
}

export function copy(domElement: HTMLElement) {
  const textToCopy = domElement.dataset.copyText;
  const has = (obj: any, key: any) =>
    Object.prototype.hasOwnProperty.call(obj, key);

  /**
   * If there isn't anything to copy, like empty text,
   * don't copy it and resolve to false.
   */
  if (!textToCopy) return Promise.reject(false);

  return has(navigator, 'clipboard')
    ? copyTextToClipboard(textToCopy)
    : legacyCopyTextToClipboard(textToCopy);
}
