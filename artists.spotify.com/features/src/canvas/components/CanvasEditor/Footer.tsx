import React from 'react';
import {
  ButtonPrimary,
  ButtonTertiary,
  TextLink,
  Tooltip,
  Type,
} from '@spotify-internal/encore-web';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { useT } from '@mrkt/features/i18n';
import {
  CanvasAlternateEntity,
  CanvasEntity,
  DecoratedCanvas,
} from '../../types/canvas';

type Props = {
  onClose: () => void;
  onHideTeamSwitcher: () => void;
  onHideTermsAndConditions: () => void;
  onShowTeamSwitcher: () => void;
  onShowTermsAndConditions: () => void;
  onShowTrackAlternatesModal: () => void;
  onUpdate: () => Promise<void>;

  canvases?: DecoratedCanvas[];
  enableRecordingGroups?: boolean;
  enableTeamSwitcher?: boolean;
  isCanvasInMaintenance?: boolean;
  isPrerelease?: boolean;
  readonly?: boolean;
  trackAlternates?: CanvasAlternateEntity[];
  trackEntity: CanvasEntity;

  hasEditingCanvas?: boolean;
  hasTeamSelected?: boolean;
  posted?: boolean;
  processing?: boolean;
  removable?: boolean;
  showTeamSwitcher?: boolean;
  showTerms?: boolean;
  termsAccepted?: boolean;
  uploading?: boolean;
};

export function Footer(props: Props) {
  const {
    onClose,
    onHideTeamSwitcher,
    onHideTermsAndConditions,
    onShowTeamSwitcher,
    onShowTermsAndConditions,
    onShowTrackAlternatesModal,
    onUpdate,

    canvases,
    enableRecordingGroups,
    enableTeamSwitcher,
    isCanvasInMaintenance,
    isPrerelease,
    readonly,
    trackAlternates,

    hasEditingCanvas,
    hasTeamSelected,
    posted,
    processing,
    removable,
    showTerms,
    showTeamSwitcher,
    termsAccepted,
    uploading,
  } = props;
  const t = useT();
  const onlyViewingCanvas = canvases && canvases.length && !hasEditingCanvas;
  const confirmEnabled = hasTeamSelected;
  const nextEnabled = hasEditingCanvas && !isCanvasInMaintenance && !uploading;
  const postEnabled = nextEnabled && showTerms && termsAccepted;
  const tooltipEnabled = postEnabled && isPrerelease;

  const closeButton = (
    <ButtonPrimary
      onClick={onClose}
      data-testid="close-button"
      data-slo-id="close-button"
      buttonSize={ButtonPrimary.sm}
    >
      {t('CANVAS_CLOSE', 'Close', 'Button to close the modal')}
    </ButtonPrimary>
  );

  const cancelButton = (
    <ButtonTertiary
      condensed
      onClick={onClose}
      data-testid="cancel-button"
      disabled={uploading}
      buttonSize={ButtonTertiary.sm}
    >
      {t('CANVAS_CANCEL', 'Cancel', 'Button to close the modal')}
    </ButtonTertiary>
  );
  const backButton = (
    <ButtonTertiary
      condensed
      onClick={showTerms ? onHideTermsAndConditions : onShowTeamSwitcher}
      data-testid="back-button"
      disabled={uploading}
      buttonSize={ButtonTertiary.sm}
    >
      {t('CANVAS_BACK', 'Back', 'Button to go back to the previous step')}
    </ButtonTertiary>
  );

  const confirmButton = (
    <ButtonPrimary
      disabled={!confirmEnabled}
      onClick={onHideTeamSwitcher}
      data-testid="confirm-button"
      buttonSize={ButtonPrimary.sm}
    >
      {t(
        'CANVAS_CONFIRM',
        'Confirm',
        'Button to acknowledge the selection is good.',
      )}
    </ButtonPrimary>
  );
  const nextButton = (
    <ButtonPrimary
      disabled={!nextEnabled}
      onClick={onShowTermsAndConditions}
      data-testid="next-button"
      data-slo-id="next-button"
      buttonSize={ButtonPrimary.sm}
    >
      {t('CANVAS_NEXT', 'Next', 'Button to go forward to the next step')}
    </ButtonPrimary>
  );
  const postButton = (
    <ButtonPrimary
      disabled={!postEnabled}
      onClick={onUpdate}
      data-testid="post-button"
      data-slo-id="post-button"
      buttonSize={ButtonPrimary.sm}
    >
      {t(
        'CANVAS_POST',
        'Post',
        'Button to submit (or post) the Canvas to the app',
      )}
    </ButtonPrimary>
  );

  if (onlyViewingCanvas || processing || posted || removable || readonly) {
    if (!enableTeamSwitcher || processing || posted) {
      return closeButton;
    } else if (!showTeamSwitcher) {
      return (
        <>
          {backButton}
          {closeButton}
        </>
      );
    }
  }

  let primaryButton: JSX.Element;
  let secondaryButton: JSX.Element;
  if (enableTeamSwitcher && showTeamSwitcher) {
    primaryButton = confirmButton;
    secondaryButton = cancelButton;
  } else if (showTerms) {
    primaryButton = postButton;
    secondaryButton = backButton;
  } else {
    primaryButton = !uploading ? nextButton : postButton;
    secondaryButton = enableTeamSwitcher ? backButton : cancelButton;
  }
  const recordingGroupLink = Boolean(
    enableRecordingGroups &&
      showTerms &&
      trackAlternates &&
      trackAlternates.length > 0,
  ) && (
    <Type variant={Type.body3} as="span" style={{ flexGrow: 1 }}>
      <TextLink onClick={onShowTrackAlternatesModal} style={{ marginLeft: 0 }}>
        {t(
          'CANVAS_VIEW_TRACKS',
          'View tracks in this recording group',
          'view all the tracks for an album (more specifically known as a recording group)',
        )}
      </TextLink>
    </Type>
  );

  return (
    <>
      {recordingGroupLink}

      <div>
        {secondaryButton}
        {tooltipEnabled ? (
          <TooltipTrigger
            tooltipId="canvas-prerelease-tooltip"
            tooltip={
              <Tooltip style={{ maxWidth: 'none', whiteSpace: 'nowrap' }}>
                {t(
                  'CANVAS_PRERELEASE_NOTICE',
                  'Listeners will see your Canvas when your song is released.',
                  'The listeners on the app will only be able to view the Canvas on or after the release date of the song',
                )}
              </Tooltip>
            }
            placement="top"
          >
            {primaryButton}
          </TooltipTrigger>
        ) : (
          primaryButton
        )}
      </div>
    </>
  );
}
