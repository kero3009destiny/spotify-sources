import React from 'react';
import styled from 'styled-components';
import { ButtonTertiary } from '@spotify-internal/encore-web';
import '@spotify-internal/encore-web/css/encore-dark-theme.css';

const HeaderButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderButton = styled(ButtonTertiary)`
  cursor: pointer;
`;

export const HeaderButtons = () => (
  <HeaderButtonsContainer className="encore-dark-theme">
    <HeaderButton>Help</HeaderButton>
    <HeaderButton>Logout</HeaderButton>
  </HeaderButtonsContainer>
);
