import React from 'react';
import styled from 'styled-components';
import { screenXsMax, screenMdMax } from '@spotify-internal/encore-web';

const AttributePair = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  margin-right: 80px;

  @media (max-width: ${screenMdMax}) {
    margin-right: 48px;
  }

  @media (max-width: ${screenXsMax}) {
    align-items: start;
  }
`;

const AttributeText = styled.div`
  display: inline-block;
  text-transform: uppercase;
  line-height: 1.33;
  letter-spacing: 1px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.4);

  @media (max-width: ${screenXsMax}) {
    margin-right: 12px;
  }
`;

const Label = styled(AttributeText)`
  margin-bottom: 4px;

  @media (max-width: ${screenXsMax}) {
    margin-bottom: 0;
  }
`;

const Value = styled(AttributeText)`
  letter-spacing: 0.3px;
  line-height: 1.43;
  font-size: 14px;
  color: black;
`;

export const EntityAttribute = ({
  label,
  value,
  hasPriority,
  className,
  ...otherProps
}: $TSFixMe) => {
  return (
    <AttributePair
      data-priority={hasPriority}
      className={className}
      {...otherProps}
    >
      <Label>{label}</Label>
      <Value>{value || '-'}</Value>
    </AttributePair>
  );
};
