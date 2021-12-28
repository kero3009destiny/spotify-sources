import React, { useState } from 'react';
import PropTypes, { any } from 'prop-types';
import { ThemeProvider } from 'styled-components';

import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import { getLinkProps } from 'utils/get-link-props';
import { useImageSupport } from 'utils/use-image-support';

import * as Styled from './InlineCard.styled';

/**
 * Inline Card Component
 * @param {string|null} className The component class name.
 * @param {string} description The component description.
 * @param {string} eyebrow The component eyebrow.
 * @param {object} image The component image, composed by the url and description.
 * @param {string} title The component title.
 * @param {Array} ctasCollection.items - A list of CTAs
 * @returns {ReactElement}
 */
const InlineCard = ({
  className = null,
  description,
  eyebrow = '',
  image = null,
  title,
  ctasCollection,
}) => {
  const { queryUrl } = useImageSupport();
  const hasImage = !!image;
  const ctaItems = get(ctasCollection, 'items', []);
  const [sharedData] = useState({ hasImage });

  return (
    <ThemeProvider theme={sharedData}>
      <Styled.InlineCard className={className}>
        <Styled.Container>
          {hasImage && (
            <Styled.Image data-src={image[queryUrl]} alt={image.description} />
          )}
          <Styled.Content>
            <Styled.HeadlineContainer tabIndex={0}>
              {eyebrow && <Styled.TitleEyebrow>{eyebrow}</Styled.TitleEyebrow>}
              <Styled.Title>{title}</Styled.Title>
            </Styled.HeadlineContainer>
            <Styled.DescriptionContainer tabIndex={0}>
              <Styled.Markdown body={description} />
              <Styled.CtasContainer>
                {ctaItems.map(
                  (
                    { title: ctaTitle, url, type, overrideFunctionality },
                    index,
                  ) => {
                    const { href, asLink } = getLinkProps(url);

                    return (
                      <Styled.Cta
                        key={kebabCase(`${ctaTitle}-${index}`)}
                        type={type}
                        overrideFunctionality={overrideFunctionality}
                        href={href}
                        asLink={asLink}
                      >
                        {ctaTitle}
                      </Styled.Cta>
                    );
                  },
                )}
              </Styled.CtasContainer>
            </Styled.DescriptionContainer>
          </Styled.Content>
        </Styled.Container>
      </Styled.InlineCard>
    </ThemeProvider>
  );
};

InlineCard.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The component description.
   */
  description: PropTypes.string.isRequired,
  /**
   * The component eyebrow.
   */
  eyebrow: PropTypes.string,
  /**
   * The component image, composed by the url and description.
   */
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    webpUrl: PropTypes.string.isRequired,
    optimizedUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  /**
   * The component title.
   */
  title: PropTypes.string.isRequired,
  /*
   * A list of CTAs
   */
  ctasCollection: PropTypes.shape({
    items: PropTypes.arrayOf(any),
  }),
};

export default InlineCard;
