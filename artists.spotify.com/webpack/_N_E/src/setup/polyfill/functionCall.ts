/* eslint no-extend-native: ["error", { "exceptions": ["Function"] }] */
if (window && window.navigator && window.navigator.userAgent && /Edge\/1[0-4]\./.test(window.navigator.userAgent)) {
  // Fix for bug in Microsoft Edge: https://github.com/Microsoft/ChakraCore/issues/1415#issuecomment-287888807
  Function.prototype.call = function call(t) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return this.apply(t, Array.prototype.slice.apply(args, [0]));
  };
}

export {};