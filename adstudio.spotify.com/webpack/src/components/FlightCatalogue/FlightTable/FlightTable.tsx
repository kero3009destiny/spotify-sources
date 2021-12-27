import React, { PureComponent } from 'react';
import i18n from 'i18next';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import {
  FormToggle,
  TableContainer,
  TableRow,
} from '@spotify-internal/encore-web';

import { ColumnSelection } from 'ducks/columns/types';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { AuthContextConsumer } from 'components/common/AuthorizationContext';
import { DashboardTable } from 'components/common/CampaignHierarchy/DashboardTable';
import { hasDateParams } from 'components/common/CampaignHierarchy/DateFilter/DateFilterHelpers';
import { DateFilterMessageRow } from 'components/common/CampaignHierarchy/DateFilter/DateFilterMessageRow';
import { PromptToCreateEntity } from 'components/common/CampaignHierarchy/PromptToCreateEntity';
import { SelectableTableRow } from 'components/common/CampaignHierarchy/SelectableTableRow';
import { StatusIndicator } from 'components/common/CampaignHierarchy/StatusIndicator';
import {
  ifCpclNa,
  ifCpmNa,
} from 'components/common/CampaignHierarchy/TableCellHelpers';
import FormatDate from 'components/common/FormatDate';
import FormatMonetaryAmount from 'components/common/FormatMonetaryAmount';
import { Centered } from 'components/common/styles';
import {
  getMissingClicksAndCTRTooltip,
  getMissingFlightMetricTooltip,
  getMissingQuartilesTooltip,
  NotAppliedToDateFilterTooltip,
  NotPodcastMetricFlightTooltip,
  NotPromotingArtistsTooltip,
  OnlyAdsPlacedInMusicTooltip,
} from 'components/common/Table/InlineTableTooltips';
import { RenderIfTruthy } from 'components/common/Table/RenderIfTruthy';
import { SortableTableHeader } from 'components/common/Table/SortableTableHeader';
import { TableBody } from 'components/common/Table/TableBody';
import {
  NoWrapTableCell,
  PaddedTableCell,
} from 'components/common/Table/TableCells';
import {
  TableContextConsumer,
  TableType,
} from 'components/common/Table/TableContext';
import { PaddedTableHeaderCell } from 'components/common/Table/TableHeaderCell';
import { TableHeaderWithTooltip } from 'components/common/Table/TableHeaderWithTooltip';
import OfferDetails, { DisplayType } from 'components/Offers';

import { getTooltipText } from 'utils/columnUtils';
import { isPodcastFormatType } from 'utils/creativeHelpers';
import { isFlightPaused } from 'utils/flightHelpers';
import {
  formatPercentRate,
  numberWithCommas,
  roundedWithCommas,
} from 'utils/numberHelpers';

import { FlightName } from './Cells/FlightName';
import FlightPacing from './Cells/FlightPacing';
import { FlightCheckbox } from './FlightCheckbox';

import { getCostModel, TEST_IDS } from './constants';
import { getAllColumns } from './FlightsColumnCustomization/constants';
import { PAUSABLE_STATES } from 'ducks/flights/constants';
import { I18N_ASSET_TYPE, I18N_PLACEMENT } from 'config/formats';

import { SortDirection } from 'types/common/state/api';
import { PauseResumeFlightActionType } from 'types/common/state/api/flight';
import {
  CostType,
  FlightColumns,
  FlightsCatalogueEntity,
  FlightsQueryParams,
  FlightState,
} from 'types/common/state/api/flights';
import { Format } from 'types/common/state/api/format';
import {
  BffFlightSort,
  HierarchyColumns,
} from 'types/common/state/api/hierarchycolumns';

export interface FlightTableProps {
  rows: FlightsCatalogueEntity[];
  isLoading: boolean;
  empty: boolean;
  onChangeParams: (queryParams: Partial<FlightsQueryParams>) => void;
  params: Partial<FlightsQueryParams>;
  selectedColumns: ColumnSelection;
  pauseOrResumeFlight: (
    flightId: string,
    action: PauseResumeFlightActionType,
  ) => void;
  isPausingOrResuming: boolean;
  pauseOrResumeSucceeded: boolean;
  pauseOrResumeError: boolean | string;
  displayNotification: (
    notificationText: string,
    notificationType: string,
  ) => void;
  createNewFlight: (campaignId: string) => void;
  createNewCampaign: () => void;
  showAddFlightPrompt: boolean;
  showAddCampaignPrompt: boolean;
  selectedFlightIds: string[];
  catalogueServerError: boolean;
  isSuperviewer: boolean;
  isSuperUserAccountActive: boolean;
  currentUserAdAccountId: string;
  hasAccountWritePermissions: boolean;
  advertiserHasDraftImpersonation: boolean;
  hasImpersonation: boolean;
  isSpanEnabled: boolean;
}

export class FlightTable extends PureComponent<FlightTableProps> {
  componentDidUpdate(prevProps: Readonly<FlightTableProps>): void {
    if (
      !prevProps.pauseOrResumeSucceeded &&
      this.props.pauseOrResumeSucceeded
    ) {
      this.props.displayNotification(
        i18n.t(
          'I18N_YOUR_AD_SET_UPDATED',
          'Your ad set was updated successfully.',
        ),
        'positive',
      );
    }
    if (!prevProps.pauseOrResumeError && this.props.pauseOrResumeError) {
      this.props.displayNotification(
        i18n.t(
          'I18N_UNABLE_TO_UPDATE_AD_SET',
          'We’re unable to update your ad set. Try again in a few moments.',
        ),
        'warning',
      );
    }
  }

  onHeaderCellClick = (sortCriteria: BffFlightSort) => {
    const sortDirection =
      this.props.params.sortDirection === SortDirection.DESC
        ? SortDirection.ASC
        : SortDirection.DESC;

    this.props.onChangeParams({
      sortCriteria,
      sortDirection,
    });
  };

  shouldShowColumn = (column: FlightColumns) => {
    return this.props.selectedColumns[column];
  };

  getHeaderColumnForColumn = (
    column: FlightColumns,
    isSpanEnabled: boolean,
  ) => {
    const label = getAllColumns(isSpanEnabled)[column];
    return i18n.t(label!.i18nKey, label!.default);
  };

  generateOfferDetails = () => {
    const subtitle = i18n.t(
      'I18N_LAUNCH_YOUR_FIRST_CAMPAIGN',
      'Launch your first campaign, then come back here to see how it’s doing.',
    );
    const ctaText = i18n.t('I18N_CREATE_NEW_CAMPAIGN', 'Create new campaign');
    const onClickCTA = () => this.props.createNewCampaign();

    const campaignPrompt = (
      <PromptToCreateEntity
        title={i18n.t('I18N_NOTHING_TO_SHOW', 'Nothing to show yet!')}
        subtitle={subtitle}
        ctaText={ctaText}
        onClickCTA={onClickCTA}
      />
    );

    return (
      <OfferDetails
        displayType={DisplayType.TABLE}
        defaultComponent={campaignPrompt}
        tableOnClickCTA={onClickCTA}
      />
    );
  };

  generateEmptyState = (
    showAddCampaignPrompt: boolean,
    showAddFlightPrompt: boolean,
    params: Partial<FlightsQueryParams>,
    hasAccountWritePermissions: boolean,
    advertiserHasDraftImpersonation: boolean,
    hasImpersonation: boolean,
    permissions: Array<RolePermissions>,
  ) => {
    // once draft service is fully launched this logic can be simplified
    // to check only for DRAFT_CREATE permissions
    const canImpersonatorBuild =
      hasImpersonation && advertiserHasDraftImpersonation;
    const hasCreatePermissions = permissions.includes(
      RolePermissions.DRAFT_CREATE,
    );
    const userCanCreateDraft =
      (canImpersonatorBuild || hasAccountWritePermissions) &&
      hasCreatePermissions;

    if (showAddCampaignPrompt && userCanCreateDraft) {
      return this.generateOfferDetails;
    }

    if (
      showAddFlightPrompt &&
      permissions.includes(RolePermissions.FLIGHT_CREATE)
    )
      return () => (
        <PromptToCreateEntity
          title={i18n.t(
            'I18N_YOU_DONT_HAVE_ANY_AD_SETS',
            "You don't have any ad sets in your campaign",
          )}
          subtitle={i18n.t(
            'I18N_LAUNCH_YOUR_FIRST_AD',
            'Launch your first ad, then come back here to see how it’s doing.',
          )}
          ctaText={i18n.t('I18N_CREATE_NEW_AD_SET', 'Create new ad set')}
          onClickCTA={() => this.props.createNewFlight(params.campaignId!)}
        />
      );

    return undefined;
  };

  render() {
    const {
      params,
      rows,
      isLoading,
      isPausingOrResuming,
      empty,
      pauseOrResumeFlight,
      showAddFlightPrompt,
      showAddCampaignPrompt,
      catalogueServerError,
      isSuperviewer,
      isSuperUserAccountActive,
      currentUserAdAccountId,
      hasAccountWritePermissions,
      advertiserHasDraftImpersonation,
      hasImpersonation,
      isSpanEnabled,
    } = this.props;
    const hasDateParam = hasDateParams(params);
    const sharedSortableProps = {
      sortDirection: params.sortDirection,
      sortCriteria: params.sortCriteria,
      sortingDisabled: hasDateParam,
      onClick: this.onHeaderCellClick,
    };

    return (
      <TableContextConsumer>
        {(tableType: TableType) => (
          <TableContainer>
            <DashboardTable isLoading={isLoading}>
              <thead>
                <TableRow>
                  {!isSuperUserAccountActive &&
                    tableType === TableType.CATALOGUE && (
                      <PaddedTableHeaderCell>
                        <FlightCheckbox
                          checkboxId="flight-multiselect-select-all"
                          flightIds={rows.map(flight => flight.flightId)}
                        />
                      </PaddedTableHeaderCell>
                    )}
                  <SortableTableHeader<BffFlightSort>
                    sortKey={HierarchyColumns.FLIGHT_NAME as BffFlightSort}
                    tooltipText={getTooltipText(
                      FlightColumns.NAME,
                      isSpanEnabled,
                    )}
                    {...sharedSortableProps}
                  >
                    {i18n.t('I18N_NAME', 'Name')}
                  </SortableTableHeader>
                  <PaddedTableHeaderCell>
                    {i18n.t('I18N_FLIGHT_DELIVERY', 'Delivery')}
                  </PaddedTableHeaderCell>
                  {this.shouldShowColumn(FlightColumns.STATUS) && (
                    <SortableTableHeader<BffFlightSort>
                      sortKey={HierarchyColumns.FLIGHT_STATUS as BffFlightSort}
                      data-test={TEST_IDS.STATUS_HEADER}
                      tooltipText={getTooltipText(
                        FlightColumns.STATUS,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.STATUS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}

                  {this.shouldShowColumn(FlightColumns.PLACEMENT) && (
                    <TableHeaderWithTooltip
                      data-test={TEST_IDS.PLACEMENT_HEADER}
                      tooltipText={getTooltipText(
                        FlightColumns.PLACEMENT,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.PLACEMENT,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}

                  {this.shouldShowColumn(FlightColumns.FORMAT) && (
                    <TableHeaderWithTooltip
                      tooltipText={getTooltipText(
                        FlightColumns.FORMAT,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.FORMAT,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}

                  {this.shouldShowColumn(FlightColumns.COST_MODEL) && (
                    <TableHeaderWithTooltip
                      data-test={TEST_IDS.COST_MODEL_HEADER}
                      tooltipText={getTooltipText(
                        FlightColumns.COST_MODEL,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.COST_MODEL,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}
                  {this.shouldShowColumn(FlightColumns.IMPRESSIONS) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={HierarchyColumns.ADS_SERVED as BffFlightSort}
                      // TODO - once span is launched, set the IMPRESSIONS tooltip value to the value below
                      tooltipText={
                        isSpanEnabled
                          ? i18n.t(
                              'I18N_IMPRESSIONS_ON_SPOTIFY_TOOLTIP_AD_SETS',
                              'The total number of ads within the ad set served on Spotify.',
                            )
                          : getTooltipText(
                              FlightColumns.IMPRESSIONS,
                              isSpanEnabled,
                            )
                      }
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.IMPRESSIONS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}

                  {isSpanEnabled &&
                    this.shouldShowColumn(
                      FlightColumns.EXTERNAL_IMPRESSIONS,
                    ) && (
                      <SortableTableHeader<BffFlightSort>
                        align="right"
                        sortKey={
                          HierarchyColumns.EXTERNAL_IMPRESSIONS as BffFlightSort
                        }
                        tooltipText={i18n.t(
                          'I18N_IMPRESSIONS_OFF_SPOTIFY_TOOLTIP_AD_SETS',
                          'The total number of ads within the ad set served off Spotify.',
                        )}
                        {...sharedSortableProps}
                      >
                        {this.getHeaderColumnForColumn(
                          FlightColumns.EXTERNAL_IMPRESSIONS,
                          isSpanEnabled,
                        )}
                      </SortableTableHeader>
                    )}
                  {this.shouldShowColumn(FlightColumns.CLICK) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      data-test={TEST_IDS.CLICKS_HEADER}
                      sortKey={HierarchyColumns.CLICKS as BffFlightSort}
                      tooltipText={getTooltipText(
                        FlightColumns.CLICK,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.CLICK,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.CTR) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={HierarchyColumns.CTR as BffFlightSort}
                      tooltipText={getTooltipText(
                        FlightColumns.CTR,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.CTR,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}

                  {this.shouldShowColumn(FlightColumns.COMPLETION_RATE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      data-test={TEST_IDS.COMPLETION_RATE_HEADER}
                      tooltipText={getTooltipText(
                        FlightColumns.COMPLETION_RATE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.COMPLETION_RATE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}

                  {this.shouldShowColumn(FlightColumns.AD_LISTENS) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={HierarchyColumns.LISTENS as BffFlightSort}
                      tooltipText={getTooltipText(
                        FlightColumns.AD_LISTENS,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.AD_LISTENS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.AD_LISTEN_RATE) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      data-test={TEST_IDS.LISTEN_RATE_HEADER}
                      sortKey={
                        HierarchyColumns.COMPLETION_RATE as BffFlightSort
                      }
                      tooltipText={getTooltipText(
                        FlightColumns.AD_LISTEN_RATE,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.AD_LISTEN_RATE,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.LISTENERS) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={HierarchyColumns.LISTENERS as BffFlightSort}
                      tooltipText={getTooltipText(
                        FlightColumns.LISTENERS,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.LISTENERS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.NEW_LISTENERS) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={HierarchyColumns.NEW_LISTENERS as BffFlightSort}
                      tooltipText={getTooltipText(
                        FlightColumns.NEW_LISTENERS,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.NEW_LISTENERS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.BUDGET_SPENT) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={HierarchyColumns.SPEND as BffFlightSort}
                      tooltipText={getTooltipText(
                        FlightColumns.BUDGET_SPENT,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.BUDGET_SPENT,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.START_DATE) && (
                    <SortableTableHeader
                      align="right"
                      data-test={TEST_IDS.START_DATE_HEADER}
                      sortKey={
                        HierarchyColumns.FLIGHT_START_DATE as BffFlightSort
                      }
                      tooltipText={getTooltipText(
                        FlightColumns.START_DATE,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.START_DATE,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.END_DATE) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      data-test={TEST_IDS.END_DATE_HEADER}
                      sortKey={
                        HierarchyColumns.FLIGHT_END_DATE as BffFlightSort
                      }
                      tooltipText={getTooltipText(
                        FlightColumns.END_DATE,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.END_DATE,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.PACING) && (
                    <TableHeaderWithTooltip
                      tooltipText={getTooltipText(
                        FlightColumns.PACING,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.PACING,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}
                  {this.shouldShowColumn(FlightColumns.FREQUENCY) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.ADS_SERVED_AVERAGE_FREQUENCY as BffFlightSort
                      }
                      tooltipText={getTooltipText(
                        FlightColumns.FREQUENCY,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.FREQUENCY,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(
                    FlightColumns.FREQUENCY_OF_LISTENS,
                  ) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.LISTENS_AVERAGE_FREQUENCY as BffFlightSort
                      }
                      sortDirection={params.sortDirection}
                      sortCriteria={params.sortCriteria}
                      onClick={this.onHeaderCellClick}
                      tooltipText={getTooltipText(
                        FlightColumns.FREQUENCY_OF_LISTENS,
                        isSpanEnabled,
                      )}
                      data-test={TEST_IDS.FREQUENCY_OF_LISTENS_HEADER}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.FREQUENCY_OF_LISTENS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.REACH) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.ADS_SERVED_REACH as BffFlightSort
                      }
                      tooltipText={getTooltipText(
                        FlightColumns.REACH,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.REACH,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.LISTENS_REACH) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={HierarchyColumns.LISTENS_REACH as BffFlightSort}
                      tooltipText={getTooltipText(
                        FlightColumns.LISTENS_REACH,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.LISTENS_REACH,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.BUDGET) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={HierarchyColumns.FLIGHT_BUDGET as BffFlightSort}
                      data-test={TEST_IDS.BUDGET_HEADER}
                      tooltipText={getTooltipText(
                        FlightColumns.BUDGET,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.BUDGET,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(FlightColumns.INTENT_RATE) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={HierarchyColumns.INTENT_RATE as BffFlightSort}
                      tooltipText={getTooltipText(
                        FlightColumns.INTENT_RATE,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.INTENT_RATE,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(
                    FlightColumns.NEW_LISTENER_CONVERSION_RATE,
                  ) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.NEW_LISTENER_CONVERSION_RATE as BffFlightSort
                      }
                      data-test={TEST_IDS.NEW_LISTENER_CONVERSION_RATE_HEADER}
                      tooltipText={getTooltipText(
                        FlightColumns.NEW_LISTENER_CONVERSION_RATE,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.NEW_LISTENER_CONVERSION_RATE,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(
                    FlightColumns.LISTENER_CONVERSION_RATE,
                  ) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.LISTENER_CONVERSION_RATE as BffFlightSort
                      }
                      data-test={TEST_IDS.LISTENER_CONVERSION_RATE_HEADER}
                      tooltipText={getTooltipText(
                        FlightColumns.LISTENER_CONVERSION_RATE,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.LISTENER_CONVERSION_RATE,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}

                  {this.shouldShowColumn(
                    FlightColumns.AVERAGE_STREAMS_PER_LISTENER,
                  ) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.AVERAGE_STREAMS_PER_LISTENER as BffFlightSort
                      }
                      tooltipText={getTooltipText(
                        FlightColumns.AVERAGE_STREAMS_PER_LISTENER,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.AVERAGE_STREAMS_PER_LISTENER,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}

                  {this.shouldShowColumn(
                    FlightColumns.AVERAGE_STREAMS_PER_NEW_LISTENER,
                  ) && (
                    <SortableTableHeader<BffFlightSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.AVERAGE_STREAMS_PER_NEW_LISTENER as BffFlightSort
                      }
                      tooltipText={getTooltipText(
                        FlightColumns.AVERAGE_STREAMS_PER_NEW_LISTENER,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.AVERAGE_STREAMS_PER_NEW_LISTENER,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}

                  {this.shouldShowColumn(FlightColumns.FIRST_QUARTILE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      data-test={TEST_IDS.FIRST_QUARTILE_HEADER}
                      tooltipText={getTooltipText(
                        FlightColumns.FIRST_QUARTILE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.FIRST_QUARTILE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}

                  {this.shouldShowColumn(FlightColumns.SECOND_QUARTILE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      tooltipText={getTooltipText(
                        FlightColumns.SECOND_QUARTILE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.SECOND_QUARTILE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}

                  {this.shouldShowColumn(FlightColumns.THIRD_QUARTILE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      tooltipText={getTooltipText(
                        FlightColumns.THIRD_QUARTILE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.THIRD_QUARTILE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}

                  {this.shouldShowColumn(FlightColumns.FOURTH_QUARTILE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      tooltipText={getTooltipText(
                        FlightColumns.FOURTH_QUARTILE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        FlightColumns.FOURTH_QUARTILE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}
                </TableRow>
                {hasDateParam && !isLoading && (
                  <DateFilterMessageRow
                    message={i18n.t(
                      'I18N_DATE_PICKER_AD_SET_RESULTS_MESSAGE',
                      'Only showing ad sets with stats in this period.',
                    )}
                    queryParams={params}
                    colSpan={Object.keys(FlightColumns).length}
                  />
                )}
              </thead>
              <AnalyticsContextConsumer>
                {({ category, logUserAction }) => (
                  <AuthContextConsumer>
                    {permissions => {
                      return (
                        <TableBody
                          isLoading={isLoading}
                          empty={empty}
                          searchWord={params.searchWord}
                          NoResultsComponent={this.generateEmptyState(
                            showAddCampaignPrompt,
                            showAddFlightPrompt,
                            params,
                            hasAccountWritePermissions,
                            advertiserHasDraftImpersonation,
                            hasImpersonation,
                            permissions,
                          )}
                          catalogueServerError={catalogueServerError}
                        >
                          {rows.map(
                            (
                              flightRow: FlightsCatalogueEntity,
                              idx: number,
                            ) => {
                              const flightIsPausable = PAUSABLE_STATES.includes(
                                flightRow.flightState,
                              );
                              const paused = isFlightPaused(flightRow);

                              // Special case for superviewers using their own admin account – they have
                              // FLIGHT_UPDATE but should not have access to other accounts' flights
                              const isSuperviewerReadonlyFlight =
                                isSuperviewer &&
                                flightRow.adAccountId !==
                                  currentUserAdAccountId;

                              const canUpdateFlight =
                                permissions.includes(
                                  RolePermissions.FLIGHT_UPDATE,
                                ) && !isSuperviewerReadonlyFlight;

                              return (
                                <SelectableTableRow
                                  key={`flight-table-row-${flightRow.flightId}`}
                                  isSelected={false}
                                >
                                  {!isSuperUserAccountActive &&
                                    tableType === TableType.CATALOGUE && (
                                      <PaddedTableCell>
                                        <FlightCheckbox
                                          checkboxId={`flight-multiselect-${flightRow.flightId}`}
                                          flightIds={[flightRow.flightId]}
                                        />
                                      </PaddedTableCell>
                                    )}
                                  <PaddedTableCell>
                                    <FlightName
                                      couldShowDuplicationCoachmark={idx === 0}
                                      flightRow={flightRow}
                                      isSuperviewer={isSuperviewer}
                                      currentUserAdAccountId={
                                        currentUserAdAccountId
                                      }
                                      pauseOrResumeFlight={pauseOrResumeFlight}
                                      isSpanEnabled={isSpanEnabled}
                                    />
                                  </PaddedTableCell>

                                  <PaddedTableCell>
                                    <Centered>
                                      <FormToggle
                                        onChange={() => {
                                          logUserAction({
                                            category,
                                            label: 'ad_set_delivery_toggle',
                                            params: {
                                              flightId: flightRow.flightId,
                                              toggle: flightRow.isActive
                                                ? 'off'
                                                : 'on',
                                            },
                                          });
                                          pauseOrResumeFlight(
                                            flightRow.flightId,
                                            flightRow.isActive
                                              ? PauseResumeFlightActionType.PAUSE
                                              : PauseResumeFlightActionType.RESUME,
                                          );
                                        }}
                                        checked={flightRow.isActive}
                                        disabled={
                                          !flightIsPausable ||
                                          isPausingOrResuming ||
                                          !canUpdateFlight
                                        }
                                      />
                                    </Centered>
                                  </PaddedTableCell>

                                  {this.shouldShowColumn(
                                    FlightColumns.STATUS,
                                  ) && (
                                    <NoWrapTableCell
                                      data-test={TEST_IDS.STATUS_CELL}
                                    >
                                      <StatusIndicator
                                        status={
                                          paused
                                            ? FlightState.PAUSED
                                            : flightRow.flightState
                                        }
                                      />
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.PLACEMENT,
                                  ) && (
                                    <NoWrapTableCell
                                      data-test={TEST_IDS.PLACEMENT_CELL}
                                    >
                                      {
                                        I18N_PLACEMENT[
                                          flightRow.format || Format.UNKNOWN
                                        ]
                                      }
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.FORMAT,
                                  ) && (
                                    <NoWrapTableCell>
                                      {
                                        I18N_ASSET_TYPE[
                                          flightRow.format || Format.UNKNOWN
                                        ]
                                      }
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.COST_MODEL,
                                  ) && (
                                    <NoWrapTableCell
                                      data-test={TEST_IDS.COST_MODEL_CELL}
                                    >
                                      {/* do not translate cost model acronym */}
                                      {getCostModel(
                                        flightRow.pricingModel,
                                        flightRow.format,
                                      )}
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.IMPRESSIONS,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={!!flightRow.stats.adsServed}
                                        ifFalsy={getMissingFlightMetricTooltip(
                                          flightRow.flightState,
                                        )}
                                      >
                                        {numberWithCommas(
                                          flightRow.stats.adsServed!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {isSpanEnabled &&
                                    this.shouldShowColumn(
                                      FlightColumns.EXTERNAL_IMPRESSIONS,
                                    ) && (
                                      <NoWrapTableCell numerical align="right">
                                        <RenderIfTruthy
                                          predicate={
                                            !!flightRow.stats
                                              .externalImpressions
                                          }
                                          ifFalsy={
                                            isPodcastFormatType(
                                              flightRow.format,
                                            ) ? (
                                              getMissingFlightMetricTooltip(
                                                flightRow.flightState,
                                              )
                                            ) : (
                                              <NotPodcastMetricFlightTooltip />
                                            )
                                          }
                                        >
                                          {numberWithCommas(
                                            flightRow.stats
                                              .externalImpressions!,
                                          )}
                                        </RenderIfTruthy>
                                      </NoWrapTableCell>
                                    )}

                                  {this.shouldShowColumn(
                                    FlightColumns.CLICK,
                                  ) && (
                                    <NoWrapTableCell
                                      data-test={TEST_IDS.CLICKS_CELL}
                                      numerical
                                      align="right"
                                    >
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats.clicks &&
                                          !isPodcastFormatType(flightRow.format)
                                        }
                                        ifFalsy={
                                          isPodcastFormatType(
                                            flightRow.format,
                                          ) ? (
                                            <OnlyAdsPlacedInMusicTooltip />
                                          ) : (
                                            getMissingClicksAndCTRTooltip(
                                              true,
                                              flightRow.format,
                                            )
                                          )
                                        }
                                      >
                                        {numberWithCommas(
                                          flightRow.stats.clicks!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(FlightColumns.CTR) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats.ctr &&
                                          !isPodcastFormatType(flightRow.format)
                                        }
                                        ifFalsy={
                                          isPodcastFormatType(
                                            flightRow.format,
                                          ) ? (
                                            <OnlyAdsPlacedInMusicTooltip />
                                          ) : (
                                            getMissingClicksAndCTRTooltip(
                                              true,
                                              flightRow.format,
                                            )
                                          )
                                        }
                                      >
                                        {formatPercentRate(flightRow.stats.ctr)}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.COMPLETION_RATE,
                                  ) && (
                                    <NoWrapTableCell
                                      numerical
                                      align="right"
                                      data-test={TEST_IDS.COMPLETION_RATE_CELL}
                                    >
                                      {ifCpclNa(
                                        flightRow,
                                        <RenderIfTruthy
                                          predicate={
                                            !!flightRow.stats.completionRate &&
                                            flightRow.pricingModel ===
                                              CostType.CPM &&
                                            !isPodcastFormatType(
                                              flightRow.format,
                                            )
                                          }
                                          ifFalsy={
                                            isPodcastFormatType(
                                              flightRow.format,
                                            ) ? (
                                              <OnlyAdsPlacedInMusicTooltip />
                                            ) : (
                                              undefined
                                            )
                                          }
                                        >
                                          {formatPercentRate(
                                            flightRow.stats.completionRate,
                                          )}
                                        </RenderIfTruthy>,
                                      )}
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.AD_LISTENS,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats.paidListens
                                        }
                                      >
                                        {numberWithCommas(
                                          flightRow.stats.paidListens!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.AD_LISTEN_RATE,
                                  ) && (
                                    <NoWrapTableCell
                                      numerical
                                      align="right"
                                      data-test={TEST_IDS.LISTEN_RATE_CELL}
                                    >
                                      {ifCpmNa(
                                        flightRow,
                                        <RenderIfTruthy
                                          predicate={
                                            !!flightRow.stats.completionRate &&
                                            flightRow.pricingModel ===
                                              CostType.CPCL
                                          }
                                        >
                                          {formatPercentRate(
                                            flightRow.stats.completionRate,
                                          )}
                                        </RenderIfTruthy>,
                                      )}
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.LISTENERS,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={!!flightRow.stats.listeners}
                                        ifFalsy={<NotPromotingArtistsTooltip />}
                                      >
                                        {numberWithCommas(
                                          flightRow.stats.listeners!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.NEW_LISTENERS,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats.newListeners
                                        }
                                        ifFalsy={<NotPromotingArtistsTooltip />}
                                      >
                                        {numberWithCommas(
                                          flightRow.stats.newListeners!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.BUDGET_SPENT,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats.budgetConsumed
                                        }
                                      >
                                        <FormatMonetaryAmount
                                          code={
                                            flightRow.stats.budgetConsumed!
                                              .currency
                                          }
                                          number={
                                            flightRow.stats.budgetConsumed!
                                              .amount
                                          }
                                        />
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.START_DATE,
                                  ) && (
                                    <NoWrapTableCell
                                      data-test={TEST_IDS.START_DATE_CELL}
                                      align="right"
                                    >
                                      <FormatDate date={flightRow.dateBegin} />
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.END_DATE,
                                  ) && (
                                    <NoWrapTableCell
                                      data-test={TEST_IDS.END_DATE_CELL}
                                      align="right"
                                    >
                                      <FormatDate date={flightRow.dateEnd} />
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.PACING,
                                  ) && (
                                    <NoWrapTableCell>
                                      <RenderIfTruthy
                                        predicate={
                                          flightRow.flightState ===
                                            FlightState.ACTIVE &&
                                          flightRow.isActive &&
                                          !hasDateParam
                                        }
                                        ifFalsy={
                                          <RenderIfTruthy
                                            predicate={
                                              flightRow.flightState ===
                                                FlightState.ACTIVE &&
                                              flightRow.isActive &&
                                              hasDateParam
                                            }
                                          >
                                            <NotAppliedToDateFilterTooltip />
                                          </RenderIfTruthy>
                                        }
                                      >
                                        <FlightPacing flightRow={flightRow} />
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.FREQUENCY,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={!!flightRow.stats.frequency}
                                        ifFalsy={getMissingFlightMetricTooltip(
                                          flightRow.flightState,
                                        )}
                                      >
                                        {roundedWithCommas(
                                          flightRow.stats.frequency!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.FREQUENCY_OF_LISTENS,
                                  ) && (
                                    <NoWrapTableCell
                                      numerical
                                      align="right"
                                      data-test={
                                        TEST_IDS.FREQUENCY_OF_LISTENS_CELL
                                      }
                                    >
                                      {ifCpmNa(
                                        flightRow,
                                        <RenderIfTruthy
                                          predicate={
                                            !!flightRow.stats
                                              .frequencyPaidListens
                                          }
                                        >
                                          {numberWithCommas(
                                            flightRow.stats
                                              .frequencyPaidListens!,
                                          )}
                                        </RenderIfTruthy>,
                                      )}
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.REACH,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={!!flightRow.stats.reach}
                                        ifFalsy={getMissingFlightMetricTooltip(
                                          flightRow.flightState,
                                        )}
                                      >
                                        {numberWithCommas(
                                          flightRow.stats.reach!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.LISTENS_REACH,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      {ifCpmNa(
                                        flightRow,
                                        <RenderIfTruthy
                                          predicate={
                                            !!flightRow.stats.reachPaidListens
                                          }
                                        >
                                          {numberWithCommas(
                                            flightRow.stats.reachPaidListens!,
                                          )}
                                        </RenderIfTruthy>,
                                      )}
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.BUDGET,
                                  ) && (
                                    <NoWrapTableCell
                                      numerical
                                      data-test={TEST_IDS.BUDGET_CELL}
                                      align="right"
                                    >
                                      <FormatMonetaryAmount
                                        code={flightRow.totalBudget.currency}
                                        number={flightRow.totalBudget.amount}
                                      />
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.INTENT_RATE,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={!!flightRow.stats.intentRate}
                                        ifFalsy={<NotPromotingArtistsTooltip />}
                                      >
                                        {formatPercentRate(
                                          flightRow.stats.intentRate,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.NEW_LISTENER_CONVERSION_RATE,
                                  ) && (
                                    <NoWrapTableCell
                                      numerical
                                      align="right"
                                      data-test={
                                        TEST_IDS.NEW_LISTENER_CONVERSION_RATE_CELL
                                      }
                                    >
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats
                                            .newListenerConversionRate &&
                                          !hasDateParam
                                        }
                                        ifFalsy={
                                          <RenderIfTruthy
                                            predicate={!hasDateParam}
                                            ifFalsy={
                                              <NotAppliedToDateFilterTooltip />
                                            }
                                          >
                                            <NotPromotingArtistsTooltip />
                                          </RenderIfTruthy>
                                        }
                                      >
                                        {formatPercentRate(
                                          flightRow.stats
                                            .newListenerConversionRate!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.LISTENER_CONVERSION_RATE,
                                  ) && (
                                    <NoWrapTableCell
                                      numerical
                                      align="right"
                                      data-test={
                                        TEST_IDS.LISTENER_CONVERSION_RATE_CELL
                                      }
                                    >
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats
                                            .listenerConversionRate &&
                                          !hasDateParam
                                        }
                                        ifFalsy={
                                          <RenderIfTruthy
                                            predicate={!hasDateParam}
                                            ifFalsy={
                                              <NotAppliedToDateFilterTooltip />
                                            }
                                          >
                                            <NotPromotingArtistsTooltip />
                                          </RenderIfTruthy>
                                        }
                                      >
                                        {formatPercentRate(
                                          flightRow.stats
                                            .listenerConversionRate!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.AVERAGE_STREAMS_PER_LISTENER,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats
                                            .averageStreamsPerListener
                                        }
                                        ifFalsy={<NotPromotingArtistsTooltip />}
                                      >
                                        {roundedWithCommas(
                                          flightRow.stats
                                            .averageStreamsPerListener!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.AVERAGE_STREAMS_PER_NEW_LISTENER,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats
                                            .averageStreamsPerNewListener
                                        }
                                        ifFalsy={<NotPromotingArtistsTooltip />}
                                      >
                                        {roundedWithCommas(
                                          flightRow.stats
                                            .averageStreamsPerNewListener!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}
                                  {this.shouldShowColumn(
                                    FlightColumns.FIRST_QUARTILE,
                                  ) && (
                                    <NoWrapTableCell
                                      numerical
                                      align="right"
                                      data-test={TEST_IDS.FIRST_QUARTILE_CELL}
                                    >
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats.quartiles
                                            ?.firstQuartile &&
                                          flightRow.pricingModel !==
                                            CostType.CPCL &&
                                          !isPodcastFormatType(flightRow.format)
                                        }
                                        ifFalsy={
                                          isPodcastFormatType(
                                            flightRow.format,
                                          ) ? (
                                            <OnlyAdsPlacedInMusicTooltip />
                                          ) : (
                                            getMissingQuartilesTooltip(
                                              true,
                                              flightRow.format,
                                            )
                                          )
                                        }
                                      >
                                        {formatPercentRate(
                                          flightRow.stats.quartiles
                                            ?.firstQuartile,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.SECOND_QUARTILE,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats.quartiles
                                            ?.midpoint &&
                                          flightRow.pricingModel !==
                                            CostType.CPCL &&
                                          !isPodcastFormatType(flightRow.format)
                                        }
                                        ifFalsy={
                                          isPodcastFormatType(
                                            flightRow.format,
                                          ) ? (
                                            <OnlyAdsPlacedInMusicTooltip />
                                          ) : (
                                            getMissingQuartilesTooltip(
                                              true,
                                              flightRow.format,
                                            )
                                          )
                                        }
                                      >
                                        {formatPercentRate(
                                          flightRow.stats.quartiles?.midpoint,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.THIRD_QUARTILE,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats.quartiles
                                            ?.thirdQuartile &&
                                          flightRow.pricingModel !==
                                            CostType.CPCL &&
                                          !isPodcastFormatType(flightRow.format)
                                        }
                                        ifFalsy={
                                          isPodcastFormatType(
                                            flightRow.format,
                                          ) ? (
                                            <OnlyAdsPlacedInMusicTooltip />
                                          ) : (
                                            getMissingQuartilesTooltip(
                                              true,
                                              flightRow.format,
                                            )
                                          )
                                        }
                                      >
                                        {formatPercentRate(
                                          flightRow.stats.quartiles
                                            ?.thirdQuartile,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                  {this.shouldShowColumn(
                                    FlightColumns.FOURTH_QUARTILE,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!flightRow.stats.quartiles
                                            ?.complete &&
                                          flightRow.pricingModel !==
                                            CostType.CPCL &&
                                          !isPodcastFormatType(flightRow.format)
                                        }
                                        ifFalsy={
                                          isPodcastFormatType(
                                            flightRow.format,
                                          ) ? (
                                            <OnlyAdsPlacedInMusicTooltip />
                                          ) : (
                                            getMissingQuartilesTooltip(
                                              true,
                                              flightRow.format,
                                            )
                                          )
                                        }
                                      >
                                        {formatPercentRate(
                                          flightRow.stats.quartiles?.complete,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}
                                </SelectableTableRow>
                              );
                            },
                          )}
                        </TableBody>
                      );
                    }}
                  </AuthContextConsumer>
                )}
              </AnalyticsContextConsumer>
            </DashboardTable>
          </TableContainer>
        )}
      </TableContextConsumer>
    );
  }
}
