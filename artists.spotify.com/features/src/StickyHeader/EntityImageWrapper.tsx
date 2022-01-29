import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spacer16, spacer32, screenXsMax } from '@spotify-internal/encore-web';

const Wrapper = styled.div<$TSFixMe>`
  ${props =>
    props.stickyHeader
      ? `
    height: 56px;
    width: 56px;
  `
      : `
    height: 136px;
    width: 136px;
  `};

  ${props =>
    props.isCircle &&
    `
    border-radius: 50%;
    overflow: hidden;
  `};

  margin-right: ${({ stickyHeader }) => (stickyHeader ? spacer16 : spacer32)};

  @media (max-width: ${screenXsMax}) {
    width: 56px;
    height: 56px;
    margin-right: 16px;
  }
`;

const propTypes = {
  /** Determines if cover image is a isCircle. Default shape is a square. */
  isCircle: PropTypes.bool,
  children: PropTypes.node,
  /** Updates image's styling for the sticky header. */
  stickyHeader: PropTypes.bool,
  className: PropTypes.string,
};

export const EntityImageWrapper: React.FunctionComponent<$TSFixMe> = ({
  isCircle,
  children,
  stickyHeader,
  className,
  ...otherProps
}) => {
  return (
    <Wrapper
      isCircle={isCircle}
      stickyHeader={stickyHeader}
      className={className}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
};

EntityImageWrapper.propTypes = propTypes;
