import { Action } from 'redux';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

import {
  BillQueryParams,
  DownloadReceiptApiResponse,
  DownloadReceiptQueryParams,
  GetBillApiResponse,
} from 'types/common/state/api/bill';
import {
  BillsQueryParams,
  GetBillsApiResponse,
} from 'types/common/state/api/bills';

export const FETCH_BILLS = 'FETCH_BILLS';
export const FETCH_BILLS_SUCCEEDED = 'FETCH_BILLS_SUCCEEDED';
export const FETCH_BILLS_FAILED = 'FETCH_BILLS_FAILED';

export const FETCH_BILL = 'FETCH_BILL';
export const FETCH_BILL_FAILED = 'FETCH_BILL_FAILED';
export const FETCH_BILL_SUCCEEDED = 'FETCH_BILL_SUCCEEDED';

export const DOWNLOAD_RECEIPT = 'DOWNLOAD_RECEIPT';
export const DOWNLOAD_RECEIPT_FAILED = 'DOWNLOAD_RECEIPT_FAILED';
export const DOWNLOAD_RECEIPT_SUCCEEDED = 'DOWNLOAD_RECEIPT_SUCCEEDED';

export interface FetchBillsStartAction {
  type: typeof FETCH_BILLS;
  payload: BillsQueryParams;
}

export interface FetchBillsSuccessAction {
  type: typeof FETCH_BILLS_SUCCEEDED;
  payload: GetBillsApiResponse;
}

export interface FetchBillsErrorAction extends FetchErrorAction {
  type: typeof FETCH_BILLS_FAILED;
}

export type FetchBillsAction =
  | FetchBillsStartAction
  | FetchBillsSuccessAction
  | FetchBillsErrorAction;

export interface FetchBillStartAction extends Action {
  type: typeof FETCH_BILL;
  payload: BillQueryParams;
}

export interface FetchBillSuccessAction {
  type: typeof FETCH_BILL_SUCCEEDED;
  payload: GetBillApiResponse;
}

export interface FetchBillErrorAction extends FetchErrorAction {
  type: typeof FETCH_BILL_FAILED;
}

export type FetchBillAction =
  | FetchBillStartAction
  | FetchBillSuccessAction
  | FetchBillErrorAction;

export interface DownloadReceiptStartAction extends Action {
  type: typeof DOWNLOAD_RECEIPT;
  payload: DownloadReceiptQueryParams;
}

export interface DownloadReceiptSuccessAction {
  type: typeof DOWNLOAD_RECEIPT_SUCCEEDED;
  payload: DownloadReceiptApiResponse;
}

export interface DownloadReceiptErrorAction extends FetchErrorAction {
  type: typeof DOWNLOAD_RECEIPT_FAILED;
}

export type DownloadReceiptAction =
  | DownloadReceiptStartAction
  | DownloadReceiptSuccessAction
  | DownloadReceiptErrorAction;
