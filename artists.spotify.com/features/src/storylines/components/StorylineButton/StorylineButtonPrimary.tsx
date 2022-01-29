// ignore-string-externalization
import React from 'react';
import styled, { css } from 'styled-components';
import {
  ButtonPrimary,
  spacer4,
  spacer8,
  spacer16,
  cssColorValue,
} from '@spotify-internal/encore-web';
import { Spinner } from '@mrkt/features/spinner';

type Props = {
  ariaLabel?: string;
  ariaLabelForSpinner?: string;
  'data-slo-id'?: string;
  disabled?: boolean;
  onClick: () => void;
  showSpinner?: boolean;
  showTextWithSpinner?: boolean;
  width?: number;
};

type StyledButtonProps = React.ComponentProps<typeof ButtonPrimary> & {
  overrideDisabledStyle?: boolean;
};

const StyledButton = styled(
  ({
    // Strip out the `overrideDisableStyle` from being passed to PrimaryButton
    // to prevent React from throwing warnings.
    overrideDisabledStyle, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...buttonProps
  }: StyledButtonProps) => <ButtonPrimary {...buttonProps} />,
)`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ width }) =>
    // sets a fixed width to prevent shape-shifting when swapping text and spinner
    width &&
    css`
      min-width: ${width}px;
    `}

  ${({ overrideDisabledStyle, theme }) =>
    // Only apply the disabled styles if overrideDisabledStyle is true.
    // Otherwise, let it render the default disabled button styles.
    overrideDisabledStyle &&
    css`
      /* decrease padding to compensate for the spinner going over the 12px line-height */
      padding-top: ${spacer8};
      padding-bottom: ${spacer8};

      &[disabled],
      fieldset[disabled] {
        background-color: ${theme?.colors?.primaryColor ||
        cssColorValue('textBrightAccent')};
        opacity: 1;
      }
    `}
`;

const StyledSpinner = styled(Spinner)<{
  hasMargin?: boolean;
}>`
  margin-right: ${({ hasMargin }) => (hasMargin ? spacer4 : '0')};
  width: ${spacer16};
  height: ${spacer16};
`;

export const StorylineButtonPrimary: React.FunctionComponent<Props> = ({
  ariaLabel,
  ariaLabelForSpinner,
  children,
  disabled,
  onClick,
  showSpinner,
  showTextWithSpinner,
  width,
  ...otherProps
}) => (
  <StyledButton
    aria-label={
      showSpinner && ariaLabelForSpinner ? ariaLabelForSpinner : ariaLabel
    }
    buttonSize={ButtonPrimary.sm}
    disabled={disabled || showSpinner}
    overrideDisabledStyle={showSpinner}
    onClick={onClick}
    data-testid="storyline-button-primary"
    data-slo-id={otherProps['data-slo-id']}
    width={width}
  >
    {showSpinner && (
      <StyledSpinner
        data-testid="storyline-button-primary--spinner"
        color="white"
        hasMargin={showTextWithSpinner}
      />
    )}
    {(!showSpinner || showTextWithSpinner) && children}
  </StyledButton>
);
