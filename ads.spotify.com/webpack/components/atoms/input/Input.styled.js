import styled from 'styled-components';

import { colors, fontWeights } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import { Icon } from 'components/atoms/icon';

export const Container = styled.div`
  position: relative;
`;

export const ValidationIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0.45rem;

  svg {
    height: 1.6rem;
    width: 1.6rem;
  }

  ${minWidth.lg`
    svg {
      height: 2.4rem;
      width: 2.4rem;
    }

    top: 0.35rem;
  `}
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 0.1rem solid ${colors.grey400};
  color: inherit;
  filter: none;
  font-size: 1.8rem;
  font-weight: ${fontWeights.normal};
  height: 3.3rem;
  margin-bottom: 2.3rem;
  padding-bottom: 0.7rem;
  padding-right: 1.6rem;
  width: 100%;

  ${minWidth.lg`
    height: 4.7rem;
    padding-bottom: 1.5rem;
    padding-right: 2.4rem;
  `}

  &:focus {
    border-color: ${colors.spotifyGreen};
    outline: none;
  }

  &.invalid {
    border-color: ${colors.errorRed};
  }

  &:invalid {
    box-shadow: none;
  }

  &::placeholder,
  ::-ms-input-placeholder,
  :-moz-placeholder,
  ::-moz-placeholder {
    color: ${colors.grey400};
    opacity: 1 !important;
  }
`;
