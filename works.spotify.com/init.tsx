import { QueryCache } from 'react-query';

export const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      suspense: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
