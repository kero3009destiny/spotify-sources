import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/atoms';
import { ICONS } from 'constants/icons';
import { useTranslation } from 'i18n/nexti18n';

import * as Styled from './Banner.styled';

/**
 * Renders a Banner Component. Displayed until dismissed by a user.
 * Once accepted/dismissed, a cookie is set hiding the component from rendering
 * on subsequent page views.
 * @param {string|null} className The component class name.
 * @param {object} children - React children reference
 * @param {function} onClose -  function to handle close banner
 * @returns {ReactElement}
 */
const Banner = ({ className = null, onClose = () => {}, children = null }) => {
  const { t } = useTranslation();

  return (
    <Styled.Banner className={className}>
      <Styled.Content>
        <Styled.Copy>{children}</Styled.Copy>
        <Styled.Close onClick={onClose} aria-label={t('close')}>
          <Icon name={ICONS.CLOSE_MARK} />
        </Styled.Close>
      </Styled.Content>
    </Styled.Banner>
  );
};

Banner.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The nodes to be rendered
   */
  children: PropTypes.node,
  /**
   * on close handler
   */
  onClose: PropTypes.func,
};

export default Banner;
