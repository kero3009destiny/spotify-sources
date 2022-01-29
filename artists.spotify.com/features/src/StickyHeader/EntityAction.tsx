import React from 'react';
import styled from 'styled-components';
import { black, Type } from '@spotify-internal/encore-web';

// EntityAction

const Entry = styled.div`
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;

    p {
      color: ${black};
    }

    svg {
      stroke: ${black};

      * {
        stroke: ${black};
      }
    }
  }
`;

export const EntityAction = ({
  text,
  icon,
  action,
  className,
  ...otherProps
}: $TSFixMe) => {
  return (
    <Entry onClick={action} className={className} {...otherProps}>
      <Type as="p" variant={Type.cta3} color="gray45" weight="bold">
        {text}
      </Type>
      {icon}
    </Entry>
  );
};
