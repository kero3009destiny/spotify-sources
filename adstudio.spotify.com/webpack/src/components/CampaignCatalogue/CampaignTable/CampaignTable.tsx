import React, { PureComponent, RefObject } from 'react';
import i18n from 'i18next';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { TableContainer, TableRow } from '@spotify-internal/encore-web';

import { ColumnSelection } from 'ducks/columns/types';

import { BulksheetTableRowCoachmark } from 'components/BulksheetsOnboarding/BulksheetTableRowCoachmark';
import { AuthContextConsumer } from 'components/common/AuthorizationContext';
import { DashboardTable } from 'components/common/CampaignHierarchy/DashboardTable';
import { hasDateParams } from 'components/common/CampaignHierarchy/DateFilter/DateFilterHelpers';
import { DateFilterMessageRow } from 'components/common/CampaignHierarchy/DateFilter/DateFilterMessageRow';
import { PromptToCreateEntity } from 'components/common/CampaignHierarchy/PromptToCreateEntity';
import { SelectableTableRow } from 'components/common/CampaignHierarchy/SelectableTableRow';
import { StatusIndicator } from 'components/common/CampaignHierarchy/StatusIndicator';
import { Coachmark } from 'components/common/Coachmark/Coachmark';
import { CoachmarkPortal } from 'components/common/Coachmark/CoachmarkPortal';
import {
  getMissingCampaignMetricTooltip,
  NotPodcastMetricCampaignTooltip,
  NotPromotingArtistsTooltip,
  OnlyAdsPlacedInMusicTooltip,
} from 'components/common/Table/InlineTableTooltips';
import { IssuesCell } from 'components/common/Table/IssuesCell';
import { RenderIfTruthy } from 'components/common/Table/RenderIfTruthy';
import { SortableTableHeader } from 'components/common/Table/SortableTableHeader';
import { TableBody } from 'components/common/Table/TableBody';
import {
  NoWrapTableCell,
  PaddedTableCell,
} from 'components/common/Table/TableCells';
import { PaddedTableHeaderCell } from 'components/common/Table/TableHeaderCell';
import { TableHeaderWithTooltip } from 'components/common/Table/TableHeaderWithTooltip';
import OfferDetails, { DisplayType } from 'components/Offers';

import { getDerivedCampaignStatusAndIssues } from 'utils/campaignHierarchy/campaignStatus';
import { getTooltipText } from 'utils/columnUtils';
import {
  formatPercentRate,
  numberWithCommas,
  roundedWithCommas,
} from 'utils/numberHelpers';

import { CampaignCheckbox } from './CampaignCheckbox';
import { CampaignName } from './Cells/CampaignName';

import { getAllColumns } from './CampaignColumnCustomization/constants';
import { TEST_IDS } from './constants';

import { SortDirection } from 'types/common/state/api';
import {
  CampaignColumns,
  CampaignsCatalogueEntity,
  CampaignsQueryParams,
} from 'types/common/state/api/campaigns';
import {
  BffCampaignSort,
  HierarchyColumns,
} from 'types/common/state/api/hierarchycolumns';

export interface CampaignTableProps {
  rows: CampaignsCatalogueEntity[];
  isLoading: boolean;
  empty: boolean;
  onChangeParams: (queryParams: Partial<CampaignsQueryParams>) => void;
  params: Partial<CampaignsQueryParams>;
  selectedColumns: ColumnSelection;
  showAddCampaignPrompt: boolean;
  createNewCampaign: () => void;
  selectedCampaignIds: string[];
  catalogueServerError: boolean;
  isSuperviewer: boolean;
  isSuperUserAccountActive: boolean;
  currentUserAdAccountId: string;
  hasAccountWritePermissions: boolean;
  advertiserHasDraftImpersonation: boolean;
  hasImpersonation: boolean;
  shouldShowBulksheetsOnboarding: boolean;
  isSpanEnabled: boolean;
}

export class CampaignTable extends PureComponent<CampaignTableProps> {
  coachmarkRef: RefObject<HTMLElement> = React.createRef();

  onHeaderCellClick = (sortCriteria: BffCampaignSort) => {
    const sortDirection =
      this.props.params.sortDirection === SortDirection.DESC
        ? SortDirection.ASC
        : SortDirection.DESC;

    this.props.onChangeParams({
      sortCriteria,
      sortDirection,
    });
  };

  shouldShowColumn = (column: CampaignColumns) => {
    return this.props.selectedColumns[column];
  };

  getHeaderColumnForColumn = (
    column: CampaignColumns,
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
        tableOnClickCTA={() => this.props.createNewCampaign()}
      />
    );
  };

  generateEmptyState = (
    showAddCampaignPrompt: boolean,
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
    return undefined;
  };

  render() {
    const {
      params,
      rows,
      isLoading,
      empty,
      showAddCampaignPrompt,
      catalogueServerError,
      isSuperviewer,
      isSuperUserAccountActive,
      currentUserAdAccountId,
      hasAccountWritePermissions,
      advertiserHasDraftImpersonation,
      hasImpersonation,
      shouldShowBulksheetsOnboarding,
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
      <TableContainer>
        <DashboardTable isLoading={isLoading}>
          <thead>
            <TableRow>
              {!isSuperUserAccountActive && (
                <PaddedTableHeaderCell>
                  <CampaignCheckbox
                    checkboxId="multiselect-checkbox-select-all"
                    campaignIds={rows.map(campaign => campaign.campaignId)}
                  />
                </PaddedTableHeaderCell>
              )}
              <SortableTableHeader<BffCampaignSort>
                sortKey={HierarchyColumns.CAMPAIGN_NAME as BffCampaignSort}
                tooltipText={getTooltipText(
                  CampaignColumns.NAME,
                  isSpanEnabled,
                )}
                {...sharedSortableProps}
              >
                {i18n.t('I18N_NAME', 'Name')}
              </SortableTableHeader>

              {this.shouldShowColumn(CampaignColumns.STATUS) && (
                <TableHeaderWithTooltip
                  data-test={TEST_IDS.STATUS_HEADER}
                  tooltipText={getTooltipText(
                    CampaignColumns.STATUS,
                    isSpanEnabled,
                  )}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.STATUS,
                    isSpanEnabled,
                  )}
                </TableHeaderWithTooltip>
              )}

              {this.shouldShowColumn(CampaignColumns.ISSUES) && (
                <TableHeaderWithTooltip
                  data-test={TEST_IDS.ISSUES_HEADER}
                  tooltipText={getTooltipText(
                    CampaignColumns.ISSUES,
                    isSpanEnabled,
                  )}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.ISSUES,
                    isSpanEnabled,
                  )}
                </TableHeaderWithTooltip>
              )}

              {this.shouldShowColumn(CampaignColumns.IMPRESSIONS) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  sortKey={HierarchyColumns.ADS_SERVED as BffCampaignSort}
                  // TODO - once span is launched, set the IMPRESSIONS tooltip value to the value below
                  tooltipText={
                    isSpanEnabled
                      ? i18n.t(
                          'I18N_IMPRESSIONS_ON_SPOTIFY_TOOLTIP_CAMPAIGNS',
                          'The total number of ads within the campaign served on Spotify.',
                        )
                      : getTooltipText(
                          CampaignColumns.IMPRESSIONS,
                          isSpanEnabled,
                        )
                  }
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.IMPRESSIONS,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}

              {isSpanEnabled &&
                this.shouldShowColumn(CampaignColumns.EXTERNAL_IMPRESSIONS) && (
                  <SortableTableHeader<BffCampaignSort>
                    align="right"
                    sortKey={
                      HierarchyColumns.EXTERNAL_IMPRESSIONS as BffCampaignSort
                    }
                    tooltipText={i18n.t(
                      'I18N_IMPRESSIONS_OFF_SPOTIFY_TOOLTIP_CAMPAIGNS',
                      'The total number of ads within the campaign served off Spotify.',
                    )}
                    {...sharedSortableProps}
                  >
                    {this.getHeaderColumnForColumn(
                      CampaignColumns.EXTERNAL_IMPRESSIONS,
                      isSpanEnabled,
                    )}
                  </SortableTableHeader>
                )}

              {this.shouldShowColumn(CampaignColumns.CLICK) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  data-test={TEST_IDS.CLICKS_HEADER}
                  sortKey={HierarchyColumns.CLICKS as BffCampaignSort}
                  tooltipText={getTooltipText(
                    CampaignColumns.CLICK,
                    isSpanEnabled,
                  )}
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.CLICK,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}

              {this.shouldShowColumn(CampaignColumns.CTR) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  sortKey={HierarchyColumns.CTR as BffCampaignSort}
                  tooltipText={getTooltipText(
                    CampaignColumns.CTR,
                    isSpanEnabled,
                  )}
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.CTR,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}

              {this.shouldShowColumn(CampaignColumns.AD_LISTENS) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  sortKey={HierarchyColumns.LISTENS as BffCampaignSort}
                  tooltipText={getTooltipText(
                    CampaignColumns.AD_LISTENS,
                    isSpanEnabled,
                  )}
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.AD_LISTENS,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}

              {this.shouldShowColumn(CampaignColumns.AD_LISTEN_RATE) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  sortKey={HierarchyColumns.COMPLETION_RATE as BffCampaignSort}
                  tooltipText={getTooltipText(
                    CampaignColumns.AD_LISTEN_RATE,
                    isSpanEnabled,
                  )}
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.AD_LISTEN_RATE,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}

              {this.shouldShowColumn(CampaignColumns.LISTENERS) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  data-test={TEST_IDS.LISTENERS_HEADER}
                  sortKey={HierarchyColumns.LISTENERS as BffCampaignSort}
                  tooltipText={getTooltipText(
                    CampaignColumns.LISTENERS,
                    isSpanEnabled,
                  )}
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.LISTENERS,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}

              {this.shouldShowColumn(CampaignColumns.NEW_LISTENERS) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  sortKey={HierarchyColumns.NEW_LISTENERS as BffCampaignSort}
                  tooltipText={getTooltipText(
                    CampaignColumns.NEW_LISTENERS,
                    isSpanEnabled,
                  )}
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.NEW_LISTENERS,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}

              {this.shouldShowColumn(CampaignColumns.FREQUENCY) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  sortKey={
                    HierarchyColumns.ADS_SERVED_AVERAGE_FREQUENCY as BffCampaignSort
                  }
                  tooltipText={getTooltipText(
                    CampaignColumns.FREQUENCY,
                    isSpanEnabled,
                  )}
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.FREQUENCY,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}

              {this.shouldShowColumn(CampaignColumns.FREQUENCY_OF_LISTENS) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  sortKey={
                    HierarchyColumns.LISTENS_AVERAGE_FREQUENCY as BffCampaignSort
                  }
                  tooltipText={getTooltipText(
                    CampaignColumns.FREQUENCY_OF_LISTENS,
                    isSpanEnabled,
                  )}
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.FREQUENCY_OF_LISTENS,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}

              {this.shouldShowColumn(CampaignColumns.REACH) && (
                <SortableTableHeader<BffCampaignSort>
                  align="right"
                  sortKey={HierarchyColumns.ADS_SERVED_REACH as BffCampaignSort}
                  tooltipText={getTooltipText(
                    CampaignColumns.REACH,
                    isSpanEnabled,
                  )}
                  {...sharedSortableProps}
                >
                  {this.getHeaderColumnForColumn(
                    CampaignColumns.REACH,
                    isSpanEnabled,
                  )}
                </SortableTableHeader>
              )}
            </TableRow>
            {hasDateParam && !isLoading && (
              <DateFilterMessageRow
                message={i18n.t(
                  'I18N_DATE_PICKER_CAMPAIGN_RESULTS_MESSAGE',
                  'Only showing campaigns with stats in this period.',
                )}
                queryParams={params}
                colSpan={Object.keys(CampaignColumns).length}
              />
            )}
          </thead>
          <AuthContextConsumer>
            {permissions => (
              <TableBody
                isLoading={isLoading}
                empty={empty}
                searchWord={params.searchWord}
                NoResultsComponent={this.generateEmptyState(
                  showAddCampaignPrompt,
                  hasAccountWritePermissions,
                  advertiserHasDraftImpersonation,
                  hasImpersonation,
                  permissions,
                )}
                catalogueServerError={catalogueServerError}
              >
                {rows.map((campaignRow, rowIndex) => {
                  const [
                    derivedCampaignStatus,
                    campaignIssues,
                  ] = getDerivedCampaignStatusAndIssues(
                    campaignRow.flightStateGroup,
                  );

                  const shouldHighlightRowForBulksheetOnboarding =
                    shouldShowBulksheetsOnboarding && rowIndex === 0;
                  const rowContents = (
                    <>
                      {shouldHighlightRowForBulksheetOnboarding && (
                        <CoachmarkPortal>
                          <Coachmark target={this.coachmarkRef}>
                            <BulksheetTableRowCoachmark
                              campaignId={campaignRow.campaignId!}
                            />
                          </Coachmark>
                        </CoachmarkPortal>
                      )}
                      {!isSuperUserAccountActive && (
                        <PaddedTableCell>
                          <CampaignCheckbox
                            checkboxId={`campaign-multiselect-${campaignRow.campaignId}`}
                            campaignIds={[campaignRow.campaignId]}
                          />
                        </PaddedTableCell>
                      )}
                      <PaddedTableCell>
                        <CampaignName
                          campaignRow={campaignRow}
                          isSuperviewer={isSuperviewer}
                          currentUserAdAccountId={currentUserAdAccountId}
                        />
                      </PaddedTableCell>

                      {this.shouldShowColumn(CampaignColumns.STATUS) && (
                        <NoWrapTableCell data-test={TEST_IDS.STATUS_CELL}>
                          <StatusIndicator status={derivedCampaignStatus} />
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(CampaignColumns.ISSUES) && (
                        <NoWrapTableCell data-test={TEST_IDS.ISSUES_CELL}>
                          <RenderIfTruthy predicate={!!campaignIssues}>
                            <IssuesCell issues={campaignIssues!} />
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(CampaignColumns.IMPRESSIONS) && (
                        <NoWrapTableCell numerical align="right">
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.adsServed}
                            ifFalsy={getMissingCampaignMetricTooltip(
                              derivedCampaignStatus,
                            )}
                          >
                            {numberWithCommas(campaignRow.stats.adsServed!)}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {isSpanEnabled &&
                        this.shouldShowColumn(
                          CampaignColumns.EXTERNAL_IMPRESSIONS,
                        ) && (
                          <NoWrapTableCell numerical align="right">
                            <RenderIfTruthy
                              predicate={
                                !!campaignRow.stats.externalImpressions
                              }
                              ifFalsy={
                                campaignRow.hasServeOnMegaphoneFlight ? (
                                  getMissingCampaignMetricTooltip(
                                    derivedCampaignStatus,
                                  )
                                ) : (
                                  <NotPodcastMetricCampaignTooltip />
                                )
                              }
                            >
                              {numberWithCommas(
                                campaignRow.stats.externalImpressions!,
                              )}
                            </RenderIfTruthy>
                          </NoWrapTableCell>
                        )}

                      {this.shouldShowColumn(CampaignColumns.CLICK) && (
                        <NoWrapTableCell
                          data-test={TEST_IDS.CLICKS_CELL}
                          numerical
                          align="right"
                        >
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.clicks}
                            ifFalsy={
                              campaignRow.hasServeOnMegaphoneFlight ? (
                                <OnlyAdsPlacedInMusicTooltip />
                              ) : (
                                getMissingCampaignMetricTooltip(
                                  derivedCampaignStatus,
                                )
                              )
                            }
                          >
                            {numberWithCommas(campaignRow.stats.clicks!)}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(CampaignColumns.CTR) && (
                        <NoWrapTableCell numerical align="right">
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.ctr}
                            ifFalsy={
                              campaignRow.hasServeOnMegaphoneFlight ? (
                                <OnlyAdsPlacedInMusicTooltip />
                              ) : (
                                getMissingCampaignMetricTooltip(
                                  derivedCampaignStatus,
                                )
                              )
                            }
                          >
                            {formatPercentRate(campaignRow.stats.ctr)}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(CampaignColumns.AD_LISTENS) && (
                        <NoWrapTableCell numerical align="right">
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.paidListens}
                          >
                            {numberWithCommas(campaignRow.stats.paidListens!)}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(
                        CampaignColumns.AD_LISTEN_RATE,
                      ) && (
                        <NoWrapTableCell numerical align="right">
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.completionRate}
                            ifFalsy={
                              campaignRow.hasServeOnMegaphoneFlight ? (
                                <OnlyAdsPlacedInMusicTooltip />
                              ) : (
                                getMissingCampaignMetricTooltip(
                                  derivedCampaignStatus,
                                )
                              )
                            }
                          >
                            {formatPercentRate(
                              campaignRow.stats.completionRate!,
                            )}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(CampaignColumns.LISTENERS) && (
                        <NoWrapTableCell
                          data-test={TEST_IDS.LISTENERS_CELL}
                          numerical
                          align="right"
                        >
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.listeners}
                            ifFalsy={<NotPromotingArtistsTooltip />}
                          >
                            {numberWithCommas(campaignRow.stats.listeners!)}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(CampaignColumns.NEW_LISTENERS) && (
                        <NoWrapTableCell numerical align="right">
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.newListeners}
                            ifFalsy={<NotPromotingArtistsTooltip />}
                          >
                            {numberWithCommas(campaignRow.stats.newListeners!)}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(CampaignColumns.FREQUENCY) && (
                        <NoWrapTableCell numerical align="right">
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.frequency}
                            ifFalsy={getMissingCampaignMetricTooltip(
                              derivedCampaignStatus,
                            )}
                          >
                            {roundedWithCommas(campaignRow.stats.frequency!)}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(
                        CampaignColumns.FREQUENCY_OF_LISTENS,
                      ) && (
                        <NoWrapTableCell numerical align="right">
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.frequencyPaidListens}
                            ifFalsy={getMissingCampaignMetricTooltip(
                              derivedCampaignStatus,
                            )}
                          >
                            {numberWithCommas(
                              campaignRow.stats.frequencyPaidListens!,
                            )}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}

                      {this.shouldShowColumn(CampaignColumns.REACH) && (
                        <NoWrapTableCell numerical align="right">
                          <RenderIfTruthy
                            predicate={!!campaignRow.stats.reach}
                            ifFalsy={getMissingCampaignMetricTooltip(
                              derivedCampaignStatus,
                            )}
                          >
                            {numberWithCommas(campaignRow.stats.reach!)}
                          </RenderIfTruthy>
                        </NoWrapTableCell>
                      )}
                    </>
                  );
                  if (rowIndex === 0) {
                    return (
                      <SelectableTableRow
                        key={`campaign-table-row-${campaignRow.campaignId}`}
                        isSelected={false}
                        ref={this.coachmarkRef}
                      >
                        {rowContents}
                      </SelectableTableRow>
                    );
                  }
                  return (
                    <SelectableTableRow
                      key={`campaign-table-row-${campaignRow.campaignId}`}
                      isSelected={false}
                    >
                      {rowContents}
                    </SelectableTableRow>
                  );
                })}
              </TableBody>
            )}
          </AuthContextConsumer>
        </DashboardTable>
      </TableContainer>
    );
  }
}
