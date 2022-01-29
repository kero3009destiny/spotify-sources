// ignore-string-externalization
import styled from 'styled-components';
import { Type } from '@spotify-internal/encore-web';

export const Text = styled(Type).attrs(() => ({
  weight: Type.bold,
  semanticColor: 'textBase',
}))`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
