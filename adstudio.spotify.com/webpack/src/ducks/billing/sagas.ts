import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  downloadReceiptFailed,
  downloadReceiptSuccess,
  getBillFailed,
  getBillsFailed,
  getBillsSuccess,
  getBillSuccess,
} from './actions';

import * as Api from 'api/billing';

import {
  DOWNLOAD_RECEIPT,
  DownloadReceiptStartAction,
  FETCH_BILL,
  FETCH_BILLS,
  FetchBillsStartAction,
  FetchBillStartAction,
} from './types';
import {
  DownloadReceiptApiResponse,
  GetBillApiResponse,
} from 'types/common/state/api/bill';
import { GetBillsApiResponse } from 'types/common/state/api/bills';

export function* getBills(action: FetchBillsStartAction) {
  try {
    const bills: GetBillsApiResponse = yield call(
      Api.fetchBills,
      action.payload,
    );
    yield put(getBillsSuccess(bills));
  } catch (e) {
    yield put(getBillsFailed(e));
  }
}

export function* getBill(action: FetchBillStartAction) {
  try {
    const bill: GetBillApiResponse = yield call(Api.fetchBill, action.payload);
    yield put(getBillSuccess(bill));
  } catch (e) {
    yield put(getBillFailed(e));
  }
}

export function* downloadReceipt(action: DownloadReceiptStartAction) {
  try {
    const receipt: DownloadReceiptApiResponse = yield call(
      Api.downloadReceipt,
      action.payload,
    );
    yield put(downloadReceiptSuccess(receipt));
  } catch (e) {
    yield put(downloadReceiptFailed(e));
  }
}

function* watchForGetBills() {
  yield takeLatest(FETCH_BILLS, getBills);
}

function* watchForGetBill() {
  yield takeLatest(FETCH_BILL, getBill);
}

function* watchForDownloadReceipt() {
  yield takeLatest(DOWNLOAD_RECEIPT, downloadReceipt);
}

export default function* billingSaga() {
  yield all([watchForGetBills(), watchForGetBill(), watchForDownloadReceipt()]);
}
