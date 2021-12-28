import { createContext } from 'react';

/**
 * References the intro context.
 * @returns {Object} { withHeight, withIntro }.
 */
const IntroContext = createContext({
  withHeight: false,
  withIntro: false,
});

export default IntroContext;
