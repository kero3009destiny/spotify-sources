import styled from 'styled-components';

import { Cta } from 'components/atoms/cta';
import { colors } from 'styles/variables';
import { levels } from 'styles/z-index';

export const SkipToMain = styled(Cta)`
  background-color: ${colors.spotifyGreen};
  border-radius: 0;
  border: none;
  color: ${colors.black};
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transform: translateX(-100%);
  z-index: ${levels.persistent};

  &:focus {
    opacity: 1;
    transform: translateX(0);
  }
`;
