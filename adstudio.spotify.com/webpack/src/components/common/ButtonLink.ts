import styled from 'styled-components';

export const ButtonLink = styled.button`
  background: none;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  border: 0;
  white-space: normal;
  text-align: left;

  &:focus {
    outline-style: none;
    border: 0;
    padding: 0;
  }

  &:disabled {
    cursor: initial;
    &:hover {
      text-decoration: none;
    }
  }
`;
