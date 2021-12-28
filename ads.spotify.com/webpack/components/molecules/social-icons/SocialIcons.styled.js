import styled from 'styled-components';

import { minWidth } from 'styles/media-queries';
import { Icon } from 'components/atoms';
import { colors } from 'styles/variables';

export const Default = styled.ul`
  display: flex;

  li {
    font-size: 0;
    line-height: 0;
    margin-right: 1.6rem;
    max-height: 4rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const InsideFooter = styled(Default)`
  display: flex;
  margin-bottom: 3.6rem;

  ${minWidth.lg`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0;
  `}
`;

export const IconContainer = styled.button`
  cursor: pointer;
`;

export const SocialIcon = styled(Icon)`
  height: 4rem;
  transition: 0.25s;
  width: 4rem;

  div,
  svg {
    height: inherit;
    width: inherit;
  }

  &:hover {
    color: ${colors.grey400};
  }
`;

export const validWrappers = ['Default', 'InsideFooter'];
