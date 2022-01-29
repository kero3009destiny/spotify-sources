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
};

export function IncompleteCardModal({ onClose }: Props) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
        case 'Enter':
          e.preventDefault();
          onClose();
          break;
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [onClose]);

  const t = useT();

  return (
    <Backdrop center onClose={onClose}>
      <DialogAlert
        data-testid="storyline--incomplete-card-dialog"
        body={
          <Type as="p" condensed>
            {t(
              'STORYLINES_ADD_IMAGES_TEXT',
              'Please complete your Storyline by adding background images to empty cards or by deleting the empty cards.',
              'text informing you to add images to your cards or delete them',
            )}
          </Type>
        }
        footer={
          <ButtonTertiary
            condensed
            onClick={onClose}
            buttonSize={ButtonTertiary.sm}
            semanticColor="textBrightAccent"
            data-slo-id="confirm-incomplete-storyline-button"
          >
            {t('STORYLINES_OKAY_BUTTON', 'Okay', 'confirmation button')}
          </ButtonTertiary>
        }
      />
    </Backdrop>
  );
}
