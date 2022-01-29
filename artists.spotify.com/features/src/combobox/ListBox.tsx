/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import type { AriaListBoxOptions } from '@react-aria/listbox';
import type { ListState } from 'react-stately';
// eslint-disable-next-line
import type { Node } from '@react-types/shared';
import { useListBox, useListBoxSection, useOption } from 'react-aria';

import styled from 'styled-components';

import {
  FormInput,
  DropdownList,
  DropdownLink,
  spacer16,
  spacer8,
} from '@spotify-internal/encore-web';

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
  isRtl: boolean;
  children?: React.ReactNode;
}

interface SectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

const RemovedPropComboboxList = styled.ul.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    // ['isUsingKeyboard'].includes(prop) needed instead of prop !== 'isUsingKeyboard' because of odd typing issue
    !['isUsingKeyboard'].includes(prop) && defaultValidatorFn(prop),
})`
  /* We're picking up some stray styles when a non-option in the list is mouse-downed */
  &:focus {
    border-width: 0;
  }
`;

// added level of indirection since I am not smart enough to add TS props to ComboboxList because of attrs() call
const DirectionAwareDropdownList = styled(DropdownList)<{ isRtl: boolean }>``;

export const ComboboxList = styled(DirectionAwareDropdownList).attrs<{
  isRtl: any;
}>({
  forwardedAs: RemovedPropComboboxList,
})`
  padding: 0;
  max-height: 320px;
  & > :first-child {
    margin-top: ${spacer8};
  }
  & > :last-child {
    margin-bottom: ${spacer8};
  }
  direction: ${props => (props.isRtl ? 'rtl' : void 0)};
`;

const NoPaddingOption = styled.li.withConfig({
  shouldForwardProp: (prop, defPropValFN) =>
    !['isUsingKeyboard'].includes(prop) && defPropValFN(prop),
})`
  &[role='option'] {
    padding: 14px ${spacer16};
    font-size: 14px;
    letter-spacing: 0.25px;
    line-height: 20px;
  }

  &[role='option'][data-key^='group-'] {
    padding: ${spacer8};

    & > * {
      margin: 0;
      font-weight: 400;
      letter-spacing: 0.25px;
    }
  }
  &[role='option']:not([aria-disabled='true']):hover {
    background-color: #f6f6f6;
  }
  &[role='option'][data-is-focused='true'] {
    background-color: #f1f2f4;
  }
  &[role='option'][data-is-focused='true']:hover {
    background-color: #e3e5e8;
  }
`;

export const FormComboboxOption = styled(DropdownLink).attrs({
  forwardedAs: NoPaddingOption,
});

export function ListBox(props: ListBoxProps) {
  const ref = React.useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state, children } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  return (
    <ComboboxList {...listBoxProps} isRtl={props.isRtl} ref={listBoxRef}>
      {children ?? null}
      {[...state.collection].map(item =>
        item.type === 'section' ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        ),
      )}
    </ComboboxList>
  );
}

function ListBoxSection({ section, state }: SectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <>
      <li {...itemProps} className="pt-2">
        {section.rendered && <span {...headingProps}>{section.rendered}</span>}
        <ul {...groupProps}>
          {[...section.childNodes].map(node => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

function Option({ item, state }: OptionProps) {
  const ref = React.useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  );

  return (
    <NoPaddingOption {...optionProps} data-is-focused={isFocused} ref={ref}>
      {item.rendered}
    </NoPaddingOption>
  );
}
