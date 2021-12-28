import React from 'react';
import PropTypes, { any } from 'prop-types';

import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import {
  getMultiCtaAction,
  eventTrack,
  MULTI_CTA_CLICK,
  MODULES_MULTI_CTA,
} from 'utils/google-tag-manager';
import { getLinkProps } from 'utils/get-link-props';
import { Headline, Paragraph } from 'components/atoms';
import { Markdown } from 'components/molecules';

import * as Styled from './KeyPoints.styled';

/**
 * Key Points Component.
 * @param {string|null} className The component class name.
 * @param {string} title The component title.
 * @param {string} description The component description.
 * @param {string} bodyText The string for Markdown.
 * @param {Array} props.ctasCollection.items - A list of CTAs
 * @returns {ReactElement}
 */
const KeyPoints = props => {
  const {
    className = null,
    title,
    description,
    bodyText,
    ctasCollection,
  } = props;
  const ctaItems = get(ctasCollection, 'items', []);

  return (
    <Styled.KeyPoints className={className}>
      <Styled.Content>
        <Styled.HeadlineContainer>
          <Headline tag="h2" styling="h2">
            {title}
          </Headline>
        </Styled.HeadlineContainer>
        <Styled.ParagraphContainer>
          <Paragraph>{description}</Paragraph>
        </Styled.ParagraphContainer>
        {ctaItems.map(
          ({ title: ctaTitle, url, type, overrideFunctionality }, index) => {
            const { href, asLink } = getLinkProps(url);
            const ctaClickTrack = event => {
              const { isModalFormOpen } = get(event, 'data', {});
              const actionText = getMultiCtaAction(
                { overrideFunctionality, url },
                isModalFormOpen,
              );

              eventTrack(MULTI_CTA_CLICK, {
                event,
                module: MODULES_MULTI_CTA.keyPoints,
                actionText,
                headerText: title,
              });
            };

            return (
              <Styled.Cta
                key={kebabCase(`${ctaTitle}-${index}`)}
                type={type}
                overrideFunctionality={overrideFunctionality}
                href={href}
                asLink={asLink}
                onClick={ctaClickTrack}
              >
                {ctaTitle}
              </Styled.Cta>
            );
          },
        )}
      </Styled.Content>
      {bodyText && (
        <Styled.Body>
          <Markdown body={bodyText} />
        </Styled.Body>
      )}
    </Styled.KeyPoints>
  );
};

KeyPoints.propTypes = {
  /**
   * The component class name.
   */
  className: PropTypes.string,
  /**
   * The component title.
   */
  title: PropTypes.string.isRequired,
  /**
   * The component description.
   */
  description: PropTypes.string.isRequired,
  /**
   * The string for Markdown.
   */
  bodyText: PropTypes.string,
  /*
   * A list of CTAs
   */
  ctasCollection: PropTypes.shape({
    items: PropTypes.arrayOf(any),
  }),
};

export default KeyPoints;
