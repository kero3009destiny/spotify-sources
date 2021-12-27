import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { triggerHardReload } from 'ducks/window/actions';
import { isReviewingAsset } from 'ducks/assetReview/selectors';

import Approve from './Approve';
import Reject from './Reject';
import { ConnectedReviseReduxForm } from './Revise';

import { PendingCreativeResponseRow } from 'types/common/state/api/assets';

export enum ModalType {
  APPROVE = 'approve',
  REJECT = 'reject',
  REVISE = 'revise',
}

export interface OwnProps {
  activeModalType: ModalType;
  pendingCreative: PendingCreativeResponseRow;
  onHide: () => void;
  onComplete?: () => void;
  completeOnSucceeded?: boolean;
}

export interface DispatchProps {
  onComplete: () => void;
}

export interface StateProps {
  isSubmitting: boolean;
}

export type CreativeReviewActionsModalProps = OwnProps &
  DispatchProps &
  StateProps;

export const CreativeReviewActionsModal: FunctionComponent<CreativeReviewActionsModalProps> = ({
  activeModalType,
  pendingCreative,
  onComplete,
  onHide,
  isSubmitting,
  completeOnSucceeded,
}) => {
  switch (activeModalType) {
    case 'approve':
      return (
        <Approve
          pendingCreative={pendingCreative}
          onHide={onHide}
          onComplete={onComplete}
          isSubmitting={isSubmitting}
          completeOnSucceeded={completeOnSucceeded}
        />
      );

    case 'reject':
      return (
        <Reject
          pendingCreative={pendingCreative}
          onHide={onHide}
          onComplete={onComplete}
          isSubmitting={isSubmitting}
        />
      );

    case 'revise':
      return (
        // @ts-ignore   // FIXME: ts wants resolverProps passed in.=
        <ConnectedReviseReduxForm
          pendingCreative={pendingCreative}
          onHide={onHide}
          onComplete={onComplete}
          isSubmitting={isSubmitting}
        />
      );

    default:
      return <div />;
  }
};

export const mapStateToProps = (state: TSFixMe): StateProps => {
  return {
    isSubmitting: isReviewingAsset(state),
  };
};

export const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  // default onComplete to a hard page reload
  if (!ownProps.onComplete) {
    return {
      onComplete: () => {
        ownProps.onHide();
        dispatch(triggerHardReload());
      },
    };
  }
  return {
    onComplete: ownProps.onComplete,
  };
};

export const ConnectedAdReviewActionsModal = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(CreativeReviewActionsModal);

export default ConnectedAdReviewActionsModal;
