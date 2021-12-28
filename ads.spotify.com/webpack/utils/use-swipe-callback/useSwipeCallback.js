import { useEffect, useState } from 'react';

import get from 'lodash/get';
import { fromEvent, interval } from 'rxjs';
import { switchMap, first, takeUntil, map, filter } from 'rxjs/operators';
import inRange from 'lodash/inRange';

const MAX_SWIPE_DURATION = 500;
const MIN_SWIPE_RANGE = {
  start: -30,
  end: 31,
};
const SWIPE_DIRECTION = {
  left: -1,
  right: 1,
};

const getClientX = event =>
  get(event, 'changedTouches[0].clientX', event.clientX);

/**
 * Hook to create a swipe event handler
 * @param {function} callback - The function that gets the swipe event data
 * @param {object} options - The options object
 * @param {HTMLElement} options.elementRef - The DOM element to attach swipe event to
 */
const useSwipeCallback = (callback, { elementRef }) => {
  const [event, setEvent] = useState();

  useEffect(() => {
    if (!elementRef.current) return undefined;

    const touchStart$ = fromEvent(elementRef.current, 'touchstart');
    const touchEnd$ = fromEvent(elementRef.current, 'touchend');
    const swipe$ = touchStart$.pipe(
      switchMap(touchStartEvent =>
        touchEnd$.pipe(
          map(touchEndEvent => {
            const startX = getClientX(touchStartEvent);
            const endX = getClientX(touchEndEvent);
            const xDiff = startX - endX;

            if (
              xDiff === 0 ||
              inRange(xDiff, MIN_SWIPE_RANGE.start, MIN_SWIPE_RANGE.end)
            ) {
              return null;
            }

            return {
              direction:
                xDiff > 0 ? SWIPE_DIRECTION.right : SWIPE_DIRECTION.left,
            };
          }),
          filter(e => e !== null),
          takeUntil(interval(MAX_SWIPE_DURATION).pipe(first())),
        ),
      ),
    );
    const swipeSubscription = swipe$.subscribe(setEvent);

    return () => swipeSubscription.unsubscribe();
  }, [elementRef]);

  useEffect(() => {
    if (!event) return;

    callback(event);
  }, [event]);
};

export default useSwipeCallback;
