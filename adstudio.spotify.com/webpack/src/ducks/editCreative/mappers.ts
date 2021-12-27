import { Account } from 'ducks/account/types';

import { mapFormToThirdPartyTrackingValues } from 'utils/campaignHierarchy/mapperHelpers';
import { isAudioCreativeType } from 'utils/creativeHelpers';
import { getLocalizedValueForBundle } from 'utils/i18nHelpers';

import { AudioType } from 'config/audioTypes';

import { ExistingCreativeFormValues } from 'types/common/campaignHierarchy/types';
import { EditCreativePayload } from 'types/common/state/api/creative';

export const mapFormValuesToEditCreativePayload = (
  formState: ExistingCreativeFormValues,
  account: Account,
): EditCreativePayload => {
  const audioType = isAudioCreativeType(formState.format!)
    ? formState.audioType!
    : undefined;
  const isUploadAudioType =
    audioType === AudioType.UPLOADED_AUDIO ||
    audioType === AudioType.SPOKEN_LAYER_FULLMIX;

  const {
    moatEnabled,
    iasPixel,
    trackingPixel,
  } = mapFormToThirdPartyTrackingValues(formState);

  return {
    adAccountId: account.id,
    creativeId: formState.id,
    name: formState.name!,
    banner: formState.imageUploader!.id!,
    fullmixId: isUploadAudioType ? formState.audioUploader!.id! : undefined,
    videoId: formState.videoUploader?.id,
    clickthroughUrl: formState.clickthroughUrl!,
    ctaText: getLocalizedValueForBundle(
      formState.targetedLocale!,
      formState.ctaText!,
    ),
    brandName: formState.brandName!,
    tagLine: formState.tagLine!,
    format: formState.format!,
    moatEnabled,
    iasPixel,
    trackingPixel,
  };
};
