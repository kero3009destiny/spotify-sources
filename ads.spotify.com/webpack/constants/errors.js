import { colors } from 'styles/variables';

/**
 * Not Found - The requested resource could not be found but may be available in
 * the future. Subsequent requests by the client are permissible.
 */
export const CODE_404 = 404;

/**
 * Internal Server Error - A generic error message, given when an unexpected
 * condition was encountered and no more specific message is suitable.
 */
export const CODE_500 = 500;

export const ERROR_404 = {
  CODE: CODE_404,
  DESCRIPTION: '404.description', // i18n key
  MESSAGE: '404.message', // i18n key
  COLOR: colors.white,
  MESSAGE_COLOR: colors.powderGreen,
  BACKGROUND_COLOR: colors.forest,
};
export const ERROR_500 = {
  CODE: CODE_500,
  DESCRIPTION: '500.description', // i18n key
  MESSAGE: '500.message', // i18n key
  COLOR: colors.white,
  MESSAGE_COLOR: colors.orange,
  BACKGROUND_COLOR: colors.midnight,
};
export const ERRORS = [ERROR_404, ERROR_500];
