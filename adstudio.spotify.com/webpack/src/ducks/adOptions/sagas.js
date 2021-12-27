import { isEmpty, sortBy } from 'lodash';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import * as actions from './actions';
import {
  getAudienceSegments,
  getContextualTargetingCategories,
  getCtaOptions,
  getMoments,
  getStockCompanionImages,
  getVoiceoverOptions,
} from './selectors';

import { VO_LOCALES, VOICE_TYPE } from 'components/CreativeForm/constants';

import {
  getAudienceSegments as getSegments,
  getContextualTargetingCategories as getContextualTargetingCategoriesAPI,
  getCtaOptions as getCtaOptionsAPI,
  getMomentOptions as getMomentOptionsAPI,
  getStockCompanionImages as getCompanionImagesAPI,
  getVoiceoverOptions as getVoiceoverOptionsAPI,
} from 'api/adOptions';

import * as types from './types';

export function* fetchAudienceSegments() {
  try {
    const storedSegments = yield select(getAudienceSegments);
    // Only fetch segments once
    if (!isEmpty(storedSegments)) {
      return;
    }
    const { segments } = yield call(getSegments);

    const mappedSegments = segments.reduce((obj, segment) => {
      obj[segment.id] = segment.name;
      return obj;
    }, {});

    yield put(actions.fetchAudienceSegmentsSucceeded(mappedSegments));
  } catch (error) {
    yield put(actions.fetchAudienceSegmentsFailed(error));
  }
}

export function* fetchMoments() {
  try {
    const storedMoments = yield select(getMoments);
    // Only fetch moments once
    if (!isEmpty(storedMoments)) {
      return;
    }

    const response = yield call(getMomentOptionsAPI);
    const moments = response['playlist-targets'];

    const mappedMoments = moments
      ? moments.reduce((obj, moment) => {
          obj[moment.id] = moment.name;
          return obj;
        }, {})
      : {};
    yield put(actions.fetchMomentsSucceeded(mappedMoments));
  } catch (error) {
    yield put(actions.fetchMomentsFailed(error));
  }
}

export function* fetchVoiceoverOptions() {
  try {
    const storedOptions = yield select(getVoiceoverOptions);
    // Only fetch voiceoverOptions once
    if (
      !isEmpty(storedOptions) &&
      !isEmpty(storedOptions.languageLocales) &&
      !isEmpty(storedOptions.voiceTypes)
    ) {
      return;
    }

    const options = yield call(getVoiceoverOptionsAPI);

    // FIXME: if the request fails, sometimes these are empty. In that case, default to a static list.
    // https://jira.spotify.net/browse/ASM-1005
    if (isEmpty(options.voiceTypes)) {
      options.voiceTypes = VOICE_TYPE;
    }
    if (isEmpty(options.languageLocales)) {
      options.languageLocales = VO_LOCALES;
    }

    yield put(actions.fetchVoiceoverOptionsSucceeded(options));
  } catch (error) {
    yield put(actions.fetchVoiceoverOptionsFailed(error));
  }
}

export function* fetchCtaOptions() {
  try {
    const storedOptions = yield select(getCtaOptions);
    // Only fetch cta options once
    if (!isEmpty(storedOptions)) {
      yield put(actions.fetchCtaOptionsSucceeded(storedOptions));
      return;
    }

    const { ctaOptions } = yield call(getCtaOptionsAPI);
    const alphabetizedCtas = sortBy(ctaOptions, ['value']);
    yield put(actions.fetchCtaOptionsSucceeded(alphabetizedCtas));
  } catch (error) {
    yield put(actions.fetchCtaOptionsFailed(error));
  }
}

export function* fetchStockCompanionImages() {
  try {
    const storedImages = yield select(getStockCompanionImages);
    // Only fetch companion images once
    if (!isEmpty(storedImages)) {
      return;
    }

    const images = yield call(getCompanionImagesAPI);

    yield put(actions.fetchStockCompanionImagesSucceeded(images));
  } catch (error) {
    yield put(actions.fetchStockCompanionImagesFailed(error));
  }
}

export function* fetchContextualTargetingCategories() {
  try {
    const storedCategories = yield select(getContextualTargetingCategories);

    if (!isEmpty(storedCategories)) {
      yield put(
        actions.fetchContextualTargetingCategoriesSucceeded(storedCategories),
      );
      return;
    }
    const categories = yield call(getContextualTargetingCategoriesAPI);
    yield put(actions.fetchContextualTargetingCategoriesSucceeded(categories));
  } catch (error) {
    yield put(actions.fetchContextualTargetingCategoriesFailed(error));
  }
}

function* watchForFetchCtaOptions() {
  yield takeEvery(types.FETCH_CTA_OPTIONS_REQUESTED, fetchCtaOptions);
}

function* watchForFetchVoiceoverOptions() {
  yield takeEvery(
    types.FETCH_VOICEOVER_OPTIONS_REQUESTED,
    fetchVoiceoverOptions,
  );
}

function* watchForFetchAudienceSegments() {
  yield takeEvery(
    types.FETCH_AUDIENCE_SEGMENTS_REQUESTED,
    fetchAudienceSegments,
  );
}

function* watchForFetchMoments() {
  yield takeEvery(types.FETCH_MOMENTS_REQUESTED, fetchMoments);
}

function* watchForFetchStockCompanionImages() {
  yield takeEvery(
    types.FETCH_STOCK_COMPANION_IMAGES_REQUESTED,
    fetchStockCompanionImages,
  );
}

function* watchForFetchContextualCategories() {
  yield takeEvery(
    types.FETCH_CATEGORIES_REQUESTED,
    fetchContextualTargetingCategories,
  );
}

export default function* targetingDataSaga() {
  yield all([
    watchForFetchAudienceSegments(),
    watchForFetchMoments(),
    watchForFetchVoiceoverOptions(),
    watchForFetchCtaOptions(),
    watchForFetchStockCompanionImages(),
    watchForFetchContextualCategories(),
  ]);
}
