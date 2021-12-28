import React, { useCallback, useEffect, useRef } from 'react';
import style from './style.module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
  // Util flag to disable this component effects.
  enabled?: boolean;
  // Util flag to enforce viewport height regardless of content's height.
  forceHeight?: boolean;
  // Util to pass the element's height upwards.
  onHeightChange?: Function;
}

/**
 * Component that renders a div at the viewport height.
 */
export const FullHeight = ({
  children,
  className,
  enabled,
  forceHeight,
  onHeightChange,
}: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const initialRenderClass = enabled ? style.fullHeight : '';

  const handleResize = useCallback(() => {
    const element = elementRef.current;

    if (element !== null) {
      if (enabled) {
        // Remove height so we can get the element's natural height.
        element.style.height = 'auto';

        // Store the actual height.
        const elementHeight = element.offsetHeight;
        const viewportHeight = document.documentElement.clientHeight;

        // If the viewport is taller than the element, make it fullscreen.
        //   Otherwise let it flow naturally.
        if (forceHeight || elementHeight < viewportHeight) {
          element.style.height = `${viewportHeight}px`;
        }

        if (onHeightChange) {
          onHeightChange(element.offsetHeight);
        }
      } else {
        element.style.removeProperty('height');
      }
    }
  }, [onHeightChange, elementRef, enabled]);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('resize', handleResize);
      handleResize();
    }
    return () => {
      if (elementRef.current) {
        elementRef.current.style.removeProperty('height');
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef, enabled]);

  return (
    <div className={`${initialRenderClass} ${className}`} ref={elementRef}>
      {children}
    </div>
  );
};

FullHeight.defaultProps = {
  className: '',
  enabled: true,
  onHeightChange: () => undefined,
};
