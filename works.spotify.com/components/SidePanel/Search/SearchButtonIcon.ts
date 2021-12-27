import styled from 'styled-components';
import { ButtonIcon, white } from '@spotify-internal/encore-web';

export const SearchButtonIcon = styled(ButtonIcon)`
  &::after {
    content: '';
    display: block;
    position: absolute;
    border-bottom: 3px solid transparent;
    transition: border-color 200ms ease-in;
    width: 100%;
    bottom: -6px;
  }

  &:hover::after {
    border-color: ${white};
  }
`;
