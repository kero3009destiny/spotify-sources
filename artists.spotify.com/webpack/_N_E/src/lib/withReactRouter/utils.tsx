// ignore-string-externalization

/** Derives basename from the next.js router */
export function getBasename(_ref) {
  var basePath = _ref.basePath,
      locale = _ref.locale,
      defaultLocale = _ref.defaultLocale;
  return locale !== defaultLocale ? "".concat(basePath, "/").concat(locale) : basePath;
}