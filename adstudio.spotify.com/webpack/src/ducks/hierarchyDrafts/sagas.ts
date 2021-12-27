// LIB
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';

// ACTIONS
import * as HierarchyDraftActions from './actions';
// SELECTORS
import { getAccountId } from 'ducks/account/selectors';

// API
import * as HierarchyDraftApi from 'api/hierarchyDrafts';

// UTILS
import { parseDuplicatedFlightIdFromRoute } from 'utils/hierarchyDraft';

// MAPPERS
import {
  mapCampaignFormToCampaignDraftFormValues,
  mapCreativeFormToCreativeDraftFormValues,
  mapFlightFormToFlightDraftValues,
} from './mappers';

// CONFIG
import { SAVE_DRAFT_DEBOUNCE_TIME } from './constants';

// TYPES
import {
  CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT,
  CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT,
  CREATE_COLD_START_HIERARCHY_DRAFT,
  CreateAddToCampaignHierarchyDraftAction,
  CreateAddToFlightHierarchyDraftAction,
  CreateColdStartHierarchyDraftAction,
  DELETE_HIERARCHY_DRAFTS_START,
  DeleteHierarchyDraftsStartAction,
  DISMISS_REVIEW_START,
  DismissReviewStartAction,
  FETCH_CAMPAIGN_DRAFTS_START,
  FETCH_CREATIVE_DRAFTS_START,
  FETCH_ENRICHED_HIERARCHY_DRAFT,
  FETCH_FLIGHT_DRAFTS_START,
  FETCH_REVIEWABLE_DRAFTS_START,
  FetchCampaignDraftsStartAction,
  FetchCreativeDraftsStartAction,
  FetchEnrichedHierarchyDraftStartAction,
  FetchFlightDraftsStartAction,
  FetchReviewableDraftsStartAction,
  UPDATE_CAMPAIGN_DRAFT,
  UPDATE_CREATIVE_DRAFT,
  UPDATE_FLIGHT_DRAFT,
  UpdateCampaignDraftStartAction,
  UpdateCreativeDraftStartAction,
  UpdateFlightDraftStartAction,
} from './types';
import {
  CampaignFormValues,
  FlightFormValues,
  PreSavedCreativeFormValues,
} from 'types/common/campaignHierarchy/types';
import {
  CatalogueDraftApiResponse,
  CreateColdStartDraftResponse,
  CreateDraftForExistingCampaignResponse,
  CreateDraftForExistingFlightResponse,
  EnrichedDraftApiResponse,
} from 'types/common/state/api/drafts';

export function* getCampaignDrafts(action: FetchCampaignDraftsStartAction) {
  try {
    const response: CatalogueDraftApiResponse = yield call(
      HierarchyDraftApi.getCampaignDrafts,
      action.payload,
    );
    yield put(HierarchyDraftActions.getCampaignDraftsSucceeded(response));
  } catch (e) {
    yield put(HierarchyDraftActions.getCampaignDraftsFailed(e));
  }
}

export function* getFlightDrafts(action: FetchFlightDraftsStartAction) {
  try {
    const response: CatalogueDraftApiResponse = yield call(
      HierarchyDraftApi.getFlightDrafts,
      action.payload,
    );
    yield put(HierarchyDraftActions.getFlightDraftsSucceeded(response));
  } catch (e) {
    yield put(HierarchyDraftActions.getFlightDraftsFailed(e));
  }
}

export function* getCreativeDrafts(action: FetchCreativeDraftsStartAction) {
  try {
    const response: CatalogueDraftApiResponse = yield call(
      HierarchyDraftApi.getCreativeDrafts,
      action.payload,
    );
    yield put(HierarchyDraftActions.getCreativeDraftsSucceeded(response));
  } catch (e) {
    yield put(HierarchyDraftActions.getCreativeDraftsFailed(e));
  }
}

export function* dismissReview(action: DismissReviewStartAction) {
  try {
    const adAccountId: string = yield select(getAccountId);
    yield call(
      HierarchyDraftApi.dismissReview,
      adAccountId,
      action.payload.hierarchyDraftId,
    );
    yield put(HierarchyDraftActions.dismissReviewSucceeded());
  } catch (e) {
    yield put(HierarchyDraftActions.dismissReviewFailed(e));
  }
}

export function* deleteHierarchyDrafts(
  action: DeleteHierarchyDraftsStartAction,
) {
  try {
    const adAccountId: string = yield select(getAccountId);
    yield call(
      HierarchyDraftApi.deleteHierarchyDrafts,
      adAccountId,
      action.payload.ids,
    );

    if (action.payload.cb) {
      action.payload.cb();
    }

    yield put(HierarchyDraftActions.deleteHierarchyDraftsSucceeded());
  } catch (e) {
    yield put(HierarchyDraftActions.deleteHierarchyDraftsFailed(e));
  }
}

export function* getReviewableDrafts(action: FetchReviewableDraftsStartAction) {
  try {
    const response: CatalogueDraftApiResponse = yield call(
      HierarchyDraftApi.getReviewableDrafts,
      action.payload,
    );
    yield put(HierarchyDraftActions.getReviewableDraftsSucceeded(response));
  } catch (e) {
    yield put(HierarchyDraftActions.getReviewableDraftsFailed(e));
  }
}

export function* getEnrichedHierarchyDraft(
  action: FetchEnrichedHierarchyDraftStartAction,
) {
  try {
    const adAccountId: string = yield select(getAccountId);
    const response: EnrichedDraftApiResponse = yield call(
      HierarchyDraftApi.getEnrichedHierarchyDraft,
      adAccountId,
      action.payload.hierarchyDraftId,
    );
    yield put(
      HierarchyDraftActions.fetchEnrichedHierarchyDraftSucceeded(response),
    );
  } catch (e) {
    yield put(HierarchyDraftActions.fetchEnrichedHierarchyDraftFailed(e));
  }
}

export function* createColdStartHierarchyDraft(
  action: CreateColdStartHierarchyDraftAction,
) {
  try {
    yield delay(SAVE_DRAFT_DEBOUNCE_TIME);
    const adAccountId: string = yield select(getAccountId);
    const response: CreateColdStartDraftResponse = yield call(
      HierarchyDraftApi.createColdStartHierarchyDraft,
      adAccountId,
      mapCampaignFormToCampaignDraftFormValues(
        action.payload.campaign as CampaignFormValues,
      ),
      mapFlightFormToFlightDraftValues(
        action.payload.flights[0] as FlightFormValues,
      ),
      mapCreativeFormToCreativeDraftFormValues(
        action.payload.creatives[0] as PreSavedCreativeFormValues,
        action.payload.flights[0].format,
      ),
    );
    yield put(
      HierarchyDraftActions.createColdStartHierarchyDraftSucceeded(response),
    );
  } catch (e) {
    yield put(HierarchyDraftActions.createHierarchyDraftFailed(e));
  }
}

export function* createAddToCampaignHierarchyDraft(
  action: CreateAddToCampaignHierarchyDraftAction,
) {
  try {
    yield delay(SAVE_DRAFT_DEBOUNCE_TIME);
    const adAccountId: string = yield select(getAccountId);
    const response: CreateDraftForExistingCampaignResponse = yield call(
      HierarchyDraftApi.createAddToExistingCampaignDraft,
      adAccountId,
      action.payload.campaign.id,
      mapFlightFormToFlightDraftValues(
        action.payload.flight as FlightFormValues,
        parseDuplicatedFlightIdFromRoute(),
      ),
      mapCreativeFormToCreativeDraftFormValues(
        action.payload.creative as PreSavedCreativeFormValues,
        action.payload.flight.format,
      ),
    );
    yield put(
      HierarchyDraftActions.createAddToCampaignHierarchyDraftSucceeded(
        response,
      ),
    );
  } catch (e) {
    yield put(HierarchyDraftActions.createHierarchyDraftFailed(e));
  }
}

export function* createAddToFlightHierarchyDraft(
  action: CreateAddToFlightHierarchyDraftAction,
) {
  try {
    yield delay(SAVE_DRAFT_DEBOUNCE_TIME);
    const adAccountId: string = yield select(getAccountId);
    const response: CreateDraftForExistingFlightResponse = yield call(
      HierarchyDraftApi.createAddToExistingFlightDraft,
      adAccountId,
      action.payload.campaign.id,
      action.payload.flight.id,
      mapCreativeFormToCreativeDraftFormValues(
        action.payload.creative as PreSavedCreativeFormValues,
        action.payload.flight.format,
      ),
    );
    yield put(
      HierarchyDraftActions.createAddToFlightHierarchyDraftSucceeded(response),
    );
  } catch (e) {
    yield put(HierarchyDraftActions.createHierarchyDraftFailed(e));
  }
}

export function* updateCampaignDraft(action: UpdateCampaignDraftStartAction) {
  try {
    yield delay(SAVE_DRAFT_DEBOUNCE_TIME);
    const { formValues, campaignDraftId, hierarchyDraftId } = action.payload;
    const accountId: string = yield select(getAccountId);
    yield call(
      HierarchyDraftApi.updateCampaignDraft,
      accountId,
      campaignDraftId,
      hierarchyDraftId,
      mapCampaignFormToCampaignDraftFormValues(formValues),
    );
    yield put(HierarchyDraftActions.updateCampaignDraftSucceeded());
  } catch (e) {
    yield put(HierarchyDraftActions.updateCampaignDraftFailed(e));
  }
}

export function* updateFlightDraft(action: UpdateFlightDraftStartAction) {
  try {
    yield delay(SAVE_DRAFT_DEBOUNCE_TIME);
    const {
      formValues,
      flightDraftId,
      duplicatedFlightId,
      hierarchyDraftId,
    } = action.payload;
    const accountId: string = yield select(getAccountId);

    yield call(
      HierarchyDraftApi.updateFlightDraft,
      accountId,
      flightDraftId,
      hierarchyDraftId,
      mapFlightFormToFlightDraftValues(formValues, duplicatedFlightId),
    );
    yield put(HierarchyDraftActions.updateFlightDraftSucceeded());
  } catch (e) {
    yield put(HierarchyDraftActions.updateFlightDraftFailed(e));
  }
}

export function* updateCreativeDraft(action: UpdateCreativeDraftStartAction) {
  try {
    yield delay(SAVE_DRAFT_DEBOUNCE_TIME);
    const {
      formValues,
      format,
      hierarchyDraftId,
      creativeDraftId,
    } = action.payload;
    const accountId: string = yield select(getAccountId);

    yield call(
      HierarchyDraftApi.updateCreativeDraft,
      accountId,
      creativeDraftId,
      hierarchyDraftId,
      mapCreativeFormToCreativeDraftFormValues(formValues, format),
    );
    yield put(HierarchyDraftActions.updateCreativeDraftSucceeded());
  } catch (e) {
    yield put(HierarchyDraftActions.updateCreativeDraftFailed(e));
  }
}

function* watchGetCampaignDrafts() {
  yield takeLatest(FETCH_CAMPAIGN_DRAFTS_START, getCampaignDrafts);
}

function* watchGetFlightDrafts() {
  yield takeLatest(FETCH_FLIGHT_DRAFTS_START, getFlightDrafts);
}

function* watchGetCreativeDrafts() {
  yield takeLatest(FETCH_CREATIVE_DRAFTS_START, getCreativeDrafts);
}

function* watchDismissReview() {
  yield takeLatest(DISMISS_REVIEW_START, dismissReview);
}

function* watchDeleteHierarchyDrafts() {
  yield takeLatest(DELETE_HIERARCHY_DRAFTS_START, deleteHierarchyDrafts);
}

function* watchGetReviewableDrafts() {
  yield takeLatest(FETCH_REVIEWABLE_DRAFTS_START, getReviewableDrafts);
}

function* watchCreateColdStartHierarchyDraft() {
  yield takeLatest(
    CREATE_COLD_START_HIERARCHY_DRAFT,
    createColdStartHierarchyDraft,
  );
}

function* watchCreateAddToCampaignHierarchyDraft() {
  yield takeLatest(
    CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT,
    createAddToCampaignHierarchyDraft,
  );
}

function* watchCreateAddToFlightHierarchyDraft() {
  yield takeLatest(
    CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT,
    createAddToFlightHierarchyDraft,
  );
}

function* watchUpdateCampaignDraft() {
  yield takeLatest(UPDATE_CAMPAIGN_DRAFT, updateCampaignDraft);
}

function* watchUpdateFlightDraft() {
  yield takeLatest(UPDATE_FLIGHT_DRAFT, updateFlightDraft);
}

function* watchUpdateCreativeDraft() {
  yield takeLatest(UPDATE_CREATIVE_DRAFT, updateCreativeDraft);
}

function* watchGetEnrichedHierarchyDraft() {
  yield takeLatest(FETCH_ENRICHED_HIERARCHY_DRAFT, getEnrichedHierarchyDraft);
}

export default function* hierarchyDraftsSaga() {
  yield all([
    watchGetCampaignDrafts(),
    watchGetFlightDrafts(),
    watchGetCreativeDrafts(),
    watchDismissReview(),
    watchDeleteHierarchyDrafts(),
    watchGetReviewableDrafts(),
    watchCreateColdStartHierarchyDraft(),
    watchCreateAddToCampaignHierarchyDraft(),
    watchCreateAddToFlightHierarchyDraft(),
    watchUpdateCampaignDraft(),
    watchUpdateFlightDraft(),
    watchUpdateCreativeDraft(),
    watchGetEnrichedHierarchyDraft(),
  ]);
}
