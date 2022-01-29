import _slicedToArray from "/var/jenkins_home/workspace/tingle.95d1c772-977c-47f0-ae13-caaa6a239f46/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
export function node(state, next, duration) {
  return {
    state: state,
    next: next,
    duration: duration
  };
}
export function useAnimation(initialNode) {
  var animRef = React.useRef();

  var _React$useState = React.useState(initialNode),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      curr = _React$useState2[0],
      setCurr = _React$useState2[1];

  React.useEffect(function () {
    var isActive = true;

    if (curr.next && curr.duration) {
      var next = curr.next;
      animRef.current = window.setTimeout(function () {
        if (isActive) {
          setCurr(next);
        }
      }, curr.duration);
    }

    return function () {
      isActive = false;
      window.clearTimeout(animRef.current);
    };
  }, [curr]);
  return [curr, setCurr];
}