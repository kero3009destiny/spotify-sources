/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import { Root } from './src/components/root';

export const wrapRootElement = ({ pathname, element }) => {
  return <Root pathname={pathname}>{element}</Root>;
};

export const onServiceWorkerUpdateReady = () => {
  if (typeof window !== 'undefined') window.location.reload();
};
