import React from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router';

type VariantType = 'dark-blue';

interface IStyledButtonProps {
  fgColor: string;
  bgColor: string;
  isLocked: boolean;
  isDisabled: boolean;
  variant: VariantType;
  href?: undefined | string;
}

const darkBlueVariant = css`
  background: var(--color-DARK-BLUE);
  color: white;

  @media screen and (min-width: 768px) {
    &:hover{
      background: white;
      color: var(--color-DARK-BLUE);
    }
  }
`

const getVariant = (props: IStyledButtonProps) => {
  switch (props.variant) {
    case 'dark-blue': return darkBlueVariant;
    default: return null
  }
}

const StyledButton = styled.a`
  width: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 15px 50px;
  font-size: 1.6rem;
  font-weight: 300;
  height: 54px;
  white-space: nowrap;
  text-transform: uppercase;
  background-color: ${(props: IStyledButtonProps) => props.fgColor};
  color: ${(props: IStyledButtonProps) => props.bgColor};
  opacity: ${(props: IStyledButtonProps) => (props.isDisabled ? 0.5 : 1)};
  border-radius: 100px;
  text-decoration: none;
  text-align: center;

  &:hover {
    cursor: ${(props: IStyledButtonProps) => (props.isLocked ? 'not-allowed' : 'pointer')};
  }

  ${getVariant};

  @media (max-width: 540px) {
    padding: 15px 30px;
    height: auto;
    white-space: normal;
  }
`;

interface IButton {
  to?: null | string;
  href?: undefined | string;
  fgColor: string;
  bgColor: string;
  isLocked?: boolean;
  label: string;
  history: any;
  match: any;
  location: any;
  isDisabled: boolean;
  external: boolean;
  variant: VariantType
}

const Button = (props: IButton) => {
  const {
    fgColor,
    bgColor,
    isLocked = false,
    to = '',
    history,
    label,
    isDisabled = false,
    external = false,
    variant
  } = props;

  let externalProps = null;
  if (external) {
    externalProps = {
      target: '_blank',
      rel: 'nofollow'
    };
  }

  return (
    <StyledButton
      fgColor={fgColor}
      bgColor={bgColor}
      isLocked={isLocked}
      isDisabled={isDisabled}
      variant={variant}
      href={props.href || '#'}
      onClick={ev => {
        if (!props.href || props.href === '#') ev.preventDefault()
        if (to !== null && to.length && !isDisabled) {
          history.push(to)
        }
      }}
      {...externalProps}
    >
      {label}
    </StyledButton>
  );
};

export default withRouter(Button);
