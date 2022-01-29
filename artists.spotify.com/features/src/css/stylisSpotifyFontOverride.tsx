// https://github.com/thysultan/stylis.js/tree/v3.5.4#plugins
const STYLIS_CONTEXTS = {
  POST_PROCESS: -2,
  PREPARATION: -1,
  NEWLINE: 0,
  PROPERTY: 1,
  SELECTOR_BLOCK: 2,
  AT_RULE: 3,
};

/**
 * Updates font-family rule in components to support localized spotify fonts.
 * This is needed until encore-web has support for using non-latin fonts.
 */
export function stylisSpotifyFontOverride(
  context: number,
  content: unknown,
  selectors: string[],
) {
  // stylis types are wrong so have to treat content as unknown and do a runtime type check
  if (typeof content !== 'string') {
    return undefined;
  }

  if (context === STYLIS_CONTEXTS.PROPERTY) {
    const shouldTransform =
      // check if font-family property
      content.startsWith('font-family:') &&
      // avoid transforming @font-face blocks
      selectors.length > 0 &&
      !selectors.includes('@font-face');

    if (shouldTransform) {
      // explode spotify-circular to support arabic, hebrew, cyrillic fonts
      return content.replace(
        'spotify-circular',
        'circular-spotify-arabic,circular-spotify-hebrew,circular-spotify-cyrillic,spotify-circular',
      );
    }
  }

  return undefined;
}

// stable identifier that will not be dropped by minification unless the whole module is unused
/* #__PURE__*/
Object.defineProperty(stylisSpotifyFontOverride, 'name', {
  value: 'stylisSpotifyFontOverride',
});
