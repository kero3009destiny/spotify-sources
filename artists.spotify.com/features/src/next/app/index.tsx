// ignore-string-externalization
// https://nextjs.org/docs/advanced-features/custom-app
import React from 'react';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';

export type MrktNextComponentType<
  InitialProps = {},
  Props = {}
> = NextComponentType<NextPageContext, InitialProps, Props> & {
  renderApp?: (props: AppProps<Props>) => JSX.Element;
};

export function App(
  props: AppProps & {
    Component: MrktNextComponentType;
  },
) {
  // allows defining page layout in the page
  const { renderApp = defaultRender } = props.Component;
  return renderApp(props);
}

function defaultRender({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
