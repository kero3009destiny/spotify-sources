import React from 'react';
import styled from 'styled-components';
import { gray50, IconX } from '@spotify-internal/encore-web';

type CloseButtonProps = {
  disabled: boolean;
  buttonTitle: string;
  onClick: (e: React.MouseEvent) => void;
};

const Button = styled.button`
  color: ${gray50};
  position: absolute;
  top: 0;
  right: 0;
  width: 36px;
  height: 36px;
  opacity: 1;
  padding: 10px;
  background: none;
  border: 0;
  transition: opacity 0.1s ease-in;
  outline: none;

  &:focus {
    color: white;
  }

  &[disabled] {
    opacity: 0;
    pointer-events: none;
  }
`;

const Icon = styled(IconX)`
  position: absolute;
  top: 18px;
  right: 22px;
  transform: translate(50%, -50%);
`;

export const CloseButton = (props: CloseButtonProps) => {
  return (
    <Button title={props.buttonTitle} {...props}>
      <Icon />
    </Button>
  );
};
