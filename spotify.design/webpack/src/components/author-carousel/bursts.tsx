import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { interpolate } from 'flubber';

export const AUTHOR_BURSTS = [
  'M365,400a35,35 0 1,0 70,0a35,35 0 1,0 -70,0',
  'M604 367C793 244 745-41 393 235 310 62 163-3 253 263c-174-93-390-85-75 104-115 33-306 230 138 172-8 136 119 268 164 93 72 94 115-63 3-140 262 66 453 17 121-125z',
  'M761 374c41-33-142-55-200-43 25-41 36-250-18-207 7-87-143-157-171-53-124-52-89 134-73 186-56-38-289-93-198-18-99 43-120 344 18 383-19 67 161-93 188-112-14 82 181 296 193 235 52 99 268-21 216-109 72 5-72-137-129-176 61-2 222-62 174-86z',
];

const interpolationOptions = {
  maxSegmentLength: 12,
};

/**
 * Call this outside of the component since we only need to calc this once.
 */
const interpolationMethods = [
  interpolate(AUTHOR_BURSTS[0], AUTHOR_BURSTS[1], interpolationOptions),
  interpolate(AUTHOR_BURSTS[0], AUTHOR_BURSTS[2], interpolationOptions),
];

interface Props {
  index: number;
  active?: boolean;
}

export const Bursts = ({ active, index }: Props) => {
  const [animation] = useState({
    method: interpolationMethods[index],
  });

  const { progress } = useSpring({
    from: { progress: 0 },
    to: { progress: 1 },
    config: { mass: 1, tension: 220, friction: 50 },
    reset: active,
    reverse: !active,
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 800 800"
    >
      <animated.path d={progress.interpolate(animation?.method)} />
    </svg>
  );
};
