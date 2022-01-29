// ignore-string-externalization
import React, { useState, useRef, useEffect } from 'react';

import { TextAlignment } from '../../lib/types';
import { Toolbar, ToolbarItem, Tooltip } from './styles';
import { IconTextAlign } from './Icons';

type Props = {
  align?: TextAlignment;
  onChange: (align: TextAlignment) => void;
};

export function TextAlignPicker(props: Props) {
  const [align, setAlign] = useState<TextAlignment>(props.align || 'left');
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTooltip) {
      const listener = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setShowTooltip(false);
        }
      };
      window.addEventListener('click', listener);
      return () => window.removeEventListener('click', listener);
    }

    return undefined;
  }, [showTooltip]);

  useEffect(() => {
    if (props.align) {
      setAlign(props.align);
    }
  }, [setAlign, props.align]);

  function onChange(value: TextAlignment) {
    if (value !== align) {
      if (!props.align) {
        setAlign(value);
      }
      props.onChange(value);
    }
  }

  return (
    <div ref={ref}>
      {showTooltip && (
        <Tooltip>
          <Toolbar condensed>
            <ToolbarItem onClick={() => onChange('left')}>
              <IconTextAlign
                align="left"
                inactive={align !== 'left'}
                data-testid="text-align-picker--left"
              />
            </ToolbarItem>

            <ToolbarItem onClick={() => onChange('center')}>
              <IconTextAlign
                align="center"
                inactive={align !== 'center'}
                data-testid="text-align-picker--center"
              />
            </ToolbarItem>

            <ToolbarItem onClick={() => onChange('right')}>
              <IconTextAlign
                align="right"
                inactive={align !== 'right'}
                data-testid="text-align-picker--right"
              />
            </ToolbarItem>
          </Toolbar>
        </Tooltip>
      )}

      <IconTextAlign
        align={align}
        onClick={() => setShowTooltip(true)}
        data-testid="text-align-picker"
        data-value={align}
      />
    </div>
  );
}
