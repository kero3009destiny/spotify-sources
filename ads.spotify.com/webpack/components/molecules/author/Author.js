import PropTypes from 'prop-types';
import React from 'react';

import { useTranslation } from 'i18n/nexti18n';

import * as Styled from './Author.styled';

/**
 * Renders an author name and role.
 * @param {string} name The author's name.
 * @param {string} role The author's role.
 * @param {string} className The className ref.
 */
const Author = ({ name = null, role = null, className = null }) => {
  const { t } = useTranslation();

  return (
    <Styled.Container className={className}>
      {name && (
        <>
          <span>{t('writtenBy')}</span>
          <Styled.Info>{name}</Styled.Info>
        </>
      )}
      {role && <Styled.Info>{role}</Styled.Info>}
    </Styled.Container>
  );
};

export const AuthorPropTypes = {
  /**
   * Author name.
   */
  name: PropTypes.string,
  /**
   * Optional author role.
   */
  role: PropTypes.string,
  /**
   * The className ref.
   */
  className: PropTypes.string,
};

Author.propTypes = AuthorPropTypes;

export default Author;
