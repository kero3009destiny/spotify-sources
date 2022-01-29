// ignore-string-externalization
import React, { ReactNode, isValidElement } from 'react';
import styled from 'styled-components';
import {
  FormInput,
  DropdownList,
  DropdownLink,
  spacer16,
  spacer8,
} from '@spotify-internal/encore-web';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  unstable_useKeyDown as useKeyDown,
} from '@reach/combobox';

import * as reach from '@reach/combobox';
import '@reach/combobox/styles.css';

const NoPaddingOption = styled(ComboboxOption).withConfig({
  shouldForwardProp: (prop, defPropValFN) =>
    !['isUsingKeyboard'].includes(prop) && defPropValFN(prop),
})`
  &[data-reach-combobox-option] {
    padding: 14px ${spacer16};
  }
`;

const RemovedPropComboboxList = styled(ComboboxList).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    // ['isUsingKeyboard'].includes(prop) needed instead of prop !== 'isUsingKeyboard' because of odd typing issue
    !['isUsingKeyboard'].includes(prop) && defaultValidatorFn(prop),
})`
  /* We're picking up some stray styles when a non-option in the list is mouse-downed */
  &:focus {
    border-width: 0;
  }
`;

const RemovedPropComboboxInput = styled(ComboboxInput).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    // ['isUsingKeyboard'].includes(prop) needed instead of prop !== 'isUsingKeyboard' because of odd typing issue
    (!['isUsingKeyboard'].includes(prop) && defaultValidatorFn(prop)) ||
    prop === 'autocomplete', // @reach-ui needs this
})``;

export const FormComboboxInput = styled(FormInput).attrs({
  forwardedAs: RemovedPropComboboxInput,
})``;

export const FormComboboxOption = styled(DropdownLink).attrs({
  forwardedAs: NoPaddingOption,
})``;

export const FormComboboxList = styled(DropdownList).attrs({
  forwardedAs: RemovedPropComboboxList,
})``;

export const FormComboboxPopover = styled(ComboboxPopover)`
  /* more specificity to override the default @reach/combobox border */
  && {
    border: 0;
  }
  padding-top: ${spacer8};
`;

// Options need to have a `value` property, but can
// have any other propeties the user wants.
// This is useful for when the user is searching
// and selecting on the "value" but you want to actually
// maintain an "id" in code for use elsewhere
type Option<T extends { value: string }> = T;

/**
 * Always always spread these props over your input in order to
 * hook into the ComboboxInput functionality.
 *
 * At the very least, if you aren't using an encore FormInput element
 * then render the `as` prop by itself as that is the baseline
 * ComboboxInput component.
 */
export type FormComboboxInputProps = {
  as: typeof ComboboxInput;
  id?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  /**
   * make this input behave like the browser address bar; select all text
   * when the user focuses the input
   */
  selectOnClick?: boolean;
  /**
   * This function is mainly used to ensure that a focused
   * item scrolls into the view when focused using the keyboard.
   * Not to capture the user's input.
   */
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    force?: boolean,
  ) => void;
};

type Props<T extends { value: string }> = {
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  placeholder?: string;
  value: string;
  options?: (Option<T> | ReactNode)[];
  disabled?: boolean;
  openOnFocus?: boolean;
  /**
   * Creates and appends a DOM node to the end of document.body and renders a React tree into it
   * https://reach.tech/portal/
   */
  portal?: boolean;
  stylePopover?: React.CSSProperties;
  styleDropdown?: React.CSSProperties;
  /**
   * make this input behave like the browser address bar; select all text
   * when the user focuses the input
   */
  selectOnClick?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (value: string, dataObject?: Option<T>) => void;
  /**
   * Advanced! use at your own risk!
   */
  renderInput?: (props: FormComboboxInputProps) => React.ReactNode;
  /**
   * Advanced! use at your own risk!
   */
  renderEntity?: (entity: Option<T>) => React.ReactNode;
  getReachOnKeyDown?: any;
};

function defaultRenderEntity(entity: { value: string }) {
  return entity.value;
}

function defaultRenderInput(props: FormComboboxInputProps) {
  return <FormInput {...props} />;
}

export function useComboboxKeydown() {
  const listRef = React.useRef<HTMLUListElement>(null);

  // handle Keyboard up / down arrow scrolling the item into view
  // https://github.com/reach/reach-ui/issues/357#issuecomment-575849548
  function onKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    force = false,
  ) {
    if (event.isDefaultPrevented() && !force) return;

    const container = listRef.current;
    if (!container) return;

    window.requestAnimationFrame(() => {
      // query during the animation frame to be sure the correct element
      // is scrolled into view
      const elem = container.querySelector<HTMLElement>('[aria-selected=true]');
      if (!elem) return;

      const top = elem.offsetTop - container.scrollTop;
      const bottom =
        container.scrollTop +
        container.clientHeight -
        (elem.offsetTop + elem.clientHeight);

      if (bottom < 0) container.scrollTop -= bottom;
      if (top < 0) container.scrollTop += top;
    });
  }

  return { listRef, onKeyDown };
}

export function FormCombobox<T extends { value: string }>(props: Props<T>) {
  const {
    id,
    ariaLabel,
    ariaLabelledBy,
    placeholder,
    value,
    options,
    disabled,
    openOnFocus,
    selectOnClick,
    portal = true,
    stylePopover = {},
    styleDropdown = {},
    onChange,
    onSelect,
    renderInput = defaultRenderInput,
    renderEntity = defaultRenderEntity,
    getReachOnKeyDown = () => {},
  } = props as any;

  const { listRef, onKeyDown } = useComboboxKeydown();

  // https://github.com/reach/reach-ui/pull/628
  // once that merges, deploys, and the new version gets here
  // we can remove this onClick handler altogether and the onSelect API will include a data object as its second argument out of the box.
  const handleClick = (target: HTMLElement, displayValue: string) => {
    if (!onSelect || !options) {
      return null;
    }

    const selectedIndexString = target.dataset.index;
    const selectedIndex = Number(selectedIndexString);
    const selectedOption = options[selectedIndex];

    return onSelect(displayValue, selectedOption);
  };

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    force = false,
  ) {
    const container = listRef.current;
    if (!container) return;

    const eventKeyCode = event.keyCode;
    const eventKey = event.key;

    // Hack to make selecting an option via keyboard work...
    // only really used in the FormCombobox itself but not
    // really needed for advanced solutions
    const element = container.querySelector<HTMLUListElement>(
      '[aria-selected=true]',
    );
    if (element && (eventKeyCode === 13 || eventKey === 'Enter')) {
      const displayValue = element.dataset.value;
      if (displayValue) {
        handleClick(element, displayValue);
      }
    }

    onKeyDown(event, force);
  }

  return (
    <Combobox
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      openOnFocus={openOnFocus}
    >
      <ReachOnKeyDownSync syncReachOnKeyDown={getReachOnKeyDown} />
      {renderInput({
        as: RemovedPropComboboxInput,
        id,
        placeholder,
        onChange,
        value,
        disabled,
        onKeyDown: handleKeyDown,
        selectOnClick,
      })}
      {/* 1338 To render above DialogFullscreen */}
      <FormComboboxPopover
        portal={portal}
        style={{ ...stylePopover, zIndex: stylePopover.zIndex || 1338 }}
      >
        {options && options.length > 0 && (
          <FormComboboxList
            id="the-list-combo"
            ref={listRef}
            style={styleDropdown}
          >
            {options.map((opt: any, index: any) =>
              isValidElement(opt) ? (
                opt
              ) : (
                <FormComboboxOption
                  value={opt.value}
                  // Passing in a combo of `opt.value` and `index` into the key to ensure uniqueness (multiple opts may have same value)
                  key={`${opt.value}-${index}`}
                  onClick={e => handleClick(e.currentTarget, opt.value)}
                  data-value={opt.value}
                  data-index={index}
                  // https://github.com/reach/reach-ui/pull/628
                  // once that merges, deploys, and the new version gets here
                  // uncomment that line!
                  // selectData={opt}
                >
                  {renderEntity(opt)}
                </FormComboboxOption>
              ),
            )}
          </FormComboboxList>
        )}
      </FormComboboxPopover>
    </Combobox>
  );
}

const ReachOnKeyDownSync: any = ({ syncReachOnKeyDown }: any) => {
  const func = useKeyDown();
  syncReachOnKeyDown?.(func);
  return null;
};
