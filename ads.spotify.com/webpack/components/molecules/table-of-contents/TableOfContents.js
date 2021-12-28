import React from 'react';
import PropTypes, { any } from 'prop-types';

import { Recirculation } from 'components/molecules/recirculation';
import { Icon } from 'components/atoms';
import { ICONS } from 'constants/icons';
import * as Styled from './TableOfContents.styled';

/**
 * Table Of Contents
 * @param {Object} data A `Recirculation Module` data object, from Contentful.
 * @param {Function} onClose - on click handler close button
 * @returns {ReactElement}
 */
const TableOfContents = ({ data, onClose }) => {
  return (
    <Styled.Root>
      <Styled.Container>
        <Styled.RecirculationWrapper>
          <Recirculation data={data} />
        </Styled.RecirculationWrapper>
        <Styled.CtaCloseWrapper>
          <Styled.CtaClose onClick={onClose}>
            <Icon name={ICONS.ROUND_CLOSE} />
          </Styled.CtaClose>
        </Styled.CtaCloseWrapper>
      </Styled.Container>
    </Styled.Root>
  );
};

TableOfContents.propTypes = {
  /**
   * Recirculation data
   */
  data: PropTypes.objectOf(any).isRequired,
  /**
   * OnClose function
   */
  onClose: PropTypes.func.isRequired,
};

export default TableOfContents;
