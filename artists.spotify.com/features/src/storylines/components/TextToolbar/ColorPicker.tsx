import React, { useState, useRef, useEffect, useCallback } from 'react';

import { white, black } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { TextColor } from '../../lib/types';
import {
  Toolbar,
  ToolbarItem,
  Tooltip,
  ColorDot,
  HexLabel,
  HexInput,
} from './styles';

const defaultColors: TextColor[] = [white, black].map(c => c.toUpperCase());

type Props = {
  color?: TextColor;
  onChange: (color: TextColor) => void;
};

const validHex = /^(?:[0-9a-f]{3}){1,2}$/i;

export function ColorPicker(props: Props) {
  const { onChange } = props;
  const [color, setColor] = useState<TextColor>(
    (props.color || white).toUpperCase(),
  );
  const [colorPalette, setColorPalette] = useState<TextColor[]>(defaultColors);
  const [customColor, setCustomColor] = useState<TextColor>('');
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useT();

  const changeColor = useCallback(
    (value: TextColor) => {
      if (value !== color) {
        if (!props.color) {
          setColor(value);
        }
        onChange(value);
      }
    },
    [setColor, color, onChange, props.color],
  );

  const changeCustomColor = useCallback(
    (value: TextColor, hideTooltipIfValid?: boolean) => {
      let cleanedCustomColor = value
        .replace(/[^a-f0-9]/gi, '')
        .toUpperCase()
        .substring(0, 6);

      if (cleanedCustomColor !== customColor) {
        setCustomColor(cleanedCustomColor);

        if (validHex.test(cleanedCustomColor)) {
          if (cleanedCustomColor.length === 3) {
            const [hex1, hex2, hex3] = cleanedCustomColor;
            cleanedCustomColor = `${hex1}${hex1}${hex2}${hex2}${hex3}${hex3}`;
          }
          changeColor(`#${cleanedCustomColor}`);
          setColorPalette([...defaultColors, `#${cleanedCustomColor}`]);
        }
      }

      if (hideTooltipIfValid && validHex.test(cleanedCustomColor)) {
        setShowTooltip(false);
      }
    },
    [setCustomColor, customColor, changeColor],
  );

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
    if (props.color) {
      setColor(props.color.toUpperCase());
    }
  }, [setColor, props.color]);

  return (
    <div ref={ref}>
      {showTooltip && (
        <Tooltip>
          <Toolbar condensed>
            {colorPalette.map(c => {
              return (
                <ToolbarItem
                  key={c}
                  onClick={() => {
                    changeColor(c);
                    setCustomColor('');
                  }}
                >
                  <ColorDot
                    color={c}
                    active={c === color}
                    data-testid={`color-picker--${c}`}
                  />
                </ToolbarItem>
              );
            })}

            <HexLabel>
              <HexInput
                value={customColor.replace('#', '')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeCustomColor(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  switch (e.key) {
                    case 'Enter':
                      changeCustomColor(customColor, true);
                      break;
                    case 'Escape':
                      setShowTooltip(false);
                      break;
                  }
                }}
                data-testid="color-picker--custom"
                type="text"
                placeholder={t(
                  'STORYLINES_COLOR_PICKER',
                  'Enter HEX',
                  'Describes entering a HEX color value',
                )}
              />
            </HexLabel>
          </Toolbar>
        </Tooltip>
      )}

      <ColorDot
        color={color}
        onClick={() => setShowTooltip(true)}
        data-testid="color-picker"
        data-value={color}
      />
    </div>
  );
}
