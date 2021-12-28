import React from 'react';
import styled from 'styled-components';

interface IFormButtonProps {
  label: string;
  clickBack?: () => void;
  spanFull?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

interface ISFormButton {
  spanFull?: boolean;
  disabled?: boolean;
}

const StyledFormButton = styled.button<ISFormButton>`
  display: block;
  background: ${p => (p.disabled ? "gray" : "black")};
  color: white;
  padding: 15px 50px;
  text-transform: capitalize;
  cursor: pointer;
  border: 1px solid ${p => (p.disabled ? "gray" : "black")};
  font-size: 1.6rem;
  font-weight: 300;
  border-radius: 100px;
  text-transform: uppercase;
  font-family: var(--font-PRIMARY);
  width: ${p => (p.spanFull ? "100%" : "auto")};
  &:hover {
    background: ${p => (p.disabled ? "gray" : "white")};
    color: black;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const FormButton = (props: IFormButtonProps) => {
  return (
    <StyledFormButton
      type={props.type}
      onClick={() => {
        if (typeof props.clickBack === 'function') {
          props.clickBack();
        }
      }}
      spanFull={props.spanFull}
      disabled={props.disabled}
    >
      {props.label}
    </StyledFormButton>
  );
};

FormButton.defaultProps = {
  type: 'submit'
};

export default FormButton;
