import React, { ComponentProps, forwardRef, useState } from 'react';
import styled from 'styled-components';

import {
  ButtonIcon,
  gray10,
  gray80,
  gray85,
  spacer4,
  spacer16,
  Tooltip as TooltipComponent,
  TooltipTrigger,
  white,
} from '@spotify-internal/encore-web';

export const FilterBarButtonIcon = styled(ButtonIcon)`
  border-radius: ${spacer4};
  background-color: ${white};
  border: 1px solid ${gray80};
  padding: 14px ${spacer16};

  &:hover {
    border: 1px solid ${gray10};
  }

  &:disabled,
  &:disabled:hover {
    background-color: ${gray85};
    border: 1px solid ${gray85};
    cursor: not-allowed;

    svg {
      color: ${gray80};
    }
  }
`;

export type FilterbarButtonProps = ComponentProps<typeof ButtonIcon> & {
  'data-test'?: string;
  tooltipText: string;
  placement?: 'right' | 'bottomRight';
  children: React.ReactNode;
};

export const FilterBarButton = forwardRef<
  HTMLButtonElement,
  FilterbarButtonProps
>((props, ref) => {
  const { tooltipText, placement = 'right', children, ...buttonProps } = props;
  const [show, toggleShow] = useState(false);

  return (
    <TooltipTrigger
      overlay={show && <TooltipComponent>{props.tooltipText}</TooltipComponent>}
      placement={placement}
      onShow={() => toggleShow(true)}
      onHide={() => toggleShow(false)}
    >
      <FilterBarButtonIcon ref={ref} {...buttonProps}>
        {props.children}
      </FilterBarButtonIcon>
    </TooltipTrigger>
  );
});
