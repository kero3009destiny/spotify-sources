import _toConsumableArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
// ignore-string-externalization
import { closest, removeNode, sanitizeHTML } from './htmlHelpers';
export function getCaretIndex() {
  var sel = window.getSelection();
  if (!sel) return null;
  var range = sel.getRangeAt(0);
  return range.collapsed ? range.endOffset : range.startOffset;
}
export function getCaretCoordinatesRelativeTo(parent) {
  if (!parent) return null;
  var sel = window.getSelection();
  if (!sel) return null;
  var range = sel.getRangeAt(0);
  var rec = range.getBoundingClientRect();
  var parentCoords = parent.getBoundingClientRect();
  var coords = {
    TOP: rec.top - parentCoords.top + 5,
    LEFT: rec.left - parentCoords.left
  };
  return coords;
}
export function pasteHtmlAtCaret(userInputHTML) {
  var sel = window.getSelection();
  if (!sel) return null;
  var range = sel === null || sel === void 0 ? void 0 : sel.getRangeAt(0);
  range.deleteContents();
  var el = document.createElement('div');
  el.innerHTML = sanitizeHTML(userInputHTML);
  var frag = document.createDocumentFragment();
  var node = el.firstChild;
  if (!node) return null;
  frag.appendChild(node);
  range.deleteContents();
  range.insertNode(frag);
  return range;
}

function getAndDeleteItemToBeReplaced(searchQuery) {
  var _range$commonAncestor;

  var sel = window.getSelection();
  if (!sel) return null;
  var range = sel.getRangeAt(0);
  var content = ((_range$commonAncestor = range.commonAncestorContainer.textContent) === null || _range$commonAncestor === void 0 ? void 0 : _range$commonAncestor.toString()) || '';
  var wordStart = 0;
  var wordEnd = 0;

  if (range.commonAncestorContainer.nodeType === Node.TEXT_NODE) {
    wordStart = content.lastIndexOf(searchQuery);
    wordEnd = wordStart + searchQuery.length;
  } else {
    var children = Array.prototype.slice.call(range.startContainer.childNodes);
    wordStart = children.findIndex(function (node) {
      return node.textContent === searchQuery;
    });
    wordEnd = wordStart + 1;
  }

  var foundAtInQuery = content.slice(wordStart - 1, wordStart) === '@';

  if (foundAtInQuery) {
    var queryWithAt = wordStart - 1;
    wordStart = queryWithAt;
  }

  range.setStart(range.startContainer, wordStart);
  range.setEnd(range.endContainer, wordEnd);
  range.deleteContents();
  return range;
}

export function replaceMentionWithLink(searchQuery) {
  var _contenteditable, _contenteditable2;

  var entity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var anchor = document.createElement('a');
  var name = entity.name,
      uri = entity.uri;
  if (!name || !uri) return null;
  anchor.href = uri;
  anchor.innerText = name;
  anchor.setAttribute('data-name', name);
  anchor.setAttribute('data-timestamp', Date.now().toString());
  anchor.setAttribute('data-qa', 'entity-link');
  var range = getAndDeleteItemToBeReplaced(searchQuery);
  if (!range) return null;
  pasteHtmlAtCaret(anchor.outerHTML);
  var contenteditable;
  var container = range.commonAncestorContainer;
  var containerParentNode = container.parentNode;
  /* .closest cannot be called on TEXT_NODE in Safari */

  if (containerParentNode !== null && containerParentNode !== void 0 && containerParentNode.getAttribute('contenteditable')) {
    contenteditable = container.parentNode;
  } else if (container.nodeType === Node.TEXT_NODE && containerParentNode != null) {
    contenteditable = closest(containerParentNode, '[contenteditable="true"]');
  } else {
    contenteditable = closest(container, '[contenteditable="true"]');
  }

  return {
    text: (_contenteditable = contenteditable) === null || _contenteditable === void 0 ? void 0 : _contenteditable.innerText,
    html: sanitizeHTML((_contenteditable2 = contenteditable) === null || _contenteditable2 === void 0 ? void 0 : _contenteditable2.innerHTML)
  };
}
export function removeLinkOnEntityChange() {
  var sel = window.getSelection();
  var range = sel.getRangeAt(0);
  var container = range === null || range === void 0 ? void 0 : range.commonAncestorContainer;
  var containerParentNode = container === null || container === void 0 ? void 0 : container.parentNode;
  var isMentionLink = !!(containerParentNode !== null && containerParentNode !== void 0 && containerParentNode.getAttribute('data-name'));

  if (isMentionLink) {
    var entity = containerParentNode;
    var name = entity === null || entity === void 0 ? void 0 : entity.getAttribute('data-name');
    var newText = entity === null || entity === void 0 ? void 0 : entity.textContent;

    if (newText !== name) {
      var startPosition = range.startOffset;
      var endPosition = range.endOffset;
      removeNode(entity);
      var newNode = document.createTextNode(newText || '');
      range.insertNode(newNode);
      range.selectNodeContents(newNode);
      range.collapse(false);
      var selection = window.getSelection();
      selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
      range.setEnd(newNode, endPosition);
      range.setStart(newNode, startPosition);
      selection === null || selection === void 0 ? void 0 : selection.addRange(range);
    }
  }
}
export function getTextAfterPosition(position) {
  var _range$startContainer;

  var sel = window.getSelection();
  var range = sel.getRangeAt(0);
  var caretPosition = range.collapsed ? range.endOffset : range.startOffset;
  if (caretPosition <= position) return '';
  return ((_range$startContainer = range.startContainer.textContent) === null || _range$startContainer === void 0 ? void 0 : _range$startContainer.substring(position, caretPosition)) || '';
}
export function findLastMention() {
  var mentions = document.querySelectorAll('[contenteditable="true"] [data-name]');
  var attribute = 'data-timestamp';

  var nodes = _toConsumableArray(mentions).sort(function (a, b) {
    return a.getAttribute(attribute) - b.getAttribute(attribute);
  }).reverse();

  return nodes.length ? nodes[0] : null;
}
export function focusOn(node) {
  if (!node) return;
  var sel = window.getSelection();
  var range = document.createRange();
  range.setStart(node, 1);
  range.setEnd(node, 1);
  sel.removeAllRanges();
  sel.addRange(range);
}
export function makeLinkRemovable(node) {
  if (!node) return;
  var link = node.querySelector('a:not([data-name])');

  if (link && !link.getAttribute('data-name')) {
    link.setAttribute('data-name', link.textContent || '');
  }
}