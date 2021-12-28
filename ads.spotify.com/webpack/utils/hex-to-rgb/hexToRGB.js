const FULL_LENGTH = 6;

/**
 * Converts an hexadecimal color to rgb
 * @param {string} hexArg - The hexadecimal to convert
 * @param {number} alpha - Defines the opacity
 * @returns {string}
 */
const hexToRGB = (hexArg = '', alpha) => {
  const v = hexArg.slice(1);
  const hex =
    v.length === FULL_LENGTH
      ? hexArg
      : `${v[0]}${v[0]}${v[1]}${v[1]}${v[2]}${v[2]}`;
  const [r, g, b] = (hex.match(/\w\w/g) || []).map(x => parseInt(x, 16));

  return typeof alpha === 'number'
    ? `rgba(${r},${g},${b},${alpha})`
    : `rgb(${r},${g},${b})`;
};

export default hexToRGB;
