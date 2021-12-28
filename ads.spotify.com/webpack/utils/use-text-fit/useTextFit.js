import { useState, useRef, useEffect } from 'react';

import { breakpointSelect } from 'styles/media-queries';

import debounce from 'lodash/debounce';

const RESIZE_DEBOUNCE_DELAY = 250;

/**
 * Reduces the font-size dynamically based on whether the text can fit its container or not
 * The container must use a fixed height (flex: 1, height: 100px, aspectRatio)
 * Different than that like height: auto or max-height may reduce the font-size to 0
 * @param {object} props
 * @param {number} props.paddingBreakpoints - Specific breakpoints padding values
 * @param {boolean} props.isWrapped - Whether the text target is sharing container to take the whole group height value instead
 * @param {number} props.lineHeight - Relation between font-size and line height
 * @returns {object} {}
 * @returns {boolean} {}.style - The styles to apply to the text target
 * @returns {object} {}.textFitRef - The text target reference attached to the text element
 * @returns {object} {}.containerToFitRef - The container reference to check if the text fits its boundaries
 */
const useTextFit = ({
  paddingBreakpoints = { sm: 0, lg: 0 },
  isWrapped = false,
  lineHeight = 1,
  textFitRef: textFitRefArg,
  containerToFitRef: containerToFitRefArg,
} = {}) => {
  const prevWindowWidth = useRef(null);
  const textFitRef = textFitRefArg || useRef(null);
  const containerToFitRef = containerToFitRefArg || useRef(null);
  const [style, setStyle] = useState({ opacity: 0 });

  useEffect(() => {
    prevWindowWidth.current = window.innerWidth;

    const onResize = debounce(() => {
      // Prevents iOS devices to fire textFit on bottom bar changes
      if (prevWindowWidth.current !== window.innerWidth) {
        prevWindowWidth.current = window.innerWidth;
        setStyle({ opacity: 0 });
      }
    }, RESIZE_DEBOUNCE_DELAY);

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!textFitRef.current || !containerToFitRef.current) return;

    const computedFontSize = getComputedStyle(textFitRef.current).fontSize;
    const [value] = computedFontSize.match(/\d+/) || [];
    const padding = breakpointSelect(paddingBreakpoints);
    const height = isWrapped
      ? textFitRef.current.parentNode.offsetHeight
      : textFitRef.current.offsetHeight;
    const width = isWrapped
      ? textFitRef.current.parentNode.offsetWidth
      : textFitRef.current.offsetWidth;

    const { fontSize, opacity } =
      height + padding > containerToFitRef.current.offsetHeight ||
      width > containerToFitRef.current.offsetWidth
        ? { fontSize: value - 1, opacity: 0 }
        : { fontSize: value, opacity: 1 };

    setStyle({
      fontSize: `${fontSize}px`,
      lineHeight: `${fontSize * lineHeight}px`,
      opacity,
    });
  }, [textFitRef, containerToFitRef, style.fontSize]);

  return { style, textFitRef, containerToFitRef };
};

export default useTextFit;
