import React from 'react';
import styled from 'styled-components';
import { screenXsMax, spacer24 } from '@spotify-internal/encore-web';

// EntityAttributeRow

const AttributeRow = styled.div`
  display: flex;

  @media (max-width: ${screenXsMax}) {
    ${'' /* hides elements without priority */} > :not([data-priority]) {
      display: none;
    }

    ${'' /* only displays first element with priority */} > [data-priority] ~ [data-priority] {
      display: none;
    }
    margin-bottom: ${spacer24};
  }
`;

export const EntityAttributeRow = ({
  children,
  className,
  ...otherProps
}: $TSFixMe) => {
  return (
    <AttributeRow className={className} {...otherProps}>
      {children}
    </AttributeRow>
  );
};
