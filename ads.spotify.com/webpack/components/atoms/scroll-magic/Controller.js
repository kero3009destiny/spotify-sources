import React, { createContext, useEffect, useState } from 'react';

import debounce from 'lodash/debounce';

import { getPrevScreenSize } from 'utils/get-prev-screen-size';

export const ScrollMagicContext = createContext();

const RESIZE_DEBOUNCE_DELAY = 250;

/**
 * Controller Provider
 */
const Controller = ({
  children = null,
  vertical = true,
  refreshInterval = 100,
  globalSceneOptions = {},
}) => {
  const [controller, setController] = useState(null);

  useEffect(() => {
    /* eslint-disable-next-line no-undef */
    const newController = new ScrollMagic.Controller({
      vertical,
      refreshInterval,
      globalSceneOptions,
      addIndicators: true,
    });

    setController(newController);

    return () => {
      newController.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (!controller) return undefined;

    const onReSize = getPrevScreenSize((_, { isMobileDevice, hasRotated }) => {
      if (!isMobileDevice || hasRotated) {
        controller.destroy(true);
        /* eslint-disable-next-line no-undef */
        const newController = new ScrollMagic.Controller({
          vertical,
          refreshInterval,
          globalSceneOptions,
          addIndicators: true,
        });

        setController(newController);
      }
    });
    const debounceOnReSize = debounce(onReSize, RESIZE_DEBOUNCE_DELAY);

    window.addEventListener('resize', debounceOnReSize);

    return () => {
      debounceOnReSize.cancel();
      window.removeEventListener('resize', debounceOnReSize);
    };
  }, [controller]);

  return (
    <ScrollMagicContext.Provider value={controller}>
      {children}
    </ScrollMagicContext.Provider>
  );
};

export default Controller;
