import styled, { css } from 'styled-components';

import {
  ButtonSecondary,
  gray90,
  PopoverNavigationLink,
  spacer12,
  spacer16,
  white,
} from '@spotify-internal/encore-web';

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacer16};
`;

export const FilterContainer = styled(SpaceBetween as TSFixMe)`
  display: flex;
  justify-content: space-between;
  padding: ${spacer16} 0;
  border-top: 1px solid ${gray90};
  border-bottom: 1px solid ${gray90};
`;

export const FlexGap = styled.div`
  display: flex;
  gap: ${spacer16};
`;
const iconTextWrapper = css`
  display: flex !important;
  align-items: center;
  gap: ${spacer12};
`;

export const AdditionalFilterAction = styled(PopoverNavigationLink as TSFixMe)<{
  disabled?: boolean;
}>`
  ${iconTextWrapper}

  /* FIXME: we shouldn't need this disabled treatment based on the encore docs
            but we may just need to uptick the encore version. */
  ${props =>
    props.disabled
      ? `
    cursor: not-allowed !important;
    &:hover {
      background-color: ${white} !important;
    }
  `
      : ''}
`;

export const MoreButton = styled(ButtonSecondary)`
  ${iconTextWrapper}
`;
