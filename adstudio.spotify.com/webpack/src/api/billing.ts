import { AdStudioBffBillingCenterService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffBillingCenterService';
import { GetBillDetailsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetBillDetailsRequest';
import { GetBillsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetBillsRequest';
import { GetReceiptRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetReceiptRequest';
import { Page } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/Page';

import { protoFetchWithLogging } from 'api/webgate';

import { getBffWegbateClientConfig } from './utils/getBeClientConfig';

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

export async function fetchBills(
  params: BillsQueryParams,
): Promise<GetBillsApiResponse> {
  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffBillingCenterService(
    protoFetchWithLogging,
    config,
  );
  const request = new GetBillsRequest()
    .setAdAccountId([params.adAccountId])
    .setPaging(
      new Page()
        .setLimit(parseInt(params.limit!, 10))
        .setOffset(parseInt(params.offset!, 10)),
    );
  return client.getBills(request);
}

export async function fetchBill(
  params: BillQueryParams,
): Promise<GetBillApiResponse> {
  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffBillingCenterService(
    protoFetchWithLogging,
    config,
  );
  const request = new GetBillDetailsRequest()
    .setAdAccountId(params.adAccountId)
    .setBillId([params.billId]);
  return client.getBillDetails(request);
}

export async function downloadReceipt(
  params: DownloadReceiptQueryParams,
): Promise<DownloadReceiptApiResponse> {
  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffBillingCenterService(
    protoFetchWithLogging,
    config,
  );
  const request = new GetReceiptRequest()
    // probably should set ad account id - to be confirmed
    .setBillId(params.billId);
  return client.downloadReceipt(request);
}
