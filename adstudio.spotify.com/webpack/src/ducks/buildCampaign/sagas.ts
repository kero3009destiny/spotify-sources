import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { MetricTypes } from '@spotify-internal/semantic-metrics';

import { Account } from 'ducks/account/types';
import { mapFormValuesToLinkCreativeWithFlight } from 'ducks/buildCreative/mappers';
import { mapFormValuesToFlightPayload } from 'ducks/buildFlight/mappers';
// ACTIONS
import {
  buildCampaignHierarchyError,
  buildCampaignHierarchySuccess,
} from './actions';
import { logUserAction, sendSemanticMetric } from 'ducks/analytics/actions';
import { batchActions } from 'redux-batched-actions';
// SELECTORS
import { getAccount } from 'ducks/account/selectors';
import { selectCurrentHierarchyDraftId } from 'ducks/hierarchyDrafts/selectors';

// CONSTANTS
import { ANALYTICS_CATEGORY } from 'components/CampaignBuilder/constants';

// API
import { createCampaign as createCampaignApi } from 'api/campaigns';
import { createCreative as createCreativeApi } from 'api/creatives';
import { createFlight as createFlightApi } from 'api/flights';
import { completeHierarchyDraft } from 'api/hierarchyDrafts';

// UTILS
import { wait } from 'utils/asyncHelpers';
import { withRetries } from 'utils/withRetries';

// MAPPERS
import { mapFormValuesToCampaignPayload } from './mappers';

import { SemanticMetricType } from 'ducks/analytics/constants';
import { FLUSH_SYNC_WAIT_TIMEOUT } from 'utils/campaignHierarchy/constants';

// TYPES
import {
  BUILD_CAMPAIGN_HIERARCHY,
  BuildCampaignHierarchyStartAction,
} from './types';
import {
  CampaignFormValues,
  FlightFormValues,
  PreSavedCreativeFormValues,
} from 'types/common/campaignHierarchy/types';
import { CreateResponse } from 'types/common/state/api/bff';
import { CreateCampaignPayload } from 'types/common/state/api/campaign';
import { CreateCreativePayload } from 'types/common/state/api/creative';
import { CreateFlightPayload } from 'types/common/state/api/flight';
import { FormatType } from 'types/common/state/api/format';

export function* buildCampaignHierarchy(
  action: BuildCampaignHierarchyStartAction,
) {
  try {
    const account: Account = yield select(getAccount);
    const hierarchyDraftId: string | undefined = yield select(
      selectCurrentHierarchyDraftId,
    );
    const campaignPayload: CreateCampaignPayload = mapFormValuesToCampaignPayload(
      action.payload.campaign as CampaignFormValues,
      account as Account,
      hierarchyDraftId,
    );
    const objective = campaignPayload.objective;
    const artistId = campaignPayload.artistId;
    const campaignResponse: CreateResponse = yield* withRetries(
      campaignPayload,
      createCampaignApi,
    );
    // campaign builder still only builds a 1-1-1 campaign, so we
    // link the first clight and first creative.
    const flightFormValues = action.payload.flights[0] as FlightFormValues;
    const creativeFormValues = action.payload
      .creatives[0] as PreSavedCreativeFormValues;
    const flightPayload: CreateFlightPayload = mapFormValuesToFlightPayload(
      flightFormValues,
      account as Account,
      {
        campaignId: campaignResponse.id!,
        objective,
        artistId,
        purchaseOrderNumber: campaignPayload.purchaseOrderNumber,
      },
      { hierarchyDraftId },
    );
    const flightResponse = yield* withRetries(flightPayload, createFlightApi);

    const creativePayload: CreateCreativePayload = mapFormValuesToLinkCreativeWithFlight(
      creativeFormValues,
      account as Account,
      objective,
      flightResponse.id,
      flightFormValues.format as FormatType,
      !!flightFormValues.serveOnMegaphone,
      { artistId, hierarchyDraftId },
    );
    const creativeResponse = yield* withRetries(
      creativePayload,
      createCreativeApi,
    );

    yield wait(FLUSH_SYNC_WAIT_TIMEOUT);

    yield put(buildCampaignHierarchySuccess(campaignResponse));

    if (hierarchyDraftId) {
      yield call(completeHierarchyDraft, account.id, hierarchyDraftId);
    }

    yield put(
      batchActions([
        logUserAction({
          category: ANALYTICS_CATEGORY,
          label: 'created',
          params: {
            campaignId: campaignResponse.id!,
            flightId: flightResponse.id,
            creativeId: creativeResponse.id,
          },
        }),
        sendSemanticMetric({
          metric_type: MetricTypes.COUNTER,
          what: SemanticMetricType.CAMPAIGN_CREATED,
          tags: { version: '1XY' },
        }),
        sendSemanticMetric({
          metric_type: MetricTypes.COUNTER,
          what: SemanticMetricType.FLIGHT_CREATED,
          tags: { version: '1XY' },
        }),
        sendSemanticMetric({
          metric_type: MetricTypes.COUNTER,
          what: SemanticMetricType.AD_CREATED,
          tags: { version: '1XY' },
        }),
      ]),
    );
  } catch (e) {
    yield put(buildCampaignHierarchyError(e as Response));
  }
}

function* watchBuildCampaignHierarchy() {
  yield takeLatest(BUILD_CAMPAIGN_HIERARCHY, buildCampaignHierarchy);
}

export default function* buildCampaign() {
  yield all([watchBuildCampaignHierarchy()]);
}
