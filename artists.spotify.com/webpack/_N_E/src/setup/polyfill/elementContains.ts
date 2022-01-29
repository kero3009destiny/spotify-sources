var _this = this;

/* eslint-disable consistent-this */
if (!Element.prototype.closest) {
  Element.prototype.closest = function (selector) {
    var element = _this; // eslint-disable-line consistent-this

    if (!document.documentElement.contains(element)) return null;

    do {
      if (element.matches(selector)) return element;
      element = element.parentElement || element.parentNode;
    } while (element !== null && element.nodeType === 1);

    return null;
  };
}

export {};