import styled from 'styled-components';

import { plum } from '@spotify-internal/encore-advertising-web/cjs/styles/colors';
import {
  ButtonIcon,
  gray80,
  spacer8,
  spacer16,
  spacer24,
} from '@spotify-internal/encore-web';

export const ActionBarContainer = styled.div`
  background-color: ${plum};
  padding: ${spacer16} ${spacer24};
  display: flex;
  border-radius: ${spacer16};
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  gap: ${spacer24};
  position: fixed;
  top: calc(100% - 200px);
  left: calc(50% - 320px);
  z-index: 1000;
  cursor: move;
  filter: drop-shadow(0 90px 35px ${gray80});
`;

export const CloseButton = styled(ButtonIcon)`
  align-items: center;
  cursor: pointer;
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  gap: ${spacer8};
`;
