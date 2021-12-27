import React from 'react';
import i18n from 'i18next';

import {
  Backdrop,
  ButtonPrimary,
  ButtonTertiary,
  DialogConfirmation,
  Type,
} from '@spotify-internal/encore-web';

import { ChangeLogFooter } from './styles';

import {
  CANCEL_DISCARD_CHANGES,
  CONFIRM_DISCARD_CHANGES,
  DISCARD_CHANGES_WARNING,
} from './constants';

export interface BulksheetDiscardChangesWarningProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export const BulksheetDiscardChangesWarning = ({
  onCancel,
  onConfirm,
}: BulksheetDiscardChangesWarningProps) => {
  return (
    <Backdrop center>
      <DialogConfirmation
        data-test={DISCARD_CHANGES_WARNING}
        dialogTitle={i18n.t(
          'I18N_DISCARD_BULK_CHANGES_HEADER',
          'Discard bulk changes?',
        )}
        body={
          <Type as="p">
            {i18n.t(
              'I18N_DISCARD_BULK_CHANGES_BODY',
              'Your changes will not be submitted for review.',
            )}
          </Type>
        }
        footer={
          <ChangeLogFooter>
            <ButtonTertiary
              data-test={CANCEL_DISCARD_CHANGES}
              onClick={onCancel}
              buttonLegacy
            >
              {i18n.t('I18N_NO', 'No')}
            </ButtonTertiary>
            <ButtonPrimary
              data-test={CONFIRM_DISCARD_CHANGES}
              onClick={onConfirm}
              buttonLegacy
            >
              {i18n.t('I18N_YES', 'Yes')}
            </ButtonPrimary>
          </ChangeLogFooter>
        }
      />
    </Backdrop>
  );
};
