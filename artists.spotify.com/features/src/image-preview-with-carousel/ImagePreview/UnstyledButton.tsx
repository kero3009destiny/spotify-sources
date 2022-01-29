// ignore-string-externalization
import styled from 'styled-components';

// An unstyled button with an Encore Web–inspired focus state
export const UnstyledButton = styled.button`
  background-color: transparent;
  border: 0;
  color: inherit;
  padding: 0;
  border-bottom: 3px solid transparent;
  transition: border-color 200ms ease-in;

  &:focus {
    outline: none;
    border-color: currentColor;
  }
`;
