import { useRef } from 'react';

/**
 * Hook for creating a value exactly once. useMemo doesn't give this guarantee unfortunately https://github.com/Andarist/use-constant
 * @param {function} fn function which should be be executed exactly once and return in it your constant value
 */
const useConstant = (fn = () => {}) => {
  const ref = useRef();

  if (!ref.current) {
    ref.current = { v: fn() };
  }

  return ref.current.v;
};

export default useConstant;
