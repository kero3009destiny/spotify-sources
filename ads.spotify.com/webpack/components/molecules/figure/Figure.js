import React from 'react';
import PropTypes, { any } from 'prop-types';

import values from 'lodash/values';

import { useImageSupport } from 'utils/use-image-support';

import { ResponsiveImage } from 'components/atoms/responsive-image';

import * as Styled from './Figure.styled';

const FIGURE_TYPES = {
  IMAGE: 'image',
};

/**
 * Renders ResponsiveImage/caption elements for a parent figure element.
 * @param {Object} data An object payload to populate the component.
 * @returns {ReactElement}
 */
const renderImageContent = data => {
  const { queryUrl, fileExt } = useImageSupport();
  const {
    image: { [queryUrl]: imageUrl, description: imageAlt },
    caption,
    aspectRatio,
  } = data;

  return (
    <>
      {fileExt && (
        <ResponsiveImage
          aspectRatio={aspectRatio}
          src={imageUrl}
          alt={imageAlt}
        />
      )}
      {caption && <Styled.FigCaption>{caption}</Styled.FigCaption>}
    </>
  );
};

/**
 * Renders a figure element with configurable content.
 * @param {Object} data An object payload to populate the component.
 * @param {string} type The type of figure content to render.
 * @param {string} pageContext Page context (eg. PageDetail).
 * @param {string} className The component class name.
 * @returns {ReactElement}
 */
const Figure = ({ data, type, pageContext = '', className = null }) => {
  if (!values(FIGURE_TYPES).includes(type))
    throw new Error(`${type} is not a valid Figure type.`);

  let figureComponent;

  switch (type) {
    case FIGURE_TYPES.IMAGE:
      figureComponent = renderImageContent(data);
      break;
    default:
      throw new Error('No figure component defined.');
  }

  return (
    <Styled.FigureWrapper modifier={pageContext}>
      <Styled.Figure className={className} modifier={pageContext}>
        {figureComponent}
      </Styled.Figure>
    </Styled.FigureWrapper>
  );
};

Figure.propTypes = {
  data: PropTypes.objectOf(any).isRequired,
  type: PropTypes.string.isRequired,
  pageContext: PropTypes.string,
  className: PropTypes.string,
};

export default Figure;
