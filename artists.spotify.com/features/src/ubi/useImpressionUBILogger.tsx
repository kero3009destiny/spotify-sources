import { MutableRefObject, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { createUbiEventLogger } from '@mrkt/features/ubi/ubiEventLogger';
import { UBIImpressionEvent } from '@spotify-internal/ubi-types-js';

if (typeof IntersectionObserver === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  import(
    /* webpackChunkName: "intersection-observer" */
    'intersection-observer'
  );
}

type ImpressionFactory = {
  impression: (options?: { authorize: boolean }) => UBIImpressionEvent;
};

export const useImpressionUBILogger = <T,>(
  impressionFactory: ImpressionFactory,
  artistId: string | null = null,
  organizationUri: string | null = null,
  ref?: MutableRefObject<T>,
) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: false, // trigger any time this scrolls into view
    threshold: 0.5,
  });

  const setRefs = useCallback(
    node => {
      if (ref !== undefined) {
        // Ref's from useRef needs to have the node assigned to `current`
        ref.current = node;
      }
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef, ref],
  );

  useEffect(() => {
    if (inView) {
      // need to create a new impression each time the element
      // comes into view rather than logging the same impression
      // event mutitple times
      const event = impressionFactory.impression();
      const UBIEventLogger = createUbiEventLogger(artistId, organizationUri);
      UBIEventLogger.logImpression(event);
    }
  }, [inView, impressionFactory, artistId, organizationUri]);

  return { ref: setRefs, inView };
};
