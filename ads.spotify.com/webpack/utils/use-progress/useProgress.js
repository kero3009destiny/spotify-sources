import { useState, useEffect } from 'react';

import {
  animationFrameScheduler,
  scheduled,
  Subject,
  BehaviorSubject,
  of,
  NEVER,
} from 'rxjs';
import {
  repeat,
  endWith,
  takeWhile,
  map,
  timestamp,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { useConstant } from 'utils/use-constant';

const EVENT_TYPES = {
  play: 'play',
  pause: 'pause',
  restart: 'restart',
};

/**
 * Hook to get a progress value to use it as animation
 * @param {number} duration - The animation duration
 * @returns {object} progress - The progress data
 * @returns {number} progress.value - The progress value
 * @returns {function} progress.play - To play the animation
 * @returns {function} progress.pause - To pause the animation
 * @returns {function} progress.stop - To stop the animation
 * @returns {function} progress.restart - To restart the animation
 */
const useProgress = ({ duration = 1000 }) => {
  const [progressValue, setProgressValue] = useState(0);
  const event$ = useConstant(() => new Subject());
  const progress$ = useConstant(() => new BehaviorSubject(0));

  const play = () => {
    event$.next({
      type: EVENT_TYPES.play,
      value: Date.now(),
    });
  };

  const pause = () => {
    event$.next({ type: EVENT_TYPES.pause });
  };

  const stop = () => {
    event$.next({ type: EVENT_TYPES.pause });
    progress$.next(0);
    setProgressValue(() => 0);
  };

  const restart = () => {
    stop();
    play();
  };

  const getProgressScheduler = ({
    now: nowArg = Date.now(),
    latestProgress = 0,
  }) =>
    scheduled(of(nowArg), animationFrameScheduler).pipe(
      repeat(),
      timestamp(),
      map(({ value: start, timestamp: now }) => {
        const currentProgress = (now - start) / duration;

        return currentProgress + latestProgress;
      }),
      takeWhile(progress => progress < 1),
      endWith(1),
    );

  useEffect(() => {
    const eventSubscriber = event$
      .pipe(
        withLatestFrom(progress$, (event, latestProgress) => ({
          ...event,
          latestProgress,
        })),
        switchMap(event => {
          return event.type === EVENT_TYPES.pause
            ? NEVER
            : getProgressScheduler({
                now: event.value,
                latestProgress: event.latestProgress,
              });
        }),
      )
      .subscribe(progress => {
        progress$.next(progress);
        setProgressValue(progress);
      });

    return () => {
      eventSubscriber.unsubscribe();
    };
  }, []);

  return {
    value: progressValue,
    play,
    pause,
    stop,
    restart,
  };
};

export default useProgress;
