import styled from 'styled-components';

// An unstyled button with an Encore Web inspired focus state
// This component should be used as a wrapper for components that need
// the accessible functionality of a button, but without the visual treatment of one.

export const UnstyledButton = styled.button`
  background-color: transparent;
  border: 0;
  color: inherit;
  padding: 0;

  &::after {
    content: '';
    display: block;
    border-bottom: 3px solid transparent;
    transition: border-color 200ms ease-in;
  }

  &:focus {
    outline: none;

    &::after {
      border-color: currentColor;
    }
  }
`;
