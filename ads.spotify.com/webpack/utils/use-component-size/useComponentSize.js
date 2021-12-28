import { useEffect, useState, useCallback } from 'react';

import get from 'lodash/get';
import debounce from 'lodash/debounce';

const RESIZE_DEBOUNCE_DELAY = 250;

const useComponentSize = element => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updateSize = useCallback(() => {
    const el = get(element, 'current', element);
    if (el) {
      setSize({ width: el.offsetWidth, height: el.offsetHeight });
    }
  }, [get(element, 'current', element)]);

  useEffect(() => {
    const debouncedUpdateSize = debounce(updateSize, RESIZE_DEBOUNCE_DELAY);

    updateSize();
    window.addEventListener('resize', debouncedUpdateSize);

    return () => {
      debouncedUpdateSize.cancel();
      window.removeEventListener('resize', debouncedUpdateSize);
    };
  }, [get(element, 'current', element)]);

  return size;
};

export default useComponentSize;
