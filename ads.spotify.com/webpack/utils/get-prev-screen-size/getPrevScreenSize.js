/**
 * Decorates an event callback with extra screen data arguments
 * @param {Function} fn - The function to decorate
 * @returns {Function}
 */
export const getPrevScreenSize = fn => {
  let prevWidth = window.innerWidth;
  let prevHeight = window.innerHeight;
  let prevLandscape = window.matchMedia('(orientation: landscape)').matches;
  const isMobileDevice =
    navigator.userAgent.toLowerCase().indexOf('mobile') > -1;

  return event => {
    const nextLandscape = window.matchMedia('(orientation: landscape)').matches;

    fn(event, {
      prevWidth,
      prevHeight,
      hasRotated: prevLandscape !== nextLandscape,
      isMobileDevice,
    });
    prevWidth = window.innerWidth;
    prevHeight = window.innerHeight;
    prevLandscape = nextLandscape;
  };
};

export default getPrevScreenSize;
