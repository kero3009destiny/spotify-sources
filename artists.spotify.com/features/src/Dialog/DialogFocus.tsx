// ignore-string-externalization
import React, { useRef, useEffect } from 'react';
import FocusLock from 'react-focus-lock';

/**
 * This component exists as a temporary accessible solution
 * for dialogs until there is a global one provided by encore.
 *
 * Takes a component and wraps it in react-focus-lock.
 * This will trap focus to stay within the component when
 * tabbing on a keyboard or navigating using a screen reader.
 *
 * When the dialog is closed this returns focus to the element
 * that triggered the dialog.
 */

type FocusProps = {
  ['aria-labelledby']?: string;
  dialogTitle?: React.ReactNode;
  ref: React.RefObject<HTMLElement>;
  tabIndex: number;
};

export type Props = {
  dialogId: string;
  dialogTitle?: React.ReactNode;
  refOverride?: React.RefObject<HTMLElement>;
};

type Children = {
  children: (renderProps: FocusProps) => JSX.Element;
};

export function DialogFocus(props: Props & Children) {
  const refDefault = useRef<HTMLElement>(null);
  const ref = props.refOverride || refDefault;
  const focusProps: FocusProps = { tabIndex: -1, ref };

  if (props.dialogTitle) {
    // If `dialogTitle` is specified, we append `aria-labelledby`
    // to the dialog root and `id` to the dialog title.
    // If there is no `dialogTitle`, `aria-label` should be specified
    focusProps.dialogTitle = (
      <span id={props.dialogId}>{props.dialogTitle}</span>
    );
    focusProps['aria-labelledby'] = props.dialogId;
  }

  useEffect(() => {
    // Force focus to dialog on mount.
    ref.current?.focus();
  }, [ref]);

  return (
    // eslint-disable-next-line jsx-a11y/no-autofocus
    <FocusLock autoFocus={false} returnFocus>
      {props.children(focusProps)}
    </FocusLock>
  );
}
