import React from 'react';
import styled from 'styled-components';

import { PacingMeter } from '@spotify-internal/encore-web/advertising/components/PacingMeter';

import { pacingMeterProps } from 'utils/pacingUtils';

import { FlightsCatalogueEntity } from 'types/common/state/api/flights';

const PacingContainer = styled.div`
  width: 146px;
`;

interface FlightPacingProps {
  flightRow: FlightsCatalogueEntity;
}

const FlightPacing = ({ flightRow }: FlightPacingProps) => {
  const props = pacingMeterProps(flightRow.pacing);

  return (
    <PacingContainer>
      <PacingMeter {...props} showPercentageInline />
    </PacingContainer>
  );
};

export default FlightPacing;
