import styled from 'styled-components';

import {
  spacer8,
  spacer24,
  spacer32,
  white,
} from '@spotify-internal/encore-web';

export const Container = styled.div`
  position: fixed;
  bottom: ${spacer24};
  right: ${spacer24};
  padding: ${spacer32};
  background-color: ${white};
  display: flex;
  align-items: center;
  border-radius: ${spacer8};
  box-shadow: 0 4px 8px rgba(24, 24, 24, 0.1);
  gap: 137px;
  z-index: 1000;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacer8};
`;
