import React from 'react';
import PropTypes from 'prop-types';

import kebabCase from 'lodash/kebabCase';

import { ICONS } from 'constants/icons';
import { getLinkProps } from 'utils/get-link-props';
import { eventTrack, LINK_LIST_CTA_CLICK } from 'utils/google-tag-manager';

import * as Styled from './LinkList.styled';

const onClickCta = event => eventTrack(LINK_LIST_CTA_CLICK, { event });

/**
 * Creates a list of links.
 * @param {string|null} className The component class name.
 * @param {string} eyebrow The component eyebrow.
 * @param {Array} links The component links. Composed by title and url.
 * @returns {ReactElement}
 */
const LinkList = ({ className = null, eyebrow, links }) => (
  <Styled.LinkList className={className}>
    <Styled.Content>
      {eyebrow && <Styled.Eyebrow>{eyebrow}</Styled.Eyebrow>}
      {links.map(({ sys, title, url }) => {
        const ctaProps = getLinkProps(url);

        return (
          <Styled.Cta
            key={kebabCase(`${sys.id} ${title}`)}
            {...ctaProps}
            onClick={onClickCta}
          >
            <Styled.Title>{title}</Styled.Title>
            <Styled.Arrow name={ICONS.ARROW} />
          </Styled.Cta>
        );
      })}
    </Styled.Content>
  </Styled.LinkList>
);

LinkList.propTypes = {
  /**
   * Default className prop.
   */
  className: PropTypes.string,
  /**
   * The component eyebrow.
   */
  eyebrow: PropTypes.string,
  /**
   * The component links. Composed by title and url.
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      sys: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default LinkList;
