import { all, put, select, takeLatest } from 'redux-saga/effects';

// ACTIONS
import { editCampaignFailed, editCampaignSuccess } from './actions';
// SELECTORS
import { getAccount } from 'ducks/account/selectors';

// API
import { editCampaign as editCampaignApi } from 'api/campaigns';

// UTILS
import { withRetries } from 'utils/withRetries';

// TYPES
import { EDIT_CAMPAIGN, EditCampaignStartAction } from './types';
// MAPPERS
import { EditCampaignPayload } from 'types/common/state/api/campaign';

export function* editCampaign(action: EditCampaignStartAction) {
  const { campaign } = action.payload;
  try {
    const account = yield select(getAccount);
    const request = {
      adAccountId: account.id,
      campaignId: campaign.id,
      name: campaign.name,
    } as EditCampaignPayload;
    yield* withRetries(request, editCampaignApi);
    yield put(editCampaignSuccess());
  } catch (error) {
    yield put(editCampaignFailed(error));
  }
}

function* watchForEditCampaign() {
  yield takeLatest(EDIT_CAMPAIGN, editCampaign);
}

export default function* editCampaignSaga() {
  yield all([watchForEditCampaign()]);
}
