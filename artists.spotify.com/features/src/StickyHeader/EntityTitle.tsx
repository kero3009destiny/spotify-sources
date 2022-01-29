import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { screenXsMax, gray40 } from '@spotify-internal/encore-web';

const Container = styled.div<$TSFixMe>`
  width: 100%;
  margin-bottom: ${props => (props.stickyHeader ? 0 : '4px')};
`;

const EntityType = styled.div`
  text-transform: uppercase;
  line-height: 1.33;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 700;
  font-size: 12px;

  @media (max-width: ${screenXsMax}) {
    line-height: 1.67;
  }
`;

const Title = styled.h1<$TSFixMe>`
  padding-right: 80px;
  font-size: 32px;
  font-weight: 900;
  line-height: 36px;
  letter-spacing: -0.25px;

  ${props =>
    props.stickyHeader
      ? `
      font-size: 18px;
      line-height: 1.44;
      letter-spacing: -0.3px;
    `
      : `
      font-size: 32px;
      line-height: 36px;
      letter-spacing: -0.25px;
      padding-bottom: 4px;
    `}

  @media (max-width: ${screenXsMax}) {
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: normal;
    padding-right: 16px;
  }
`;

const Byline = styled.div`
  letter-spacing: 0.3px;
  font-size: 14px;
  color: ${gray40};
  margin-bottom: 14px;

  @media (max-width: ${screenXsMax}) {
    display: none;
  }
`;

const propTypes = {
  /** Text for the entity type that appears on top, e.g. SONG, WORK, SONGWRITER */
  type: PropTypes.node,
  /** Title of the entity */
  title: PropTypes.node,
  /** Smaller gray text beneath the title, often used for the author of the entity */
  byline: PropTypes.node,
  /** Boolean triggering sticky functionality. */
  stickyHeader: PropTypes.bool,
  className: PropTypes.string,
};

export const EntityTitle = ({
  type,
  title,
  byline,
  stickyHeader,
  className,
  ...otherProps
}: $TSFixMe) => {
  return (
    <Container
      stickyHeader={stickyHeader}
      className={className}
      {...otherProps}
    >
      <EntityType>{type}</EntityType>
      <Title stickyHeader={stickyHeader}>{title}</Title>
      {!stickyHeader && <Byline>{byline}</Byline>}
    </Container>
  );
};

EntityTitle.propTypes = propTypes;
