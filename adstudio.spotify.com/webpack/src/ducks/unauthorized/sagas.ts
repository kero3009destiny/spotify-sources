import debug from 'debug';
import i18n from 'i18next';
import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import { selectAccountId } from 'ducks/account/actions';
import { setDialogContent } from 'ducks/globalDialog/actions';
import { getAccountId } from 'ducks/account/selectors';

import * as api from 'api/account';

import { poll } from 'utils/sagaHelpers';

import {
  setUnauthorizedStatus,
  starSourceForUnauthenticatedEvents,
  unauthorizedResponse,
} from './action';
import externalSourceChannel from './events';

import { routes } from 'config/routes';

import { UnauthorizedEvents } from './types';

const log = debug('saga:unauthenticated');
log('starting');
type IAccount = {
  adAccountId: string;
};

const dialogData = {
  body: i18n.t('I18N_ACC_HIERARCHY_POPUP_NO_ACCESS'),
  actionLabel: i18n.t('I18N_ACC_HIERARCHY_BTN_VIEW_AD_ACCOUNTS'),
  actionURL: routes.ACCOUNT_MANAGEMENT,
};

export function* eventSource() {
  log('listening');
  const chan = yield call(externalSourceChannel);
  try {
    while (true) {
      yield take(chan);
      log('event detected');
      yield put(unauthorizedResponse());
    }
  } catch (error) {
    yield put(setUnauthorizedStatus(false));
  }
}

function* verifyUserIsAuthorized() {
  try {
    const activeAccount: string = yield select(getAccountId);
    log('validating', activeAccount);
    const accounts: IAccount[] = yield poll(api.getAdAccounts, {
      debugName: 'getAdAccounts:verifyUserIsAuthorized',
    });
    const [validAccount] = accounts.filter(
      account => account.adAccountId === activeAccount,
    );
    if (validAccount) {
      yield put(setUnauthorizedStatus(false));
      log('valid account');
    } else {
      yield put(setUnauthorizedStatus(true));
      yield put(
        setDialogContent(
          dialogData.body,
          dialogData.actionLabel,
          dialogData.actionURL,
        ),
      );
      yield put(selectAccountId(accounts.pop()?.adAccountId!));
      yield put(setUnauthorizedStatus(false));
    }
  } catch (e) {
    log('error', e);
    put(setUnauthorizedStatus(false));
  }
}

function* trigger() {
  yield put(starSourceForUnauthenticatedEvents());
}

function* watchUnauthorizedRequest() {
  yield takeLatest(UnauthorizedEvents.isUserAuthorized, verifyUserIsAuthorized);
}

function* watchUnauthorizedInitialization() {
  yield takeLatest(UnauthorizedEvents.startEventListener, eventSource);
}

export default function* Unauthorized() {
  yield all([
    watchUnauthorizedRequest(),
    watchUnauthorizedInitialization(),
    trigger(),
  ]);
}
