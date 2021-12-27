import debug from 'debug';
import get from 'lodash/get';

import { AdStudioBffAdAccountService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffAdAccountService';
import { PreferencesService } from '@spotify-internal/adstudio-bff-clients/clients/PreferencesService';
import { AdAccountCreationInfo } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adaccountservice/service/model/AdAccountCreationInfo';
import { NewAdAccountCreationResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adaccountservice/service/NewAdAccountCreationResponse';
import { BffAdAccount } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/BffAdAccount';
import { BffGetUserPreferencesRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/BffGetUserPreferencesRequest';
import { BffUpdateAdAccountRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/BffUpdateAdAccountRequest';
import { GetAdAccountInfoRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetAdAccountInfoRequest';
import { ManageAdAccountRolesRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/ManageAdAccountRolesRequest';
import { SetUserAsOwnerRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/SetUserAsOwnerRequest';
import { TaxIdValidationRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/TaxIdValidationRequest';
import { TaxIdValidationResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/TaxIdValidationResponse';
import { TermsAndConditionsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/TermsAndConditionsRequest';
import { UserNameRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/UserNameRequest';
import { Empty } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';

import { UserInfo } from 'ducks/accountManagement/types';
import { AdAccountMetadata } from 'ducks/accounts/types';

import { getBffWegbateClientConfig } from './utils/getBeClientConfig';

import { protoFetchWithLogging } from './webgate';

import { BffGetUserPreferencesResponse } from 'types/common/state/api/accounts';

const log = debug('account');

export interface UserAccounts {
  userMetadatas: UserInfo[];
}

enum accountManageActions {
  UNSET = 'UNSET',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  UPDATE = 'UPDATE',
}

type UserInfoStatus = {
  spotifyUserExternalId: string;
  firstName: string;
  lastName: string;
  isMember: boolean;
};

interface CreateNewAdAccountWithExistingUserParams {
  businessName: string;
  businessType: string;
  country: string;
  industry: string;
  utm: string;
}

export interface AccountAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  taxId?: string;
  businessType?: string;
  industry?: string;
}

const cancelableFetch = (specialUpdates: RequestInit) => (
  localUrl: string,
  localOptions?: RequestInit,
) => protoFetchWithLogging(localUrl, { ...specialUpdates, ...localOptions });

export async function changeMemberRoleInAccount(
  adAccountId: string,
  roleName: string,
  externalUserId: string,
  prevRoleName: string,
): Promise<UserAccounts | null> {
  log('Changing Members Role');

  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);
  const request = new ManageAdAccountRolesRequest()
    .setAdAccountId(adAccountId)
    .setRoleName(roleName)
    .setSpotifyUserExternalId(externalUserId)
    .setAction(accountManageActions.UPDATE)
    .setPrevRoleName(prevRoleName)
    .toObject();
  return client.manageAdAccountRoles(request).catch(r => {
    switch (r.status) {
      case 401: // user fetching from grantlisted account
      case 403: // not authorized
      case 404:
        return Promise.resolve(null);
      default:
        return Promise.reject(r);
    }
  });
}

export async function removeMemberInAccount(
  adAccountId: string,
  roleName: string,
  externalUserId: string,
): Promise<UserAccounts | null> {
  log('Removing Members Role');

  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);
  const request = new ManageAdAccountRolesRequest()
    .setAdAccountId(adAccountId)
    .setRoleName(roleName)
    .setSpotifyUserExternalId(externalUserId)
    .setAction(accountManageActions.REMOVE)
    .toObject();
  return client.manageAdAccountRoles(request).catch(r => {
    switch (r.status) {
      case 401: // user fetching from grantlisted account
      case 403: // not authorized
      case 404:
        return Promise.resolve(null);
      default:
        return Promise.reject(r);
    }
  });
}

export async function addMemberInAccount(
  adAccountId: string,
  roleName: string,
  externalUserId: string,
): Promise<UserAccounts | null> {
  log('Removing Members Role');

  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);
  const request = new ManageAdAccountRolesRequest()
    .setAdAccountId(adAccountId)
    .setRoleName(roleName)
    .setSpotifyUserExternalId(externalUserId)
    .setAction(accountManageActions.ADD)
    .toObject();
  return client.manageAdAccountRoles(request).catch(r => {
    switch (r.status) {
      case 401: // user fetching from grantlisted account
      case 403: // not authorized
      case 404:
        return Promise.resolve(null);
      default:
        return Promise.reject(r);
    }
  });
}

export async function getUsersFromAccount(
  adAccountId: string,
): Promise<UserAccounts | null> {
  log('Getting users from account', adAccountId);

  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);

  const request = new GetAdAccountInfoRequest()
    .setAdAccountId(adAccountId)
    .toObject();

  return client.getUsersForCurrentAccount(request).catch(r => {
    switch (r.status) {
      case 401: // user fetching from grantlisted account
      case 403: // not authorized
      case 404:
        return Promise.resolve(null);
      default:
        return Promise.reject(r);
    }
  });
}

export async function getUserInfoFromSpotifyUser(
  spotifyUser: string,
  adAccountId: string,
  options?: RequestInit,
): Promise<UserInfoStatus> {
  log('Getting users info from user');
  const config = await getBffWegbateClientConfig();

  const fetchEngine = options
    ? cancelableFetch(options)
    : protoFetchWithLogging;
  const client = new AdStudioBffAdAccountService(fetchEngine, config);

  const request = new UserNameRequest()
    .setAdAccountId(adAccountId)
    .setUsername(spotifyUser)
    .toObject();

  return client.getUserInfoFromSpotifyUserName(request).catch(r => {
    switch (r.status) {
      case 401: // user fetching from grantlisted account
      case 403: // not authorized
      case 404:
        return Promise.resolve(null);
      default:
        return Promise.reject(r);
    }
  });
}

export async function updateAdAccount(
  account: string,
  accountAddress: AccountAddress,
  industry: string,
  businessType: string,
  taxId: string,
): Promise<any> {
  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);

  const request = new BffUpdateAdAccountRequest()
    .setAdAccountId(account)
    .setBusinessAddress({ ...accountAddress })
    .setBusinessType(businessType)
    .setIndustry(industry)
    .setTaxId(taxId);

  return client.updateAdAccount(request).catch(r => {
    switch (r.status) {
      case 401: // user fetching from grantlisted account
      case 403: // not authorized
      case 404:
        return Promise.resolve(null);
      default:
        return Promise.reject(r);
    }
  });
}

export async function validateAccountTaxID(
  taxId: string,
  countryCode: string,
  options?: RequestInit,
): Promise<InstanceType<typeof TaxIdValidationResponse>> {
  const config = await getBffWegbateClientConfig();

  const fetchEngine = options
    ? cancelableFetch(options)
    : protoFetchWithLogging;

  const client = new AdStudioBffAdAccountService(fetchEngine, config);

  const request = new TaxIdValidationRequest()
    .setCountryCode(countryCode)
    .setTaxId(taxId);

  return client.validateVatId(request).catch(r => {
    switch (r.status) {
      case 401: // user fetching from grantlisted account
      case 403: // not authorized
      case 404:
        return Promise.resolve(null);
      default:
        return Promise.resolve({});
    }
  });
}

export async function getAccountDetailsById(
  adAccountId: string,
): Promise<InstanceType<typeof BffAdAccount>> {
  log('Getting account details information by id');

  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);

  const request = new GetAdAccountInfoRequest()
    .setAdAccountId(adAccountId)
    .toObject();

  return client.getAdAccountInfo(request).catch(r => {
    // We use get to ensure that error states with no status default to the signup flow
    switch (get(r, 'status', 401)) {
      case 401: // user fetching from grantlisted account
      case 403: // not authorized
      case 404:
        return Promise.resolve(null);
      default:
        return Promise.resolve({});
    }
  });
}

export async function getAdAccounts(): Promise<
  Array<AdAccountMetadata> | Response | null
> {
  log('Getting account information');

  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);

  return client
    .getAdAccountsForUser(new Empty())
    .then(accountPayload => accountPayload.adAccountMetadata)
    .catch(r => {
      switch (r.status) {
        case 401:
        case 404:
          return Promise.resolve(null);
        default:
          return Promise.reject(r);
      }
    });
}

export async function getAccountsPreferences(
  adAccountId?: string,
): Promise<BffGetUserPreferencesResponse | Response | null> {
  log('Getting user preferences by id');

  const config = await getBffWegbateClientConfig();
  const client = new PreferencesService(protoFetchWithLogging, config);
  const request = new BffGetUserPreferencesRequest();

  if (adAccountId) {
    request.setAdAccountId(adAccountId);
  }

  return client.getUserPreferences(request);
}

export async function getAccountsPreference(
  preference: object,
): Promise<BffGetUserPreferencesResponse | Response | null> {
  log('Getting user preferences by id');

  const config = await getBffWegbateClientConfig();
  const client = new PreferencesService(protoFetchWithLogging, config);

  return client.getUserPreference(preference).catch(r => {
    switch (r.status) {
      case 404:
      case 502:
        return null;
      default:
        return Promise.reject(r);
    }
  });
}

export async function setAccountsPreferences(
  preferences: object,
): Promise<BffGetUserPreferencesResponse | Response | null> {
  const config = await getBffWegbateClientConfig();
  const client = new PreferencesService(protoFetchWithLogging, config);

  return client.setUserPreference(preferences).catch(r => {
    switch (r.status) {
      case 404:
      case 502:
        return null;
      default:
        return Promise.reject(r);
    }
  });
}

export async function logAPITermsAcceptance(
  adAccountId: string,
  clientId: string,
): Promise<typeof BffAdAccount | Response | null> {
  log(`Logging API Ts & Cs acceptance by id: ${adAccountId}::${clientId}`);

  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);

  const request = new TermsAndConditionsRequest()
    .setAdAccountId(adAccountId)
    .setClientId(clientId)
    .toObject();

  return client.logTermsAcceptance(request).catch(r => {
    switch (r.status) {
      case 200:
        return Promise.resolve(null);
      default:
        return Promise.reject(r);
    }
  });
}

export async function changeAdAccountOwner(
  adAccountId: string,
  externalUserId: string,
): Promise<UserAccounts | null> {
  log('Changing ad account owner');

  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);
  const request = new SetUserAsOwnerRequest()
    .setAdAccountId(adAccountId)
    .setSpotifyUserExternalId(externalUserId)
    .toObject();
  return client.setUserAsOwner(request).catch(r => Promise.reject(r));
}

export async function createNewAdAccountWithExistingUser(
  values: CreateNewAdAccountWithExistingUserParams,
): Promise<InstanceType<typeof NewAdAccountCreationResponse>> {
  log('Create new ad account with existing user');

  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);
  const request = new AdAccountCreationInfo()
    .setBusinessName(values.businessName)
    .setBusinessType(values.businessType)
    .setCountry(values.country)
    .setIndustry(values.industry)
    .setUtm(values.utm);
  return client.createNewAdAccountWithExistingUser(request);
}
