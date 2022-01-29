import React, { useState } from 'react';
import {
  ButtonPrimary,
  ButtonTertiary,
  TooltipTrigger,
  Tooltip,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { StorylineButtonPrimary } from '../StorylineButton';

type Props = {
  hasEditAccess?: boolean;
  hasStoryline?: boolean;
  isPrerelease?: boolean;
  isPreviewing?: boolean;
  isUploading?: boolean;
  onBack: () => void;
  onClose: () => void;
  onPreview: () => void;
  onRemove: () => void;
  onUpload: () => void;
};

export function StorylineDialogFooter(props: Props) {
  const {
    hasEditAccess,
    hasStoryline,
    isPrerelease,
    isPreviewing,
    isUploading,
    onBack,
    onClose,
    onPreview,
    onRemove,
    onUpload,
  } = props;

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const t = useT();
  if (hasStoryline) {
    return (
      <div className="encore-muted-accent-set">
        <ButtonTertiary
          aria-label={t(
            'STORYLINES_REMOVE_BUTTON1',
            'Remove the current Storyline',
            'remove storyline button',
          )}
          semanticColor="textNegative"
          buttonSize={ButtonTertiary.sm}
          condensed
          disabled={!hasEditAccess}
          onClick={onRemove}
          data-slo-id="remove-button"
        >
          {t(
            'STORYLINES_REMOVE_BUTTON2',
            'Remove Storyline',
            ' remove storyline button',
          )}
        </ButtonTertiary>
      </div>
    );
  }

  if (isPreviewing) {
    return (
      <div className="encore-muted-accent-set">
        <ButtonTertiary
          aria-label={t(
            'STORYLINES_CLOSE1',
            'Close the current Storyline preview',
            'close the storyline preview',
          )}
          buttonSize={ButtonTertiary.sm}
          condensed
          disabled={isUploading}
          onClick={onBack}
          data-slo-id="storyline-back-button"
        >
          {t('STORYLINES_CLOSE2', 'Back', 'close the storyline preview')}
        </ButtonTertiary>
        <TooltipTrigger
          overlay={
            tooltipVisible &&
            !isUploading && (
              <Tooltip data-testid="post-button--release-date-tooltip">
                {t(
                  'STORYLINES_TOOLTIP',
                  'Listeners will see your Storyline when your song is released.',
                  'describes that listeners will see the storyline when the song has been released',
                )}
              </Tooltip>
            )
          }
          placement={TooltipTrigger.topLeft}
          onShow={() => setTooltipVisible(!!isPrerelease)}
          onHide={() => setTooltipVisible(false)}
        >
          <StorylineButtonPrimary
            ariaLabel={t(
              'STORYLINES_UPLOAD1',
              'Upload the current Storyline',
              'upload your storyline button',
            )}
            ariaLabelForSpinner={t(
              'STORYLINES_UPLOAD2',
              'Uploading the current Storyline',
              'upload your storyline button',
            )}
            data-slo-id="post-storyline-button"
            disabled={!hasEditAccess}
            onClick={onUpload}
            showSpinner={!!isUploading}
            width={104}
          >
            {t(
              'STORYLINES_POST',
              'Post',
              'Describes posting a storyline to the app',
            )}
          </StorylineButtonPrimary>
        </TooltipTrigger>
      </div>
    );
  }

  return (
    <div className="encore-muted-accent-set">
      <ButtonTertiary
        aria-label={t(
          'STORYLINES_CANCEL_STORYLINE1',
          'Cancel creating the current Storyline',
          'cancel creating a storyline',
        )}
        data-slo-id="cancel-storyline-button"
        buttonSize={ButtonTertiary.sm}
        condensed
        onClick={onClose}
      >
        {t(
          'STORYLINES_CANCEL_STORYLINE2',
          'Cancel',
          'cancel creating a storyline',
        )}
      </ButtonTertiary>
      {hasEditAccess && (
        <ButtonPrimary
          aria-label={t(
            'STORYLINES_PREVIEW1',
            'Preview the current Storyline',
            'preview the storyline',
          )}
          buttonSize={ButtonPrimary.sm}
          onClick={onPreview}
          data-slo-id="preview-storyline-button"
        >
          {t('STORYLINES_PREVIEW2', 'Preview', 'preview the storyline')}
        </ButtonPrimary>
      )}
    </div>
  );
}
