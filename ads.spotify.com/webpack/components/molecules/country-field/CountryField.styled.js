import styled, { css } from 'styled-components';

import { getModifierStyles } from 'utils/get-modifier-styles';
import { colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import { Dropdown } from 'components/atoms';

// Modifier styles
const DEFAULT = css``; // Requires empty style rule to prevent console warning

export const MODIFIERS = {
  default: '',
  modal: 'modal',
  inlineForm: 'inlineForm',
};

const COUNTRY_MODAL = css`
  ${minWidth.lg`
    select {
      font-size: 2rem;
      font-weight: 400;
      line-height: 3.2rem;
      min-height: 3.3rem;
    }
  `}
`;

const STATE_MODAL = css`
  ${minWidth.lg`
    padding-left: 1.6rem;

    select {
      font-size: 2rem;
      font-weight: 400;
      line-height: 3.2rem;
      min-height: 3.3rem;
    }
  `}
`;

const LOCATION_INLINE = css`
  margin-bottom: 3.1rem;

  svg {
    color: ${colors.black};
  }
`;

const STYLE_MAP = {
  Country: {
    [MODIFIERS.default]: DEFAULT,
    [MODIFIERS.inlineForm]: DEFAULT,
    [MODIFIERS.modal]: COUNTRY_MODAL,
  },
  State: {
    [MODIFIERS.default]: DEFAULT,
    [MODIFIERS.inlineForm]: DEFAULT,
    [MODIFIERS.modal]: STATE_MODAL,
  },
  Location: {
    [MODIFIERS.default]: DEFAULT,
    [MODIFIERS.inlineForm]: LOCATION_INLINE,
    [MODIFIERS.modal]: DEFAULT,
  },
};

export const Location = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    color: ${colors.white};
  }

  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.Location)}
`;

export const State = styled(Dropdown)`
  max-width: 40%;
  padding-left: 1.6rem;

  ${minWidth.lg`
    padding-left: 2.4rem;
  `}

  div,
  select {
    max-width: 100%;
  }

  &.hidden {
    visibility: hidden;
    pointer-events: none;

    svg {
      visibility: hidden;
      pointer-events: none;
    }
  }

  ${({ theme }) => theme.modifier && getModifierStyles(theme, STYLE_MAP.State)}
`;

export const Country = styled(Dropdown)`
  flex: 1 0 60%;

  div,
  select {
    width: 100%;
  }

  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.Country)}
`;
