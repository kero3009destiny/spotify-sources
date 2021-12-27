import { AdStudioBffAdAccountService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffAdAccountService';
import { BffUser } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/BffUser';
import { EditUserRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EditUserRequest';
import { Empty } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';

import { protoFetchWithLogging } from 'api/webgate';

import { getBffWegbateClientConfig } from './utils/getBeClientConfig';

interface UpdateUserDetails {
  businessEmail: string;
  emailSubscribe: boolean;
  firstName: string;
  lastName: string;
}

export async function getUserDetails(): Promise<typeof BffUser> {
  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);
  return client.getUserInfo(new Empty());
}

export async function updateUserDetails(
  userDetails: UpdateUserDetails,
): Promise<typeof Empty> {
  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(protoFetchWithLogging, config);
  const request = new EditUserRequest()
    .setBusinessEmail(userDetails.businessEmail)
    .setEmailSubscribe(userDetails.emailSubscribe)
    .setFirstName(userDetails.firstName)
    .setLastName(userDetails.lastName);
  return client.editUser(request);
}
