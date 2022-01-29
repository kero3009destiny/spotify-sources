/* eslint-disable prefer-promise-reject-errors */
// ignore-string-externalization
import invariant from 'invariant';

function copyInputText(htmlInputElement) {
  return new Promise(function (resolve, reject) {
    var text = htmlInputElement.value;
    htmlInputElement.select();
    htmlInputElement.setSelectionRange(0, text.length); // execCommand will return true for successfully copy to clipboard
    // or false for either unsupported command or action failure.
    // technically, a false here should be for some unknown action failure.

    return document.execCommand('copy') ? resolve(text) : reject(false);
  });
} // NOTE: Not recommended for mobile use...
// copy from something a user can see!
// mobile browsers love to zoom to the input...


function copyFromDataUri(textToCopy) {
  return new Promise(function (resolve, reject) {
    var elem = document.createElement('input');
    elem.value = textToCopy;
    document.body.appendChild(elem);
    elem.select();
    elem.setSelectionRange(0, textToCopy.length);
    var response = document.execCommand('copy');
    document.body.removeChild(elem);
    return response ? resolve(textToCopy) : reject(false);
  });
} // copy the contents of an htmlElement's `value` attribute
// to the clipboard


export function copy(htmlElement) {
  invariant(htmlElement instanceof window.HTMLElement, 'First paramenter to copy must be an instance of HTMLElement'); // even though execCommand will return false if the command is unsupported
  // we can short circuit here to prevent a DOM read operation.

  if (!document.queryCommandSupported('copy')) return Promise.reject(false);
  var textToCopy = htmlElement.dataset.copyText;
  var idToCopyFrom = htmlElement.dataset.copyFrom; // if there isn't anything to copy, like empty text,
  // don't copy it and resolve to false

  if (!textToCopy && !idToCopyFrom) return Promise.reject(false);
  return idToCopyFrom ? copyInputText(document.querySelector("#".concat(idToCopyFrom))) : copyFromDataUri(textToCopy);
}
/* eslint-disable-next-line import/no-default-export */

export default copy;