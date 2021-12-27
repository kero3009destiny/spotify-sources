import styled from 'styled-components';
import { Type, gray70 } from '@spotify-internal/encore-web';

export const SecondaryText = styled(Type)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${gray70};
`;
