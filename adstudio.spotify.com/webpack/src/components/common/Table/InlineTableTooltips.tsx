import React from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { TooltipInfo } from '@spotify-internal/adstudio-tape';

import { DerivedCampaignStatus } from 'utils/campaignHierarchy/campaignStatus';
import { isPodcastFormatType } from 'utils/creativeHelpers';

import {
  BffCreativeState,
  CreativeState,
} from 'types/common/state/api/creatives';
import { BffFlightState, FlightState } from 'types/common/state/api/flights';
import { FormatType } from 'types/common/state/api/format';

const StyledTooltipInfo = styled(TooltipInfo)<{ adjustLeft?: boolean }>`
  justify-content: ${props => (props.adjustLeft ? 'flex-start' : 'flex-end')};
`;

export const MissingMetricTooltip = () => (
  <StyledTooltipInfo
    icon={false}
    tooltipText={i18n.t(
      'I18N_YOU_WILL_SEE_METRICS_FOR',
      'You will see metrics for this once your ad goes live.',
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export const NotPodcastMetricFlightTooltip = () => (
  <StyledTooltipInfo
    icon={false}
    tooltipText={i18n.t(
      'I18N_AD_SET_NO_ADS_OFF_SPOTIFY',
      "This ad set doesn't have any ads that ran off Spotify.",
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export const NotPodcastMetricCreativeTooltip = () => (
  <StyledTooltipInfo
    icon={false}
    tooltipText={i18n.t(
      'I18N_AD_NOT_OFF_SPOTIFY',
      "This ad didn't run off Spotify.",
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export const NotPodcastMetricCampaignTooltip = () => (
  <StyledTooltipInfo
    icon={false}
    tooltipText={i18n.t(
      'I18N_AD_SET_NO_CAMPAIGNS_OFF_SPOTIFY',
      "This campaign doesn't have any ads that ran off Spotify.",
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export const OnlyAdsPlacedInMusicTooltip = () => (
  <StyledTooltipInfo
    icon={false}
    tooltipText={i18n.t(
      'I18N_TOOLTIP_EMPTY_DATA_MUSIC_ONLY',
      'Data only available for ads placed within music.',
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export const NotPromotingArtistsTooltip = () => (
  <StyledTooltipInfo
    icon={false}
    tooltipText={i18n.t(
      'I18N_THIS_METRIC_ONLY_APPLIES',
      'This metric only applies to artist promotion ads.',
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export const NotAppliedToDateFilterTooltip = () => (
  <StyledTooltipInfo
    adjustLeft
    icon={false}
    tooltipText={i18n.t(
      'I18N_METRIC_NOT_APPLIED_FOR_DATE_FILTER',
      'This metric isn’t available when the date filter is applied.',
    )}
    placement="right"
  >
    <span data-test="metric-does-not-apply-to-date-filter" />-
  </StyledTooltipInfo>
);

export const MissingPodcastClickMetricsTooltip = () => (
  <StyledTooltipInfo
    icon={false}
    tooltipText={i18n.t(
      'I18N_CLICKS_AND_CTR_METRICS',
      'Clicks and CTR don’t apply to campaigns that include podcast ad placements.',
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export const MissingPodcastQuartilesMetricsTooltip = () => (
  <StyledTooltipInfo
    icon={false}
    tooltipText={i18n.t(
      'I18N_QUARTILES_PODCAST_METRICS',
      "Quartile completion rates aren't available right now for campaigns that include podcast placements.",
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export const MissingPlacementDraftTooltip = () => (
  <StyledTooltipInfo
    adjustLeft
    icon={false}
    tooltipText={i18n.t(
      'I18N_DRAFTS_PLACEMENT_TOOLTIP_TEXT',
      'Placement has not been selected for this ad set.',
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export const MissingFormatDraftTooltip = () => (
  <StyledTooltipInfo
    adjustLeft
    icon={false}
    tooltipText={i18n.t(
      'I18N_DRAFTS_FORMAT_TOOLTIP_TEXT',
      'Format has not been selected for this ad set.',
    )}
    placement="right"
  >
    -
  </StyledTooltipInfo>
);

export function getMissingClicksAndCTRTooltip(
  podcastActive: boolean,
  format: FormatType,
) {
  return podcastActive && isPodcastFormatType(format) ? (
    <MissingPodcastClickMetricsTooltip />
  ) : (
    <MissingMetricTooltip />
  );
}

export function getMissingQuartilesTooltip(
  podcastActive: boolean,
  format: FormatType,
) {
  return podcastActive && isPodcastFormatType(format) ? (
    <MissingPodcastQuartilesMetricsTooltip />
  ) : (
    <MissingMetricTooltip />
  );
}

export function getMissingCreativeMetricTooltip(
  creativeState: BffCreativeState,
) {
  return creativeState === CreativeState.STOPPED ||
    creativeState === CreativeState.REJECTED ? (
    '-'
  ) : (
    <MissingMetricTooltip />
  );
}

export function getMissingFlightMetricTooltip(flightState: BffFlightState) {
  return flightState === FlightState.STOPPED ||
    flightState === FlightState.COMPLETED ||
    flightState === FlightState.REJECTED ? (
    '-'
  ) : (
    <MissingMetricTooltip />
  );
}

export function getMissingCampaignMetricTooltip(
  derivedCampaignStatus: DerivedCampaignStatus,
) {
  return derivedCampaignStatus === DerivedCampaignStatus.COMPLETED ||
    derivedCampaignStatus === DerivedCampaignStatus.REJECTED ? (
    '-'
  ) : (
    <MissingMetricTooltip />
  );
}
