import React from 'react';
import { LoadingIndicator, color } from '@spotify-internal/encore-web';
import styled from 'styled-components';

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${color.white};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

type Props = {
  showLoader: boolean;
};

export const LoadingOverlay = ({ showLoader }: Props) => {
  if (!showLoader) {
    return <></>;
  }
  return (
    <Overlay>
      <LoadingIndicator indicatorSize={LoadingIndicator.lg} />
    </Overlay>
  );
};
