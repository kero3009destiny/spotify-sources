import bowser from 'bowser';

export const getIsMobile = () => bowser.mobile;
export const getIsTablet = () => bowser.tablet;
export const getIsMobileDevice = () => getIsMobile() || getIsTablet();
