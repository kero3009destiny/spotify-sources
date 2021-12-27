import styled from 'styled-components';
import { Type, white } from '@spotify-internal/encore-web';

export const Text = styled(Type).attrs({
  weight: Type.bold,
})`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${white};
`;
