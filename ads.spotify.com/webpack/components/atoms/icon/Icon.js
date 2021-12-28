import PropTypes from 'prop-types';
import React from 'react';

import * as Styled from './Icon.styled';

function Icon({ name, color = null, className = '' }) {
  return (
    <Styled.Icon src={`/svg/${name}.svg`} color={color} className={className} />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Icon;
