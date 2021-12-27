import React, {
  RefObject,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { window } from 'global';
import styled from 'styled-components';

export const RENDER_TIMEOUT = 50;

export const CoachmarkContainer = styled.div<{ reveal?: boolean }>`
  position: relative;
  z-index: 2000;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.125s;

  ${props => (props.reveal ? 'opacity: 1;' : '')}
`;

export interface CoachmarkHighlightProps {
  top: number;
  left: number;
  width: number;
  height: number;
  rectOffset: DOMRect;
  borderRadius: string;
}

export const CoachmarkHighlight = styled.div<CoachmarkHighlightProps>`
  position: absolute;
  top: ${props => `${props.top + props.rectOffset.top}px` || '0'};
  left: ${props => `${props.left + props.rectOffset.left}px` || '0'};
  width: ${props => `${props.width + props.rectOffset.width}px` || '100%'};
  height: ${props => `${props.height + props.rectOffset.height}px` || '100%'};
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.3);
  border-radius: ${props => props.borderRadius};
  z-index: 2000;
`;

export interface CoachmarkProps {
  className?: string;
  target: RefObject<HTMLElement>;
  rectOffset?: DOMRect;
  borderRadius?: string;
  children?: React.ReactNode;
}

export const defaultBoundingRect: DOMRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
} as DOMRect;

export const Coachmark = (props: CoachmarkProps) => {
  const [boundingRect, setBoundingRect] = useState<DOMRect>(
    defaultBoundingRect,
  );
  const [revealCoachmark, setRevealCoachmark] = useState<boolean>(false);
  const {
    target,
    className,
    children,
    rectOffset,
    borderRadius = '4px',
  } = props;
  const updateBoundingRect = useCallback(() => {
    setBoundingRect(
      target.current?.getBoundingClientRect() || defaultBoundingRect,
    );
  }, [target, setBoundingRect]);

  useLayoutEffect(() => {
    setTimeout(() => {
      updateBoundingRect();
      setRevealCoachmark(true);
    }, RENDER_TIMEOUT);
    window.addEventListener('scroll', updateBoundingRect);
    window.addEventListener('resize', updateBoundingRect);

    return function destroy() {
      window.removeEventListener('scroll', updateBoundingRect);
      window.removeEventListener('resize', updateBoundingRect);
    };
  }, [updateBoundingRect]);

  return (
    <>
      <CoachmarkContainer reveal={revealCoachmark}>
        <CoachmarkHighlight
          top={boundingRect.top + window.scrollY}
          left={boundingRect.left}
          width={boundingRect.width}
          height={boundingRect.height}
          rectOffset={rectOffset || defaultBoundingRect}
          className={className}
          borderRadius={borderRadius}
        >
          {children}
        </CoachmarkHighlight>
      </CoachmarkContainer>
    </>
  );
};
