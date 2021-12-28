import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Cta,
  Eyebrow,
  Headline,
  Paragraph,
  ResponsiveImage,
} from 'components/atoms';
import { eventTrack, CATALOG_CTA_CLICK } from 'utils/google-tag-manager';
import { getLinkProps } from 'utils/get-link-props';
import { useImageSupport } from 'utils/use-image-support';
import * as CommonTypes from 'constants/common-proptypes';

import * as Styled from './CatalogEntry.styled';

/**
 * Catalog Entry: Entries of Catalog Module
 * @param {string} title Component title
 * @param {string} description Component description
 * @param {string} eyebrow Component eyebrow
 * @param {object} cta The CTA entry
 * @param {Object} image Component image, object with url and description of the image
 * @param {string|null} className The component class name.
 * @param {string} groupTitle The parent group title
 * @returns {ReactElement}
 */
const CatalogEntry = ({
  title,
  description,
  eyebrow,
  cta,
  image,
  className = null,
  groupTitle,
}) => {
  const { queryUrl, fileExt } = useImageSupport();

  const onCtaClick = useCallback(
    event => {
      eventTrack(CATALOG_CTA_CLICK, {
        event,
        groupTitle,
        title,
        eyebrow,
      });
    },
    [title, eyebrow, groupTitle],
  );

  return (
    <Styled.Entry className={className}>
      <Styled.ImageContainer>
        {fileExt && (
          <ResponsiveImage src={image[queryUrl]} alt={image.description} />
        )}
      </Styled.ImageContainer>
      <Styled.Content>
        {eyebrow && (
          <Styled.EyebrowContainer>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Styled.EyebrowContainer>
        )}
        <Styled.HeadlineContainer>
          <Headline tag="h3" styling="h2">
            {title}
          </Headline>
        </Styled.HeadlineContainer>
        <Styled.ParagraphContainer>
          <Paragraph>{description}</Paragraph>
        </Styled.ParagraphContainer>
        {cta && (
          <Cta
            {...getLinkProps(cta.url)}
            type={cta.type}
            overrideFunctionality={cta.overrideFunctionality}
            onClick={onCtaClick}
          >
            {cta.title}
          </Cta>
        )}
      </Styled.Content>
    </Styled.Entry>
  );
};

CatalogEntry.propTypes = {
  /**
   * Component title
   */
  title: PropTypes.string.isRequired,
  /**
   * Component description
   */
  description: PropTypes.string.isRequired,
  /**
   * Component eyebrow
   */
  eyebrow: PropTypes.string,
  /**
   * Component url
   */
  url: PropTypes.string,
  /**
   * The CTA entry
   */
  cta: CommonTypes.Cta.isRequired,
  /**
   * Component image, object with url and description of the image
   */
  image: PropTypes.shape({
    /**
     * Image url
     */
    url: PropTypes.string.isRequired,
    /**
     * Asset wepp url
     */
    webpUrl: PropTypes.string.isRequired,
    /**
     * Asset optimized url
     */
    optimizedUrl: PropTypes.string.isRequired,
    /**
     * Image description
     */
    description: PropTypes.string,
  }).isRequired,
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The parent group title
   */
  groupTitle: PropTypes.string,
};

export default CatalogEntry;
