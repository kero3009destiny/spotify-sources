/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useCallback } from 'react';

import debounce from 'lodash/debounce';

import { colors } from 'styles/variables';
import { hexToRGB } from 'utils/hex-to-rgb';
import { useEventListener } from 'utils/use-event-listener';
import * as Styled from './MotionBackground.styled';

const COLORS = [colors.pink, colors.aquamarine];
const DEBOUNCE_DELAY = 250;

/**
 * MotionBackground
 * @returns {ReactElement}
 */
const MotionBackground = ({ pause = false }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const [coords, setCoords] = useState(null);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const [circlesPos, setCirclesPos] = useState([]);
  const [colorFreq, setColorFreq] = useState([0, 0]);
  const [limits, setLimits] = useState(null);

  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const [circles] = useState(getRandom(4, 6));

  const onMouseInactivity = debounce(
    () => setIsMouseActive(false),
    DEBOUNCE_DELAY,
  );

  /**
   * TODO: Update mouse movement. SB2B-744
   */
  // const handlerMouse = useCallback(
  //   ({ clientX, clientY }) => {
  //     onMouseInactivity();
  //     setIsMouseActive(true);
  //     setCoords({ x: clientX, y: clientY });
  //   },
  //   [setCoords],
  // );

  // useEventListener({
  //   eventName: 'mousemove',
  //   handler: handlerMouse,
  //   stopListening: pause,
  // });

  const getColor = () => {
    const idX = getRandom(0, COLORS.length);

    if (colorFreq[idX] > circles / COLORS.length) {
      return getColor(colorFreq);
    }
    setColorFreq(colorFreqPrev =>
      colorFreqPrev.map(el => (el === idX ? el + 1 : el)),
    );
    return COLORS[idX];
  };

  const defineCircle = canvas => {
    const posX = getRandom(0, canvas.width * 1.5);
    const posY = getRandom(0, canvas.height * 1.5);

    return {
      posX,
      posY,
      radius: getRandom(limits.min / 2, limits.min),
      color: getColor(),
      orientationX: limits.max - posX < posX ? -1 : 1,
      orientationY: limits.min - posY < posY ? -1 : 1,
    };
  };

  const defineGradient = (circleAttr, index) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { posX, posY, radius, color } = circleAttr;
    const radGrad = ctx.createRadialGradient(
      posX,
      posY,
      10,
      posX,
      posY,
      radius,
    );

    radGrad.addColorStop(0, hexToRGB(color, 1));
    radGrad.addColorStop(0.6, hexToRGB(color, 0.8));

    if (index === 0) {
      radGrad.addColorStop(1, hexToRGB(colors.citric, 1));
    } else {
      radGrad.addColorStop(1, hexToRGB(color, 0));
    }

    return radGrad;
  };

  const getOrientation = (position, orientation) => {
    if (position > limits.max * 1.2) {
      return -1;
    }
    if (position <= -limits.max * 0.2) {
      return 1;
    }
    return orientation;
  };

  const getClosest = () => {
    let indexClosest = null;

    if (coords) {
      for (let i = circlesPos.length - 1; i >= 0; i -= 1) {
        const x = coords.x - circlesPos[i].posX;
        const y = coords.y - circlesPos[i].posY;
        const dist = Math.sqrt(x * x + y * y);
        if (dist <= circlesPos[0].radius / 2) {
          indexClosest = i;
          break;
        }
      }
    }
    return indexClosest;
  };

  const updateCircles = () => {
    let indexManual = null;

    if (isMouseActive) {
      indexManual = getClosest();
    }

    setCirclesPos(circlesPosPrev =>
      circlesPosPrev.map((circle, i) => {
        if (indexManual !== i) {
          return {
            ...circle,
            posX: circle.posX + circle.orientationX * getRandom(0.5, 10),
            posY: circle.posY + circle.orientationY * getRandom(0.5, 10),
            orientationX: getOrientation(circle.posX, circle.orientationX),
            orientationY: getOrientation(circle.posY, circle.orientationY),
          };
        }
        return {
          ...circle,
          posX: coords.x,
          posY: coords.y,
        };
      }),
    );
  };

  const draw = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circlesPos.forEach((circleAttr, i) => {
        const grad = defineGradient(circleAttr, i);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      requestRef.current = requestAnimationFrame(updateCircles);
    }
  };

  const defineCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const isLandscape = canvas.width > canvas.height;

    setLimits({
      max: isLandscape ? canvasRef.current.width : canvasRef.current.height,
      min: isLandscape ? canvasRef.current.height : canvasRef.current.width,
    });
  };

  useEffect(() => {
    if (!pause && circlesPos.length > 0) {
      draw();
    }
  }, [circlesPos, pause]);

  useEffect(() => {
    if (canvasRef.current && !limits) {
      defineCanvas();
    }

    if (limits) {
      setCirclesPos(
        [...Array(circles)].map(() => defineCircle(canvasRef.current)),
      );
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [canvasRef, limits]);

  return <Styled.CanvasBg ref={canvasRef} pause={pause} />;
};

export default MotionBackground;
