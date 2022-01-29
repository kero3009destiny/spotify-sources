// ignore-string-externalization
import React, { useState, useRef, useEffect } from 'react';

import { TextPosition } from '../../lib/types';
import { Toolbar, ToolbarItem, Tooltip } from './styles';
import { IconTextPosition } from './Icons';

type Props = {
  position?: TextPosition;
  onChange: (color: TextPosition) => void;
};

export function TextPositionPicker(props: Props) {
  const [position, setPosition] = useState<TextPosition>(
    props.position || 'middle',
  );
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
    if (props.position) {
      setPosition(props.position);
    }
  }, [setPosition, props.position]);

  function onChange(value: TextPosition) {
    if (value !== position) {
      if (!props.position) {
        setPosition(value);
      }
      props.onChange(value);
    }
  }

  return (
    <div ref={ref}>
      {showTooltip && (
        <Tooltip>
          <Toolbar condensed>
            <ToolbarItem onClick={() => onChange('middle')}>
              <IconTextPosition
                position="middle"
                inactive={position !== 'middle'}
                data-testid="text-position-picker--middle"
              />
            </ToolbarItem>

            <ToolbarItem onClick={() => onChange('top')}>
              <IconTextPosition
                position="top"
                inactive={position !== 'top'}
                data-testid="text-position-picker--top"
              />
            </ToolbarItem>

            <ToolbarItem onClick={() => onChange('bottom')}>
              <IconTextPosition
                position="bottom"
                inactive={position !== 'bottom'}
                data-testid="text-position-picker--bottom"
              />
            </ToolbarItem>
          </Toolbar>
        </Tooltip>
      )}

      <IconTextPosition
        position={position}
        onClick={() => setShowTooltip(true)}
        data-testid="text-position-picker"
        data-value={position}
      />
    </div>
  );
}
