import useSWR, { ConfigInterface, cache, mutate } from 'swr';
import { webgateFetch } from '@mrkt/features/webgate-fetch';

type Request = {
  url: string;
  method?: string;
  headers?: { [key: string]: string };
  body?: string;
  responseType?: 'json' | 'text';
  baseUrl?: string;
};

type Response<Data = any> = {
  ok: boolean;
  status: number;
  data: Data | null;
};

async function fetcher<Data = any>({
  url,
  method,
  headers,
  body,
  responseType = 'json',
  baseUrl = 'https://generic.wg.spotify.com',
}: Request): Promise<Response<Data>> {
  const response = await webgateFetch(new URL(url, baseUrl).href, {
    method,
    headers,
    body,
  });

  return {
    ok: response.ok,
    status: response.status,
    data: await response[responseType]().catch(() => null),
  };
}

function toKey(request: Request) {
  // including the fetcher object in the key ensures the cache key is unique to useWebgateSWR
  // @see https://swr.vercel.app/docs/arguments#passing-objects
  return [JSON.stringify(request), fetcher];
}

/**
 * Hook to load data from a webgate api. Uses swr lib internally.
 * @param request object describing the request
 * @param swrConfig config passed to useSWR hook (docs: https://swr.vercel.app)
 */
export function useWebgateSWR<Data = any>(
  request: Request,
  swrConfig?: ConfigInterface<Response<Data>>,
) {
  const result = useSWR(
    toKey(request),
    request.url ? () => fetcher<Data>(request) : undefined,
    swrConfig,
  );

  return {
    ...result,
    ok: result.data?.ok,
    status: result.data?.status,
    data: result.data?.data,
  };
}

/**
 * Update the data associated with a request
 * @param request object describing the request
 * @param data
 * @param shouldRevalidate
 * @see https://swr.vercel.app/docs/mutation
 */
export function mutateWebgate<Data = any>(
  request: Request,
  response?: Response<Data> | Promise<Response<Data>>,
  shouldRevalidate?: boolean,
) {
  return mutate(toKey(request), response, shouldRevalidate);
}

if (process.env.NODE_ENV === 'test') {
  // reset cache between tests
  afterEach(() => {
    cache.clear(false);
  });
}
