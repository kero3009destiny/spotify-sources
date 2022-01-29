// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import URI from 'spotify-liburi';

var serverResponseToSelectedMedia = function serverResponseToSelectedMedia(response, mediaInfo) {
  return {
    status: 'loaded',
    uri: "spotify:".concat(mediaInfo.type, ":").concat(mediaInfo.id),
    mediaName: response.name,
    labelName: response.label,
    imageUrl: response.image_url
  };
};

export var mediaMetadataLoader = createLoader(function (mediaInfo) {
  return webgateFetchJson("https://generic.wg.spotify.com/s4a-onboarding/v0/decorate/".concat(encodeURIComponent(mediaInfo.type), "/").concat(URI.idToHex(mediaInfo.id))).then(function (response) {
    return serverResponseToSelectedMedia(response, mediaInfo);
  });
});