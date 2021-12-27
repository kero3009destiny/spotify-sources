export const smoothScrollTo = (
  x: number,
  y: number,
  smooth: boolean = true,
): void => {
  try {
    return window.scrollTo({
      left: x,
      top: y,
      behavior: smooth ? 'smooth' : 'auto',
    });
  } catch (e) {
    return window.scrollTo(x, y);
  }
};
