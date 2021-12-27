import React from 'react';
import i18n from 'i18next';

import { Type } from '@spotify-internal/encore-web';
import { IconDocument } from '@spotify-internal/encore-web/advertising/icons/IconDocument';

import {
  CenterColumnLink,
  CenterColumnText,
  CtaTextLink,
  DocumentThumbnailDiv,
  ReviewAdRow,
} from './ReviewAdStyles';

import { routeFragmentLiterals, routes } from 'config/routes';

import { PendingCreativeResponseRow } from 'types/common/state/api/assets';

export interface ScriptReviewAdProps {
  creativePendingReview: PendingCreativeResponseRow;
  className?: string;
}

export function ScriptReviewAd(props: ScriptReviewAdProps) {
  const { creativePendingReview, className } = props;
  const nameUrl = routes.CREATIVE_ENTITY_DETAILS.replace(
    routeFragmentLiterals.ACCOUNT_ID,
    creativePendingReview.adAccountId,
  ).replace(
    routeFragmentLiterals.CREATIVE_ID,
    creativePendingReview.creativeId,
  );

  return (
    <div className={className}>
      <ReviewAdRow>
        <DocumentThumbnailDiv>
          <IconDocument iconSize={32} />
        </DocumentThumbnailDiv>
        <div>
          <CenterColumnLink to={nameUrl}>
            <Type.p condensed>{creativePendingReview.name}</Type.p>
          </CenterColumnLink>
          <CenterColumnText>
            {i18n.t('I18N_PODCAST_AD_SCRIPT', 'Podcast ad script')}
          </CenterColumnText>
        </div>
        <div>
          <CtaTextLink to={nameUrl}>
            <Type variant={Type.cta3}>{i18n.t('I18N_REVIEW', 'Review')}</Type>
          </CtaTextLink>
        </div>
      </ReviewAdRow>
    </div>
  );
}
