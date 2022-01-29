// ignore-string-externalization
import { useAcceptLanguage } from '@mrkt/features/i18n/hooks/useAcceptLanguage';
import { useWebgateSWR } from '@mrkt/features/webgate-swr';
import HOME_QUERY from './ArtistHomeQuery'; // feature flag to enable localized home cards https://backstage.spotify.net/experimentation/rollout/overview/8523

export function useHomeData(artistId) {
  var acceptLanguage = useAcceptLanguage();
  var result = useWebgateSWR({
    url: "/s4x-home-service/v1/artist/".concat(artistId, "/home"),
    method: 'POST',
    body: JSON.stringify({
      query: HOME_QUERY,
      variables: {}
    }),
    headers: {
      'content-type': 'application/json',
      'accept-language': acceptLanguage
    }
  }, {
    suspense: true
  });

  if (!result.data) {
    throw new Error('unable to load home');
  }

  return result.data;
}
var CardType;

(function (CardType) {
  CardType["TITLE_ONLY"] = "TITLE_ONLY";
  CardType["REMOTE"] = "REMOTE";
  CardType["DISPLAY"] = "DISPLAY";
})(CardType || (CardType = {}));

var HeaderType;

(function (HeaderType) {
  HeaderType["UNKNOWN_HEADER_TYPE"] = "UNKNOWN_HEADER_TYPE";
  HeaderType["IMAGE_URL"] = "IMAGE_URL";
  HeaderType["TEXT"] = "TEXT";
  HeaderType["DELTA"] = "DELTA";
})(HeaderType || (HeaderType = {}));

var DisplayType;

(function (DisplayType) {
  DisplayType["UNKNOWN_DISPLAY_TYPE"] = "UNKNOWN_DISPLAY_TYPE";
  DisplayType["COVER"] = "COVER";
  DisplayType["ICON"] = "ICON";
  DisplayType["STAT"] = "STAT";
  DisplayType["INFO"] = "INFO";
})(DisplayType || (DisplayType = {}));