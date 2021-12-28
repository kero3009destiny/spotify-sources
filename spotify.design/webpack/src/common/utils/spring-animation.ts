export function translate(x = 0, y = 0, z = 0): string {
  return `translate3d(${x}px, ${y}px, ${z}px)`;
}

export function translateX(x: number): string {
  return translate(x, 0, 0);
}

export function translateY(y: number): string {
  return translate(0, y, 0);
}

export function translateXY(x: number, y: number): string {
  return translate(x, y, 0);
}

export const fadeUpProperties = {
  opacity: 1,
  y: 0,
  delay: 100,
  config: { mass: 1, tension: 280, friction: 48 },
  from: { opacity: 0, y: 16 },
};

export function fadeUpStyle(
  animation: Pick<
    {
      immediate: boolean | undefined;
      opacity: number;
      y: number;
      delay: number;
      config: { mass: number; tension: number; friction: number };
      from: { opacity: number; y: number };
    },
    'opacity' | 'y'
  >
) {
  return {
    opacity: animation.opacity,
    transform: animation.y.interpolate(translateY),
  };
}
