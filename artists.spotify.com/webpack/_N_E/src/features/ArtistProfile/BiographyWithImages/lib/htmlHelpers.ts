// ignore-string-externalization
import DOMPurify from 'dompurify';
export function removeNode(node) {
  if (node.remove) {
    node.remove();
  } // TS doesn't seem to know about removeNode, but leaving as is with a type
  // cast so as to change less at runtime for now.


  if (node.removeNode) {
    node.removeNode(true);
  }
} // exported for testing only

export function polyfillClosest(node, selector) {
  var searchNode = node;

  while (searchNode && searchNode.nodeType === Node.ELEMENT_NODE) {
    if (searchNode.matches(selector)) return searchNode;
    searchNode = searchNode.parentNode;
  }

  return null;
}
export function closest(node, selector) {
  if (node.closest) {
    return node.closest(selector);
  }

  return polyfillClosest(node, selector);
}
export function getTextFromHTML(userInputHTML) {
  var textDiv = document.createElement('div');
  textDiv.innerHTML = sanitizeHTML(userInputHTML);
  var text = textDiv.textContent;
  removeNode(textDiv);
  return text;
} // Handles html entities such as "&amp;" without stripping

export function decodeHTML(userInputHTML) {
  var textarea = document.createElement('textarea');
  textarea.innerHTML = userInputHTML || '';
  return sanitizeHTML(textarea.value);
}
export function sanitizeHTML(userInputHTML) {
  if (userInputHTML != null) {
    return DOMPurify.sanitize(userInputHTML, {
      ALLOWED_URI_REGEXP: /^spotify:(?:album|artist|track|playlist|user:[^:]*:playlist):[0-9a-zA-Z]{22}$/
    });
  }

  return '';
}