import { REDUCED_MOTION_MEDIA_QUERY } from '../constants';

export function scrollToDestination(destination: number) {
  if (typeof window !== 'undefined') {
    const supportsNativeSmoothScroll =
      'scrollBehavior' in document.documentElement.style;

    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_MEDIA_QUERY)
      .matches;

    if (supportsNativeSmoothScroll && !prefersReducedMotion) {
      window.scrollTo({
        top: destination,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, destination);
    }
  }
}
