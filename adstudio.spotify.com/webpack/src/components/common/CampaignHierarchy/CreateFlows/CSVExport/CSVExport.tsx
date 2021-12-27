import React, { PureComponent } from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { LoadingSpinner } from '@spotify-internal/encore-web/advertising/components/LoadingSpinner';

import { BannerCustomization } from 'ducks/notifications/types';
import { DEFAULT_DISPLAY_TIME } from 'ducks/notifications/actions';

import { DEFAULT_BANNER_CUSTOMIZATION } from 'utils/notificationHelpers';

import { FilterBarButton } from '../../Filters/ButtonIcon';
import { IconReport } from '../../Filters/Icons';

import { TEST_ID } from './constants';

const CancelButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  overflow: hidden;
  font-variant-caps: all-small-caps;
  font-size: 1em;
  margin: 0;
  padding: 0;
`;

export interface CSVExportProps {
  isPollingForCsv: boolean;
  downloadError: boolean;
  exportError: boolean;
  stateHasBeenReset: boolean;
  exportCsv: () => void;
  displayNotification: (
    notificationText: string,
    notificationType: string,
    displayMs: number,
    bannerCustomization: BannerCustomization,
  ) => void;
  displaySuperUserNotification: () => void;
  cancelCSVDownload: () => void;
  hideNotification: () => void;
  resetHierarchyExport: () => void;
  isSuperUserAccountActive: boolean;
  disabled: boolean;
}

export class CSVExport extends PureComponent<CSVExportProps> {
  componentDidUpdate(prevProps: CSVExportProps) {
    if (!prevProps.isPollingForCsv && this.props.isPollingForCsv) {
      this.props.displayNotification(
        i18n.t('I18N_PREPARING_TO_DOWNLOAD', 'Preparing to download.'),
        'announcement',
        20000,
        this.getInProgressBannerCustomization(),
      );
    }

    if (!prevProps.exportError && this.props.exportError) {
      this.props.displayNotification(
        i18n.t(
          'I18N_SOMETHING_WENT_WRONG_PLE',
          'Something went wrong. Please try again!',
        ),
        'negative',
        DEFAULT_DISPLAY_TIME,
        this.getErrorBannerCustomization(),
      );
    }

    if (!prevProps.downloadError && this.props.downloadError) {
      this.props.displayNotification(
        i18n.t(
          'I18N_UNABLE_TO_DOWNLOAD_CSV_T',
          'Unable to download CSV. Try again.',
        ),
        'negative',
        DEFAULT_DISPLAY_TIME,
        this.getErrorBannerCustomization(),
      );
    }

    if (!prevProps.stateHasBeenReset && this.props.stateHasBeenReset) {
      this.props.hideNotification();
    }
  }

  getErrorBannerCustomization(): BannerCustomization {
    return {
      ...DEFAULT_BANNER_CUSTOMIZATION,
      props: {
        onClose: this.props.resetHierarchyExport,
      },
    };
  }

  getInProgressBannerCustomization(): BannerCustomization {
    return {
      ...DEFAULT_BANNER_CUSTOMIZATION,
      props: {
        onClose: () => {},
        renderIcon: () => <LoadingSpinner diameter={24} />,
        renderCloseButton: () => (
          <CancelButton
            onClick={this.props.cancelCSVDownload}
            data-test="cancel-csv-download"
          >
            {i18n.t('I18N_CANCEL', 'Cancel')}
          </CancelButton>
        ),
      },
    };
  }

  exportClicked(): void {
    if (this.props.disabled) {
      return;
    }

    if (this.props.isSuperUserAccountActive) {
      this.props.displaySuperUserNotification();
    } else {
      this.props.exportCsv();
    }
  }

  render() {
    return (
      <FilterBarButton
        data-test={TEST_ID}
        onClick={() => this.exportClicked()}
        disabled={this.props.disabled}
        tooltipText={i18n.t('I18N_DOWNLOAD_TABLE_VIEW', 'Download table view')}
      >
        <IconReport />
      </FilterBarButton>
    );
  }
}
