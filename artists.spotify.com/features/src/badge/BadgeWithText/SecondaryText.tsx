// ignore-string-externalization
import styled from 'styled-components';
import { Type, cssColorValue } from '@spotify-internal/encore-web';

export const SecondaryText = styled(Type)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${cssColorValue('textSubdued')};
`;
