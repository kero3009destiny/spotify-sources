import styled from 'styled-components';

import { colors, fontWeights } from 'styles/variables';
import { levels } from 'styles/z-index';

export const Checkbox = styled.label`
  align-items: center;
  box-sizing: content-box;
  color: ${colors.grey400};
  display: flex;
  font-size: 1.8rem;
  font-weight: ${fontWeights.normal};
  margin-bottom: 1.6rem;
  position: relative;

  span {
    flex: 1;
    padding-left: 1.6rem;
  }

  input {
    opacity: 0;
    position: absolute;
    z-index: ${levels.behind};
  }

  input[type='checkbox'] ~ div {
    border: 0.1rem solid ${colors.grey400};
    flex: none;
    height: 1.6rem;
    left: 0;
    position: relative;
    top: 0;
    width: 1.6rem;

    &::after {
      border: solid ${colors.black};
      border-width: 0 0.2rem 0.2rem 0;
      content: '';
      display: none;
      height: 1rem;
      left: 0.6rem;
      position: absolute;
      top: 0.1rem;
      transform: rotate(45deg);
      width: 0.25rem;
    }
  }

  input:disabled ~ div::after {
    border-color: ${colors.grey700};
  }

  input:checked ~ div::after {
    display: block;
  }

  input:focus ~ div {
    box-shadow: 0 0 0.5rem 0.2rem ${colors.focusBlue};
  }

  input:checked ~ div {
    background: ${colors.spotifyGreen};
  }

  input[type='checkbox']:disabled ~ div {
    background: ${colors.grey600};
    cursor: not-allowed;
    opacity: 0.6;
  }

  input:checked:focus ~ div,
  &:hover input:not([disabled]):checked ~ div {
    background: ${colors.spotifyGreen};
  }

  div::before {
    background: ${colors.spotifyGreen};
    border-radius: 2rem;
    content: '';
    display: block;
    height: 3rem;
    left: 0;
    margin-left: -0.85rem;
    margin-top: -0.85rem;
    opacity: 0.6;
    position: absolute;
    top: 0;
    transform: scale(0);
    width: 3rem;
  }
`;

export const Container = styled.fieldset`
  margin: 0;
  padding: 0;
`;
