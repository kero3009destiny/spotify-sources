import React from 'react';
import { Link } from 'react-router';
import styled, { css } from 'styled-components';

import { spacer8, spacer12 } from '@spotify-internal/encore-foundation';
import {
  semanticColors,
  SemanticTextColor,
  Type,
} from '@spotify-internal/encore-web';

import { ButtonLink } from 'components/common/ButtonLink';
import { BreakWord } from 'components/common/styles';

const RevealOnHover = styled.div`
  display: flex;
  opacity: 0;
`;

const actionStyles = css`
  &:not([disabled])&:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const transitionStyles = css`
  transition: all 0.325s;
`;

const StyledActionType = styled(Type)`
  word-break: break-word;
  user-select: none;
`;

const UnstyledAnchor = styled(Link)`
  color: inherit;
  &:hover {
    cursor: default;
  }
`;

// TODO: This is declared as any due to an issue with TypeScript / styled-components
// Reference here: https://github.com/microsoft/TypeScript/issues/37597
// Needs to be this way until we are ready to upgrade to styled-components 5.x.x
const PrimaryActionLink = styled(UnstyledAnchor as any)`
  transform: translateY(${spacer12});
  display: block;
  ${transitionStyles}
  ${props => (props.onClick || props.to) && actionStyles}
`;

const PrimaryActionSpan = styled.span`
  transform: translateY(${spacer12});
  display: block;
  ${transitionStyles}
`;

// TODO: This is declared as any due to an issue with TypeScript / styled-components
// Reference here: https://github.com/microsoft/TypeScript/issues/37597
// Needs to be this way until we are ready to upgrade to styled-components 5.x.x
const SecondaryAction = styled(ButtonLink as any)`
  ${actionStyles};
  margin-right: ${spacer8};
  display: inline-block;
`;

// FIXME: the typecasting was required based on the versions of typescript and styled components (https://github.com/microsoft/TypeScript/issues/37597#). When we upgrade to styled components 5, "as TSFixMe" can be removed
const SecondaryActionLink = styled(UnstyledAnchor as any)`
  margin-right: ${spacer8};
  display: inline-block;
  ${actionStyles}
`;

interface ContainerProps {
  showSecondaryActions: boolean;
  forceHoverState?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 375px;
  ${props =>
    props.showSecondaryActions
      ? `&:hover {
  ${RevealOnHover} {
    opacity: 1;
  }
  ${transitionStyles}

  ${PrimaryActionSpan},
  ${PrimaryActionLink} {
    transform: none;
  }

  ${RevealOnHover} {
    ${transitionStyles}
  }
}`
      : ``};
  ${props =>
    props.forceHoverState &&
    props.showSecondaryActions &&
    `
${RevealOnHover} {
  opacity: 1;
}
${transitionStyles}

${PrimaryActionSpan},
${PrimaryActionLink} {
  transform: none;
}

${RevealOnHover} {
  ${transitionStyles}
}
`}
`;

export interface Activity {
  name: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  'data-test'?: string;
  readOnly?: boolean;
}

export interface NameCellProps {
  secondaryActions: Activity[];
  href?: string;
  onClick?: () => void;
  'data-test'?: string;
  keyId: string;
  forceHoverState?: boolean;
  name: string | React.ReactNode;
}

export const NameCell = React.forwardRef<HTMLDivElement, NameCellProps>(
  (props, ref) => {
    const PrimaryElement =
      props.onClick || props.href ? PrimaryActionLink : PrimaryActionSpan;
    return (
      <Container
        ref={ref}
        data-test={props['data-test']}
        showSecondaryActions={props.secondaryActions.length > 0}
        forceHoverState={props.forceHoverState}
      >
        <PrimaryElement onClick={props.onClick} to={props.href}>
          <BreakWord
            semanticColor={semanticColors.textBase}
            variant={Type.body1}
            weight={Type.bold}
          >
            {props.name}
          </BreakWord>
        </PrimaryElement>
        {props.secondaryActions.length > 0 && (
          <RevealOnHover>
            {props.secondaryActions!.map((action: Activity, idx: number) => {
              const onClick = action.readOnly ? undefined : action.onClick;
              const href = action.readOnly ? undefined : action.href;
              const buttonColor = !action.readOnly
                ? (semanticColors.essentialSubdued as SemanticTextColor)
                : semanticColors.textSubdued;

              return (
                <>
                  {href ? (
                    <SecondaryActionLink
                      key={`name-cell-secondary-${props.keyId}-${idx}`}
                      to={href}
                      data-test={action['data-test']}
                      onClick={onClick ? onClick : undefined}
                    >
                      <StyledActionType
                        color={buttonColor}
                        variant={Type.body2}
                      >
                        {action.name}
                      </StyledActionType>
                    </SecondaryActionLink>
                  ) : (
                    <SecondaryAction
                      type="button"
                      key={`name-cell-secondary-${props.keyId}-${idx}`}
                      data-test={action['data-test']}
                      onClick={onClick ? onClick : undefined}
                      disabled={action.readOnly}
                    >
                      <StyledActionType
                        color={buttonColor}
                        variant={Type.body2}
                      >
                        {action.name}
                      </StyledActionType>
                    </SecondaryAction>
                  )}
                </>
              );
            })}
          </RevealOnHover>
        )}
      </Container>
    );
  },
);
