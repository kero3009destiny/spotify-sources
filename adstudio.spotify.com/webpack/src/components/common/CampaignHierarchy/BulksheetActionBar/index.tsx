import React, { forwardRef, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';
import { Action } from 'redux';

import {
  addColorSet,
  IconDownloadAlt,
  IconPreview,
  semanticColors,
} from '@spotify-internal/encore-web';

import { downloadBulkCSV } from 'ducks/bulksheets/actions';
import { deselectAllEntities } from 'ducks/dashboard/actions';
import { isSuperUserAccountActive } from 'ducks/account/selectors';
import { getBulksheetEntityIds } from 'ducks/bulksheets/selectors';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { DashboardActionBar } from 'components/common/CampaignHierarchy/DashboardActionBar';

import { BulksheetDownloadConfirmation } from './BulksheetDownloadConfirmation';
import { TextTransformlessButton } from './styles';

import {
  BULKSHEET_DOWNLOAD_BTN_TEST_ID,
  BULKSHEET_VIEW_TOGGLE_TEST_ID,
} from './constants';

import { EntityType } from 'types/common/state/api/bulksheets';

export interface BulksheetActionBarProps {
  viewSelectedEntityCTAText: string;
  viewAllEntityCTAText: string;
  viewSelectedEntityAction: () => Action;
  viewAllEntityAction: () => Action;
  viewEntitySelector: (state: TSFixMe) => boolean;
  selectedEntitySelector: (state: TSFixMe) => string[];
  entityType: EntityType;
}

const formatAnalyticParams = (entityType: EntityType, count: number) => {
  let key;

  switch (entityType) {
    case 'CAMPAIGN':
      key = 'campaignIds';
      break;
    case 'AD_SET':
      key = 'flightIds';
      break;
    case 'AD':
      key = 'creativeIds';
      break;
    // should never be the case here, but don't want to mislead data
    default:
      key = 'selectedIds';
  }

  return {
    [key]: `${count}`,
  };
};

export const BulksheetActionBar = forwardRef<
  HTMLDivElement,
  BulksheetActionBarProps
>(
  (
    {
      viewSelectedEntityCTAText,
      viewAllEntityCTAText,
      viewSelectedEntityAction,
      viewAllEntityAction,
      viewEntitySelector,
      selectedEntitySelector,
      entityType,
    }: BulksheetActionBarProps,
    ref,
  ) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const dispatch = useDispatch();
    const bulksheetDownloadPayload = useSelector(state =>
      getBulksheetEntityIds(state, entityType),
    );
    const isViewingOnlySelectedEntities = useSelector(viewEntitySelector);
    const selectedEntities = useSelector(selectedEntitySelector);
    const analyticParams = formatAnalyticParams(
      entityType,
      selectedEntities.length,
    );
    const maybeForceHover = isViewingOnlySelectedEntities
      ? { hover: true }
      : {};
    const isSuperAdmin = useSelector(isSuperUserAccountActive);

    if (selectedEntities.length === 0 || isSuperAdmin) {
      return <></>;
    }

    return (
      <AnalyticsContextConsumer>
        {({ logUserAction, category }) => (
          <>
            <DashboardActionBar
              ref={ref}
              onClose={() => dispatch(deselectAllEntities())}
            >
              <TextTransformlessButton
                data-test={BULKSHEET_VIEW_TOGGLE_TEST_ID}
                {...maybeForceHover}
                className={addColorSet('brightAccent')}
                onClick={() => {
                  if (isViewingOnlySelectedEntities) {
                    dispatch(viewAllEntityAction());
                  } else {
                    logUserAction({
                      category,
                      label: 'Clicked_view_selected_campaigns_action_bar',
                      params: analyticParams,
                    });
                    dispatch(viewSelectedEntityAction());
                  }
                }}
              >
                {isViewingOnlySelectedEntities
                  ? viewAllEntityCTAText
                  : viewSelectedEntityCTAText}
                <IconPreview semanticColor={semanticColors.textBase} />
              </TextTransformlessButton>
              <TextTransformlessButton
                data-test={BULKSHEET_DOWNLOAD_BTN_TEST_ID}
                className={addColorSet('brightAccent')}
                onClick={() => {
                  logUserAction({
                    category,
                    label: 'Clicked_download_bulksheet_csv_action_bar',
                    params: analyticParams,
                  });
                  setShowConfirmationModal(true);
                }}
              >
                {i18n.t('I18N_DOWNLOAD_SELECTED', 'Download selected')}
                <IconDownloadAlt semanticColor={semanticColors.textBase} />
              </TextTransformlessButton>
            </DashboardActionBar>
            {showConfirmationModal && (
              <BulksheetDownloadConfirmation
                onCancel={() => setShowConfirmationModal(false)}
                onDownload={() => {
                  logUserAction({
                    category,
                    label: 'Clicked_download_in_download_bulksheet_overlay',
                    params: analyticParams,
                  });
                  setShowConfirmationModal(false);
                  batch(() => {
                    dispatch(downloadBulkCSV(bulksheetDownloadPayload));
                    dispatch(deselectAllEntities());
                  });
                }}
              />
            )}
          </>
        )}
      </AnalyticsContextConsumer>
    );
  },
);
