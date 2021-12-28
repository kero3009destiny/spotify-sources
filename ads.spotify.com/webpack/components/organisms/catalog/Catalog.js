import React from 'react';
import PropTypes, { any } from 'prop-types';

import { Headline } from 'components/atoms';
import { CatalogEntry } from 'components/molecules';

import * as Styled from './Catalog.styled';

/**
 * Catalog Module: List of Catalog Entries
 * @param {string} title Component title
 * @param {Array} entries Catalog Entries list
 * @param {string|null} className The component class name.
 * @returns {ReactElement}
 */
const Catalog = ({ title, entries, className = null }) => {
  return (
    <Styled.Catalog className={className}>
      <Headline tag="h2" styling="h1">
        {title}
      </Headline>
      <Styled.HorizontalRule />
      {entries.map(entry => (
        <CatalogEntry
          key={entry.sys.id}
          title={entry.title}
          description={entry.description}
          eyebrow={entry.eyebrow}
          url={entry.url}
          cta={entry.cta}
          image={entry.image}
          groupTitle={title}
        />
      ))}
    </Styled.Catalog>
  );
};

Catalog.propTypes = {
  /**
   * Component title
   */
  title: PropTypes.string.isRequired,
  /**
   * Catalog Entries list
   */
  entries: PropTypes.arrayOf(any).isRequired,
  /**
   * Default className prop
   */
  className: PropTypes.string,
};

export default Catalog;
