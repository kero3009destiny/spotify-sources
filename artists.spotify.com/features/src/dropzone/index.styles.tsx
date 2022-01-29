// ignore-string-externalization
import styled from 'styled-components';
import { kleinBlue } from '@spotify-internal/encore-web';

export const DropzoneSection = styled.section`
  cursor: pointer;

  &:focus {
    border: 0;
    outline: ${kleinBlue} 1px solid;
  }
`;
export const DropzoneInput = styled.input`
  display: none;
  height: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 0;
`;
