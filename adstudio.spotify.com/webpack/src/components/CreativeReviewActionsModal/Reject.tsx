import React from 'react';
import { Field, Form } from 'react-final-form';
import { Trans } from 'react-i18next';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import styled from 'styled-components';
import { i18nRequired } from 'validators/i18nRequired';

import { FormSelect, FormTextarea } from '@spotify-internal/encore-web';

import { logUserAction } from 'ducks/analytics/actions';
import { rejectVoiceover } from 'ducks/assetReview/actions';

import { FinalFormGroup } from 'components/form-common/FinalFormGroup';

import {
  REJECT_CATEGORY_OPTIONS,
  REJECTION_REASON_BG_ISSUES_OPTIONS,
  REJECTION_REASON_CANCELLED_OPTIONS,
  REJECTION_REASON_OTHER_OPTIONS,
  REJECTION_REASON_VO_ISSUES_OPTIONS,
} from '../../config/reject';
import ConfirmModal from './ConfirmModal';

import { RejectionCode } from './types';
import { PendingCreativeResponseRow } from 'types/common/state/api/assets';

export const FORM_NAME = 'reject-voiceover-form';
export const FORM_FIELD_REJECTION_CATEGORY = 'rejectionCategory';
export const FORM_FIELD_REJECTION_CODE = 'rejectionCode';
export const FORM_FIELD_REASON = 'reason';

const ReasonGridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export interface RejectProps {
  pendingCreative: PendingCreativeResponseRow;
  onComplete: () => void;
  isSubmitting: boolean;
  onHide: () => void;
}

export interface FormData {
  reason: string;
  rejectionCode?: RejectionCode;
}

function getReasonsForCategory(category?: string) {
  switch (category) {
    case 'REJECT_CATEGORY_CANCEL_AD':
      return REJECTION_REASON_CANCELLED_OPTIONS;
    case 'REJECT_CATEGORY_VOICEOVER_ISSUES':
      return REJECTION_REASON_VO_ISSUES_OPTIONS;
    case 'REJECT_CATEGORY_BACKGROUND_ISSUES':
      return REJECTION_REASON_BG_ISSUES_OPTIONS;
    case 'REJECT_CATEGORY_OTHER':
      return REJECTION_REASON_OTHER_OPTIONS;
    default:
      return [];
  }
}

export const Reject = (props: RejectProps) => {
  const dispatch = useDispatch();
  const { pendingCreative, onComplete, onHide, isSubmitting } = props;
  const adName = pendingCreative.name;

  return (
    <Form
      initialValues={{
        reason: '',
      }}
      onSubmit={(formValues: FormData) => {
        dispatch(
          logUserAction({
            category: 'reject_flow',
            label: 'reject_submitted',
            params: { creativeId: pendingCreative.creativeId! },
          }),
        );
        dispatch(
          rejectVoiceover({
            voiceoverId: pendingCreative.voiceover.id!,
            adAccountId: pendingCreative.adAccountId,
            creativeId: pendingCreative.creativeId,
            rejectionReason: formValues.reason,
            rejectionCode: formValues.rejectionCode!,
          }),
        );
      }}
      render={({ form, handleSubmit }) => (
        <ConfirmModal
          actionName="reject"
          pendingCreative={pendingCreative}
          confirmHeader={i18n.t('I18N_CANCEL_THIS_AD', 'Cancel this ad?')}
          confirmBtnLabel={i18n.t('I18N_CANCEL_AD', 'Cancel Ad')}
          confirmBtnDisabled={form.getState().invalid || isSubmitting}
          errorMessage={i18n.t(
            'I18N_CANCEL_AD_ERROR_TEXT',
            'Something went wrong canceling your ad. Please try again.',
          )}
          modalSize="large"
          onConfirm={(e?: Event) => {
            if (isSubmitting) return;
            handleSubmit(e as TSFixMe);
          }}
          onComplete={onComplete}
          onHide={onHide}
          succeededHeader={i18n.t('I18N_CANCELED', 'Canceled')}
          succeededMessage={
            <span>
              <Trans i18nKey="I18N_CANCEL_AD_SUCCESS_TEXT" values={{ adName }}>
                Your ad order for <strong>{{ adName }}</strong> has been
                canceled. This ad is labeled as rejected in your dashboard.
              </Trans>
            </span>
          }
        >
          <>
            <ReasonGridDiv>
              <Field
                name={FORM_FIELD_REJECTION_CATEGORY}
                validate={i18nRequired}
                render={({ input, meta }) => (
                  <FinalFormGroup input={input} meta={meta}>
                    <FormSelect
                      defaultValue={input.value || ''}
                      onChange={e => {
                        input.onChange(e);
                        form.change(FORM_FIELD_REJECTION_CODE, '');
                      }}
                    >
                      {REJECT_CATEGORY_OPTIONS.map(category => (
                        <option
                          key={`vo-rejection-category-${category.key}`}
                          value={category.key}
                        >
                          {category.value}
                        </option>
                      ))}
                    </FormSelect>
                  </FinalFormGroup>
                )}
              />

              <Field
                name={FORM_FIELD_REJECTION_CODE}
                validate={i18nRequired}
                render={({ input, meta }) => (
                  <FinalFormGroup input={input} meta={meta}>
                    <FormSelect
                      defaultValue={input.value || ''}
                      onChange={input.onChange}
                    >
                      {getReasonsForCategory(
                        form.getFieldState(FORM_FIELD_REJECTION_CATEGORY)
                          ?.value,
                      ).map(reason => (
                        <option
                          key={`vo-rejection-reason-code-${reason.key}`}
                          value={reason.key}
                        >
                          {reason.value}
                        </option>
                      ))}
                    </FormSelect>
                  </FinalFormGroup>
                )}
              />
            </ReasonGridDiv>
            <div>
              <Field
                name={FORM_FIELD_REASON}
                data-test="reject-textarea"
                render={({ input, meta }) => (
                  <FinalFormGroup
                    label={i18n.t(
                      'I18N_CANCEL_AD_PROMPT',
                      'Let us know why you are canceling this ad.',
                    )}
                    meta={meta}
                    input={input}
                  >
                    <FormTextarea
                      onChange={input.onChange}
                      placeholder={i18n.t(
                        'I18N_THE_VOICEOVER_WAS_NOT_WHA',
                        'The voiceover was not what I expected.',
                      )}
                    />
                  </FinalFormGroup>
                )}
              />
            </div>
          </>
        </ConfirmModal>
      )}
    />
  );
};

export default Reject;
