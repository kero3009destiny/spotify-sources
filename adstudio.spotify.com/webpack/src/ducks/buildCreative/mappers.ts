import { Account } from 'ducks/account/types';

import { mapFormToThirdPartyTrackingValues } from 'utils/campaignHierarchy/mapperHelpers';

import { AudioType } from 'config/audioTypes';

import { Format, FormatType } from '../../types/common/state/api/format';
import { PreSavedCreativeFormValues } from 'types/common/campaignHierarchy/types';
import { DuplicationType } from 'types/common/state/api/bff';
import { Objective } from 'types/common/state/api/campaign';
import { CreateCreativePayload } from 'types/common/state/api/creative';

interface CreativeMetadata {
  artistId?: string;
  duplicatedCreativeId?: string;
  hierarchyDraftId?: string;
  duplicationType?: DuplicationType;
}

export const mapFormValuesToCreativePayload = (
  formState: PreSavedCreativeFormValues,
  account: Account,
  objective: Objective,
  format: FormatType,
  serveOnMegaphone: boolean,
  creativeMetadata?: CreativeMetadata,
): CreateCreativePayload => {
  const mappedPayload: CreateCreativePayload = {} as any;

  mappedPayload.format = format;
  mappedPayload.adAccountId = account.id;
  mappedPayload.name = formState.name!;
  mappedPayload.artistId = creativeMetadata?.artistId;
  mappedPayload.objective = objective;
  mappedPayload.duplicatedCreativeId = creativeMetadata?.duplicatedCreativeId;
  mappedPayload.copiedCreativeId = formState.copiedCreativeId;
  mappedPayload.hierarchyDraftId = creativeMetadata?.hierarchyDraftId;
  mappedPayload.duplicationType = creativeMetadata?.duplicationType;

  const {
    moatEnabled,
    iasPixel,
    trackingPixel,
  } = mapFormToThirdPartyTrackingValues(formState);

  mappedPayload.trackingPixel = trackingPixel;

  switch (format) {
    case Format.AUDIO: {
      const audioType = formState.audioType!;
      mappedPayload.banner = formState.imageUploader!.id!;
      mappedPayload.clickthroughUrl = formState.clickthroughUrl!;
      mappedPayload.ctaText = formState.ctaText!;
      mappedPayload.targetedLocale = formState.targetedLocale!;
      mappedPayload.brandName = formState.brandName!;
      mappedPayload.tagLine = formState.tagLine;
      mappedPayload.serveOnMegaphone = false; // AUDIO && VB VOICEOVER cannot serve on megaphone

      if (audioType === AudioType.UPLOADED_AUDIO) {
        mappedPayload.fullmixId = formState.audioUploader?.id!;
      }

      if (audioType === AudioType.NEW_VOICEOVER) {
        mappedPayload.voiceover = {
          transcript: formState.transcript!,
          instructions: formState.instructions!,
          locale: formState.locale!,
          voice: formState.voice!,
        };
      }

      if (
        audioType === AudioType.NEW_VOICEOVER &&
        formState.bgMusicUploader?.id!
      ) {
        mappedPayload.bgMusicId = formState.bgMusicUploader!.id!;
        mappedPayload.playFullMusic = !!formState.playFullTrack;
      }
      break;
    }

    case Format.AUDIO_PODCAST: {
      const audioType = formState.audioType!;
      if (audioType === AudioType.SPOKEN_LAYER_BRIEF) {
        mappedPayload.voiceover = {
          spokenlayerBrief: {
            promoting: formState.promoting!,
            reachWho: formState.reachWho!,
            toneAndFeel: formState.toneAndFeel!,
            postListenSentiment: formState.postListenSentiment!,
            talkingPoints: formState.talkingPoints!,
            callToAction: formState.callToAction!,
            vanityUrlOrDiscountCode: formState.vanityUrlOrDiscountCode!,
            genderPref: formState.genderPref!,
            additionalInstructions: formState.additionalInstructions!,
            brandName: formState.brandName!,
            creativeName: formState.name!,
          },
        };
      }
      mappedPayload.serveOnMegaphone = !!serveOnMegaphone;
      mappedPayload.brandName = formState.brandName!;
      mappedPayload.fullmixId = formState.audioUploader?.id!;
      break;
    }

    case Format.VIDEO: {
      mappedPayload.banner = formState.imageUploader!.id!;
      mappedPayload.clickthroughUrl = formState.clickthroughUrl!;
      mappedPayload.ctaText = formState.ctaText!;
      mappedPayload.targetedLocale = formState.targetedLocale!;
      mappedPayload.videoId = formState.videoUploader?.id!;
      mappedPayload.moatEnabled = moatEnabled;
      mappedPayload.iasPixel = iasPixel;
      mappedPayload.serveOnMegaphone = false; // VIDEO cannot serve on megaphone
      break;
    }
    default:
      break;
  }

  return mappedPayload;
};

export const mapFormValuesToLinkCreativeWithFlight = (
  formState: PreSavedCreativeFormValues,
  account: Account,
  objective: Objective,
  flightId: string,
  format: FormatType,
  serveOnMegaphone: boolean,
  creativeMetadata?: CreativeMetadata,
): CreateCreativePayload => {
  const payload = mapFormValuesToCreativePayload(
    formState,
    account,
    objective,
    format,
    !!serveOnMegaphone,
    creativeMetadata,
  );
  payload.flightId = flightId;
  return payload;
};
