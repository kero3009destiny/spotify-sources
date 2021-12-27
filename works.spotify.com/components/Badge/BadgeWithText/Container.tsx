import styled from 'styled-components';
import { spacer40 } from '@spotify-internal/encore-web';

export const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: ${spacer40};
  /* min-width: 0 is needed to support truncating text within flex children */
  min-width: 0;
`;
