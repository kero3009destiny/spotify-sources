import React from 'react';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import styled from 'styled-components';

import { plum } from '@spotify-internal/encore-advertising-web/cjs/styles/colors';
import {
  addColorSet,
  gray80,
  IconDelete,
  IconGridView,
  IconInvite,
  IconPlaylistFolder,
  semanticColors,
  spacer4,
  spacer8,
  spacer16,
  Type,
} from '@spotify-internal/encore-web';

import {
  deleteHierarchyDrafts,
  dismissReview,
} from 'ducks/hierarchyDrafts/actions';

import FormatDate from 'components/common/FormatDate';
import FormatMonetaryAmount from 'components/common/FormatMonetaryAmount';

import { getCreateFlowRoute, getDraftName } from 'utils/hierarchyDraft';

import {
  CenterColumnLink,
  CenterColumnText,
  CreativeImageThumbnail,
  CtaTextLink,
  ReviewAdRow,
} from './ReviewAdStyles';

import { I18N_ASSET_TYPE } from 'config/formats';

import { Placement } from 'types/common/campaignHierarchy/types';
import { CatalogueDraft, CreateFlowType } from 'types/common/state/api/drafts';

const Details = styled.div`
  display: flex;
  margin-top: ${spacer4};

  > *:after {
    margin: 0 ${spacer8};
    content: '•';
  }

  > *:last-of-type:after {
    display: none;
  }
`;

const IconWrapper = styled.div`
  background-color: ${plum};
  height: 68px;
  width: 68px;
  padding: 22px;
  border: 1px solid ${gray80};
`;

const CenterColumn = styled.div`
  display: flex;
  grid-gap: ${spacer16};
  align-items: center;
  justify-content: space-between;
`;

export interface DraftReviewProps {
  draftPendingReview: CatalogueDraft;
  refreshReviewModule: () => void;
  className?: string;
}

export const DraftReviewAd = (props: DraftReviewProps) => {
  const dispatch = useDispatch();
  const { className, draftPendingReview } = props;
  const { bffHierarchyDraft } = draftPendingReview;
  const draftUrl = getCreateFlowRoute(draftPendingReview);
  const markAsReviewed = () => {
    dispatch(dismissReview(bffHierarchyDraft.id));
  };

  return (
    <div className={className}>
      <ReviewAdRow>
        <div>
          <DraftThumbnail draft={draftPendingReview} />
        </div>

        <CenterColumn>
          <div>
            <CenterColumnLink to={draftUrl} onClick={markAsReviewed}>
              <Type.p condensed>{getDraftName(draftPendingReview)}</Type.p>
            </CenterColumnLink>

            <Details>
              {!!draftPendingReview.flightDraft?.formValues.placement && (
                <CenterColumnText>
                  {draftPendingReview.flightDraft?.formValues.placement! ===
                  Placement.PODCASTS
                    ? i18n.t('I18N_PODCASTS', 'Podcasts')
                    : i18n.t('I18N_MUSIC', 'Music')}
                </CenterColumnText>
              )}

              {!!draftPendingReview.flightDraft?.formValues.format && (
                <CenterColumnText>
                  {
                    I18N_ASSET_TYPE[
                      draftPendingReview.flightDraft?.formValues.format!
                    ]
                  }
                </CenterColumnText>
              )}

              {!!draftPendingReview.creativeDraft?.formValues.format &&
                !draftPendingReview.flightDraft?.formValues.format && (
                  <CenterColumnText>
                    {
                      I18N_ASSET_TYPE[
                        draftPendingReview.creativeDraft?.formValues.format!
                      ]
                    }
                  </CenterColumnText>
                )}

              {!!draftPendingReview.flightDraft?.formValues.startDate && (
                <CenterColumnText>
                  {i18n.t('I18N_START_DATE', 'Start date')}:{' '}
                  <FormatDate
                    date={draftPendingReview.flightDraft?.formValues.startDate!}
                    dateFormat="MMM D"
                  />
                </CenterColumnText>
              )}

              {!!draftPendingReview.flightDraft?.formValues.totalBudget && (
                <CenterColumnText>
                  {i18n.t('I18N_BUDGET', 'Budget')}:{' '}
                  <FormatMonetaryAmount
                    number={parseInt(
                      draftPendingReview.flightDraft?.formValues.totalBudget!,
                      10,
                    )}
                  />
                </CenterColumnText>
              )}
            </Details>
          </div>

          <div style={{ width: 160, textAlign: 'right' }}>
            <CenterColumnText variant={Type.body2}>
              {bffHierarchyDraft.source === 'IMPERSONATOR'
                ? i18n.t(
                    'I18N_IMPERSONATOR_DRAFT_CREATED_BY_ADMIN',
                    'Draft created by Ad Studio Admin',
                  )
                : i18n.t(
                    'I18N_IMPERSONATOR_DRAFT_MODIFIED_BY_ADMIN',
                    'Draft modified by Ad Studio Admin',
                  )}
            </CenterColumnText>
          </div>
        </CenterColumn>

        <div>
          <CtaTextLink to={draftUrl} onClick={markAsReviewed}>
            <Type variant={Type.cta3}>{i18n.t('I18N_REVIEW', 'Review')}</Type>
          </CtaTextLink>
          <IconDelete
            style={{ cursor: 'pointer' }}
            data-test="delete-draft-notification"
            semanticColor={semanticColors.textSubdued}
            iconSize={24}
            onClick={() => {
              dispatch(
                deleteHierarchyDrafts(
                  [bffHierarchyDraft.id],
                  props.refreshReviewModule,
                ),
              );
            }}
          />
        </div>
      </ReviewAdRow>
    </div>
  );
};

interface DraftThumbnailProps {
  draft: CatalogueDraft;
}

export function DraftThumbnail({ draft }: DraftThumbnailProps) {
  const type = draft.bffHierarchyDraft.createFlowType;

  const shouldShowCoverArt =
    type === CreateFlowType.ADD_TO_FLIGHT &&
    draft.creativeDraft?.formValues.coverArtGcsUri;

  const Icon =
    (type === CreateFlowType.ADD_TO_CAMPAIGN && IconGridView) ||
    (type === CreateFlowType.ADD_TO_FLIGHT && IconInvite) ||
    IconPlaylistFolder;

  return shouldShowCoverArt ? (
    <CreativeImageThumbnail
      src={draft.creativeDraft!.formValues.coverArtGcsUri!}
    />
  ) : (
    <IconWrapper className={addColorSet('invertedDark')}>
      <Icon semanticColor={semanticColors.textBase} />
    </IconWrapper>
  );
}
