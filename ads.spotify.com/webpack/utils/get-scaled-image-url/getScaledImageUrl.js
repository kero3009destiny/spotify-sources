import { queryStringDelimiter } from 'utils/query-string-delimiter';
import { IMG_SCALE, IMG_ASPECT_RATIO } from 'constants/image-attributes';

/**
 * Constructs Contentful image API URL with provided variables.
 * @param {string} src A String with the url that will be add query params
 * @param {Object} query {w,h}
 * @param {number} query.w - The desired width of the image in pixels
 * @param {number} query.h - The desired height of the image in pixels
 * @param {string} aspectRatio A string to define what aspect ratio should use
 * @returns {string} the new path with query params
 */
const getScaledImageUrl = (
  src,
  query = {},
  aspectRatio = IMG_ASPECT_RATIO.FOUR_THREE,
) => {
  const { w, h } = query;

  const dimensions = {
    [IMG_ASPECT_RATIO.FOUR_THREE]: `${w ? `&w=${w}` : ''}${h ? `&h=${h}` : ''}`,
    [IMG_ASPECT_RATIO.FREE]: `${w ? `&w=${w}` : ''}`,
  };

  return `${queryStringDelimiter(src)}fit=${IMG_SCALE}${dimensions[
    aspectRatio
  ] || dimensions[IMG_ASPECT_RATIO.FOUR_THREE]}`;
};

export default getScaledImageUrl;
