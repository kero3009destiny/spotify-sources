// ignore-string-externalization
import React from 'react';
import { DialogAlert as EncoreDialogAlert } from '@spotify-internal/encore-web';
import { DialogFocus, Props as DialogFocusProps } from './DialogFocus';

export function DialogAlert(
  props: DialogFocusProps & React.ComponentProps<typeof EncoreDialogAlert>,
) {
  const { dialogId, dialogTitle, refOverride, ...encoreProps } = props;

  return (
    <DialogFocus
      dialogId={dialogId}
      dialogTitle={dialogTitle}
      refOverride={refOverride}
    >
      {focusProps => <EncoreDialogAlert {...encoreProps} {...focusProps} />}
    </DialogFocus>
  );
}
