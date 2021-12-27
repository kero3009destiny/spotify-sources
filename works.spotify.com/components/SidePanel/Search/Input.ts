import styled from 'styled-components';
import { FormInput } from '@spotify-internal/encore-web';

export const inputBackgroundColor = 'rgba(255, 255, 255, 0.1)';

type InputProps = {
  areSearchResultsVisible: boolean;
};

export const Input = styled(FormInput)<InputProps>`
  display: block;
  width: 100%;
  border: 0;
  outline: none;
  background-color: ${(props) =>
    props.areSearchResultsVisible ? inputBackgroundColor : 'transparent'};
  border-radius: 18px;
  height: 36px;

  && {
    padding-left: 36px;
    padding-right: 36px;
  }

    /* The styles below are needed to override the default styles of the FormInput component */
    &&& {
      padding-bottom: 10px;
    }
    &:focus:focus,
    &:hover:focus:focus,
    &:focus:hover:focus,
    &:hover:focus:hover:focus {
      padding-bottom: 10px;
    }
  }
`;
