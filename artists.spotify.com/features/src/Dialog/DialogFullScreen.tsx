// ignore-string-externalization
import React from 'react';
import { DialogFullScreen as EncoreDialogFullScreen } from '@spotify-internal/encore-web';
import { DialogFocus, Props as DialogFocusProps } from './DialogFocus';

export function DialogFullScreen(
  props: DialogFocusProps & React.ComponentProps<typeof EncoreDialogFullScreen>,
) {
  const { dialogId, dialogTitle, refOverride, ...encoreProps } = props;

  return (
    <DialogFocus
      dialogId={dialogId}
      dialogTitle={dialogTitle}
      refOverride={refOverride}
    >
      {focusProps => (
        <EncoreDialogFullScreen {...encoreProps} {...focusProps} />
      )}
    </DialogFocus>
  );
}
