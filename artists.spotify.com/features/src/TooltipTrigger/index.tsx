// ignore-string-externalization
import React, { useState, cloneElement, useEffect } from 'react';
import { TooltipTrigger as EncoreTooltipTrigger } from '@spotify-internal/encore-web';

type Props = Omit<
  React.ComponentProps<typeof EncoreTooltipTrigger>,
  'children' | 'overlay'
> & {
  /** Tooltip overlay */
  tooltip: React.ReactElement;
  /** Required for accessible tooltips */
  tooltipId: string;
  children: React.ReactElement;
};

/**
 * This component should only be used on interactive triggers (i.e. button, link).
 * The UnstyledButton component might be helpful for your use case.
 * Refer to the encore documentation for more on Tooltip usage & accessibility:
 * https://encore.spotify.net/web/components/tooltip
 */
export const TooltipTrigger = ({
  tooltipId,
  tooltip,
  children,
  ...props
}: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    /* if escape key is pressed, close tooltip */
    const onKeydown = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        setShowTooltip(false);
      }
    };

    /* add event listener for escape key press */
    window.addEventListener('keydown', onKeydown, true);

    /* clean up */
    return () => {
      window.removeEventListener('keydown', onKeydown, true);
    };
  });

  return (
    <EncoreTooltipTrigger
      overlay={
        showTooltip &&
        cloneElement(tooltip, {
          id: tooltipId,
        })
      }
      onShow={() => setShowTooltip(true)}
      onHide={() => setShowTooltip(false)}
      {...props}
    >
      {cloneElement(children, {
        'aria-describedby': showTooltip ? tooltipId : undefined,
      })}
    </EncoreTooltipTrigger>
  );
};
