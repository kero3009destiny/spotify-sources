import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';

import { ICONS } from 'constants/icons';
import { colors } from 'styles/variables';
import { getValidProps } from 'utils/get-valid-props';
import { useTranslation } from 'i18n/nexti18n';

import * as Styled from './SocialIcons.styled';

const defaultSocialIcons = [
  {
    name: ICONS.FACEBOOK,
    ariaLabel: 'shareOnFacebook',
  },
  {
    name: ICONS.TWITTER,
    ariaLabel: 'tweet',
  },
  {
    name: ICONS.LINKEDIN,
    ariaLabel: 'shareOnLinkedin',
  },
];

const getSharedData = (currentUrl, documentTitle) => ({
  [ICONS.FACEBOOK]: {
    size: { width: 500, height: 600 },
    url: `http://www.facebook.com/sharer.php?display=popup&u=${currentUrl}`,
  },
  [ICONS.TWITTER]: {
    size: { width: 500, height: 310 },
    url: `http://twitter.com/share?text=${documentTitle}&url=${currentUrl}`,
  },
  [ICONS.LINKEDIN]: {
    size: { width: 950, height: 700 },
    url: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${documentTitle}`,
  },
});

/**
 * Renders a list of social icons
 * @param {Array} icons array of icon objects:
 * @param {String} icons[].name icon name for the Icon component
 * @param {String} icons[].color icon color
 * @param {String} icons[].link icon link
 * @param {String} icons[].target icon target attribute
 * @param {String} icons[].ariaLabel Label for screen readers
 * @param {String} icons[].tag HTML tag
 * @param {String} icons[].rel Icon link rel attribute
 * @param {String} theme styled component name for the wrapper
 * @param {String} className The css class name
 * @param {Function} onClick The on click listener for social icons
 */
const SocialIcons = ({
  icons = defaultSocialIcons,
  theme = 'Default',
  className,
  onClick = () => {},
}) => {
  const { t } = useTranslation();
  const SocialIconsWrapper = Styled[theme] || Styled.Default;
  const [title, setTitle] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setTitle(encodeURIComponent(window.document.title));
    setCurrentUrl(encodeURIComponent(window.location.href));
  }, []);

  const shareContent = networkName => {
    const sharedData = getSharedData(currentUrl, title);
    const network = sharedData[networkName];
    const popup = window.open(
      network.url,
      'spotify',
      `width=${network.size.width},height=${network.size.height},scrollbars=1,location=0,menubar=0,resizable=0,status=0,toolbar=0`,
    );

    popup.focus();
  };

  /**
   * Handles the click event for the social icons
   * @param {Object} event Event object
   * @param {string} event.currentTarget event target
   */
  const handleIconClick = event => {
    if (get(event, 'currentTarget.tagName', '').toLowerCase() === 'button') {
      shareContent(get(event, 'currentTarget.dataset.name', ''));
    }

    onClick(event);
  };

  return (
    <SocialIconsWrapper className={className}>
      {icons.map(icon => {
        const iconOptionalProps = getValidProps({
          href: icon.link,
          target: icon.target,
          rel: icon.rel,
        });

        return (
          <li key={icon.name}>
            <Styled.IconContainer
              as={icon.tag}
              onClick={handleIconClick}
              aria-label={t(icon.ariaLabel)}
              data-name={icon.name}
              {...iconOptionalProps}
            >
              <Styled.SocialIcon
                name={icon.name.toLowerCase()}
                color={icon.color || colors.black}
              />
            </Styled.IconContainer>
          </li>
        );
      })}
    </SocialIconsWrapper>
  );
};

SocialIcons.propTypes = {
  /**
   * Array of icons
   */
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * icon name for the Icon component
       */
      name: PropTypes.string.isRequired,
      /**
       * icon color
       */
      color: PropTypes.string,
      /**
       * icon link
       */
      link: PropTypes.string,
      /**
       * Icon target attribute
       */
      target: PropTypes.string,
      /**
       * Label for screen readers
       */
      ariaLabel: PropTypes.string.isRequired,
      /**
       * HTML tag
       */
      tag: PropTypes.string,
      /**
       * Icon link rel attribute
       */
      rel: PropTypes.string,
    }),
  ),
  /**
   * Component variant
   */
  theme: PropTypes.oneOf(Styled.validWrappers),
  /**
   * The css class name
   */
  className: PropTypes.string,
  /**
   * The on click listener for social icons
   */
  onClick: PropTypes.func,
};

export default SocialIcons;
