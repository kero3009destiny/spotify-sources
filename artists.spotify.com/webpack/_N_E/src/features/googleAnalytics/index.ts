// ignore-string-externalization
import { isBrowser } from '@apps/artists-spotify-com-c/src/shared/lib/isBrowser';
export function sendPageview(page) {
  ga('set', 'page', page);
  ga('send', 'pageview');
}
export function sendUserId(userId) {
  ga('crossDomainTracker.send', 'pageview', {
    dimension1: userId
  });
}
export function sendEvent(event) {
  ga('send', 'event', event);
}
export function setUserId(userId) {
  ga('set', 'userId', userId);
}
export function setEmployee(isEmployee) {
  ga('set', 'dimension1', isEmployee ? 'internal' : 'external');
}
export function setAccess(hasAccess) {
  ga('set', 'dimension3', hasAccess ? 'Yes' : 'No');
}
export function setLastVisitedArtist(artistId) {
  ga('set', 'dimension4', artistId);
}
export function ga() {
  if (isBrowser()) {
    var _window = window;

    if (_window.ga) {
      _window.ga.apply(_window, arguments);
    }
  }
}

if (isBrowser() && true) {
  init(); // default tracker

  ga('create', process.env.REACT_APP_GOOGLE_ANALYTICS_TOKEN, 'auto', {
    siteSpeedSampleRate: 10
  });
  ga('set', 'anonymizeIp', true);
  ga('require', 'displayfeatures');
  ga('set', 'dimension2', 'isNotFive'); // legacy dimension
  // for cross-domain tracking

  ga('create', 'UA-5784146-89', 'auto', 'crossDomainTracker', {
    allowLinker: true
  });
  ga('crossDomainTracker.require', 'linker');
  ga('crossDomainTracker.linker:autoLink', ['soundbetter.com', 'soundtrap.com']);
}
/* eslint-disable */

/* prettier-ignore */


export function init() {
  //  @ts-ignore
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      //  @ts-ignore
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), //  @ts-ignore
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m); //  @ts-ignore
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
}
/* eslint-enable */