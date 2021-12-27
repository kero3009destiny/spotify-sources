import { useState, useEffect } from 'react';
import {
  screenXsMin,
  screenSmMin,
  screenMdMin,
  screenLgMin,
  screenXlMin,
} from '@spotify-internal/encore-web';

const isBrowser = () => typeof window !== 'undefined';

export enum Screen {
  XS = parseInt(screenXsMin, 10),
  SM = parseInt(screenSmMin, 10),
  MD = parseInt(screenMdMin, 10),
  LG = parseInt(screenLgMin, 10),
  XL = parseInt(screenXlMin, 10),
}

export enum Viewport {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
}

export const breakpointValues = {
  [Viewport.XS]: Screen.XS,
  [Viewport.SM]: Screen.SM,
  [Viewport.MD]: Screen.MD,
  [Viewport.LG]: Screen.LG,
  [Viewport.XL]: Screen.XL,
};

type Queries = {
  smQuery: MediaQueryList;
  mdQuery: MediaQueryList;
  lgQuery: MediaQueryList;
  xlQuery: MediaQueryList;
};

// @visibleForTesting
export function getMatch(queries: Queries) {
  let v = Viewport.XS;
  if (queries.smQuery.matches) v = Viewport.SM;
  if (queries.mdQuery.matches) v = Viewport.MD;
  if (queries.lgQuery.matches) v = Viewport.LG;
  if (queries.xlQuery.matches) v = Viewport.XL;
  return v;
}

export const useBreakpointValue = () => {
  const vp = useViewport();
  return breakpointValues[vp];
};

export const useViewport: (queries?: Queries) => Viewport = (queries) => {
  let defaultQueries = {} as Queries;
  if (isBrowser()) {
    const smQuery = window.matchMedia(`(min-width: ${screenSmMin})`);
    const mdQuery = window.matchMedia(`(min-width: ${screenMdMin})`);
    const lgQuery = window.matchMedia(`(min-width: ${screenLgMin})`);
    const xlQuery = window.matchMedia(`(min-width: ${screenXlMin})`);

    defaultQueries = {
      smQuery,
      mdQuery,
      lgQuery,
      xlQuery,
    };
  }

  const queriesOrDefault = queries ? queries : defaultQueries;

  const [viewport, setViewport] = useState(() => getMatch(queriesOrDefault));
  const handleResize = () => setViewport(getMatch(queriesOrDefault));

  useEffect(() => {
    handleResize();
    queriesOrDefault.smQuery.addListener(handleResize);
    queriesOrDefault.mdQuery.addListener(handleResize);
    queriesOrDefault.lgQuery.addListener(handleResize);
    queriesOrDefault.xlQuery.addListener(handleResize);
    return () => {
      queriesOrDefault.smQuery.removeListener(handleResize);
      queriesOrDefault.mdQuery.removeListener(handleResize);
      queriesOrDefault.lgQuery.removeListener(handleResize);
      queriesOrDefault.xlQuery.removeListener(handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return viewport;
};
