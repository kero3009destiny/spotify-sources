const { useState, useEffect, useRef } = require("react");

/**
 * React hook for managing state transitions.
 * @param {boolean} transitionIn
 * @param {number} [timeoutDelay=500]
 * @return {["entering" | "entered" | "exiting" | "exited", () => void]}
 */
function useTransition(transitionIn, timeoutDelay = 500) {
  const [state, setState] = useState(transitionIn);

  const transitionInRef = useRef(transitionIn);

  const endTransitionRef = useRef(() => {
    setState(transitionInRef.current);
  });

  useEffect(() => {
    transitionInRef.current = transitionIn;
    const timeout = setTimeout(endTransitionRef.current, timeoutDelay);
    return () => clearTimeout(timeout);
  }, [transitionIn]);

  return transitionIn !== state
    ? [transitionIn ? "entering" : "exiting", endTransitionRef.current]
    : [transitionIn ? "entered" : "exited", endTransitionRef.current];
}

module.exports.useTransition = useTransition;
