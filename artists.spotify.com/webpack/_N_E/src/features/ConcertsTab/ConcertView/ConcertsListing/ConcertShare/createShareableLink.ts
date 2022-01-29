// ignore-string-externalization
// taken from: https://ghe.spotify.net/desktop/client-desktop/blob/b508109e2e09d0667820c71afbf25141ea523c1a/ui/apps/share-spotlet/src/app.js#L120
// except for facebook. the facebook share link that is defined in the desktop
// uses an appID, which S4A currently doesn't have.
// once we get an appID, we should use the link in the desktop client
// because that is the official way to share on facebook using the Graph API
import { spotifyOpenLink } from '../../../../../shared/lib/urlHelpers';
var FACEBOOK_SHARE = 'http://www.facebook.com/sharer/sharer.php?display=page';
var TWITTER_SHARE = 'http://twitter.com/intent/tweet?hashtags=NowPlaying&related=spotify';
var SKYPE_SHARE = 'https://web.skype.com/share';
var TUMBLR_SHARE = 'https://tumblr.com/widgets/share/tool';
var TELEGRAM_SHARE = 'https://telegram.me/share/';
export function createFacebookLink(uri) {
  var encodedOpenUrl = encodeURIComponent(spotifyOpenLink(uri));
  return "".concat(FACEBOOK_SHARE, "&u=").concat(encodedOpenUrl);
}
export function createSkypeLink(uri) {
  var encodedOpenUrl = encodeURIComponent(spotifyOpenLink(uri));
  return "".concat(SKYPE_SHARE, "?url=").concat(encodedOpenUrl);
}
export function createTelegramLink(uri) {
  var encodedOpenUrl = encodeURIComponent(spotifyOpenLink(uri));
  return "".concat(TELEGRAM_SHARE, "?url=").concat(encodedOpenUrl);
}
export function createTumblrLink(uri) {
  var encodedOpenUrl = encodeURIComponent(spotifyOpenLink(uri));
  return "".concat(TUMBLR_SHARE, "?canonicalUrl=").concat(encodedOpenUrl);
}
export function createTwitterLink(uri) {
  var defaultTweetText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Check me out on tour!';
  var encodedOpenUrl = encodeURIComponent(spotifyOpenLink(uri));
  var text = encodeURIComponent(defaultTweetText);
  return "".concat(TWITTER_SHARE, "&url=").concat(encodedOpenUrl, "&text=").concat(text);
}
export function createOpenLink(uri) {
  return spotifyOpenLink(uri);
}