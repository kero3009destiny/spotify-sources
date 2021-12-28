import styled from 'styled-components';

import {
  Cta,
  Input as InputComponent,
  Checkbox as CheckboxComponent,
} from 'components/atoms';
import { minWidth } from 'styles/media-queries';
import { colors } from 'styles/variables';

export const Input = styled(InputComponent)`
  color: ${props => props.color || 'inherit'};

  input::placeholder {
    color: ${props => props.placeHolderColor || colors.grey400};
  }

  input::-webkit-input-placeholder {
    color: ${props => props.placeHolderColor || colors.grey400};
  }

  input::-ms-input-placeholder {
    color: ${props => props.placeHolderColor || colors.grey400};
  }

  input:-moz-placeholder {
    color: ${props => props.placeHolderColor || colors.grey400};
    opacity: 1 !important;
  }

  input::-moz-placeholder {
    color: ${props => props.placeHolderColor || colors.grey400};
    opacity: 1 !important;
  }
`;

export const Checkbox = styled(CheckboxComponent)`
  color: ${props => props.color || 'inherit'};
  margin-bottom: 2.4rem;

  ${minWidth.lg`
    margin-bottom: 3.2rem;
  `}
`;

export const Submit = styled(Cta).attrs({
  tag: 'button',
  type: 'Tertiary',
})`
  max-width: 100%;
  width: 100%;

  ${minWidth.lg`
    width: auto;
  `}
`;
