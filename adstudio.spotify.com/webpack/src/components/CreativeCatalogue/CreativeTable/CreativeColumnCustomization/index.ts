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

import { isSpanEnabled } from 'utils/remoteconfig/remoteConfigHelpers';

// constants
import { determineCreativeTableSchema } from './constants';
import { SELECTED_CREATIVE_COLUMNS } from 'ducks/columns/constants';

export function mapStateToProps(state: TSFixMe) {
  const shouldShowArtistColumns = getHasSCMCampaign(state);
  const isActiveAudioUser = canTargetActiveAudio(state);
  const isPodcastEnabledForAccountCountry = canAccessPodcastBooking(state);

  const schema = determineCreativeTableSchema(
    shouldShowArtistColumns,
    isActiveAudioUser,
    isPodcastEnabledForAccountCountry && isSpanEnabled(),
  );

  return {
    schema,
    defaultValues: getSelectedColumns(state, SELECTED_CREATIVE_COLUMNS),
  };
}

export function mapDispatchToProps(dispatch: Function) {
  return {
    onSavePreferences: (values: ColumnSelection) => {
      dispatch(updateColumnsSelection(values, SELECTED_CREATIVE_COLUMNS));
    },
  };
}

export const CreativeColumnCustomization = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColumnCustomizationForm);
