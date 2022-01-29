import React, {
  FunctionComponent,
  useState,
  useEffect,
  useRef,
  KeyboardEvent as KeyboardEventType,
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  useImperativeHandle,
  ReactNode,
} from 'react';

import { useComboBox } from 'react-aria';
import { Item, useComboBoxState } from 'react-stately';
import { ComboBoxStateProps } from '@react-stately/combobox';

import styled from 'styled-components';

import { useRtl, useT } from '@mrkt/features/i18n';

import { ComboboxDisplay } from './EntityOptionDisplay';
import { ListBox } from './ListBox';
import { Popover } from './Popover';

import {
  FormInputIcon,
  IconSearch,
  ButtonIcon,
  IconX,
  FormGroup,
  FormInput,
} from '@spotify-internal/encore-web';

import { EntityPickerRefAPI } from './sharedTypes';

import { ComboboxRoot } from './uiHelpers';

const StyledFormGroup = styled(FormGroup)`
  padding-bottom: 0;
`;

export type ComboboxProps = {
  placeholder?: string;
  label?: string;
  value?: string;
  className?: string;
  noClearButton?: boolean;
  isOpen?: boolean;
  options: ComboboxOption[];
  onSelect?(item: ComboboxOption): void;
  onChange?(value: string): void;
  renderEntity?(option: ComboboxOption): ReactNode;
  disabled?: boolean;
  enableSubDisplays?: boolean;
  onClear?: () => void;
};

const _Combobox: ForwardRefRenderFunction<EntityPickerRefAPI, ComboboxProps> = (
  props,
  ref,
) => {
  const {
    placeholder,
    label,
    value,
    className,
    options,
    onSelect,
    onChange,
    noClearButton,
    disabled = false,
    isOpen,
    onClear,
    renderEntity,
  } = props;
  const [inputValue, setInputValue] = useState('');

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  useImperativeHandle(ref, () => ({
    sendKeyDown(e: KeyboardEventType) {
      if (inputRef.current != null) {
        inputRef.current.dispatchEvent(
          new KeyboardEvent('keydown', e.nativeEvent),
        );
      }
    },
  }));

  // controlled state is determined de novo based on whether a value prop is passed
  const isControlled = useRef<boolean>(value !== void 0);
  const currentValue: string = isControlled.current ? value! : inputValue;

  useEffect(() => {
    // Trick react-aria to respect OUR open state. We'll force a down arrow press, to make it open from react-aria's perspective, so the next down arrow
    // properly navigates
    if (isControlled.current && isOpen) {
      inputRef.current?.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'ArrowDown',
          key: 'ArrowDown',
          keyCode: 40,
          bubbles: true,
        }),
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isControlled.current && value === void 0) {
      throw `Error. Entity picker has changed from controlled mode, to uncontrolled mode. When a \`value\` prop is passed initially, it must always be passed`;
    }

    if (!isControlled.current && value !== void 0) {
      throw `Error. Entity picker has changed from uncontrolled mode, to controlled mode. If a \`value\` prop is not passed initially, it must never be passed`;
    }
  }, [value]);

  const handleChange = (newValue: string) => {
    onChange?.(newValue);
    if (!isControlled.current) {
      setInputValue(newValue);
    }
  };

  const handleSelect = (dataObj?: ComboboxOption) => {
    if (!dataObj) {
      return;
    }
    setInputValue('');
    onSelect?.(dataObj);

    // Close the results pane, in the off chance the user is doing something other than clearing the text input (if they are, this will have no effect)
    // obviously setTimeout is not ideal here, but we need to flush everything else, first, or else this state change will be overriden by React
    setTimeout(() => {
      inputRef.current?.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'Escape',
          key: 'Escape',
          keyCode: 27,
          bubbles: true,
        }),
      );
    });
  };

  const isRtl = useRtl();

  return (
    <ComboboxRoot data-testid="entity-picker-v2" className={className}>
      <ComboboxContainer
        onChange={handleChange}
        currentValue={currentValue}
        options={options}
        isOpen={isOpen}
        onSelect={handleSelect}
        noClearButton={noClearButton}
        clearInput={() => {
          onChange?.('');
          !isControlled.current && setInputValue('');
          onClear?.();
        }}
        placeholder={placeholder}
        label={label}
        disabled={disabled}
        syncInputRef={el => (inputRef.current = el)}
      >
        {item => (
          <Item key={item.id} textValue={item.value}>
            {renderEntity ? (
              renderEntity(item)
            ) : (
              <ComboboxDisplay value={item.value} />
            )}
          </Item>
        )}
      </ComboboxContainer>
    </ComboboxRoot>
  );
};

export const Combobox = forwardRef(_Combobox);

interface ComboboxOption {
  id: string;
  value: string;
}

type ComboboxContainerProps = {
  isOpen?: boolean;
  currentValue: string;
  placeholder?: string;
  label?: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  onSelect: (entity: ComboboxOption) => void;
  noClearButton?: boolean;
  disabled?: boolean;
  clearInput: () => void;
  syncInputRef: (el: HTMLInputElement | null) => void;
};

const ComboboxContainer: FunctionComponent<
  ComboboxContainerProps & ComboBoxStateProps<ComboboxOption>
> = props => {
  const {
    currentValue,
    onChange,
    options,
    isOpen: isOpenControlled,
    placeholder,
    onSelect,
    noClearButton,
    clearInput,
    disabled,
    syncInputRef,
    label,
    ...rest
  } = props;

  const t = useT();
  const isRtl = useRtl();

  // a small amount of trickery to get the exact open state we want - escape should close the results pane, BUT it should re-open when you click, or continue typing
  const [openStateOverride, setOpenStateOverride] = useState<false | null>(
    null,
  );

  const types = ['album', 'artist', 'episode', 'playlist', 'show', 'track'];

  const state = useComboBoxState({
    ...rest,
    allowsEmptyCollection: true,
    allowsCustomValue: true,
    inputValue: currentValue,
    items: options,
    menuTrigger: isOpenControlled == null ? 'focus' : 'input',
    onInputChange: onChange,
    selectedKey: '',
    disabledKeys: types.map(type => `group-${type}`).concat('no-results'),
    onSelectionChange: key => {
      const entity = options.find(e => e.id === key);
      if (entity != null) {
        onSelect(entity);
      }
    },
    isDisabled: disabled,
  });

  const defaultLabel = t('f8f19a', 'Search or paste a Spotify link', '');

  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const labelText = placeholder || defaultLabel;

  const { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...rest,
      inputRef,
      listBoxRef,
      popoverRef,
      label: labelText,
      shouldFocusWrap: true,
    },
    state,
  );

  useEffect(() => {
    setOpenStateOverride(null);
  }, [inputProps.value]);

  const onBlurAdjusted = (e: React.FocusEvent<HTMLInputElement>) => {
    setOpenStateOverride(null);
    inputProps.onBlur?.(e);
  };

  const { onKeyDown } = inputProps;

  const onKeyDownAdjusted = (e: KeyboardEventType<HTMLInputElement>) => {
    onKeyDown?.(e);

    if (e.key === 'Esc' || e.key === 'Escape') {
      setOpenStateOverride(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      setOpenStateOverride(null);
    }
  };

  useEffect(() => {
    syncInputRef(inputRef.current);
  }, [inputRef.current]);

  const isComboboxOpen = isOpenControlled ?? openStateOverride ?? state.isOpen;

  return (
    <>
      <StyledFormGroup label={label} labelFor="entity-search">
        <FormInputIcon
          id="entity-search"
          iconLeading={<IconSearch />}
          iconTrailing={
            currentValue && !noClearButton && !isRtl ? (
              <ButtonIcon data-testid="clear-button" onClick={clearInput}>
                <IconX aria-hidden="true" />
              </ButtonIcon>
            ) : undefined
          }
        >
          <FormInput
            ref={inputRef}
            {...inputProps}
            disabled={disabled}
            onKeyDown={onKeyDownAdjusted}
            onBlur={onBlurAdjusted}
            onClick={() => setOpenStateOverride(null)}
            type="text"
            data-testid="search-input"
            data-slo-id="search-input"
            placeholder={placeholder}
            // @ts-ignore
            autocomplete={false}
          />
        </FormInputIcon>
      </StyledFormGroup>

      <Popover
        popoverRef={popoverRef}
        isOpen={isComboboxOpen}
        onClose={state.close}
        inputRef={inputRef}
      >
        <ListBox
          {...listBoxProps}
          isRtl={isRtl}
          listBoxRef={listBoxRef}
          state={state}
        />
      </Popover>
    </>
  );
};
