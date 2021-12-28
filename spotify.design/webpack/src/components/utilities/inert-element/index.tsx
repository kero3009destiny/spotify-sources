import React, { useLayoutEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  inert?: boolean;
}

export const InertElement = ({ className, children, inert }: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (element) {
      if (inert) {
        element.setAttribute('inert', '');
      } else {
        element.removeAttribute('inert');
      }
    }

    return () => {
      if (element) {
        element.removeAttribute('inert');
      }
    };
  }, [inert, elementRef]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

InertElement.defaultProps = {
  className: '',
};
