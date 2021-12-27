import get from 'lodash.get';
import getConfig from 'next/config';

/*
 * Returns the publicRuntimeConfig value at `path`.
 */
export const getPublicRuntimeConfigValue = <T>(path: string) => get(getConfig(), `publicRuntimeConfig.${path}`) as T;
