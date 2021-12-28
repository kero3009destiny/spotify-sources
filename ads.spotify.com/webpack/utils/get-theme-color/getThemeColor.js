import { colors } from 'styles/variables';
import lowerCase from 'lodash/lowerCase';

/**
 * App themes definition
 */
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

/**
 * Theme main color
 */
const THEME_COLOR = {
  [THEMES.DARK]: colors.white,
  [THEMES.LIGHT]: colors.black,
};

/**
 * Theme inversed color
 */
const THEME_INVERSED_COLOR = {
  [THEMES.DARK]: colors.black,
  [THEMES.LIGHT]: colors.white,
};

/**
 * Returns the theme key value providing the truthy value get from the CMS
 * @param {boolean} contentValue Truthy value get from the CMS
 * @returns {string}
 */
export const getThemeKey = contentValue =>
  contentValue ? THEMES.LIGHT : THEMES.DARK;

/**
 * Returns the corresponding main color value of a given theme
 * @param {string} theme Theme key
 * @returns {string}
 */
export const getThemeColor = theme => THEME_COLOR[lowerCase(theme)];

/**
 * Returns the corresponding inversed color value of a given theme
 * @param {string} theme Theme key
 * @returns {string}
 */
export const getInversedThemeColor = theme =>
  THEME_INVERSED_COLOR[lowerCase(theme)];

/**
 * Returns a boolean value indicating if the theme is dark or not
 * @param {string} theme Theme key
 * @returns {boolean}
 */
export const getIsDarkTheme = theme => lowerCase(theme) === THEMES.DARK;
