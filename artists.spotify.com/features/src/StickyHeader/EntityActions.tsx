import React from 'react';
import styled from 'styled-components';
import { screenXsMax } from '@spotify-internal/encore-web';

const Actions = styled.div`
  @media (max-width: ${screenXsMax}) {
    display: none;
  }
`;

const ContextMenu = styled.div`
  display: none;

  @media (max-width: ${screenXsMax}) {
    display: block;
  }
`;

export const EntityActions = ({
  actions,
  className,
  contextMenu,
}: $TSFixMe) => {
  return (
    <div className={className}>
      <Actions>{actions}</Actions>
      <ContextMenu>{contextMenu}</ContextMenu>
    </div>
  );
};
