import {
  DOWNLOAD_RECEIPT,
  DOWNLOAD_RECEIPT_FAILED,
  DOWNLOAD_RECEIPT_SUCCEEDED,
  DownloadReceiptErrorAction,
  DownloadReceiptStartAction,
  DownloadReceiptSuccessAction,
  FETCH_BILL,
  FETCH_BILL_FAILED,
  FETCH_BILL_SUCCEEDED,
  FETCH_BILLS,
  FETCH_BILLS_FAILED,
  FETCH_BILLS_SUCCEEDED,
  FetchBillErrorAction,
  FetchBillsErrorAction,
  FetchBillsStartAction,
  FetchBillsSuccessAction,
  FetchBillStartAction,
  FetchBillSuccessAction,
} from './types';
import {
  BillQueryParams,
  DownloadReceiptApiResponse,
  GetBillApiResponse,
} from 'types/common/state/api/bill';
import {
  BillsQueryParams,
  GetBillsApiResponse,
} from 'types/common/state/api/bills';

export const getBills = ({
  limit,
  offset,
  adAccountId,
}: BillsQueryParams): FetchBillsStartAction => ({
  type: FETCH_BILLS,
  payload: {
    limit,
    offset,
    adAccountId,
  },
});

export const getBillsSuccess = (
  payload: GetBillsApiResponse,
): FetchBillsSuccessAction => ({
  type: FETCH_BILLS_SUCCEEDED,
  payload,
});

export const getBillsFailed = (error: Response): FetchBillsErrorAction => ({
  type: FETCH_BILLS_FAILED,
  error,
  meta: {
    response: error,
  },
});

export const getBill = ({
  adAccountId,
  billId,
}: BillQueryParams): FetchBillStartAction => ({
  type: FETCH_BILL,
  payload: {
    adAccountId,
    billId,
  },
});

export const getBillSuccess = (
  payload: GetBillApiResponse,
): FetchBillSuccessAction => ({
  type: FETCH_BILL_SUCCEEDED,
  payload,
});

export const getBillFailed = (error: Response): FetchBillErrorAction => ({
  type: FETCH_BILL_FAILED,
  error,
  meta: {
    response: error,
  },
});

export const downloadReceipt = ({
  adAccountId,
  billId,
}: BillQueryParams): DownloadReceiptStartAction => ({
  type: DOWNLOAD_RECEIPT,
  payload: {
    adAccountId,
    billId,
  },
});

export const downloadReceiptSuccess = (
  payload: DownloadReceiptApiResponse,
): DownloadReceiptSuccessAction => ({
  type: DOWNLOAD_RECEIPT_SUCCEEDED,
  payload,
});

export const downloadReceiptFailed = (
  error: Response,
): DownloadReceiptErrorAction => ({
  type: DOWNLOAD_RECEIPT_FAILED,
  error,
  meta: {
    response: error,
  },
});
