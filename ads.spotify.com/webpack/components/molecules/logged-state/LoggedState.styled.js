import styled from 'styled-components';

import { Icon } from 'components/atoms';
import { minWidth } from 'styles/media-queries';

export const LoggedState = styled.button`
  align-items: center;
  display: flex;

  &:active {
    color: initial;
  }
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
`;

export const Name = styled.span`
  font-size: 1.6rem;
  line-height: 2.4rem;
  margin-left: 0.8rem;
`;

export const Caret = styled(Icon)`
  display: none;
  height: 1.6rem;
  margin-left: 0.8rem;
  width: 1.6rem;

  div,
  svg {
    height: inherit;
    width: inherit;
  }

  ${minWidth.lg`
    display: block;

    ${props =>
      props.open &&
      `
      margin-bottom: 0.2rem;
      transform: rotate(180deg);
    `}
  `}
`;

export const Content = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;

  ${minWidth.md`
    margin-top: 2.4rem;
  `}

  ${minWidth.lg`
    margin-top: 0;
  `}
`;

export const Button = styled.button`
  margin-bottom: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${minWidth.md`
    margin-bottom: 1.1rem;
  `}
`;
