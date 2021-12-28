import PropTypes from 'prop-types';
import React from 'react';

import reverse from 'lodash/reverse';
import get from 'lodash/get';

import { getScaledImageUrl } from 'utils/get-scaled-image-url';
import { IMG_DIMENSIONS } from 'constants/image-attributes';
import { minBreakpoints } from 'styles/variables';

import * as Styled from './ResponsiveImage.styled';

/**
 * Creates a 2x size asset (if only one provided) from the original
 * `srcset` array.
 * @param {Array} srcset The `srcset` param passed from `ResponsiveImage`.
 * @returns {Object}
 */
const getHiResDimensions = srcset => {
  const [{ w, h = w }] = srcset;

  return { w: w * 2, h: h * 2 };
};

const getAugmentedSrcSet = ({ picture, srcset }) => {
  if (picture) {
    const { sm, lg, xl } = get(picture, 'sizes') || {};
    const queryUrl = get(picture, 'queryUrl') || 'url';

    return [
      {
        ...IMG_DIMENSIONS[0],
        minWidth: minBreakpoints.xs,
        src: get(sm, `[${queryUrl}]`) || get(lg, `[${queryUrl}]`),
      },
      {
        ...IMG_DIMENSIONS[1],
        minWidth: minBreakpoints.lg,
        src: get(lg, `[${queryUrl}]`),
      },
      ...(xl
        ? [
            {
              ...IMG_DIMENSIONS[1],
              minWidth: minBreakpoints.xxl,
              src: get(xl, `[${queryUrl}]`),
            },
          ]
        : []),
    ];
  }

  return srcset.length < 2 ? [...srcset, getHiResDimensions(srcset)] : srcset;
};

/**
 * Generates an `img` element with a `srcset` value of 1x and 2x image URLs
 * through Contentful's Images API:
 * https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/specify-width-&-height
 * (defaults to two 4:3 ratio image URLs).
 *
 * eg usage:
 * <ResponsiveImage
 *    src={'path/to/image'}
 *    alt={'Some alt text'}
 *    srcset={[{ w: 200, h: 150 }]} />
 *
 * @param {string} src The image src attribute.
 * @param {string} alt The image alt attribute.
 * @param {Array} srcset An array of objects with width/height properties to
 *    populate the `srcset` attribute. If a height is not provided, the width
 *    will be used as a 1:1 ratio. Defaults to 4:3 aspect ratio at two sizes.
 * @param {string} aspectRatio A string to define what aspect ratio should use
 *    The values are tied to values created in the CMS 4:3 / Free
 * @param {object} picture The picture image data
 * @returns {ReactElement}
 */
const ResponsiveImage = ({
  src,
  alt,
  srcset = IMG_DIMENSIONS,
  className = null,
  aspectRatio,
  picture = null,
}) => {
  const { sm, lg, xl } = get(picture, 'sizes') || {};
  const augmentedSrcSet = getAugmentedSrcSet({ picture, srcset });
  const [smallRes] = augmentedSrcSet;
  const defaultImage = getScaledImageUrl(
    smallRes.src || src,
    {
      w: smallRes.w,
      h: smallRes.h || smallRes.w,
    },
    aspectRatio,
  );

  // if Picture is set and there is at least another image set than the required lg image
  return picture && (sm || xl) ? (
    <Styled.Picture>
      {reverse([...augmentedSrcSet]).map(val => (
        <Styled.Source
          key={val.minWidth}
          srcSet={getScaledImageUrl(
            val.src || src,
            { w: val.w, h: val.h || val.w },
            aspectRatio,
          )}
          media={`(min-width: ${val.minWidth}px)`}
        />
      ))}
      <Styled.ResponsiveImage
        className={className}
        src={defaultImage}
        alt={alt || get(lg, 'description') || ''}
      />
    </Styled.Picture>
  ) : (
    <Styled.ResponsiveImage
      src={defaultImage}
      srcSet={augmentedSrcSet
        .map(
          val =>
            `${getScaledImageUrl(
              val.src || src,
              { w: val.w, h: val.h || val.w },
              aspectRatio,
            )} ${val.w}w`,
        )
        .join(', ')}
      alt={alt || get(lg, 'description') || ''}
      className={className}
    />
  );
};

ResponsiveImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  srcset: PropTypes.arrayOf(
    PropTypes.shape({
      w: PropTypes.number.isRequired,
      h: PropTypes.number,
    }),
  ),
  aspectRatio: PropTypes.string,
  picture: PropTypes.shape({}),
};

export default ResponsiveImage;
