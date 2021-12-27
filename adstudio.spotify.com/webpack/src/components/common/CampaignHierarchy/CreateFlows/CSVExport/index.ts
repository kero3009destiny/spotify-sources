import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  cancelHierarchyDownload,
  resetHierarchyExport,
} from 'ducks/hierarchyExport/actions';
import {
  displayNotification,
  hideNotification,
} from 'ducks/notifications/actions';
import { isSuperUserAccountActive } from 'ducks/account/selectors';
import {
  getCSVExportState,
  getCSVExportStateMatchesInitialState,
} from 'ducks/hierarchyExport/selectors';

import { displaySuperUserCSVExportNotification } from 'utils/notificationHelpers';

import { CSVExport, CSVExportProps } from './CSVExport';

type StateProps = Omit<
  CSVExportProps,
  | 'exportCsv'
  | 'displayNotification'
  | 'displaySuperUserNotification'
  | 'cancelCSVDownload'
  | 'hideNotification'
  | 'resetHierarchyExport'
  | 'disabled'
>;

type DispatchProps = Omit<
  CSVExportProps,
  | 'isPollingForCsv'
  | 'downloadError'
  | 'exportError'
  | 'exportCsv'
  | 'stateHasBeenReset'
  | 'disabled'
  | 'isSuperUserAccountActive'
>;

export type OwnProps = Omit<
  CSVExportProps,
  | 'isPollingForCsv'
  | 'downloadError'
  | 'exportError'
  | 'displayNotification'
  | 'displaySuperUserNotification'
  | 'cancelCSVDownload'
  | 'hideNotification'
  | 'resetHierarchyExport'
  | 'stateHasBeenReset'
  | 'isSuperUserAccountActive'
>;

function mapStateToProps(state: TSFixMe): StateProps {
  const exportState = getCSVExportState(state);

  return {
    stateHasBeenReset: getCSVExportStateMatchesInitialState(state),
    isPollingForCsv: exportState.isPollingForCsv,
    downloadError: exportState.downloadError,
    exportError: exportState.exportError,
    isSuperUserAccountActive: isSuperUserAccountActive(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    displayNotification: (...args) => dispatch(displayNotification(...args)),
    displaySuperUserNotification: () =>
      dispatch(displaySuperUserCSVExportNotification()),
    hideNotification: () => dispatch(hideNotification()),
    cancelCSVDownload: () => dispatch(cancelHierarchyDownload()),
    resetHierarchyExport: () => dispatch(resetHierarchyExport()),
  };
}

export const ConnectedCSVExport = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CSVExport);
