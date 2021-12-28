import { useRef, useEffect, useState, useContext, cloneElement } from 'react';

import { ScrollMagicContext } from './Controller';

/**
 * Scene Consumer
 */
const Scene = ({
  children = () => {},
  onStart,
  onEnd,
  onEnter,
  onLeave,
  enabled = true,
  pin,
  pinSettings,
  /* scene options */
  duration = 0,
  offset = 0,
  triggerElement,
  triggerHook = 'onCenter',
  reverse = true,
}) => {
  const elementRef = useRef(null);
  const controller = useContext(ScrollMagicContext);
  const [progress, setProgress] = useState(0);
  const [scene, setScene] = useState();

  useEffect(() => {
    if (!controller) return undefined;

    /* eslint-disable-next-line no-undef */
    const newScene = new ScrollMagic.Scene({
      duration,
      offset,
      triggerElement:
        triggerElement === null ? null : triggerElement || elementRef.current,
      triggerHook,
      reverse,
    });

    if (pin) {
      newScene.setPin(
        typeof pin === 'string' ? pin : elementRef.current,
        pinSettings,
      );
    }

    newScene.addTo(controller);
    newScene.on('progress', event => {
      setProgress(event.progress);
    });

    if (typeof onStart === 'function') {
      newScene.on('start', onStart);
    }

    if (typeof onEnd === 'function') {
      newScene.on('end', onEnd);
    }

    if (typeof onEnter === 'function') {
      newScene.on('enter', onEnter);
    }

    if (typeof onLeave === 'function') {
      newScene.on('leave', onLeave);
    }

    setScene(newScene);

    return () => {
      newScene.destroy();
    };
  }, [controller]);

  useEffect(() => {
    if (!scene) return;

    scene.enabled(enabled);
  }, [enabled, scene]);

  useEffect(() => {
    if (!scene) return;

    scene.triggerHook(triggerHook);
  }, [triggerHook, scene]);

  useEffect(() => {
    if (!scene) return;

    scene.duration(duration);
  }, [triggerHook, duration]);

  return cloneElement(children(progress), { ref: elementRef });
};

export default Scene;
