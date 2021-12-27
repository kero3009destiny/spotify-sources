import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';
import styled from 'styled-components';

import { EffectiveVoState } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EffectiveVoState';
import { TooltipInfo } from '@spotify-internal/adstudio-tape';
import {
  semanticColors,
  spacer16,
  spacer32,
  spacer48,
  Type,
} from '@spotify-internal/encore-web';
import { Box } from '@spotify-internal/encore-web/advertising/components/Box';
import { useBool } from '@spotify-internal/remote-config-resolver-react';

import { getPendingUserApprovalCreatives } from 'ducks/assetReview/actions';
import { getReviewableDrafts } from 'ducks/hierarchyDrafts/actions';
import {
  selectHasPendingUserApprovalCreatives,
  selectPendingUserApprovalCreativeCount,
  selectPendingUserApprovalCreatives,
} from 'ducks/assetReview/selectors';
import {
  selectHasReviewableDrafts,
  selectReviewableDraftCount,
  selectReviewableDrafts,
} from 'ducks/hierarchyDrafts/selectors';

import { isSpokenlayerPendingCreativeResponseRow } from 'utils/creativeHelpers';
import { getRouteAccountId } from 'utils/routeHelpers';

import { Variant } from './ReviewAdStyles';
import {
  InlineBodyType,
  ReviewablePanel,
  SeeAllOrHideButton,
  SeeAllSection,
  StyledChevronDown,
  StyledChevronUp,
  StyledDraftReviewAd,
  StyledScriptReviewAd,
  StyledVoiceoverReviewAd,
  TitleSection,
  TopPanel,
} from './styles';

import { TEST_IDS } from './constants';

import { PendingCreativeResponseRow } from 'types/common/state/api/assets';
import { CatalogueDraft } from 'types/common/state/api/drafts';

export const MINIMUM_NUMBER_OF_ADS_SHOWN = 2;
export const MAXIMUM_NUMBER_OF_ADS_SHOWN = 50;

const REVIEW_AD_TOOLTIP_TEXT = i18n.t(
  'I18N_PLEASE_REVIEW_AND_TAKE_AC',
  'Please review and take action on your ad.',
);
const I18N_AUDIO_REVIEW_HIDE = i18n.t('I18N_AUDIO_REVIEW_HIDE', 'Hide');

export interface AdvertiserReviewProps {
  className?: string;
}

const PaddingBox = styled(Box)`
  padding: ${spacer48} ${spacer32} ${spacer16};
`;

export const AdvertiserReview = (props: AdvertiserReviewProps) => {
  const [numberOfAdsShown, setNumberOfAdsShown] = useState(
    MINIMUM_NUMBER_OF_ADS_SHOWN,
  );
  const adAccountId = getRouteAccountId();
  const impersonatorDraftReview = useBool('draft_impersonation_advertiser');
  const dispatch = useDispatch();
  const refreshReviewModule = (): void => {
    const queryParams = {
      adAccountId,
      limit: MAXIMUM_NUMBER_OF_ADS_SHOWN,
      offset: 0,
    };
    dispatch(getPendingUserApprovalCreatives(queryParams));
    if (impersonatorDraftReview) {
      dispatch(
        getReviewableDrafts({
          adAccountId,
          limit: `${MAXIMUM_NUMBER_OF_ADS_SHOWN}`,
          offset: '0',
        }),
      );
    }
  };

  useEffect(() => {
    refreshReviewModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasReviewableCreatives: boolean = useSelector(
    selectHasPendingUserApprovalCreatives,
  );
  const hasReviewableDrafts: boolean = useSelector(selectHasReviewableDrafts);
  const reviewableCreativeCount: number = useSelector(
    selectPendingUserApprovalCreativeCount,
  );
  const reviewableDraftCount: number = useSelector(selectReviewableDraftCount);
  const maxCount =
    numberOfAdsShown === MINIMUM_NUMBER_OF_ADS_SHOWN &&
    hasReviewableCreatives &&
    hasReviewableDrafts &&
    impersonatorDraftReview
      ? 1
      : numberOfAdsShown;
  const reviewableCreatives: PendingCreativeResponseRow[] = useSelector(state =>
    selectPendingUserApprovalCreatives(state, maxCount),
  );
  const reviewableDrafts: CatalogueDraft[] = useSelector(state =>
    selectReviewableDrafts(state, maxCount),
  );
  const allAdsAreShown = numberOfAdsShown > MINIMUM_NUMBER_OF_ADS_SHOWN;
  const totalReviewableItems = reviewableCreativeCount + reviewableDraftCount;

  if (totalReviewableItems === 0) {
    return <></>;
  }

  return (
    <div className={props.className}>
      <PaddingBox elevated>
        <TopPanel>
          <TitleSection>
            <TooltipInfo placement="right" tooltipText={REVIEW_AD_TOOLTIP_TEXT}>
              <Type.h3 variant={Type.heading3} condensed>
                {i18n.t('I18N_AUDIO_REVIEW_TITLE', 'For review')}
              </Type.h3>
            </TooltipInfo>
          </TitleSection>
          {totalReviewableItems > MINIMUM_NUMBER_OF_ADS_SHOWN && (
            <SeeAllSection>
              {!allAdsAreShown && (
                <SeeAllOrHideButton
                  onClick={() => {
                    setNumberOfAdsShown(MAXIMUM_NUMBER_OF_ADS_SHOWN);
                  }}
                  data-test={TEST_IDS.SEE_ALL_BUTTON}
                >
                  <InlineBodyType
                    variant={Type.body2}
                    semanticColor={semanticColors.textSubdued}
                    condensed
                  >
                    {i18n.t('I18N_AUDIO_REVIEW_SEE_ALL_WITH_TOTAL', {
                      total: totalReviewableItems,
                      defaultValue: 'See all {{total}}',
                    })}
                  </InlineBodyType>
                  <StyledChevronDown />
                </SeeAllOrHideButton>
              )}
              {allAdsAreShown && (
                <SeeAllOrHideButton
                  onClick={() => {
                    setNumberOfAdsShown(MINIMUM_NUMBER_OF_ADS_SHOWN);
                  }}
                  data-test={TEST_IDS.HIDE_BUTTON}
                >
                  <InlineBodyType
                    variant={Type.body2}
                    semanticColor={semanticColors.textSubdued}
                    condensed
                  >
                    {I18N_AUDIO_REVIEW_HIDE}
                  </InlineBodyType>
                  <StyledChevronUp />
                </SeeAllOrHideButton>
              )}
            </SeeAllSection>
          )}
        </TopPanel>
        <ReviewablePanel>
          {reviewableCreatives.map(
            (reviewableCreative: PendingCreativeResponseRow, idx: number) => (
              <div
                data-test={TEST_IDS.VOICEOVER_ROW}
                key={`voiceover-row-${idx}`}
              >
                {reviewableCreative.voiceover.state ===
                EffectiveVoState.VO_SCRIPT_READY ? (
                  <StyledScriptReviewAd
                    creativePendingReview={reviewableCreative}
                  />
                ) : (
                  <StyledVoiceoverReviewAd
                    creativePendingReview={reviewableCreative}
                    onCloseReviewModal={refreshReviewModule}
                    variant={
                      isSpokenlayerPendingCreativeResponseRow(
                        reviewableCreative,
                      )
                        ? Variant.REVIEW
                        : Variant.APPROVE_REVISE
                    }
                  />
                )}
              </div>
            ),
          )}
          {impersonatorDraftReview &&
            reviewableDrafts.map(
              (reviewableDraft: CatalogueDraft, idx: number) => (
                <div
                  data-test={TEST_IDS.DRAFT_ROW}
                  key={`reviewableDrafts-row-${idx}`}
                >
                  <StyledDraftReviewAd
                    draftPendingReview={reviewableDraft}
                    refreshReviewModule={refreshReviewModule}
                  />
                </div>
              ),
            )}
        </ReviewablePanel>
      </PaddingBox>
    </div>
  );
};

export default AdvertiserReview;
