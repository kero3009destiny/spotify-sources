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
import { determineCampaignTableSchema } from './constants';
import { SELECTED_CAMPAIGN_COLUMNS } from 'ducks/columns/constants';

export function mapStateToProps(state: TSFixMe) {
  const shouldShowArtistColumns = getHasSCMCampaign(state);
  const isActiveAudioUser = canTargetActiveAudio(state);
  const isSpanEnabled = canAccessPodcastBooking(state);

  const schema = determineCampaignTableSchema(
    shouldShowArtistColumns,
    isActiveAudioUser,
    isSpanEnabled,
  );
  return {
    schema,
    defaultValues: getSelectedColumns(state, SELECTED_CAMPAIGN_COLUMNS),
  };
}

export function mapDispatchToProps(dispatch: Function) {
  return {
    onSavePreferences: (values: ColumnSelection) => {
      dispatch(updateColumnsSelection(values, SELECTED_CAMPAIGN_COLUMNS));
    },
  };
}

export const CampaignColumnCustomization = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColumnCustomizationForm);
