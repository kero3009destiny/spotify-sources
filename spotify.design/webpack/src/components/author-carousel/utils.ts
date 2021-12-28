export const CAROUSEL_SETTINGS = {
  slidesPerView: 'auto',
  roundLengths: true,
  loop: false,
  grabCursor: true,
  allowTouchMove: true,
  spaceBetween: 24,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  breakpoints: {
    1024: {
      spaceBetween: 128,
    },
    601: {
      spaceBetween: 48,
    },
  },
};
