import React, { PureComponent } from 'react';
import { event } from 'react-ga';
import i18n from 'i18next';
import styled from 'styled-components';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import {
  FormToggle,
  TableContainer,
  TableRow,
  TableThumbnail,
} from '@spotify-internal/encore-web';

import { ColumnSelection } from 'ducks/columns/types';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { AuthContextConsumer } from 'components/common/AuthorizationContext';
import { DashboardTable } from 'components/common/CampaignHierarchy/DashboardTable';
import { hasDateParams } from 'components/common/CampaignHierarchy/DateFilter/DateFilterHelpers';
import { DateFilterMessageRow } from 'components/common/CampaignHierarchy/DateFilter/DateFilterMessageRow';
import { PromptToCreateEntity } from 'components/common/CampaignHierarchy/PromptToCreateEntity';
import { StatusIndicator } from 'components/common/CampaignHierarchy/StatusIndicator';
import FormatMonetaryAmount from 'components/common/FormatMonetaryAmount';
import { Centered } from 'components/common/styles';
import {
  getMissingClicksAndCTRTooltip,
  getMissingCreativeMetricTooltip,
  getMissingQuartilesTooltip,
  NotPodcastMetricCreativeTooltip,
  NotPromotingArtistsTooltip,
  OnlyAdsPlacedInMusicTooltip,
} from 'components/common/Table/InlineTableTooltips';
import { Activity, NameCell } from 'components/common/Table/NameCell';
import { RenderIfTruthy } from 'components/common/Table/RenderIfTruthy';
import { SortableTableHeader } from 'components/common/Table/SortableTableHeader';
import { TableBody } from 'components/common/Table/TableBody';
import {
  TableContextConsumer,
  TableType,
} from 'components/common/Table/TableContext';
import { PaddedTableHeaderCell } from 'components/common/Table/TableHeaderCell';
import { TableHeaderWithTooltip } from 'components/common/Table/TableHeaderWithTooltip';
import OfferDetails, { DisplayType } from 'components/Offers';

import { getTooltipText } from 'utils/columnUtils';
import { isEditable, isPodcastFormatType } from 'utils/creativeHelpers';
import {
  formatPercentRate,
  numberWithCommas,
  roundedWithCommas,
} from 'utils/numberHelpers';

import {
  NoWrapTableCell,
  PaddedTableCell,
} from '../../common/Table/TableCells';
import { CreativeCheckbox } from './CreativeCheckbox';

import { FLIGHT_LINK_TOGGLE_STATUSES, TEST_IDS } from './constants';
import { getAllColumns } from './CreativeColumnCustomization/constants';
import { GA_ENTITY_NAME_CLICKED } from 'utils/campaignHierarchy/constants';
import { I18N_ASSET_TYPE } from 'config/formats';
import { routeFragmentLiterals, routes } from 'config/routes';

import { SortDirection } from 'types/common/state/api';
import {
  CreativeColumns,
  CreativesCatalogueEntity,
  CreativesQueryParams,
  FlightLinkState,
} from 'types/common/state/api/creatives';
import {
  FlightLinkPauseResumeAction,
  FlightLinkPauseResumeActionType,
} from 'types/common/state/api/flightLink';
import { Format } from 'types/common/state/api/format';
import {
  BffCreativeSort,
  HierarchyColumns,
} from 'types/common/state/api/hierarchycolumns';

const StyledNameCellContainer = styled.div`
  display: flex;
`;

export interface CreativeTableProps {
  rows: CreativesCatalogueEntity[];
  isLoading: boolean;
  empty: boolean;
  onChangeParams: (queryParams: Partial<CreativesQueryParams>) => void;
  params: Partial<CreativesQueryParams>;
  createNewCreative: (fid: string) => void;
  createNewCampaign: () => void;
  selectedColumns: ColumnSelection;
  pauseResumeFlightLink: (
    action: FlightLinkPauseResumeActionType,
    flightId: string,
    creativeId: string,
    creativeAdAccountId: string,
  ) => void;
  isPausingOrResuming: boolean;
  pauseOrResumeError: string | boolean;
  displayNotification: (
    notificationText: string,
    notificationType: string,
  ) => void;
  flightId?: string;
  showSecondaryActions: boolean;
  showAddCreativePrompt: boolean;
  selectedFlightIsLinkable: boolean;
  showAddCampaignPrompt: boolean;
  catalogueServerError: boolean;
  isSuperviewer: boolean;
  isSuperUserAccountActive: boolean;
  currentUserAdAccountId: string;
  hasAccountWritePermissions: boolean;
  advertiserHasDraftImpersonation: boolean;
  hasImpersonation: boolean;
  isSpanEnabled: boolean;
}

export class CreativeTable extends PureComponent<CreativeTableProps> {
  componentDidUpdate(prevProps: Readonly<CreativeTableProps>): void {
    if (!prevProps.pauseOrResumeError && this.props.pauseOrResumeError) {
      this.props.displayNotification(
        i18n.t(
          'I18N_UNABLE_TO_UPDATE_AD',
          'We’re unable to update your ad. Try again in a few moments.',
        ),
        'warning',
      );
    }
  }

  onHeaderCellClick = (sortCriteria: BffCreativeSort) => {
    const sortDirection =
      this.props.params.sortDirection === SortDirection.DESC
        ? SortDirection.ASC
        : SortDirection.DESC;

    this.props.onChangeParams({
      sortCriteria,
      sortDirection,
    });
  };

  shouldShowColumn = (column: CreativeColumns) => {
    return this.props.selectedColumns[column];
  };

  getHeaderColumnForColumn = (
    column: CreativeColumns,
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
    showAddCreativePrompt: boolean,
    flightId: string,
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
      showAddCreativePrompt &&
      permissions.includes(RolePermissions.CREATIVE_CREATE)
    )
      return () => (
        <PromptToCreateEntity
          title={i18n.t(
            'I18N_YOU_DONT_HAVE_ANY_ADS',
            "You don't have any ads in your ad set",
          )}
          subtitle={i18n.t(
            'I18N_LAUNCH_YOUR_FIRST_AD',
            'Launch your first ad, then come back here to see how it’s doing.',
          )}
          ctaText={i18n.t('I18N_CREATE_NEW_AD', 'Create new ad')}
          onClickCTA={() => this.props.createNewCreative(flightId)}
        />
      );

    return undefined;
  };

  render() {
    const {
      params,
      rows,
      isLoading,
      empty,
      pauseResumeFlightLink,
      isPausingOrResuming,
      flightId,
      showSecondaryActions,
      showAddCreativePrompt,
      selectedFlightIsLinkable,
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
    // Podcast features are only available for USA based ad accounts

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
                        <CreativeCheckbox
                          checkboxId="creative-multiselect-select-all"
                          creativeIds={rows.map(
                            creative => creative.creativeId,
                          )}
                        />
                      </PaddedTableHeaderCell>
                    )}
                  <SortableTableHeader<BffCreativeSort>
                    sortKey={HierarchyColumns.CREATIVE_NAME as BffCreativeSort}
                    tooltipText={getTooltipText(
                      CreativeColumns.NAME,
                      isSpanEnabled,
                    )}
                    {...sharedSortableProps}
                  >
                    {i18n.t('I18N_NAME', 'Name')}
                  </SortableTableHeader>
                  {flightId && (
                    <PaddedTableHeaderCell>
                      {i18n.t('I18N_DELIVERY', 'Delivery')}
                    </PaddedTableHeaderCell>
                  )}
                  {this.shouldShowColumn(CreativeColumns.STATUS) && (
                    <SortableTableHeader<BffCreativeSort>
                      sortKey={
                        HierarchyColumns.CREATIVE_STATUS as BffCreativeSort
                      }
                      data-test={TEST_IDS.STATUS_HEADER}
                      tooltipText={getTooltipText(
                        CreativeColumns.STATUS,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.STATUS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}

                  {this.shouldShowColumn(CreativeColumns.FORMAT) && (
                    <TableHeaderWithTooltip
                      align="right"
                      tooltipText={getTooltipText(
                        CreativeColumns.FORMAT,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.FORMAT,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}

                  {this.shouldShowColumn(CreativeColumns.IMPRESSIONS) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      sortKey={HierarchyColumns.ADS_SERVED as BffCreativeSort}
                      // TODO - once span is launched, set the IMPRESSIONS tooltip value to the value below
                      tooltipText={
                        isSpanEnabled
                          ? i18n.t(
                              'I18N_IMPRESSIONS_ON_SPOTIFY_TOOLTIP_ADS',
                              'The total number of ads served on Spotify.',
                            )
                          : getTooltipText(
                              CreativeColumns.IMPRESSIONS,
                              isSpanEnabled,
                            )
                      }
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.IMPRESSIONS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}

                  {isSpanEnabled &&
                    this.shouldShowColumn(
                      CreativeColumns.EXTERNAL_IMPRESSIONS,
                    ) && (
                      <SortableTableHeader<BffCreativeSort>
                        align="right"
                        sortKey={
                          HierarchyColumns.EXTERNAL_IMPRESSIONS as BffCreativeSort
                        }
                        tooltipText={i18n.t(
                          'I18N_IMPRESSIONS_OFF_SPOTIFY_TOOLTIP_ADS',
                          'The total number of ads served off Spotify.',
                        )}
                        {...sharedSortableProps}
                      >
                        {this.getHeaderColumnForColumn(
                          CreativeColumns.EXTERNAL_IMPRESSIONS,
                          isSpanEnabled,
                        )}
                      </SortableTableHeader>
                    )}
                  {this.shouldShowColumn(CreativeColumns.CLICK) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      data-test={TEST_IDS.CLICKS_HEADER}
                      sortKey={HierarchyColumns.CLICKS as BffCreativeSort}
                      tooltipText={getTooltipText(
                        CreativeColumns.CLICK,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.CLICK,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.CTR) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      sortKey={HierarchyColumns.CTR as BffCreativeSort}
                      tooltipText={getTooltipText(
                        CreativeColumns.CTR,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.CTR,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.COMPLETION_RATE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      data-test={TEST_IDS.COMPLETION_RATE_HEADER}
                      tooltipText={getTooltipText(
                        CreativeColumns.COMPLETION_RATE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.COMPLETION_RATE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}
                  {this.shouldShowColumn(CreativeColumns.AD_LISTENS) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      sortKey={HierarchyColumns.LISTENS as BffCreativeSort}
                      tooltipText={getTooltipText(
                        CreativeColumns.AD_LISTENS,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.AD_LISTENS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.AD_LISTEN_RATE) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      data-test={TEST_IDS.LISTEN_RATE_HEADER}
                      sortKey={
                        HierarchyColumns.COMPLETION_RATE as BffCreativeSort
                      }
                      tooltipText={getTooltipText(
                        CreativeColumns.AD_LISTEN_RATE,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.AD_LISTEN_RATE,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.LISTENERS) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      data-test={TEST_IDS.LISTENERS_HEADER}
                      sortKey={HierarchyColumns.LISTENERS as BffCreativeSort}
                      tooltipText={getTooltipText(
                        CreativeColumns.LISTENERS,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.LISTENERS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.NEW_LISTENERS) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.NEW_LISTENERS as BffCreativeSort
                      }
                      tooltipText={getTooltipText(
                        CreativeColumns.NEW_LISTENERS,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.NEW_LISTENERS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.BUDGET_SPENT) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      data-test={TEST_IDS.BUDGET_SPENT_HEADER}
                      sortKey={HierarchyColumns.SPEND as BffCreativeSort}
                      sortDirection={params.sortDirection}
                      sortCriteria={params.sortCriteria}
                      onClick={this.onHeaderCellClick}
                      tooltipText={getTooltipText(
                        CreativeColumns.BUDGET_SPENT,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.BUDGET_SPENT,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.FREQUENCY) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.ADS_SERVED_AVERAGE_FREQUENCY as BffCreativeSort
                      }
                      tooltipText={getTooltipText(
                        CreativeColumns.FREQUENCY,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.FREQUENCY,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(
                    CreativeColumns.FREQUENCY_OF_LISTENS,
                  ) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.LISTENS_AVERAGE_FREQUENCY as BffCreativeSort
                      }
                      tooltipText={getTooltipText(
                        CreativeColumns.FREQUENCY_OF_LISTENS,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.FREQUENCY_OF_LISTENS,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.REACH) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.ADS_SERVED_REACH as BffCreativeSort
                      }
                      tooltipText={getTooltipText(
                        CreativeColumns.REACH,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.REACH,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.LISTENS_REACH) && (
                    <SortableTableHeader<BffCreativeSort>
                      align="right"
                      sortKey={
                        HierarchyColumns.LISTENS_REACH as BffCreativeSort
                      }
                      tooltipText={getTooltipText(
                        CreativeColumns.LISTENS_REACH,
                        isSpanEnabled,
                      )}
                      {...sharedSortableProps}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.LISTENS_REACH,
                        isSpanEnabled,
                      )}
                    </SortableTableHeader>
                  )}
                  {this.shouldShowColumn(CreativeColumns.FIRST_QUARTILE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      data-test={TEST_IDS.QUARTILE_HEADER}
                      tooltipText={getTooltipText(
                        CreativeColumns.FIRST_QUARTILE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.FIRST_QUARTILE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}
                  {this.shouldShowColumn(CreativeColumns.SECOND_QUARTILE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      tooltipText={getTooltipText(
                        CreativeColumns.SECOND_QUARTILE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.SECOND_QUARTILE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}
                  {this.shouldShowColumn(CreativeColumns.THIRD_QUARTILE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      tooltipText={getTooltipText(
                        CreativeColumns.THIRD_QUARTILE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.THIRD_QUARTILE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}
                  {this.shouldShowColumn(CreativeColumns.FOURTH_QUARTILE) && (
                    <TableHeaderWithTooltip
                      align="right"
                      tooltipText={getTooltipText(
                        CreativeColumns.FOURTH_QUARTILE,
                        isSpanEnabled,
                      )}
                    >
                      {this.getHeaderColumnForColumn(
                        CreativeColumns.FOURTH_QUARTILE,
                        isSpanEnabled,
                      )}
                    </TableHeaderWithTooltip>
                  )}
                </TableRow>
                {hasDateParam && !isLoading && (
                  <DateFilterMessageRow
                    message={i18n.t(
                      'I18N_DATE_PICKER_AD_RESULTS_MESSAGE',
                      'Only showing ads with stats in this period.',
                    )}
                    queryParams={params}
                    colSpan={Object.keys(CreativeColumns).length}
                  />
                )}
              </thead>
              <AnalyticsContextConsumer>
                {({ category }) => (
                  <AuthContextConsumer>
                    {permissions => {
                      return (
                        <TableBody
                          isLoading={isLoading}
                          empty={empty}
                          searchWord={params.searchWord}
                          NoResultsComponent={this.generateEmptyState(
                            showAddCampaignPrompt,
                            showAddCreativePrompt,
                            flightId as string,
                            hasAccountWritePermissions,
                            advertiserHasDraftImpersonation,
                            hasImpersonation,
                            permissions,
                          )}
                          catalogueServerError={catalogueServerError}
                        >
                          {rows.map((creativeRow: CreativesCatalogueEntity) => {
                            const isPodcast = isPodcastFormatType(
                              creativeRow.format,
                            );
                            const creativeIsEditable = isEditable(creativeRow);
                            const secondaryActions: Activity[] = [];
                            const creativeDetailsLink = routes.CREATIVE_ENTITY_DETAILS.replace(
                              routeFragmentLiterals.ACCOUNT_ID,
                              creativeRow.adAccountId,
                            ).replace(
                              routeFragmentLiterals.CREATIVE_ID,
                              creativeRow.creativeId,
                            );

                            // Special case for superviewers using their own admin account – they have
                            // CREATIVE_UPDATE but should not have access to other accounts' creatives
                            const isSuperviewerReadonlyCreative =
                              isSuperviewer &&
                              creativeRow.adAccountId !==
                                currentUserAdAccountId;

                            const canUpdateCreative =
                              permissions.includes(
                                RolePermissions.CREATIVE_UPDATE,
                              ) && !isSuperviewerReadonlyCreative;

                            const disableFlightLinkToggle =
                              !FLIGHT_LINK_TOGGLE_STATUSES.includes(
                                creativeRow.flightLinkStatus!,
                              ) ||
                              !canUpdateCreative ||
                              isPausingOrResuming ||
                              (isSpanEnabled && isPodcast);

                            if (showSecondaryActions) {
                              if (
                                selectedFlightIsLinkable &&
                                !isPodcast &&
                                flightId
                              ) {
                                secondaryActions.push({
                                  name: i18n.t('I18N_DUPLICATE', 'DUPLICATE'),
                                  href: routes.DUPLICATE_CREATIVE.replace(
                                    routeFragmentLiterals.ACCOUNT_ID,
                                    creativeRow.adAccountId,
                                  )
                                    .replace(
                                      routeFragmentLiterals.CREATIVE_ID,
                                      creativeRow.creativeId,
                                    )
                                    .replace(
                                      routeFragmentLiterals.FLIGHT_ID,
                                      flightId,
                                    ),
                                  onClick: () =>
                                    event({
                                      category,
                                      action: 'secondary_action_duplicate',
                                      label: JSON.stringify({
                                        creativeId: creativeRow.creativeId,
                                      }),
                                    }),
                                  readOnly: !permissions.includes(
                                    RolePermissions.CREATIVE_CREATE,
                                  ),
                                });
                              }

                              if (creativeIsEditable) {
                                secondaryActions.push({
                                  name: i18n.t('I18N_EDIT', 'Edit'),
                                  'data-test': 'edit-action',
                                  href: routes.EDIT_CREATIVE.replace(
                                    routeFragmentLiterals.ACCOUNT_ID,
                                    creativeRow.adAccountId,
                                  ).replace(
                                    routeFragmentLiterals.CREATIVE_ID,
                                    creativeRow.creativeId,
                                  ),
                                  onClick: () =>
                                    event({
                                      category,
                                      action: 'secondary_action_edit',
                                      label: JSON.stringify({
                                        creativeId: creativeRow.creativeId,
                                      }),
                                    }),
                                  readOnly: !canUpdateCreative,
                                });
                              }
                              secondaryActions.push({
                                name: isSpanEnabled
                                  ? i18n.t('I18N_VIEW_REPORT', 'View report')
                                  : i18n.t('I18N_SEE_OVERVIEW', 'See overview'),
                                href: creativeDetailsLink,
                                onClick: () =>
                                  event({
                                    category,
                                    action: 'secondary_action_see_details',
                                    label: JSON.stringify({
                                      creativeId: creativeRow.creativeId,
                                    }),
                                  }),
                              });
                            }
                            return (
                              <TableRow
                                key={`creative-table-row-${creativeRow.creativeId}`}
                              >
                                {!isSuperUserAccountActive &&
                                  tableType === TableType.CATALOGUE && (
                                    <PaddedTableCell>
                                      <CreativeCheckbox
                                        checkboxId={`creative-multiselect-${creativeRow.creativeId}`}
                                        creativeIds={[creativeRow.creativeId]}
                                      />
                                    </PaddedTableCell>
                                  )}
                                <PaddedTableCell>
                                  <StyledNameCellContainer>
                                    <TableThumbnail
                                      small
                                      imgAlt={creativeRow.name}
                                      img={creativeRow.imageUrl}
                                    />
                                    <NameCell
                                      keyId={creativeRow.creativeId}
                                      name={creativeRow.name}
                                      href={creativeDetailsLink}
                                      secondaryActions={secondaryActions}
                                      data-test="creative-name-cell"
                                      onClick={() => {
                                        event({
                                          category,
                                          action: GA_ENTITY_NAME_CLICKED,
                                          label: JSON.stringify({
                                            name: creativeRow.name,
                                            id: creativeRow.creativeId,
                                          }),
                                        });
                                      }}
                                    />
                                  </StyledNameCellContainer>
                                </PaddedTableCell>
                                {flightId && (
                                  <PaddedTableCell
                                    data-test={TEST_IDS.ASSOCIATION_CELL}
                                  >
                                    <Centered>
                                      <FormToggle
                                        onChange={() => {
                                          const action =
                                            creativeRow.flightLinkStatus ===
                                            FlightLinkState.ACTIVE
                                              ? FlightLinkPauseResumeAction.PAUSE
                                              : FlightLinkPauseResumeAction.RESUME;

                                          event({
                                            category,
                                            action:
                                              'toggle_ad_set_association_ad',
                                            label: JSON.stringify({
                                              flightId,
                                              creativeId:
                                                creativeRow.creativeId,
                                              toggle:
                                                action ===
                                                FlightLinkPauseResumeAction.PAUSE
                                                  ? 'off'
                                                  : 'on',
                                            }),
                                          });
                                          pauseResumeFlightLink(
                                            action,
                                            flightId,
                                            creativeRow.creativeId,
                                            creativeRow.adAccountId,
                                          );
                                        }}
                                        checked={
                                          creativeRow.flightLinkStatus ===
                                          FlightLinkState.ACTIVE
                                        }
                                        disabled={disableFlightLinkToggle}
                                      />
                                    </Centered>
                                  </PaddedTableCell>
                                )}
                                {this.shouldShowColumn(
                                  CreativeColumns.STATUS,
                                ) && (
                                  <NoWrapTableCell
                                    data-test={TEST_IDS.STATUS_CELL}
                                  >
                                    <StatusIndicator
                                      status={creativeRow.creativeState}
                                    />
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.FORMAT,
                                ) && (
                                  <NoWrapTableCell>
                                    {
                                      I18N_ASSET_TYPE[
                                        creativeRow.format || Format.UNKNOWN
                                      ]
                                    }
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.IMPRESSIONS,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={!!creativeRow.stats.adsServed}
                                      ifFalsy={getMissingCreativeMetricTooltip(
                                        creativeRow.creativeState,
                                      )}
                                    >
                                      {numberWithCommas(
                                        creativeRow.stats.adsServed!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {isSpanEnabled &&
                                  this.shouldShowColumn(
                                    CreativeColumns.EXTERNAL_IMPRESSIONS,
                                  ) && (
                                    <NoWrapTableCell numerical align="right">
                                      <RenderIfTruthy
                                        predicate={
                                          !!creativeRow.stats
                                            .externalImpressions
                                        }
                                        ifFalsy={
                                          isPodcast ? (
                                            getMissingCreativeMetricTooltip(
                                              creativeRow.creativeState,
                                            )
                                          ) : (
                                            <NotPodcastMetricCreativeTooltip />
                                          )
                                        }
                                      >
                                        {numberWithCommas(
                                          creativeRow.stats
                                            .externalImpressions!,
                                        )}
                                      </RenderIfTruthy>
                                    </NoWrapTableCell>
                                  )}

                                {this.shouldShowColumn(
                                  CreativeColumns.CLICK,
                                ) && (
                                  <NoWrapTableCell
                                    data-test={TEST_IDS.CLICKS_CELL}
                                    numerical
                                    align="right"
                                  >
                                    <RenderIfTruthy
                                      predicate={
                                        !!creativeRow.stats.clicks && !isPodcast
                                      }
                                      ifFalsy={
                                        isPodcast ? (
                                          <OnlyAdsPlacedInMusicTooltip />
                                        ) : (
                                          getMissingClicksAndCTRTooltip(
                                            true,
                                            creativeRow.format,
                                          )
                                        )
                                      }
                                    >
                                      {numberWithCommas(
                                        creativeRow.stats.clicks!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(CreativeColumns.CTR) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={
                                        !!creativeRow.stats.ctr && !isPodcast
                                      }
                                      ifFalsy={
                                        isPodcast ? (
                                          <OnlyAdsPlacedInMusicTooltip />
                                        ) : (
                                          getMissingClicksAndCTRTooltip(
                                            true,
                                            creativeRow.format,
                                          )
                                        )
                                      }
                                    >
                                      {/* TODO: check on rounding */}
                                      {formatPercentRate(creativeRow.stats.ctr)}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.COMPLETION_RATE,
                                ) && (
                                  <NoWrapTableCell
                                    numerical
                                    align="right"
                                    data-test={TEST_IDS.COMPLETION_RATE_CELL}
                                  >
                                    <RenderIfTruthy
                                      predicate={
                                        !!creativeRow.stats.completionRate &&
                                        !creativeRow.isActiveAudio &&
                                        !isPodcast
                                      }
                                      ifFalsy={
                                        // Don't show tooltip for podcasts since completion rate is intentionally blank
                                        isPodcast ? (
                                          <OnlyAdsPlacedInMusicTooltip />
                                        ) : (
                                          getMissingCreativeMetricTooltip(
                                            creativeRow.creativeState,
                                          )
                                        )
                                      }
                                    >
                                      {formatPercentRate(
                                        creativeRow.stats.completionRate,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.AD_LISTENS,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={
                                        !!creativeRow.stats.paidListens
                                      }
                                    >
                                      {numberWithCommas(
                                        creativeRow.stats.paidListens!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.AD_LISTEN_RATE,
                                ) && (
                                  <NoWrapTableCell
                                    numerical
                                    align="right"
                                    data-test={TEST_IDS.LISTEN_RATE_CELL}
                                  >
                                    <RenderIfTruthy
                                      predicate={
                                        !!creativeRow.stats.completionRate &&
                                        creativeRow.isActiveAudio
                                      }
                                    >
                                      {formatPercentRate(
                                        creativeRow.stats.completionRate,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.LISTENERS,
                                ) && (
                                  <NoWrapTableCell
                                    data-test={TEST_IDS.LISTENERS_CELL}
                                    numerical
                                    align="right"
                                  >
                                    <RenderIfTruthy
                                      predicate={!!creativeRow.stats.listeners}
                                      ifFalsy={<NotPromotingArtistsTooltip />}
                                    >
                                      {numberWithCommas(
                                        creativeRow.stats.listeners!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.NEW_LISTENERS,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={
                                        !!creativeRow.stats.newListeners
                                      }
                                      ifFalsy={<NotPromotingArtistsTooltip />}
                                    >
                                      {numberWithCommas(
                                        creativeRow.stats.newListeners!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.BUDGET_SPENT,
                                ) && (
                                  <NoWrapTableCell
                                    data-test={TEST_IDS.BUDGET_SPENT_CELL}
                                    numerical
                                    align="right"
                                  >
                                    <RenderIfTruthy
                                      predicate={
                                        !!creativeRow.stats.budgetConsumed
                                      }
                                    >
                                      <FormatMonetaryAmount
                                        code={
                                          creativeRow.stats.budgetConsumed!
                                            .currency
                                        }
                                        number={
                                          creativeRow.stats.budgetConsumed!
                                            .amount
                                        }
                                      />
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.FREQUENCY,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={!!creativeRow.stats.frequency}
                                      ifFalsy={getMissingCreativeMetricTooltip(
                                        creativeRow.creativeState,
                                      )}
                                    >
                                      {roundedWithCommas(
                                        creativeRow.stats.frequency!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.FREQUENCY_OF_LISTENS,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={
                                        !!creativeRow.stats.frequencyPaidListens
                                      }
                                      ifFalsy={getMissingCreativeMetricTooltip(
                                        creativeRow.creativeState,
                                      )}
                                    >
                                      {numberWithCommas(
                                        creativeRow.stats.frequencyPaidListens!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.REACH,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={!!creativeRow.stats.reach}
                                      ifFalsy={getMissingCreativeMetricTooltip(
                                        creativeRow.creativeState,
                                      )}
                                    >
                                      {numberWithCommas(
                                        creativeRow.stats.reach!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.LISTENS_REACH,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={
                                        !!creativeRow.stats.reachPaidListens
                                      }
                                    >
                                      {numberWithCommas(
                                        creativeRow.stats.reachPaidListens!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.FIRST_QUARTILE,
                                ) && (
                                  <NoWrapTableCell
                                    numerical
                                    align="right"
                                    data-test={TEST_IDS.QUARTILE_CELL}
                                  >
                                    <RenderIfTruthy
                                      predicate={
                                        !isPodcast &&
                                        !creativeRow.isActiveAudio &&
                                        !!creativeRow.stats.quartiles
                                          ?.firstQuartile
                                      }
                                      ifFalsy={
                                        isPodcast ? (
                                          <OnlyAdsPlacedInMusicTooltip />
                                        ) : (
                                          getMissingQuartilesTooltip(
                                            true,
                                            creativeRow.format,
                                          )
                                        )
                                      }
                                    >
                                      {formatPercentRate(
                                        creativeRow.stats.quartiles!
                                          .firstQuartile!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.SECOND_QUARTILE,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={
                                        !isPodcast &&
                                        !creativeRow.isActiveAudio &&
                                        !!creativeRow.stats.quartiles?.midpoint
                                      }
                                      ifFalsy={
                                        isPodcast ? (
                                          <OnlyAdsPlacedInMusicTooltip />
                                        ) : (
                                          getMissingQuartilesTooltip(
                                            true,
                                            creativeRow.format,
                                          )
                                        )
                                      }
                                    >
                                      {formatPercentRate(
                                        creativeRow.stats.quartiles!.midpoint!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}

                                {this.shouldShowColumn(
                                  CreativeColumns.THIRD_QUARTILE,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={
                                        !isPodcast &&
                                        !creativeRow.isActiveAudio &&
                                        !!creativeRow.stats.quartiles
                                          ?.thirdQuartile
                                      }
                                      ifFalsy={
                                        isPodcast ? (
                                          <OnlyAdsPlacedInMusicTooltip />
                                        ) : (
                                          getMissingQuartilesTooltip(
                                            true,
                                            creativeRow.format,
                                          )
                                        )
                                      }
                                    >
                                      {formatPercentRate(
                                        creativeRow.stats.quartiles!
                                          .thirdQuartile!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}
                                {this.shouldShowColumn(
                                  CreativeColumns.FOURTH_QUARTILE,
                                ) && (
                                  <NoWrapTableCell numerical align="right">
                                    <RenderIfTruthy
                                      predicate={
                                        !isPodcast &&
                                        !creativeRow.isActiveAudio &&
                                        !!creativeRow.stats.quartiles?.complete
                                      }
                                      ifFalsy={
                                        isPodcast ? (
                                          <OnlyAdsPlacedInMusicTooltip />
                                        ) : (
                                          getMissingQuartilesTooltip(
                                            true,
                                            creativeRow.format,
                                          )
                                        )
                                      }
                                    >
                                      {formatPercentRate(
                                        creativeRow.stats.quartiles!.complete!,
                                      )}
                                    </RenderIfTruthy>
                                  </NoWrapTableCell>
                                )}
                              </TableRow>
                            );
                          })}
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
