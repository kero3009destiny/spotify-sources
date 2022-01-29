// ignore-string-externalization
export var useFaqLink = function useFaqLink(label, isApp) {
  var plain = isApp ? '?plain' : '';
  return "/help/article/".concat(label).concat(plain, "?ref=claimflow");
};