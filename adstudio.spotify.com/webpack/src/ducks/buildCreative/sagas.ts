import { matchPath } from 'react-router-dom';
import { get } from 'lodash';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { MetricTypes } from '@spotify-internal/semantic-metrics';

import { Account } from 'ducks/account/types';
import { FlightDetailsState } from 'ducks/flights/reducer';
// ACTIONS
import {
  createCreativeForFlightError,
  createCreativeForFlightSuccess,
  duplicateCreativeError,
  duplicateCreativeSuccess,
} from './actions';
import { logUserAction, sendSemanticMetric } from 'ducks/analytics/actions';
import { batchActions } from 'redux-batched-actions';
// SELECTORS
import { getAccount } from 'ducks/account/selectors';
import { getFlightState } from 'ducks/flights/selectors';
import { selectCurrentHierarchyDraftId } from 'ducks/hierarchyDrafts/selectors';

// CONSTANTS
import { ANALYTICS_CATEGORY as ADD_TO_EXISTING_FLIGHT_ANALYTICS_CATEGORY } from 'components/CreativeBuilder/constants';
import { ANALYTICS_CATEGORY as DUPLICATE_CREATIVE_ANALYTICS_CATEGORY } from 'components/DuplicateCreative/constants';

// API
import { createCreative } from 'api/creatives';
import { completeHierarchyDraft } from 'api/hierarchyDrafts';

// UTILS
import { wait } from 'utils/asyncHelpers';
import { withRetries } from 'utils/withRetries';

// MAPPERS
import { mapFormValuesToLinkCreativeWithFlight } from './mappers';

import { SemanticMetricType } from 'ducks/analytics/constants';
import { FLUSH_SYNC_WAIT_TIMEOUT } from 'utils/campaignHierarchy/constants';
import { routes, routeTokens } from 'config/routes';

// TYPES
import {
  CREATE_CREATIVE_FOR_FLIGHT,
  CreateCreativeForFlightStartAction,
  DUPLICATE_CREATIVE,
  DuplicateCreativeAction,
} from './types';
import { CreateCreativePayload } from 'types/common/state/api/creative';

export function* createCreativeForFlight(
  action: CreateCreativeForFlightStartAction,
) {
  try {
    const account: Account = yield select(getAccount);
    const hierarchyDraftId: string | undefined = yield select(
      selectCurrentHierarchyDraftId,
    );
    const artist =
      action.payload.campaign.artist && action.payload.campaign.artist[0];
    const objective = action.payload.campaign.objective!;
    const artistId = artist ? artist.id : undefined;
    const flightId = action.payload.flight.id;
    const creativePayload: CreateCreativePayload = mapFormValuesToLinkCreativeWithFlight(
      action.payload.creative,
      account,
      objective,
      flightId,
      action.payload.flight.format!,
      !!action.payload.flight.serveOnMegaphone, // ensure creative is added with value from existing flight
      { artistId, hierarchyDraftId },
    );
    const creativeResponse = yield* withRetries(
      creativePayload,
      createCreative,
    );
    yield wait(FLUSH_SYNC_WAIT_TIMEOUT);
    yield put(createCreativeForFlightSuccess());

    if (hierarchyDraftId) {
      yield call(completeHierarchyDraft, account.id, hierarchyDraftId);
    }

    yield put(
      batchActions([
        logUserAction({
          category: ADD_TO_EXISTING_FLIGHT_ANALYTICS_CATEGORY,
          label: 'created',
          params: {
            campaignId: action.payload.campaign.id,
            flightId,
            creativeId: creativeResponse.id,
          },
        }),
        sendSemanticMetric({
          metric_type: MetricTypes.COUNTER,
          what: SemanticMetricType.AD_CREATED,
          tags: { version: '1XY' },
        }),
      ]),
    );
  } catch (e) {
    yield put(createCreativeForFlightError(e as Response));
  }
}

export const getDuplicatedCreativeId = (): string | undefined =>
  get(
    matchPath(window.location.pathname, {
      path: routes.DUPLICATE_CREATIVE,
      exact: true,
    }),
    `params[${routeTokens.CREATIVE_ID}]`,
    undefined,
  );

export function* duplicateCreative(action: DuplicateCreativeAction) {
  try {
    const account: Account = yield select(getAccount);
    const targetFlight: FlightDetailsState = yield select(getFlightState);
    const creativePayload: CreateCreativePayload = mapFormValuesToLinkCreativeWithFlight(
      action.payload,
      account,
      targetFlight.campaign!.objective!,
      targetFlight.flightId!,
      targetFlight.format!,
      !!targetFlight.serveOnMegaphone, // ensure creative is added with value from existing flight
      {
        artistId: targetFlight.campaign!.artistId,
        duplicatedCreativeId: getDuplicatedCreativeId(),
        duplicationType: 'AD_ONLY',
      },
    );
    const creativeResponse = yield* withRetries(
      creativePayload,
      createCreative,
    );
    yield wait(FLUSH_SYNC_WAIT_TIMEOUT);
    yield put(duplicateCreativeSuccess());
    yield put(
      batchActions([
        logUserAction({
          category: DUPLICATE_CREATIVE_ANALYTICS_CATEGORY,
          label: 'created',
          params: {
            campaignId: targetFlight.campaignId!,
            flightId: targetFlight.flightId!,
            creativeId: creativeResponse.id,
          },
        }),
        sendSemanticMetric({
          metric_type: MetricTypes.COUNTER,
          what: SemanticMetricType.AD_CREATED,
          tags: { version: '1XY' },
        }),
      ]),
    );
  } catch {
    yield put(duplicateCreativeError());
  }
}

function* watchCreateCreativeForFlight() {
  yield takeLatest(CREATE_CREATIVE_FOR_FLIGHT, createCreativeForFlight);
}

function* watchDuplicateFlight() {
  yield takeLatest(DUPLICATE_CREATIVE, duplicateCreative);
}

export default function* buildCreative() {
  yield all([watchCreateCreativeForFlight(), watchDuplicateFlight()]);
}
