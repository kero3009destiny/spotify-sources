import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';

import { colors } from 'styles/variables';

import * as Styled from './CuratedListGroup.styled';

/**
 * CuratedListGroup Component
 * @param {Array} items - The list of items to be rendered
 * @returns {ReactElement}
 */
const CuratedListGroup = ({ items = [] }) => (
  <Styled.Container>
    {items.map((data, index) => (
      <Styled.CuratedList
        key={get(data, 'sys.id', `cl-${index}`)}
        data={data}
        backgroundColor={colors.grey800}
      />
    ))}
  </Styled.Container>
);

CuratedListGroup.propTypes = {
  /**
   * The list of items to be rendered
   */
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default CuratedListGroup;
