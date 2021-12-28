import { useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';

/**
 * Hook to attach events to element
 * @param {string} eventName - string to define event
 * @param {function} handler - the function to be trigger from this hook
 * @param {HTMLElement} element - The element to attach the event, if not provided the event is attached to the window
 * @param {number} debounceDelay - The number of milliseconds to delay.
 * @param {boolean} stopListening - If true removes the listener
 * @returns {Object} { fileExt, queryUrl }
 */
const useEventListener = ({
  eventName,
  handler,
  element,
  debounceDelay,
  stopListening = false,
}) => {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      if (stopListening) return;

      const currentElement = element || window;
      // Create event listener that calls handler function stored in ref
      const eventListenerWrapper = event => savedHandler.current(event);
      const eventListener = debounceDelay
        ? debounce(eventListenerWrapper, debounceDelay)
        : eventListenerWrapper;

      currentElement.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      // eslint-disable-next-line consistent-return
      return () => {
        currentElement.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element, stopListening], // Re-run if eventName or element changes
  );
};

export default useEventListener;
