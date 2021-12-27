import { connect } from 'react-redux';

// types
import { ColumnSelection } from 'ducks/columns/types';
// actions
import { updateColumnsSelection } from 'ducks/columns/actions';
// selectors
import {
  canAccessPodcastBooking,
  canTargetActiveAudio,
  getHasSCMCampaign,
} from 'ducks/account/selectors';
import { getSelectedColumns } from 'ducks/columns/selectors';

// components
import { ColumnCustomizationForm } from 'components/common/Table/ColumnCustomization';

// constants
import { determineFlightTableSchema } from './constants';
import { SELECTED_FLIGHT_COLUMNS } from 'ducks/columns/constants';

export function mapStateToProps(state: TSFixMe) {
  const shouldShowArtistColumns = getHasSCMCampaign(state);
  const isActiveAudioUser = canTargetActiveAudio(state);
  const isSpanEnabled = canAccessPodcastBooking(state);

  const schema = determineFlightTableSchema(
    shouldShowArtistColumns,
    isActiveAudioUser,
    isSpanEnabled,
  );
  return {
    schema,
    defaultValues: getSelectedColumns(state, SELECTED_FLIGHT_COLUMNS),
  };
}

export function mapDispatchToProps(dispatch: Function) {
  return {
    onSavePreferences: (values: ColumnSelection) => {
      dispatch(updateColumnsSelection(values, SELECTED_FLIGHT_COLUMNS));
    },
  };
}

export const FlightsColumnCustomization = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColumnCustomizationForm);
