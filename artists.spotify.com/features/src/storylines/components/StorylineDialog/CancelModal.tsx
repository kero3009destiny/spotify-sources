import React, { useEffect } from 'react';

import {
  Backdrop,
  ButtonTertiary,
  DialogAlert,
  Type,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

type Props = {
  onClose: () => void;
  onCancel: () => void;
};

export function CancelModal({ onClose, onCancel }: Props) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onCancel();
          break;
        case 'Enter':
          e.preventDefault();
          onClose();
          break;
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [onClose, onCancel]);

  const t = useT();

  return (
    <Backdrop center onClose={onCancel}>
      <DialogAlert
        data-testid="storyline--cancel-confirmation-dialog"
        dialogTitle={t(
          'STORYLINES_CONFIRMATION',
          'Are you sure?',
          'confirmation dialogue',
        )}
        body={
          <Type as="p" condensed>
            {t(
              'STORYLINES_CLOSE_WITHOUT_SAVE',
              'Closing this window without saving will discard your changes.',
              'close without saving warning text',
            )}
          </Type>
        }
        footer={
          <>
            <ButtonTertiary
              condensed
              onClick={onCancel}
              buttonSize={ButtonTertiary.sm}
            >
              {t('STORYLINES_CANCEL_BUTTON', 'Cancel', 'cancel button')}
            </ButtonTertiary>
            <ButtonTertiary
              condensed
              onClick={onClose}
              buttonSize={ButtonTertiary.sm}
              semanticColor="textBrightAccent"
              data-slo-id="confirm-cancel-storyline-button"
            >
              {t('STORYLINES_CONFIRM_BUTTON', 'Yes', 'confirmation button')}
            </ButtonTertiary>
          </>
        }
      />
    </Backdrop>
  );
}
