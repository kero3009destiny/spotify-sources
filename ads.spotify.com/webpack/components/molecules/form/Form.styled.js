import styled from 'styled-components';

export const Form = styled.form`
  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  // Override for webkit autocomplete styles
  input:-webkit-autofill,
  select:-webkit-autofill {
    box-shadow: 0 0 0 5rem transparent inset;
    -webkit-box-shadow: 0 0 0 5rem transparent inset;
    -webkit-text-fill-color: ${props => props.textColor || 'inherit'};
    transition: background-color 5000s;
  }

  // Override for edge autocomplete styles
  input.edge-autofilled,
  select.edge-autofilled {
    background-color: transparent !important;
    color: ${props => props.textColor || 'inherit'} !important;
  }
`;
