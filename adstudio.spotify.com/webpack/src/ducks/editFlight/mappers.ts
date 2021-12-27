import { Account } from 'ducks/account/types';

import {
  mapFlightFormTargeting,
  parseDateValue,
} from 'utils/campaignHierarchy/mapperHelpers';

import { FREQUENCY_CAP_DEFAULT_VALUE } from 'config/frequencyCaps';

import { ExistingFlight } from 'types/common/campaignHierarchy/types';
import { EditFlightPayload } from 'types/common/state/api/flight';

export const mapFormValuesToEditFlightPayload = (
  formState: ExistingFlight,
  account: Account,
): EditFlightPayload => {
  const targeting = mapFlightFormTargeting(formState);

  const frequencyCap =
    formState.withFrequencyCap && formState.frequencyCap !== undefined
      ? formState.frequencyCap.map(({ maxImpressions, time, timeUnit }) => ({
          maxImpressions,
          time,
          timeUnit,
        }))
      : FREQUENCY_CAP_DEFAULT_VALUE;

  return {
    flightId: formState.id,
    adAccountId: account.id,
    name: formState.name!,
    dateBegin: parseDateValue(formState.dateRange!, 'begin'),
    dateEnd: parseDateValue(formState.dateRange!, 'end'),
    targeting,
    totalBudget: {
      amount: Number(formState.totalBudget!),
      currency: account.countryAttributes.countryCurrency!.code!,
    },
    frequencyCap: frequencyCap || FREQUENCY_CAP_DEFAULT_VALUE,
  };
};
