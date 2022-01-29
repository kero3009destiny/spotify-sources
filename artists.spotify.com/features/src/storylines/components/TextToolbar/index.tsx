// ignore-string-externalization
import React, { useState, useEffect } from 'react';

import { white } from '@spotify-internal/encore-web';
import {
  TextAlignment,
  TextColor,
  TextPosition,
  TextProperties,
} from '../../lib/types';
import { Toolbar, ToolbarItem } from './styles';
import { ColorPicker } from './ColorPicker';
import { TextAlignPicker } from './TextAlignPicker';
import { TextPositionPicker } from './TextPositionPicker';

type Props = {
  color?: TextColor;
  align?: TextAlignment;
  position?: TextPosition;
  onChange: (properties: TextProperties) => void;
};

export function TextToolbar(props: Props) {
  const [color, setColor] = useState<TextColor>(props.color || white);
  const [align, setAlign] = useState<TextAlignment>(props.align || 'left');
  const [position, setPosition] = useState<TextPosition>(
    props.position || 'middle',
  );

  useEffect(() => {
    if (props.color) {
      setColor(props.color);
    }
    if (props.align) {
      setAlign(props.align);
    }
    if (props.position) {
      setPosition(props.position);
    }
  }, [
    setColor,
    setAlign,
    setPosition,
    props.color,
    props.align,
    props.position,
  ]);

  return (
    <Toolbar>
      <ToolbarItem>
        <ColorPicker
          color={color}
          onChange={value => {
            if (!props.color) {
              setColor(value);
            }
            props.onChange({ align, color: value, position });
          }}
        />
      </ToolbarItem>

      <ToolbarItem>
        <TextAlignPicker
          align={align}
          onChange={value => {
            if (!props.align) {
              setAlign(value);
            }
            props.onChange({ align: value, color, position });
          }}
        />
      </ToolbarItem>

      <ToolbarItem>
        <TextPositionPicker
          position={position}
          onChange={value => {
            if (!props.position) {
              setPosition(value);
            }
            props.onChange({ align, color, position: value });
          }}
        />
      </ToolbarItem>
    </Toolbar>
  );
}
