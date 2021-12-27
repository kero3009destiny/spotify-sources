import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';

import { Type } from '@spotify-internal/encore-web';

import { approveVoiceover } from 'ducks/assetReview/actions';

import ConfirmModal from './ConfirmModal';

import {
  ApproveVoiceoverRequest,
  PendingCreativeResponseRow,
} from 'types/common/state/api/assets';

export interface OwnProps {
  pendingCreative: PendingCreativeResponseRow;
  onComplete: () => void;
  onHide: () => void;
  isSubmitting: boolean;
  completeOnSucceeded?: boolean;
}

export interface DispatchProps {
  dispatchApproveVoiceover: (payload: ApproveVoiceoverRequest) => void;
}

export type ApproveProps = OwnProps & DispatchProps;

export const Approve: FunctionComponent<ApproveProps> = ({
  pendingCreative,
  dispatchApproveVoiceover,
  onHide,
  onComplete,
  isSubmitting,
  completeOnSucceeded,
}) => (
  <ConfirmModal
    actionName="approve"
    pendingCreative={pendingCreative}
    confirmHeader={i18n.t(
      'I18N_APPROVE_THIS_VOICEOVER',
      'Approve this voiceover?',
    )}
    confirmBtnLabel={i18n.t('I18N_APPROVE', 'Approve')}
    confirmBtnDisabled={isSubmitting}
    errorMessage={i18n.t(
      'I18N_SOMETHING_WENT_WRONG_APPR',
      'Something went wrong approving your ad. Please try again.',
    )}
    onConfirm={() => {
      if (isSubmitting) return;
      dispatchApproveVoiceover({
        voiceoverId: pendingCreative.voiceover.id!,
        adAccountId: pendingCreative.adAccountId,
        mixId: pendingCreative.voiceover.mixId!,
      });
    }}
    onHide={onHide}
    onComplete={onComplete}
    succeededHeader={i18n.t(
      'I18N_GREAT_NEXT_WELL_REVIEW_AD',
      "Great! Next, we'll review your ad.",
    )}
    succeededMessage={i18n.t(
      'I18N_YOUR_AUDIO_MIX_IS_NOW_COMPLETE',
      "Your audio mix is now complete. We'll now look over the rest of your ad. We'll email you once we've finished our review (within two days). If accepted, your ad will run as scheduled.",
    )}
    completeOnSucceeded={completeOnSucceeded}
  >
    <Type variant={Type.body2} as="p">
      {i18n.t(
        'I18N_YOUR_AD_ORDER_WILL_BE_SEN',
        'Your ad order will be sent to our team for review. The process may take up to 2 business days.',
      )}
    </Type>
  </ConfirmModal>
);

export default connect<{}, DispatchProps, OwnProps>(null, {
  dispatchApproveVoiceover: approveVoiceover,
})(Approve);
