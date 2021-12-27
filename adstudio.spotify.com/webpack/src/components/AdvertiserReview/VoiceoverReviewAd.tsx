import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { AudioPlayerLegacy } from '@spotify-internal/encore-advertising-web';
import {
  ButtonPrimary,
  gray10,
  spacer16,
  Type,
} from '@spotify-internal/encore-web';

import { getGcsBucketUri } from 'utilities';
import {
  isSpokenlayerPendingCreativeResponseRow,
  PODCAST_DEFAULT_IMAGE_URL,
} from 'utils/creativeHelpers';

import CreativeReviewActionsModal, {
  ModalType,
} from '../CreativeReviewActionsModal';
import {
  CreativeImageThumbnail,
  CtaTextLink,
  ReviewAdRow,
  Variant,
} from './ReviewAdStyles';

import { TEST_IDS } from './constants';
import { routeFragmentLiterals, routes } from 'config/routes';

import { PendingCreativeResponseRow } from 'types/common/state/api/assets';

export { Variant };

export interface VoiceoverReviewAdProps {
  creativePendingReview: PendingCreativeResponseRow;
  variant?: Variant;
  className?: string;
  onCloseReviewModal?: () => void;
  hideThumbnail?: boolean;
  showReviseOnLoad?: boolean;
  isNameLinked?: boolean;
}

const AudioPlayerDiv = styled.div`
  // Reset AudioPlayerLegacy padding
  margin: -${spacer16};
  display: block;

  // fixes the color of the ad name link.
  // TODO: Upgrade to using AdPlayer post-SPAN launch
  a {
    color: ${gray10};
  }
`;

export const VoiceoverReviewAd = (props: VoiceoverReviewAdProps) => {
  const [modalType, setModalType] = useState<ModalType | undefined>(undefined);
  const {
    creativePendingReview,
    variant = Variant.APPROVE_REVISE,
    className,
    hideThumbnail,
    onCloseReviewModal,
    showReviseOnLoad,
    isNameLinked = true,
  } = props;
  const nameUrl = isNameLinked
    ? routes.CREATIVE_ENTITY_DETAILS.replace(
        routeFragmentLiterals.ACCOUNT_ID,
        creativePendingReview.adAccountId,
      ).replace(
        routeFragmentLiterals.CREATIVE_ID,
        creativePendingReview.creativeId,
      )
    : '';

  useEffect(() => {
    if (showReviseOnLoad) setModalType(ModalType.REVISE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const src = isSpokenlayerPendingCreativeResponseRow(creativePendingReview)
    ? getGcsBucketUri(creativePendingReview.audio?.id!) // need to download the RAW file with the SpokenLayer metadata
    : creativePendingReview.audio?.mp3Url ||
      creativePendingReview.audio?.oggUrl;

  return (
    <div className={className}>
      <ReviewAdRow hideThumbnail={hideThumbnail}>
        <div>
          <CreativeImageThumbnail
            src={creativePendingReview.image?.url || PODCAST_DEFAULT_IMAGE_URL}
          />
        </div>
        <AudioPlayerDiv>
          <AudioPlayerLegacy
            deleteLabel={i18n.t('I18N_DELETE', 'Delete')}
            downloadLabel={i18n.t('I18N_DOWNLOAD', 'Download')}
            shouldShowDownload
            name={creativePendingReview.name}
            nameUrl={nameUrl}
            src={src} // need to download the RAW file with the SpokenLayer metadata
          />
        </AudioPlayerDiv>

        <div>
          {variant === Variant.APPROVE_REVISE && (
            <>
              <CtaTextLink
                to="#approve"
                onClick={e => {
                  e.preventDefault();
                  setModalType(ModalType.APPROVE);
                }}
                data-test={TEST_IDS.VOICEOVER_APPROVAL_AD_APPROVE_BUTTON}
              >
                <Type variant={Type.cta3}>
                  {i18n.t('I18N_APPROVE', 'Approve')}
                </Type>
              </CtaTextLink>
              <CtaTextLink
                to="#revise"
                onClick={e => {
                  e.preventDefault();
                  setModalType(ModalType.REVISE);
                }}
                data-test={TEST_IDS.VOICEOVER_APPROVAL_AD_REVISE_BUTTON}
              >
                <Type variant={Type.cta3}>
                  {i18n.t('I18N_REVISE', 'Revise')}
                </Type>
              </CtaTextLink>
            </>
          )}
          {variant === Variant.REVIEW && (
            <CtaTextLink
              to={nameUrl}
              data-test={TEST_IDS.VOICEOVER_APPROVAL_AD_REVIEW_BUTTON}
            >
              <Type variant={Type.cta3}>{i18n.t('I18N_REVIEW', 'Review')}</Type>
            </CtaTextLink>
          )}
          {variant === Variant.APPROVE && (
            <ButtonPrimary
              style={{ marginTop: 8, marginRight: `-${spacer16}` }}
              onClick={() => setModalType(ModalType.APPROVE)}
              data-test={TEST_IDS.VOICEOVER_APPROVAL_AD_APPROVE_BUTTON}
              buttonLegacy
            >
              {i18n.t('I18N_APPROVE', 'Approve')}
            </ButtonPrimary>
          )}
        </div>
      </ReviewAdRow>

      {modalType && (
        <CreativeReviewActionsModal
          pendingCreative={creativePendingReview}
          activeModalType={modalType}
          onHide={() => setModalType(undefined)}
          onComplete={() => {
            setModalType(undefined);
            if (onCloseReviewModal) {
              onCloseReviewModal();
            }
          }}
          completeOnSucceeded={variant === Variant.APPROVE}
        />
      )}
    </div>
  );
};
