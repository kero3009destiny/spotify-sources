// ignore-string-externalization
import React from 'react';
import { DialogConfirmation as EncoreDialogConfirmation } from '@spotify-internal/encore-web';
import { DialogFocus, Props as DialogFocusProps } from './DialogFocus';

export function DialogConfirmation(
  props: DialogFocusProps &
    React.ComponentProps<typeof EncoreDialogConfirmation>,
) {
  const { dialogId, dialogTitle, refOverride, ...encoreProps } = props;

  return (
    <DialogFocus
      dialogId={dialogId}
      dialogTitle={dialogTitle}
      refOverride={refOverride}
    >
      {focusProps => (
        <EncoreDialogConfirmation {...encoreProps} {...focusProps} />
      )}
    </DialogFocus>
  );
}
