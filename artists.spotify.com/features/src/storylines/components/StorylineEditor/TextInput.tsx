import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { spacer32, spacer48, spacer64 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { StorylineTextEditor, TextProperties } from '../../lib/types';
import {
  CARD_BORDER_RADIUS,
  CARD_CHAR_LIMIT,
  CARD_LINE_LIMIT,
} from '../../lib/constants';

const positionToFlex = {
  middle: 'center',
  top: 'flex-start',
  bottom: 'flex-end',
};

const InputWrapper = styled.div<{ properties: TextProperties }>`
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  align-items: ${props => (positionToFlex as any)[props.properties.position]};
  border-radius: ${CARD_BORDER_RADIUS};
  bottom: 0;
  cursor: text;
  display: flex;
  left: 0;
  padding: ${spacer48} ${spacer32} ${spacer64};
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

const Textarea = styled.textarea<{ properties: TextProperties }>`
  background: none;
  border: 0;
  color: ${props => props.properties.color};
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  max-height: calc(${CARD_LINE_LIMIT} * 1.4em);
  outline: none;
  padding: 0;
  resize: none;
  text-align: ${props => props.properties.align};
  width: 100%;

  &::placeholder {
    color: ${props => props.properties.color};
    opacity: 0.6;
  }
`;

type Props = {
  textEditor: StorylineTextEditor;
  onChange: (value: string) => void;
};

export function TextInput({ textEditor, onChange }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [formValue, setFormValue] = useState(
    textEditor.content ? textEditor.content : '',
  );
  const [textareaResized, setTextareaResized] = useState(false);
  const t = useT();

  useEffect(() => {
    setFormValue(textEditor.content);
  }, [textEditor.content]);

  const resizeTextarea = () => {
    const currentRef = inputRef.current;

    if (currentRef) {
      currentRef.style.height = 'auto';
      currentRef.style.height = `${currentRef.scrollHeight}px`;
    }
  };

  const delayedResizeTextarea = () => {
    window.setTimeout(resizeTextarea, 0);
  };

  // Reevaluate the text input on Back from Preview
  useEffect(() => {
    if (!textareaResized && formValue.length) {
      resizeTextarea();
      setTextareaResized(true);
    }
  }, [textareaResized, formValue]);

  const handleOnChange = (inputValue: string) => {
    // When we hit the character limit, trigger an onChange
    // event to allow for error handling
    if (inputValue.length >= CARD_CHAR_LIMIT) {
      onChange(inputValue);
    }

    setFormValue(inputValue);
    resizeTextarea();
  };

  return (
    <InputWrapper
      properties={textEditor.properties}
      onClick={() => {
        inputRef.current && inputRef.current.focus();
      }}
    >
      <Textarea
        data-slo-id="storyline-text-input"
        ref={inputRef}
        maxLength={CARD_CHAR_LIMIT}
        placeholder={t(
          'STORYLINES_TEXT_PLACEHOLDER',
          'Type here...',
          'placeholder text',
        )}
        rows={1}
        properties={textEditor.properties}
        value={formValue}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleOnChange(event.target.value)
        }
        onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
          switch (event.key) {
            case 'Escape':
              event.currentTarget.blur();
              break;
            default:
              delayedResizeTextarea();
              break;
          }
        }}
        onBlur={() => {
          if (textEditor.content !== formValue) {
            onChange(formValue);
          }
        }}
      />
    </InputWrapper>
  );
}
