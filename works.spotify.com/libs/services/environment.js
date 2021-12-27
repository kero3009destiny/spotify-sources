export const ENV_NAME = process.env.REACT_APP_ENV || process.env.NODE_ENV;
export const DEV_BUILD = ENV_NAME === 'dev';
export const VERSION = process.env.REACT_APP_VERSION || 'unknown';

export const PUBLIC_URL = process.env.PUBLIC_URL || '/';
