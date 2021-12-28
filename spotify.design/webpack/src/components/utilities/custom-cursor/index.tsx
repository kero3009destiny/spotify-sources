import React, { RefObject, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { animationConfig, tagnameIsInteractive } from './utils';
import style from './style.module.css';

const trans = (x: number, y: number): string =>
  `translate3d(${x}px, ${y}px, 0px)`;
const scale = (scale: number): string => `scale(${scale})`;
const opacity = (opacity: number): string => `${opacity}`;
const boxShadow = (size: number): string =>
  `0 0 0 ${size}px var(--color-typography--barely-visible)`;

interface AnimationProperties {
  // X and Y position of the mouse to animate to.
  xy?: [number, number];
  // Scale to animate to.
  scale?: number;
  // Opacity to animate to.
  opacity?: number;
  // UI Opacity to animate to.
  uiOpacity?: number;
  // Width of the "border" (which is actually a box-shadow).
  border?: number;
  // https://www.react-spring.io/docs/hooks/api
  config?: { mass: number; tension: number; friction: number };
}

interface Props {
  boundingElement: RefObject<EventTarget>;
}

export const CustomCursor = ({ boundingElement }: Props) => {
  const [animation, set] = useSpring(() => ({
    xy: [320, 320],
    scale: 0,
    opacity: 0,
    uiOpacity: 0,
    border: 1,
    config: animationConfig,
  }));

  const handleGesture = useGesture(
    {
      onDrag: event => {
        const { down } = event;
        const props: AnimationProperties = {};
        props.border = down ? 48 : 1;
        props.scale = down ? 0.25 : 1;
        props.uiOpacity = down ? 0 : 1;

        set(props);
      },
      onMove: event => {
        const { down, xy } = event;
        const props: AnimationProperties = { xy };

        if (!down && event.event?.type !== null) {
          const hoveredTagName = (event.event?.target as HTMLElement).tagName;
          if (hoveredTagName && tagnameIsInteractive(hoveredTagName)) {
            props.uiOpacity = 0;
            props.scale = 0.25;
          } else {
            props.uiOpacity = 1;
            props.scale = 1;
          }
        }

        set(props);
      },
      onHover: event => {
        const { hovering } = event;

        const animationProps: AnimationProperties = {
          opacity: hovering ? 1 : 0,
          scale: hovering ? 1 : 0,
        };

        set(animationProps);
      },
    },
    {
      domTarget: boundingElement,
    }
  );

  useEffect(handleGesture, [handleGesture]);

  return (
    <div className={style.wrapper}>
      <animated.div
        className={style.cursor}
        style={{
          opacity: animation.opacity.interpolate(opacity),
          transform: animation.xy.interpolate(trans),
        }}
      >
        <animated.div
          className={style.inner}
          style={{
            transform: animation.scale.interpolate(scale),
          }}
        >
          <animated.div
            className={style.graphic}
            style={{
              boxShadow: animation.border.interpolate(boxShadow),
            }}
          />
          <animated.div
            className={style.ui}
            style={{
              opacity: animation.uiOpacity.interpolate(opacity),
            }}
          >
            <div className={style.leftArrow} />
            <div className={style.rightArrow} />
          </animated.div>
        </animated.div>
      </animated.div>
    </div>
  );
};
