import {
  all,
  call,
  put,
  select,
  take,
  takeLatest,
} from '@redux-saga/core/effects';

import {
  createAudienceFailed,
  createAudienceSuccess,
  createAudienceUploadProgress,
} from './actions';
import { getAccountId } from 'ducks/account/selectors';

import {
  createAudience as createAudienceApi,
  getAudienceUrl,
} from 'api/audiences';

import { uploadFileToStorage } from 'utils/uploadFileToStorage';

import { CREATE_AUDIENCE, CreateAudienceAction } from './types';

interface ProgressEmitter {
  progress: number;
  done: boolean;
}

export function* createAudience(action: CreateAudienceAction) {
  const { name, description, file } = action.payload;
  const accountId: string = yield select(getAccountId);
  let gcsChannel: TSFixMe;
  let gcsResponse: ProgressEmitter;
  try {
    const { audienceId } = yield call(
      createAudienceApi,
      accountId,
      name,
      description,
    );
    const { signedGcsUrl } = yield call(getAudienceUrl, audienceId, accountId);
    // @ts-ignore until uploadFileToStorage has types. @TODO
    gcsChannel = yield call(uploadFileToStorage, {
      bucket: 'gcs',
      file,
      url: signedGcsUrl,
    });
    // keep pinging gcsChannel (a redux-saga event emitter) until its done.
    // Loosely based off of utils/uploadFileToStorage
    gcsResponse = yield take(gcsChannel);
    while (!gcsResponse.done) {
      if (gcsResponse instanceof Error) {
        throw gcsResponse;
      }
      yield put(createAudienceUploadProgress(gcsResponse?.progress || 0));

      // get the next one
      gcsResponse = yield take(gcsChannel);
    }
  } catch (e) {
    yield put(createAudienceFailed(e));
  }
  yield put(createAudienceSuccess());
}

function* watchForCreateAudience() {
  yield takeLatest(CREATE_AUDIENCE, createAudience);
}

export default function* createAudiencesSaga() {
  yield all([watchForCreateAudience()]);
}
