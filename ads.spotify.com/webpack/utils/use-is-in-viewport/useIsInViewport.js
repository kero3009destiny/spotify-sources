import { useEffect, useState, useRef } from 'react';
import { breakpointSelect } from 'styles/media-queries';
import { visibilityThreshold } from 'styles/variables';

/**
 * Hook to create an is visible state value that changes
 * when the element is visible in the viewport at some threshold condition
 * @param {Object} props
 * @param {number} pixels - The element's pixels visible to consider it as visible
 * @param {object} pixelBreakpoints - The element's pixels breakpoint rules to consider it visible
 * @param {number} threshold - The element's percentage visible to consider it as visible
 * @returns {Array} []
 * @returns {boolean} [].isVisible - The is visible state
 * @returns {object} [].targetRef - The DOM target ref to attach the visibility observer on
 */
const useIsInViewport = (
  {
    pixels: pixelsArg,
    pixelBreakpoints = { sm: 0, lg: 0 },
    threshold: thresholdArg,
    disconnect = true,
  } = {
    threshold: visibilityThreshold.oneThird,
  },
) => {
  const targetRef = useRef(null);
  const observerRef = useRef(null);
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    if (!targetRef.current) return undefined;

    const pixels =
      pixelsArg ||
      breakpointSelect({
        sm: pixelBreakpoints.sm,
        lg: pixelBreakpoints.lg,
      });
    const threshold =
      thresholdArg ||
      Number((pixels / targetRef.current.clientHeight).toFixed(2));

    const options = {
      root: null, // Defaults to the browser viewport if not specified or if null
      rootMargin: '0px',
      threshold,
    };

    observerRef.current = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInViewport(true);

          if (disconnect) {
            observer.disconnect();
          }
        }

        if (!disconnect && !entry.isIntersecting) {
          setInViewport(false);
        }
      });
    }, options);

    observerRef.current.observe(targetRef.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [pixelsArg, pixelBreakpoints, thresholdArg, targetRef]);

  return [inViewport, targetRef];
};

export default useIsInViewport;
