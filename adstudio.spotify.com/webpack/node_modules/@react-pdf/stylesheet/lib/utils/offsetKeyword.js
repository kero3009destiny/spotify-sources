"use strict";

exports.__esModule = true;
exports.default = void 0;

var offsetKeyword = function offsetKeyword(value) {
  switch (value) {
    case 'top':
    case 'left':
      return '0%';

    case 'right':
    case 'bottom':
      return '100%';

    case 'center':
      return '50%';

    default:
      return null;
  }
};

var _default = offsetKeyword;
exports.default = _default;