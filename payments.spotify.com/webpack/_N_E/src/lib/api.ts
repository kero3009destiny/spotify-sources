import { CreateTaxProfileRequest, CreateTaxProfileResponse } from '../../generated/com/spotify/tax/v1';
import { CreatePayoutDestinationResponse__Output } from '../../generated/spotify/payout/v2';

type ResponseWithBody<T> = {
  ok: true;
  body: T;
};

type ResponseWithoutBody = {
  ok: boolean;
  body: null;
};

export type Response<T> = ResponseWithBody<T> | ResponseWithoutBody;

const failedRequest = {
  body: null,
  ok: false,
};

const responseToJson = async <T extends unknown>(response: any): Promise<Response<T>> => {
  const { ok } = response;

  try {
    return {
      body: await response.json(),
      ok,
    };
  } catch (e) {
    return failedRequest;
  }
};

const postRequest = async <T>(path: string, data = {}) => {
  const url = `/api${path}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });
    return responseToJson<T>(response);
  } catch {
    return failedRequest;
  }
};

export const getDestinationData = async () => {
  const path = '/destination-data/';
  return postRequest<CreatePayoutDestinationResponse__Output>(path);
};

export const createProfile = async (data: CreateTaxProfileRequest) => {
  const path = '/create-profile/';
  return postRequest<CreateTaxProfileResponse>(path, data);
};

export const confirmPayoutDestination = async () => {
  const path = '/confirm-payout-destination/';
  return postRequest<{}>(path);
};

// Example API call method
export async function postSomeData(success = true) {
  // Add a bit of latency
  await new Promise((r) => setTimeout(r, 200));

  if (!success) {
    throw new Error('Oops something went wrong');
  }

  return {
    foo: 'bar',
  };
}
