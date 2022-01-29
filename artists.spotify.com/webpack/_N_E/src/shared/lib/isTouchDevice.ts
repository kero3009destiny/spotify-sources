// ignore-string-externalization
export var isTouchDevice = function isTouchDevice() {
  // casting to any so that we can feature detect at runtime
  var win = window;
  return 'ontouchstart' in win || !!win.navigator.maxTouchPoints;
};