// ignore-string-externalization
import '@spotify-internal/css-physical-to-logical/css/styles.css';
import React from 'react';
import { AppProps, AppContext, AppInitialProps } from 'next/app';
import { StyleSheetManager, StylisPlugin } from 'styled-components';
import { stylisPhysicalToLogical } from '@spotify-internal/css-physical-to-logical';
import { stylisSpotifyFontOverride } from './stylisSpotifyFontOverride';

type AppType = React.ComponentType<AppProps> & {
  getInitialProps?: (
    context: AppContext,
  ) => AppInitialProps | Promise<AppInitialProps>;
};

const stylisPlugins: StylisPlugin[] = [
  stylisSpotifyFontOverride,
  stylisPhysicalToLogical as any,
];

export function appWithCssTransform(WrappedApp: AppType): AppType {
  function AppWithCssTransform(props: AppProps) {
    return (
      <StyleSheetManager stylisPlugins={stylisPlugins}>
        <WrappedApp {...props} />
      </StyleSheetManager>
    );
  }

  AppWithCssTransform.getInitialProps = WrappedApp.getInitialProps;

  return AppWithCssTransform;
}
