import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { Headline, Eyebrow } from 'components/atoms';
import { useAppContext } from 'contexts/app-context';
import { useTranslation } from 'i18n/nexti18n';
import { ANALYTICS_TARGET } from 'constants/js-css-classes';

import * as Styled from './Card.styled';

const HEADLINE_MAP = {
  oneUp: {
    tag: 'h2',
    styling: 'h2',
  },
  default: {
    tag: 'h6',
    styling: 'h6',
  },
};

/**
 * Card Component
 * Renders a card based on the following information provided
 * @param {Object} image Object with image src and alt, defined as url and description respectively
 * @param {String} title Title of the card
 * @param {String} eyebrow Eyebrow of the card
 * @param {String} tag Tag used to build the internal URL of the card /[tag]/[slug]
 * @param {String} slug Slug used to build the internal URL of the card /[tag]/[slug]
 * @param {String} modifier A modifier to use for style overrides.
 * @returns {ReactElement}
 */
const Card = ({ image, title, eyebrow, tag, slug, modifier, onClick }) => {
  const { t } = useTranslation();
  const [{ locale }] = useAppContext();
  const headlineProps = HEADLINE_MAP[modifier] || HEADLINE_MAP.default;
  const CardCTA =
    Styled.COMPONENT_MAP.CTA[modifier] || Styled.COMPONENT_MAP.CTA.default;

  const href = slug !== '' ? '/[locale]/[tag]/[slug]' : '/[locale]/[tag]';

  return (
    <ThemeProvider theme={{ modifier }}>
      <Styled.Cta
        href={href}
        asLink={`/${locale}/${tag}/${slug}`}
        type="textlink"
        onClick={onClick}
      >
        <Styled.Card>
          <Styled.Image
            data-src={image.url}
            aria-label={image.description || ''}
          />
          <Styled.Content>
            <Styled.EyebrowContainer>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Styled.EyebrowContainer>
            <Styled.HeadlineContainer>
              <Headline {...headlineProps}>{title}</Headline>
            </Styled.HeadlineContainer>
            <CardCTA className={ANALYTICS_TARGET}>{t('readMore')}</CardCTA>
          </Styled.Content>
        </Styled.Card>
      </Styled.Cta>
    </ThemeProvider>
  );
};

Card.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Card;
