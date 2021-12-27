import { combineReducers } from 'redux';

import { mapPaginationResponse } from 'utils/campaignHierarchy/paginationHelpers';

import {
  DOWNLOAD_RECEIPT,
  DOWNLOAD_RECEIPT_FAILED,
  DOWNLOAD_RECEIPT_SUCCEEDED,
  DownloadReceiptAction,
  FETCH_BILL,
  FETCH_BILL_FAILED,
  FETCH_BILL_SUCCEEDED,
  FETCH_BILLS,
  FETCH_BILLS_FAILED,
  FETCH_BILLS_SUCCEEDED,
  FetchBillAction,
  FetchBillsAction,
} from './types';
import { Paging } from 'types/common/state/api';
import { BillInformation } from 'types/common/state/api/bill';
import { BillsCatalogueEntity } from 'types/common/state/api/bills';

export interface BillsState {
  billsCatalogue: BillsCatalogueState;
  bill: BillState;
  downloadReceipt: DownloadReceiptState;
}

export interface BillsCatalogueState {
  items: BillsCatalogueEntity[];
  loading: boolean;
  paging: Paging;
  error?: Response | Error;
}

export const billsDefaultState: BillsCatalogueState = {
  items: [],
  loading: false,
  paging: {
    limit: 20,
    offset: 0,
    total: 0,
  },
};

export interface BillState {
  fetchingBill: boolean;
  fetchBillFailed: boolean;
  fetchBillSuccess: boolean;
  bill?: BillInformation;
}

export const billDefaultState: BillState = {
  fetchingBill: false,
  fetchBillFailed: false,
  fetchBillSuccess: false,
};

export interface DownloadReceiptState {
  downloadingReceipt: boolean;
  downloadReceiptFailed: boolean;
  downloadReceiptSuccess: boolean;
}

export const downloadReceiptDefaultState: DownloadReceiptState = {
  downloadingReceipt: false,
  downloadReceiptSuccess: false,
  downloadReceiptFailed: false,
};

export const billsReducer = (
  state = billsDefaultState,
  action: FetchBillsAction,
) => {
  switch (action.type) {
    case FETCH_BILLS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error as Response,
      };

    case FETCH_BILLS:
      return {
        ...state,
        loading: true,
      };

    case FETCH_BILLS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        paging: mapPaginationResponse(action.payload.paging),
      };

    default:
      return state;
  }
};

export const billReducer = (
  state: BillState = billDefaultState,
  action: FetchBillAction,
): BillState => {
  switch (action.type) {
    case FETCH_BILL:
      return {
        fetchingBill: true,
        fetchBillSuccess: false,
        fetchBillFailed: false,
      };
    case FETCH_BILL_SUCCEEDED:
      return {
        fetchingBill: false,
        fetchBillSuccess: true,
        fetchBillFailed: false,
        bill: {
          ...action.payload.bill,
        },
      };
    case FETCH_BILL_FAILED:
      return {
        fetchingBill: false,
        fetchBillSuccess: false,
        fetchBillFailed: true,
      };
    default:
      return state;
  }
};

export const downloadReceiptReducer = (
  state: DownloadReceiptState = downloadReceiptDefaultState,
  action: DownloadReceiptAction,
): DownloadReceiptState => {
  switch (action.type) {
    case DOWNLOAD_RECEIPT:
      return {
        downloadingReceipt: true,
        downloadReceiptSuccess: false,
        downloadReceiptFailed: false,
      };
    case DOWNLOAD_RECEIPT_SUCCEEDED:
      return {
        downloadingReceipt: false,
        downloadReceiptSuccess: true,
        downloadReceiptFailed: false,
      };
    case DOWNLOAD_RECEIPT_FAILED:
      return {
        downloadingReceipt: false,
        downloadReceiptSuccess: false,
        downloadReceiptFailed: true,
      };
    default:
      return state;
  }
};

export default combineReducers<BillsState>({
  billsCatalogue: billsReducer,
  bill: billReducer,
  downloadReceipt: downloadReceiptReducer,
});
