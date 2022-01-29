import React, { useState, RefObject, useEffect, useLayoutEffect } from 'react';
import {
  useOverlay,
  DismissButton,
  FocusScope,
  OverlayContainer,
  useOverlayPosition,
} from 'react-aria';

import styled from 'styled-components';

import { white } from '@spotify-internal/encore-web';
import { resizeObserverSupported } from './uiHelpers';

interface PopoverProps {
  popoverRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  position?: 'top' | 'bottom';
}

type PopoverContainerProps = {
  inputHeight: number;
  width: number;
  isOpen: boolean | undefined;
};

const PopoverContainer = styled.div<PopoverContainerProps>`
  border-radius: 3px;
  max-height: 320px;
  width: ${props => `${props.width}px`};
  font-size: 85%; //match Reach's default style
  z-index: 9999;

  // We need a little trickery - react-aria doesn't technically allow us to control the open state, and none of the trigger strategies exactly
  // work for us (escape should hide), AND if we try to just un-render the popover when react-aria thinks it's open, bad things happen (runtime exceptions)
  // So we'll just let react-aria think it's open when we don't want it to be, sometimes, and just hide it like this
  display: ${props => (props.isOpen ? 'block' : 'none')};
  background-color: ${white};
`;

const usePopoverPosition = (inputRef: RefObject<HTMLInputElement>) => {
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  const updatePosition = () => {
    const elemRect = inputRef.current?.getBoundingClientRect();
    if (!elemRect) {
      return;
    }

    const spaceAvailableUnderEntityPicker =
      window.innerHeight - elemRect.bottom;

    const newPosition =
      spaceAvailableUnderEntityPicker < 200 ? 'top' : 'bottom';

    setPosition(newPosition);
  };
  useLayoutEffect(() => {
    updatePosition();
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return position;
};

export function Popover(props: PopoverProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const {
    popoverRef = ref,
    isOpen,
    onClose,
    children,
    inputRef,
    position: fixedPosition,
  } = props;

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: false,
    },
    popoverRef,
  );

  const position = usePopoverPosition(props.inputRef);

  const { overlayProps: positionProps, updatePosition } = useOverlayPosition({
    targetRef: inputRef,
    overlayRef: popoverRef,
    placement: fixedPosition ?? position,
    shouldFlip: !fixedPosition,
    offset: 5,
    isOpen,
  });

  useEffect(() => {
    let ro: ResizeObserver | undefined;
    if (resizeObserverSupported) {
      ro = new ResizeObserver(updatePosition);
      ro.observe(inputRef.current!);
    }

    return () => {
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [updatePosition]);

  // Add a hidden <DismissButton> component at the end of the popover to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <OverlayContainer>
        <PopoverContainer
          {...overlayProps}
          {...positionProps}
          // simple and humble: just make the popover as wide as the input, and react-aria will handle placing it on top / bottom, appropriately and
          // the window.resize event, and the input's ResizeObserver (if supported) help ensure a re-render is triggered when this size actually changes
          // (100 is an almost meaningless default for a case that should literally never happen in a noticeable way)
          width={inputRef.current?.offsetWidth ?? 100}
          ref={popoverRef}
          inputHeight={inputRef.current?.clientHeight ?? 0}
          isOpen={isOpen}
          data-popover-root="true"
        >
          {children}
          <DismissButton onDismiss={onClose} />
        </PopoverContainer>
      </OverlayContainer>
    </FocusScope>
  );
}
