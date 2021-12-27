import { AdStudioBffAdAccountService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffAdAccountService';
import { AdStudioValidationService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioValidationService';
import { UserAccountSignUp } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adaccountservice/service/model/UserAccountSignUp';
import { ValidateEmailRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/ValidateEmailRequest';

import { protoFetchWithLogging } from 'api/webgate';

import {
  getBffWegbateClientConfig,
  getEdgeProxyClientConfig,
} from './utils/getBeClientConfig';

interface UserSignUpParams {
  adStudioLead: string;
  businessEmail: string;
  businessName: string;
  businessType: string;
  businessWebsite: string;
  country: string;
  emailSubscription: boolean;
  firstName: string;
  industry: string;
  lastName: string;
  taxId: string;
  timezoneOffsetMillis: number;
  utm: string;
}

export async function userSignUp(values: UserSignUpParams) {
  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);
  const request = new UserAccountSignUp()
    .setAdStudioLead(values.adStudioLead)
    .setBusinessEmail(values.businessEmail)
    .setBusinessName(values.businessName)
    .setBusinessType(values.businessType)
    .setBusinessWebsite(values.businessWebsite)
    .setCountry(values.country)
    .setEmailSubscription(values.emailSubscription)
    .setFirstName(values.firstName)
    .setIndustry(values.industry)
    .setLastName(values.lastName)
    .setTaxId(values.taxId)
    .setTimezoneOffsetMillis(values.timezoneOffsetMillis)
    .setUtm(values.utm);
  return client.userSignUp(request);
}

export async function validateEmail(email: string) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioValidationService(protoFetchWithLogging, config);
  const request = new ValidateEmailRequest().setEmail(email);
  return client.validateEmail(request);
}
