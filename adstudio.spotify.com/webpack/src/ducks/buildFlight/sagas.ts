// LIB
import { matchPath } from 'react-router-dom';
import { get } from 'lodash';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { MetricTypes } from '@spotify-internal/semantic-metrics';

import { Account } from 'ducks/account/types';
import {
  mapFormValuesToCreativePayload,
  mapFormValuesToLinkCreativeWithFlight,
} from 'ducks/buildCreative/mappers';
// ACTIONS
import {
  createFlightForCampaignError,
  createFlightForCampaignSuccess,
  duplicateFlightWithCreativesError,
  duplicateFlightWithCreativesSuccess,
} from './actions';
import { logUserAction, sendSemanticMetric } from 'ducks/analytics/actions';
import { batchActions } from 'redux-batched-actions';
// SELECTORS
import { getAccount } from 'ducks/account/selectors';
import { selectCurrentHierarchyDraftId } from 'ducks/hierarchyDrafts/selectors';

import { createCreative } from 'api/creatives';
// API
import { createFlight, createFlightWithCreatives } from 'api/flights';
import { completeHierarchyDraft } from 'api/hierarchyDrafts';

// UTILS
import { wait } from 'utils/asyncHelpers';
import { withRetries } from 'utils/withRetries';

// MAPPERS
import { mapFormValuesToFlightPayload } from './mappers';

// CONSTANTS
import { SemanticMetricType } from 'ducks/analytics/constants';
import { FLUSH_SYNC_WAIT_TIMEOUT } from 'utils/campaignHierarchy/constants';
import { routes, routeTokens } from 'config/routes';

import { FormatType } from '../../types/common/state/api/format';
// TYPES
import {
  CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN,
  CreateFlightAndCreativeForCampaignStartAction,
  DUPLICATE_FLIGHT_WITH_CREATIVES,
  DuplicateFlightWithCreativesStartAction,
} from './types';
import { DuplicateCreativeFormValues } from 'types/common/campaignHierarchy/types';
import { CreateCreativePayload } from 'types/common/state/api/creative';
import { CreateFlightPayload } from 'types/common/state/api/flight';

export const getDuplicatedFlightId = (): string | undefined =>
  get(
    matchPath(window.location.pathname, {
      path: routes.DUPLICATE_FLIGHT,
      exact: true,
    }),
    `params[${routeTokens.FLIGHT_ID}]`,
    undefined,
  ) ||
  get(
    matchPath(window.location.pathname, {
      path: routes.DUPLICATE_FLIGHT_WITH_CREATIVES,
      exact: true,
    }),
    `params[${routeTokens.FLIGHT_ID}]`,
    undefined,
  );

export function* createFlightForCampaign(
  action: CreateFlightAndCreativeForCampaignStartAction,
) {
  try {
    const account: Account = yield select(getAccount);
    const hierarchyDraftId: string | undefined = yield select(
      selectCurrentHierarchyDraftId,
    );
    const { campaign, flight } = action.payload.formValues;
    const artist = campaign.artist && campaign.artist[0];
    const flightFormValues = flight;
    const artistId = artist ? artist.id : undefined;
    const duplicatedFlightId = getDuplicatedFlightId();

    const flightPayload: CreateFlightPayload = mapFormValuesToFlightPayload(
      flightFormValues,
      account as Account,
      {
        campaignId: campaign.id,
        objective: campaign.objective!,
        artistId,
        purchaseOrderNumber: campaign.purchaseOrderNumber,
      },
      {
        duplicatedFlightId,
        hierarchyDraftId,
        duplicationType: duplicatedFlightId ? 'AD_SET_ONLY' : undefined,
      },
    );
    const flightResponse = yield* withRetries(flightPayload, createFlight);

    const creativePayload: CreateCreativePayload = mapFormValuesToLinkCreativeWithFlight(
      action.payload.formValues.creative,
      account,
      campaign.objective!,
      flightResponse.id!,
      flightFormValues.format as FormatType,
      !!flightFormValues.serveOnMegaphone,
      { artistId, hierarchyDraftId },
    );
    const creativeResponse = yield* withRetries(
      creativePayload,
      createCreative,
    );

    yield wait(FLUSH_SYNC_WAIT_TIMEOUT);
    yield put(createFlightForCampaignSuccess());

    if (hierarchyDraftId) {
      yield call(completeHierarchyDraft, account.id, hierarchyDraftId);
    }

    yield put(
      batchActions([
        logUserAction({
          category: action.payload.analyticsCategory,
          label: 'created',
          params: {
            campaignId: campaign.id,
            flightId: flightResponse.id!,
            creativeId: creativeResponse.id,
          },
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
    yield put(createFlightForCampaignError(e as Response));
  }
}

export function* duplicateFlightWithCreatives(
  action: DuplicateFlightWithCreativesStartAction,
) {
  try {
    const account: Account = yield select(getAccount);
    const { campaign, flight, creatives } = action.payload.values;
    const duplicatedFlightId = getDuplicatedFlightId();
    const artist = campaign.artist && campaign.artist[0];
    const flightPayload: CreateFlightPayload = mapFormValuesToFlightPayload(
      flight,
      account as Account,
      {
        campaignId: campaign.id,
        objective: campaign.objective!,
        artistId: artist ? artist.id : undefined,
        purchaseOrderNumber: campaign.purchaseOrderNumber,
      },
      {
        duplicatedFlightId,
        duplicationType: 'AD_SET_WITH_ADS',
      },
    );
    const creativesPayload: CreateCreativePayload[] = creatives.map(
      (creative: DuplicateCreativeFormValues) => {
        return mapFormValuesToCreativePayload(
          creative,
          account,
          campaign.objective!,
          creative.format,
          !!flight.serveOnMegaphone,
          {
            duplicationType: 'AD_SET_WITH_ADS',
            duplicatedCreativeId: creative.duplicatedCreativeId,
          },
        );
      },
    );

    yield call(createFlightWithCreatives, flightPayload, creativesPayload);
    yield wait(FLUSH_SYNC_WAIT_TIMEOUT);
    yield put(duplicateFlightWithCreativesSuccess());
  } catch (e) {
    yield put(duplicateFlightWithCreativesError(e));
  }
}

function* watchDuplicateFlightWithCreatives() {
  yield takeLatest(
    DUPLICATE_FLIGHT_WITH_CREATIVES,
    duplicateFlightWithCreatives,
  );
}

function* watchCreateFlightAndCreativeForCampaign() {
  yield takeLatest(
    CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN,
    createFlightForCampaign,
  );
}

export default function* buildFlight() {
  yield all([
    watchCreateFlightAndCreativeForCampaign(),
    watchDuplicateFlightWithCreatives(),
  ]);
}
