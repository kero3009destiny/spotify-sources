import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import { Banner, ButtonTertiary } from '@spotify-internal/encore-web';

import {
  assetReviewError,
  assetReviewSucceeded,
  isReviewingAsset,
} from 'ducks/assetReview/selectors';

import CommonModal from 'components/common/CommonModal';

import { PendingCreativeResponseRow } from 'types/common/state/api/assets';

export interface OwnProps {
  actionName: string;
  pendingCreative: PendingCreativeResponseRow;
  alert?: ReactElement;
  cancelBtnLabel?: string;
  closeBtnLabel?: string;
  confirmBtnDisabled?: boolean;
  confirmBtnLabel?: string;
  confirmHeader: string;
  errorMessage?: string | ((error?: string | boolean | Error) => void);
  modalSize?: string;
  onConfirm: (e?: Event) => void;
  onHide: () => void;
  onComplete: () => void;
  succeededHeader: string;
  succeededMessage: string | ReactElement;
  completeOnSucceeded?: boolean;
  children?: ReactElement;
}

export interface StateProps {
  error?: string | boolean | Error;
  submitting: boolean;
  succeeded: boolean;
  failed: boolean;
}

export type ConfirmModalProps = StateProps & OwnProps;

export const ConfirmModal: FunctionComponent<ConfirmModalProps> = ({
  actionName,
  alert: providedAlert,
  cancelBtnLabel = i18n.t('I18N_CANCEL', 'Cancel'),
  children,
  closeBtnLabel = i18n.t('I18N_CLOSE', 'Close'),
  confirmBtnDisabled = false,
  confirmBtnLabel = i18n.t('I18N_CONFIRM', 'Confirm'),
  confirmHeader,
  error,
  errorMessage = i18n.t('I18N_AN_ERROR_OCCURRED', 'An error occurred.'),
  failed,
  modalSize = 'small',
  onComplete,
  onConfirm,
  onHide,
  completeOnSucceeded,
  succeeded,
  succeededHeader,
  succeededMessage,
}) => {
  React.useEffect(() => {
    if (succeeded && completeOnSucceeded) onComplete?.();
  }, [succeeded, completeOnSucceeded, onComplete]);

  let alert = providedAlert;
  let header = confirmHeader;
  let content: string | ReactElement = (
    <div
      id={`${actionName}-default`}
      className={`${actionName} status-content`}
    >
      {children}
    </div>
  );

  const ConfirmButtonComponent =
    modalSize === 'large' ? ButtonPrimary : ButtonTertiary;
  let btn: ReactElement | null = (
    <ConfirmButtonComponent
      data-test={`${actionName}-submit-btn`}
      // @ts-ignore
      onClick={(e: Event) => {
        e.stopPropagation();
        onConfirm(e);
      }}
      disabled={succeeded ? false : confirmBtnDisabled}
      variant="text"
      // @ts-ignore
      color="green"
      condensed={modalSize !== 'large'}
    >
      {confirmBtnLabel}
    </ConfirmButtonComponent>
  );

  let id = `${actionName}-default`;
  const closeBtn = (
    <ButtonTertiary
      data-test={`${actionName}-cancel-btn`}
      onClick={succeeded ? onComplete : onHide}
      condensed={modalSize !== 'large' || succeeded}
      buttonLegacy
    >
      {succeeded ? closeBtnLabel : cancelBtnLabel}
    </ButtonTertiary>
  );

  if (succeeded && !completeOnSucceeded) {
    header = succeededHeader;
    id = `${actionName}-success`;
    content = succeededMessage;
    btn = null;
  }

  if (failed) {
    id = `${actionName}-failed`;
    alert = (
      <Banner colorSet="negative">
        <>
          {typeof errorMessage === 'function'
            ? errorMessage(error)
            : errorMessage}
        </>
      </Banner>
    );
  }

  return (
    <CommonModal
      error={alert}
      modalHeader={header}
      className={`${actionName}-ad-modal`}
      closeBtn={closeBtn}
      submitBtn={btn}
      onHide={onHide}
      modalSize={succeeded ? 'small' : modalSize}
      id={id}
      show
    >
      <div data-test={id}>{content}</div>
    </CommonModal>
  );
};

export const mapStateToProps = (state: TSFixMe): StateProps => {
  const error = assetReviewError(state);
  return {
    error,
    submitting: isReviewingAsset(state),
    succeeded: assetReviewSucceeded(state),
    failed: !!error,
  };
};

export const ConnectedConfirmModal = connect<StateProps, {}, OwnProps>(
  mapStateToProps,
)(ConfirmModal);

export default ConnectedConfirmModal;
