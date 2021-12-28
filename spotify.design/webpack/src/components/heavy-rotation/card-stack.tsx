import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Img from 'gatsby-image';
import { CardData } from '../card';
import {
  FRICTION,
  getRotation,
  getTension,
  SCALE_ACTIVE,
  transform,
  AnimationData,
  getDistanceToSide,
  randomIdleRotation,
  getDelay,
  CARDS_IN_VIEW,
  CARD_ITERATION_SCALE_INTENSITY,
  didMountAnimationProperties,
  boxShadow,
  willMountAnimationProperties,
} from './utils';
import style from './card-stack.module.css';
import { IMAGE_PLACEHOLDER_COLOR } from '../../common/constants';
import { AppContext } from '../../common/context.app';

interface Props {
  articles: CardData[];
  activeIndex: number;
  onThrow: Function;
  onDrag: Function;
  isShuffling: boolean;
}

export const CardStack = ({
  articles,
  activeIndex,
  onThrow,
  onDrag,
  isShuffling,
}: Props) => {
  const { prefersReducedMotion } = useContext(AppContext);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bcr = useRef<ClientRect | null>(null);
  const previousIndex = useRef<number>(null);
  const storedDirections = useRef<number[]>([]);

  const entries = articles;
  const [springs, setSprings] = useSprings(entries.length, (i: number) => ({
    from: willMountAnimationProperties(i),
    to: didMountAnimationProperties(),
    immediate: prefersReducedMotion,
  }));

  const drag = useDrag(event => {
    const { down, movement, direction, velocity, distance } = event;
    const [movementX] = movement;
    const dir = direction[0] < 0 ? -1 : 1;
    storedDirections.current[activeIndex] = dir;

    const hasEnoughVelocity = velocity > 0.2;
    let x = down ? movementX : 0;
    const rot = getRotation(movementX, dir, velocity);
    const scale = down ? SCALE_ACTIVE : 1;
    const config = { friction: FRICTION, tension: getTension(down) };
    const shadowSize = down ? 48 : 27;
    const shadowAlpha = down ? 0.2 : 0.5;
    onDrag(down);

    // On release.
    if (!down && bcr.current !== null) {
      if (hasEnoughVelocity || Math.abs(distance) > 200) {
        storedDirections.current[activeIndex] = movementX < 0 ? -1 : 1;
        x = getDistanceToSide(bcr.current, dir);
        onThrow(direction);
      }
    }

    const animationProperties = {
      x,
      rot,
      scale,
      shadowSize,
      shadowAlpha,
      config,
    };

    if (!prefersReducedMotion) {
      setSprings((i: number) => {
        // Return if it's not the currently active card.
        if (i !== activeIndex) {
          return;
        }

        return animationProperties;
      });
    }
  });

  const calculateBCR = useCallback(() => {
    if (wrapperRef.current !== null) {
      (bcr as React.MutableRefObject<
        ClientRect
      >).current = wrapperRef.current.getBoundingClientRect();
    }
  }, [wrapperRef]);

  const handleResize = useCallback(() => {
    calculateBCR();

    // Ensure cards stay out of view if they are already gone.
    setSprings((i: number) => {
      if (i >= activeIndex) {
        return;
      }

      const direction = storedDirections.current[i] || 1;
      const x = window.innerWidth * 1.2 * direction;
      return { x };
    });
  }, [calculateBCR, storedDirections, activeIndex]);

  /** ComponentDidMount & ComponentWillUnmount. */
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [calculateBCR, activeIndex]);

  /** When carousel changes slide. */
  useEffect(() => {
    const isAtFirstCard = activeIndex === 0;
    const wentBackwards = previousIndex.current > activeIndex;

    if (previousIndex.current !== null) {
      setSprings((i: number) => {
        const props: AnimationData = {};
        const direction = storedDirections.current[i] || 1;
        const currentCard = i === activeIndex - 1;
        const upcomingCard = i === activeIndex;
        const previousCard = i === activeIndex + 1;
        const cardIsNearTheFront = i <= activeIndex + CARDS_IN_VIEW;
        let scale = 1;

        if (!cardIsNearTheFront) {
          scale -= CARD_ITERATION_SCALE_INTENSITY * (i - CARDS_IN_VIEW);
        }

        props.shadowAlpha = 0;
        props.scale = scale;

        if (isAtFirstCard) {
          props.delay = getDelay(articles.length, i);
          props.x = 0;

          if (springs[i].rot.value === 0) {
            props.rot = randomIdleRotation();
          }
        }

        if (currentCard) {
          // Animate the current card out of view based on direction.
          props.x = getDistanceToSide(bcr.current as ClientRect, direction);
        }

        if (upcomingCard) {
          // Remove rotation from the upcoming card.
          props.rot = 0;
          props.shadowAlpha = 0.4;
        }

        if (upcomingCard && wentBackwards) {
          props.x = 0;
        }

        if ((currentCard && wentBackwards) || (previousCard && wentBackwards)) {
          props.rot = randomIdleRotation();
        }

        return props;
      });
    }

    previousIndex.current = activeIndex;
  }, [activeIndex, previousIndex]);

  /** On shuffle. */
  useEffect(() => {
    if (!isShuffling) {
      storedDirections.current = [];
    }

    setSprings((i: number) => {
      const direction = storedDirections.current[i] || 1;
      const props: AnimationData = {};

      if (isShuffling) {
        props.x = getDistanceToSide(bcr.current as ClientRect, direction);
        props.delay = getDelay(articles.length, i) / 2;
      } else {
        props.x = 0;
        props.delay = getDelay(articles.length, i);
      }

      return props;
    });
  }, [isShuffling]);

  /** Reveal animation. */
  useLayoutEffect(() => {
    setSprings((i: number) => {
      return {
        x: 0,
        delay: getDelay(articles.length, i),
      };
    });
  }, [setSprings]);

  return (
    <div className={style.wrapper} ref={wrapperRef}>
      {springs.map((animationProperties: AnimationData, i: number) => {
        const {
          x,
          y,
          rot,
          scale,
          shadowAlpha,
          shadowSize,
        } = animationProperties;
        const cardProperties = [rot, scale];
        const cardTransform = interpolate(cardProperties as any, transform);
        const cardShadow = interpolate(
          [shadowSize, shadowAlpha] as any,
          boxShadow
        );
        const image = entries[i].image;

        return (
          <animated.div
            key={i}
            className={style.inner}
            style={{
              transform: interpolate(
                [x, y],
                (x: number, y: number) => `translate3d(${x}px,${y}px,0)`
              ),
              zIndex: entries.length - i,
            }}
          >
            <animated.div
              className={style.card}
              style={{
                transform: cardTransform,
                boxShadow: cardShadow,
              }}
              {...drag(i)}
            >
              {image?.src?.src && (
                <Img
                  fluid={image.src}
                  className={style.image}
                  backgroundColor={IMAGE_PLACEHOLDER_COLOR}
                  aria-hidden="true"
                  loading="lazy"
                />
              )}
            </animated.div>
          </animated.div>
        );
      })}
    </div>
  );
};
