import styled, { css } from 'styled-components';

import { colors, fontWeights } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import { getModifierStyles } from 'utils/get-modifier-styles';
import { Checkbox, Cta, Input, Icon } from 'components/atoms';
import { ReCaptchaText as ReCaptchaTextComponent } from 'components/molecules/re-captcha-text';
import { FormSuccessState as FormSuccessStateComponent } from 'components/molecules/form-success-state';

export const MODIFIERS = {
  modal: 'modal',
};

const FORM_MODAL = css`
  fieldset {
    padding-bottom: 7rem;
  }

  ${minWidth.lg`
    grid-column: auto;
    margin-top: 0;
    width: 100%;

    fieldset {
      padding-bottom: 0;
    }
  `}
`;

const INTRO_TEXT_MODAL = css`
  ${minWidth.lg`
    font-size: 3.6rem;
    line-height: 4rem;
    margin-bottom: 2.3rem;

    label {
      margin-bottom: 0.8rem;
    }
  `}
`;

const CONTENT_MODAL = css`
  ${minWidth.lg`
    display: block;
    padding: 0;
  `}
`;

const NEWSLETTER_MODAL = css`
  ${minWidth.lg`
    margin-top: 2.4rem;
    margin-bottom: 2.4rem;
  `}
`;

const TEXT_INPUT_MODAL = css`
  input {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }

  ${minWidth.lg`
      input {
        font-size: 2rem;
        height: 3.3rem;
        line-height: 3.2rem;
        margin-bottom: 1.6rem;
        padding-bottom: 0.7rem;
        padding-right: 1.6rem;
      }
  `}
`;

const CTA_MODAL = css`
  ${minWidth.lg`
    width: auto;
    padding: 1.6rem 3.2rem;
  `}
`;

const RE_CAPTCHA_TEXT_MODAL = css`
  ${minWidth.lg`
    margin-bottom: 3.2rem;
  `}
`;

// Style modifier map
const STYLE_MAP = {
  Content: { [MODIFIERS.modal]: CONTENT_MODAL },
  Cta: { [MODIFIERS.modal]: CTA_MODAL },
  Form: { [MODIFIERS.modal]: FORM_MODAL },
  IntroText: { [MODIFIERS.modal]: INTRO_TEXT_MODAL },
  Newsletter: { [MODIFIERS.modal]: NEWSLETTER_MODAL },
  TextInput: { [MODIFIERS.modal]: TEXT_INPUT_MODAL },
  ReCaptchaText: { [MODIFIERS.modal]: RE_CAPTCHA_TEXT_MODAL },
};

export const Form = styled.form`
  background-color: ${colors.black};
  color: ${colors.white};
  width: 100%;

  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  // Override for webkit autocomplete styles
  input:-webkit-autofill,
  select:-webkit-autofill {
    box-shadow: 0 0 0 5rem ${colors.black} inset;
    -webkit-box-shadow: 0 0 0 5rem ${colors.black} inset;
    -webkit-text-fill-color: ${colors.white};
    transition: background-color 5000s;
  }

  // Override for edge autocomplete styles
  input.edge-autofilled,
  select.edge-autofilled {
    background-color: ${colors.black} !important;
    color: ${colors.white} !important;
  }

  ${({ theme }) => theme.modifier && getModifierStyles(theme, STYLE_MAP.Form)}
`;

export const IntroText = styled.div`
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  font-size: 2.8rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.131rem;
  line-height: 3.2rem;
  margin-bottom: 3rem;

  ${minWidth.lg`
    font-size: 4rem;
    line-height: 4rem;
    margin-bottom: 4.8rem;
  `}

  select {
    color: ${colors.spotifyGreen};
    padding-left: 0;
    width: 100%;
  }

  svg {
    color: ${colors.white};
  }

  label {
    margin-bottom: 0.8rem;

    ${minWidth.lg`
      margin-bottom: 1.6rem;
    `}
  }

  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.IntroText)}
`;

export const Newsletter = styled(Checkbox)`
  color: ${colors.white};
  margin-top: 4rem;
  margin-bottom: 2.4rem;

  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.Newsletter)}
`;

export const CtaBtn = styled(Cta)`
  align-items: center;
  align-self: start;
  background-color: ${colors.white};
  border-color: ${colors.white};
  color: ${colors.black};
  display: flex;
  justify-content: center;
  width: 100%;

  &[disabled],
  &[aria-disabled='true'] {
    background-color: ${colors.grey100};
    border-color: ${colors.grey100};
    color: ${colors.grey500};
  }

  ${minWidth.lg`
    width: auto;
  `}

  ${({ theme }) => theme.modifier && getModifierStyles(theme, STYLE_MAP.Cta)}
`;

export const TextInput = styled(Input)`
  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.TextInput)}
`;

export const Error = styled.div`
  align-items: center;
  color: ${colors.errorRed};
  display: flex;
  font-size: 1.4rem;
  line-height: 1.6rem;
  margin-top: 2.4rem;
  padding-bottom: 2rem;

  ${minWidth.lg`
    font-size: 1.6rem;
    line-height: 2.4rem;
    margin-top: 3.4rem;
  `}
`;

export const ErrorIcon = styled(Icon).attrs({
  color: colors.errorRed,
})`
  height: 1.6rem;
  width: 1.6rem;

  svg,
  div {
    height: inherit;
    width: inherit;
  }

  ${minWidth.lg`
    height: 2.4rem;
    width: 2.4rem;
  `}
`;

export const ErrorCopy = styled.p`
  margin-left: 0.8rem;
`;

export const FormSuccessState = styled(FormSuccessStateComponent)`
  padding-bottom: 11.4rem;

  ${minWidth.lg`
    padding-bottom: 20.2rem;
  `}
`;

export const ReCaptchaText = styled(ReCaptchaTextComponent)`
  margin-bottom: 3.2rem;

  ${minWidth.lg`
    margin-bottom: 4rem;
  `}

  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.ReCaptchaText)}
`;

export const AriaLiveRegion = styled.div`
  opacity: 0;
  height: 0;
  overflow: hidden;
`;
