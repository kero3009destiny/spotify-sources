interface AnimationConfigData {
  tension?: number;
  friction?: number;
}

export interface AnimationData {
  x?: number;
  y?: number;
  scale?: number;
  rot?: number;
  delay?: number;
  shadowAlpha?: number;
  shadowSize?: number;
  config?: AnimationConfigData;
}

export const CAROUSEL_SETTINGS = {
  slidesPerView: 1,
  roundLengths: true,
  loop: false,
  allowTouchMove: false,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    waitForTransition: false,
  },
  effect: 'fade',
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
};

/**
 * Amount of cards from the top of the current deck.
 * If a card's current index is past this number, scaling will take place.
 */
export const CARDS_IN_VIEW = 3;
/**
 * Timeout duration when shuffling the cards.
 * After timeout finished cards will fly back in again.
 */
export const SHUFFLE_BACK_TIMEOUT = 1000;
/** Spring friction. */
export const FRICTION = 50;
/** Card scale when it's being held/dragged. */
export const SCALE_ACTIVE = 1.1;
/** Decrease card size by {X} percent per index. */
export const CARD_ITERATION_SCALE_INTENSITY = 0.08;
/** The minimum card scale to prevent scaling logic going into the negatives. */
export const MINIMUM_CARD_SCALE = 0.4;
/** Rotation around the X axis. Gives perspective. */
const ROTATE_X = 5;
/** Max rotation to give to the cards in their idle state. */
const MAX_IDLE_ROTATION = 20;

export function getTension(pointerDown: boolean): number {
  let tension = 350;

  if (pointerDown) {
    tension = 500;
  }

  return tension;
}

// Rotate as you are dragging for effect.
export function getRotation(
  pointerX: number,
  direction: number,
  velocity: number
) {
  return pointerX / 100 + velocity * 2 * direction;
}

export function getDelay(numberOfItems: number, index: number) {
  // Less delay if we have a lot of items.
  const delayPerIteration = numberOfItems > 10 ? 32 : 100;
  return delayPerIteration * index;
}

export function calcScale(index: number): number {
  let scale = 1;
  scale -= CARD_ITERATION_SCALE_INTENSITY * (index - CARDS_IN_VIEW);
  scale = Math.max(scale, MINIMUM_CARD_SCALE);
  return scale;
}

export function transform(rotation: number, scale: number): string {
  const s = `scale(${scale})`;
  const rotateX = `rotateX(${ROTATE_X}deg)`;

  if (rotation) {
    const rotateY = `rotateY(${rotation / 10}deg)`;
    const rotateZ = `rotateZ(${rotation}deg)`;

    return `${rotateX} ${rotateY} ${rotateZ} ${s}`;
  } else {
    return `${rotateX} ${s}`;
  }
}

export function randomIdleRotation() {
  return -(MAX_IDLE_ROTATION / 2) + Math.random() * MAX_IDLE_ROTATION;
}

// Introductory animation

export function willMountAnimationProperties(i: number): AnimationData {
  return {
    x: typeof window !== 'undefined' ? window.innerWidth : 800,
    y: 0,
    scale: i > CARDS_IN_VIEW ? calcScale(i) : 1,
    shadowSize: 27,
    shadowAlpha: i === 0 ? 0.4 : 0,
  };
}

export function didMountAnimationProperties(): AnimationData {
  return {
    rot: randomIdleRotation(),
  };
}
export function getDistanceToSide(bcr: ClientRect, direction: number): number {
  const { left, width } = bcr;
  const viewportWidth = window.innerWidth;
  // A little bit of extra distance to entirely hide the card + shadow etc.
  const offset = viewportWidth / 5;
  let distance: number;

  if (direction === 1) {
    const destination = offset + viewportWidth + width / 2;
    const currentPosition = left + width / 2;
    distance = destination - currentPosition;
  } else {
    const destination = left + width + offset;
    distance = -destination;
  }

  return distance;
}

export function shuffleArray(array: unknown[]): unknown[] {
  // Clone so we don't overwrite.
  const arr = [...array];

  let currentIndex = arr.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

export function boxShadow(size: number, alpha: number): string {
  return `2px 5px ${size}px rgba(0, 0, 0, ${alpha})`;
}
