import React, { useEffect } from 'react';

import {
  Backdrop,
  ButtonTertiary,
  DialogAlert,
  Type,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export function RemoveModal({ onConfirm, onCancel }: Props) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onCancel();
          break;
        case 'Enter':
          e.preventDefault();
          onConfirm();
          break;
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [onConfirm, onCancel]);

  const t = useT();

  return (
    <Backdrop center onClose={onCancel}>
      <DialogAlert
        dialogTitle={t(
          'STORYLINES_REMOVE_STORYLINE_TITLE',
          'Remove Storyline?',
          'remove storyline dialogue title',
        )}
        body={
          <Type as="p" condensed>
            {t(
              'STORYLINES_NOT_VISIBLE',
              'Listeners will no longer see your Storyline.',
              'text indicating that storylines will be no longer visible',
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
              {t('STORYLINES_CANCEL_REMOVAL', 'Cancel', 'cancel button')}
            </ButtonTertiary>
            <ButtonTertiary
              condensed
              onClick={onConfirm}
              buttonSize={ButtonTertiary.sm}
              data-slo-id="confirm-remove"
            >
              {t('STORYLINES_REMOVE', 'Remove', 'remove button')}
            </ButtonTertiary>
          </>
        }
      />
    </Backdrop>
  );
}
