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
} from 'react';
import { useComboBox } from 'react-aria';

import { ComboBoxStateProps } from '@react-stately/combobox';
import { Item, useComboBoxState } from 'react-stately';

import styled from 'styled-components';
import {
  FormGroup,
  FormInputIcon,
  IconSearch,
  ButtonIcon,
  IconX,
  FormInput,
} from '@spotify-internal/encore-web';

import { useT, useRtl } from '@mrkt/features/i18n';

import {
  EntityGroupTitle,
  EntityOptionDisplay,
  NoResultsEntityOptionDisplay,
} from './EntityOptionDisplay';
import { EntityPacket, EntityPickerRefAPI, EntityResult } from './sharedTypes';

import { ListBox } from './ListBox';
import { Popover } from './Popover';

export type { EntityPacket };

type NoResults = {
  name: 'empty state';
  value: 'no-results';
  RESULT_TYPE: 'empty state';
};

export type EntityPickerResultItem = EntityResult | NoResults;

import { ComboboxRoot as EntityPickerRoot } from './uiHelpers';

const noResultsState = (): [NoResults] => [
  {
    name: 'empty state',
    value: 'no-results',
    RESULT_TYPE: 'empty state',
  },
];

const StyledFormGroup = styled(FormGroup)`
  padding-bottom: 0;
`;

export type EntityPickerProps = {
  id?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  className?: string;
  noClearButton?: boolean;
  isOpen?: boolean;
  defaultResults?: EntityPickerResultItem[];
  getEntities(
    search: string,
  ): Promise<EntityPickerResultItem[]> | EntityPickerResultItem[];
  onSelect?(item: EntityPacket): void;
  onChange?(value: string): void;
  disabled?: boolean;
  enableSubDisplays?: boolean;
  onClear?: () => void;
  resultsPosition?: 'top' | 'bottom';
  children?: React.ReactNode;
};

type RenderEntityProps = {
  entityOption: EntityPickerResultItem;
  inputValue: string;
  enableSubDisplay: boolean;
};

const RenderEntity: FunctionComponent<RenderEntityProps> = props => {
  const { entityOption, inputValue, enableSubDisplay } = props;

  if (entityOption.RESULT_TYPE === 'empty state') {
    return <NoResultsEntityOptionDisplay inputValue={inputValue} />;
  } else if (entityOption.RESULT_TYPE === 'group label') {
    return <EntityGroupTitle>{entityOption.name}</EntityGroupTitle>;
  }
  return (
    <EntityOptionDisplay
      enableSubDisplays={enableSubDisplay}
      entityOption={entityOption}
    />
  );
};

const _EntityPicker: ForwardRefRenderFunction<
  EntityPickerRefAPI,
  EntityPickerProps
> = (props, ref) => {
  const {
    id,
    placeholder,
    label,
    value,
    className,
    getEntities,
    onSelect,
    onChange,
    noClearButton,
    disabled = false,
    enableSubDisplays = false,
    isOpen,
    onClear,
    defaultResults,
    resultsPosition,
    children,
  } = props;
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<EntityPickerResultItem[]>(
    defaultResults ?? [],
  );

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

  const userResultsShown = useRef(false);
  useEffect(() => {
    let isActive = true;
    if (currentValue) {
      Promise.resolve(getEntities(currentValue)).then(result => {
        if (!isActive) {
          return;
        }

        if (!result.length) {
          setSearchResults(noResultsState());
        } else {
          setSearchResults(result);
        }
        userResultsShown.current = true;
      });
    } else {
      if (userResultsShown.current) {
        // don't wipe our default results on initial effect call
        setSearchResults([]);
      }
    }

    return () => {
      isActive = false;
    };
  }, [currentValue]);

  const handleChange = (newValue: string) => {
    onChange?.(newValue);
    if (!isControlled.current) {
      setInputValue(newValue);
    }
  };

  const handleSelect = (dataObj?: EntityPickerResultItem) => {
    if (
      !dataObj ||
      dataObj.RESULT_TYPE === 'empty state' ||
      dataObj.RESULT_TYPE === 'group label'
    ) {
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

  return (
    <EntityPickerRoot data-testid="entity-picker-v2" className={className}>
      <ComboBoxContainer
        id={id}
        onChange={handleChange}
        currentValue={currentValue}
        entities={searchResults}
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
        resultsPosition={resultsPosition}
        PopoverContent={children}
      >
        {item => (
          <Item key={item.value} textValue={item.name}>
            <RenderEntity
              entityOption={item}
              enableSubDisplay={enableSubDisplays}
              inputValue={currentValue}
            />
          </Item>
        )}
      </ComboBoxContainer>
    </EntityPickerRoot>
  );
};

export const EntityPicker = forwardRef(_EntityPicker);

type ComboBoxContainerProps = {
  id?: string;
  isOpen?: boolean;
  currentValue: string;
  placeholder?: string;
  label?: string;
  onChange: (value: string) => void;
  entities: EntityPickerResultItem[];
  onSelect: (entity: EntityPickerResultItem) => void;
  noClearButton?: boolean;
  disabled?: boolean;
  clearInput: () => void;
  syncInputRef: (el: HTMLInputElement | null) => void;
  resultsPosition?: 'top' | 'bottom';
  PopoverContent?: React.ReactNode;
};

const ComboBoxContainer: FunctionComponent<
  ComboBoxContainerProps & ComboBoxStateProps<EntityPickerResultItem>
> = props => {
  const {
    id,
    currentValue,
    onChange,
    entities,
    isOpen: isOpenControlled,
    placeholder,
    label,
    onSelect,
    noClearButton,
    clearInput,
    disabled,
    syncInputRef,
    PopoverContent,
    resultsPosition,
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
    items: entities,
    menuTrigger: isOpenControlled == null ? 'focus' : 'manual',
    onInputChange: onChange,
    selectedKey: '',
    disabledKeys: types.map(type => `group-${type}`).concat('no-results'),
    onSelectionChange: key => {
      const entity = entities.find(e => e.value === key);
      if (entity != null) {
        onSelect(entity);
      }
    },
    isDisabled: disabled,
  });

  useEffect(() => {
    // controlled mode for the open state of the combobox isn't directly supported in react-aria, but we can fake it pretty well.
    // React-aria gives us methods to manually open and close the combobox, as well as access to the currently open/closed
    // state, so we can detect when there's a mismatch between what we want, and what the open state actually is, and manually rectify.
    // One common way such a mismatch can usually occur is via the input's blur event, on which react-aria will close the results pane.
    // We detect the subsequent state mismatch, and fix.
    // NOTE: this mismatch will not be detectable to the user. The results pane will always be visible when OUR open state is set to true.
    // The only user-facing consequence of the open state mismatch is that keyboard events will not work correctly. If react-aria thinks the
    // combobox is closed, then the next time the user hits the down arrow button, react-aria will move to open the results pane, rather than
    // select the next item. That incorrect keyboard navigation is what this fixes
    if (isOpenControlled != null && isOpenControlled !== state.isOpen) {
      if (isOpenControlled) {
        state.open();
      } else {
        state.close();
      }
    }
  }, [state.isOpen, isOpenControlled]);

  function adjustScrollPositionAfterKeyboardNav() {
    const focusedKey = state.selectionManager.focusedKey;
    const labelKeyLookups = new Set(types.map(type => `group-${type}`));

    // if the first item becomes focused, scroll all the way to the top of the results
    // pane, so we're not hiding any labels, or user-added content
    if (
      // check if the zero'th entity is a group label, ie "Artists", and [1] entity is focused (which is effectively the first entity)
      (labelKeyLookups.has(entities[0]?.value) &&
        focusedKey === entities[1]?.value) ||
      // or just the first entity is focused
      focusedKey === entities[0]?.value
    ) {
      listBoxRef.current?.scrollTo?.(0, 0);
    }
  }

  const defaultLabel = t('f8f19a', 'Search or paste a Spotify link', '');

  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef(null);

  const labelText = placeholder || defaultLabel;

  const { inputProps, listBoxProps } = useComboBox(
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
      adjustScrollPositionAfterKeyboardNav();
    }
  };

  useEffect(() => {
    syncInputRef(inputRef.current);
  }, [inputRef.current]);

  const isComboboxOpen = isOpenControlled ?? openStateOverride ?? state.isOpen;

  return (
    <>
      <StyledFormGroup id={id} label={label} labelFor="entity-search">
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
        position={resultsPosition}
      >
        <ListBox
          {...listBoxProps}
          isRtl={isRtl}
          listBoxRef={listBoxRef}
          state={state}
        >
          {PopoverContent ? PopoverContent : null}
        </ListBox>
      </Popover>
    </>
  );
};
