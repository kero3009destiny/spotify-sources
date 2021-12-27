import styled from 'styled-components';
import { gray15, gray70, gray10 } from '@spotify-internal/encore-web';

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  color: ${gray70};
  background-color: ${gray15};
  margin-top: auto;
  min-height: 80px;
  position: relative;

  &::before {
    position: absolute;
    top: -30px;
    content: '';
    display: block;
    width: 100%;
    height: 30px;
    background: linear-gradient(-180deg, rgba(24, 24, 24, 0) 0%, ${gray10} 100%);
    pointer-events: none;
  }
`;
