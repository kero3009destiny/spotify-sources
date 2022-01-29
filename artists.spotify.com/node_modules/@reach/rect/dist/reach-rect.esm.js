import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import observeRect from '@reach/observe-rect';
import { useIsomorphicLayoutEffect } from '@reach/utils/use-isomorphic-layout-effect';
import { isBoolean, isFunction } from '@reach/utils/type-check';
import warning from 'tiny-warning';

/**
 * Welcome to @reach/rect!
 *
 * Measures DOM elements (aka. bounding client rect).
 *
 * @see getBoundingClientRect https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * @see Docs                  https://reach.tech/rect
 * @see Source                https://github.com/reach/reach-ui/tree/main/packages/rect
 */

/**
 * Rect
 *
 * @param props
 */

var Rect = function Rect(_ref) {
  var onChange = _ref.onChange,
      _ref$observe = _ref.observe,
      observe = _ref$observe === void 0 ? true : _ref$observe,
      children = _ref.children;
  var ref = useRef(null);
  var rect = useRect(ref, {
    observe: observe,
    onChange: onChange
  });
  return children({
    ref: ref,
    rect: rect
  });
};
/**
 * @see Docs https://reach.tech/rect#rect-props
 */


if (process.env.NODE_ENV !== "production") {
  Rect.displayName = "Rect";
  Rect.propTypes = {
    children: PropTypes.func.isRequired,
    observe: PropTypes.bool,
    onChange: PropTypes.func
  };
} ////////////////////////////////////////////////////////////////////////////////


/**
 * useRect
 *
 * @param nodeRef
 * @param observe
 * @param onChange
 */
function useRect(nodeRef, observeOrOptions, deprecated_onChange) {
  var observe;
  var onChange;

  if (isBoolean(observeOrOptions)) {
    observe = observeOrOptions;
  } else {
    var _observeOrOptions$obs;

    observe = (_observeOrOptions$obs = observeOrOptions == null ? void 0 : observeOrOptions.observe) != null ? _observeOrOptions$obs : true;
    onChange = observeOrOptions == null ? void 0 : observeOrOptions.onChange;
  }

  if (isFunction(deprecated_onChange)) {
    onChange = deprecated_onChange;
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(function () {
      process.env.NODE_ENV !== "production" ? warning(!isBoolean(observeOrOptions), "Passing `observe` as the second argument to `useRect` is deprecated and will be removed in a future version of Reach UI. Instead, you can pass an object of options with an `observe` property as the second argument (`useRect(ref, { observe })`).\n" + "See https://reach.tech/rect#userect-observe") : void 0;
    }, [observeOrOptions]); // eslint-disable-next-line react-hooks/rules-of-hooks

    useEffect(function () {
      process.env.NODE_ENV !== "production" ? warning(!isFunction(deprecated_onChange), "Passing `onChange` as the third argument to `useRect` is deprecated and will be removed in a future version of Reach UI. Instead, you can pass an object of options with an `onChange` property as the second argument (`useRect(ref, { onChange })`).\n" + "See https://reach.tech/rect#userect-onchange") : void 0;
    }, [deprecated_onChange]);
  }

  var _React$useState = useState(nodeRef.current),
      element = _React$useState[0],
      setElement = _React$useState[1];

  var initialRectIsSet = useRef(false);
  var initialRefIsSet = useRef(false);

  var _React$useState2 = useState(null),
      rect = _React$useState2[0],
      setRect = _React$useState2[1];

  var onChangeRef = useRef(onChange); // eslint-disable-next-line react-hooks/exhaustive-deps

  useIsomorphicLayoutEffect(function () {
    onChangeRef.current = onChange;

    if (nodeRef.current !== element) {
      setElement(nodeRef.current);
    }
  });
  useIsomorphicLayoutEffect(function () {
    if (element && !initialRectIsSet.current) {
      initialRectIsSet.current = true;
      setRect(element.getBoundingClientRect());
    }
  }, [element]);
  useIsomorphicLayoutEffect(function () {
    if (!observe) {
      return;
    }

    var elem = element; // State initializes before refs are placed, meaning the element state will
    // be undefined on the first render. We still want the rect on the first
    // render, so initially we'll use the nodeRef that was passed instead of
    // state for our measurements.

    if (!initialRefIsSet.current) {
      initialRefIsSet.current = true;
      elem = nodeRef.current;
    }

    if (!elem) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("You need to place the ref");
      }

      return;
    }

    var observer = observeRect(elem, function (rect) {
      onChangeRef.current == null ? void 0 : onChangeRef.current(rect);
      setRect(rect);
    });
    observer.observe();
    return function () {
      observer.unobserve();
    };
  }, [observe, element, nodeRef]);
  return rect;
}

export default Rect;
export { Rect, useRect };
