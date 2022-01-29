import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  width: inherit;
  height: inherit;
`;

const propTypes = {
  /** Image source value */
  src: PropTypes.string,
  className: PropTypes.string,
};

export const EntityImage: React.FunctionComponent<$TSFixMe> = ({
  src,
  className,
  ...otherProps
}) => {
  return <Image className={className} src={src} {...otherProps} />;
};

EntityImage.propTypes = propTypes;
