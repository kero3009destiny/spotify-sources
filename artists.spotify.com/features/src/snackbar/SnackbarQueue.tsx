// ignore-string-externalization
import React, { FunctionComponent, ReactElement } from 'react';
import { Snackbar } from '@spotify-internal/encore-web';
import { useSnackbarState } from './SnackbarState';
import { removeSnackbar } from './actions';

/**
 * Controls the display of queued snackbar messages. Only one
 * snackbar message can be displayed at a time.
 *
 * The animation entrance and exit of <Snackbar /> is triggered
 * by its mounting and unmounting. Therefore, we want a separate
 * instance of <Snackbar /> for each snackbar message. The `key`
 * prop exists to ensure re-mounting occurs when the snackbar
 * message changes.
 */

// encore-creator-dark-theme

export const SnackbarQueue: React.FunctionComponent<{}> = () => {
  const [state, dispatch] = useSnackbarState();
  const snack = state.snackbars[0];
  const onExited = () => dispatch(removeSnackbar(snack?.id));

  return snack ? (
    <Snackbar
      className={
        snack.theme?.snackbar === 'dark' ? 'encore-creator-dark-theme' : ''
      }
      key={snack.id}
      onExited={onExited}
    >
      {snack.message}
    </Snackbar>
  ) : null;
};
