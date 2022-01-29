// ignore-string-externalization
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  Type,
  spacer8,
  spacer12,
  spacer24,
} from '@spotify-internal/encore-web';

// eslint-disable-next-line @typescript-eslint/no-redeclare
type AttributionLine = {
  imageUrl?: string;
  text: string;
};

const AttributionLineWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${spacer12};
`;

const ArtistAvatar = styled.img`
  width: ${spacer24};
  height: ${spacer24};
  margin-right: ${spacer8};
  border-radius: 100%;
`;

const shadowStyle = {
  textShadow: 'rgba(0,0,0,0.4) 0px 1px 1px',
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export function AttributionLine({ imageUrl, text }: AttributionLine) {
  return (
    <AttributionLineWrapper>
      <ArtistAvatar src={imageUrl} />
      <Type
        as="p"
        semanticColor="textBase"
        condensed
        style={shadowStyle}
        variant={Type.body3}
        aria-hidden="true"
      >
        {text}
      </Type>
    </AttributionLineWrapper>
  );
}

AttributionLine.propTypes = {
  imageUrl: PropTypes.string,
  text: PropTypes.string.isRequired,
};
