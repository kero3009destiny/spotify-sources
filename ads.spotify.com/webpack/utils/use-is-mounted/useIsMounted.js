import { useRef, useEffect } from 'react';

/**
 * Hook to create an is component mounted reference
 * @returns {boolean} isMounted
 */
export const useIsMounted = () => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef.current;
};

export default useIsMounted;
