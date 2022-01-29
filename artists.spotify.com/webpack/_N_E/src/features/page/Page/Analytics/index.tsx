// ignore-string-externalization
import { useEffect } from 'react';
import { withRouter, matchPath } from 'react-router-dom'; // eslint-disable-line

import localStorageFallback from 'local-storage-fallback';
import { setUserId, setEmployee, setAccess, setLastVisitedArtist, sendPageview, sendUserId, ga, sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useCurrentUser, useIsEmployee } from '../../../../features/currentUser';
export var PageAnalytics = withRouter(function PageAnalytics(_ref) {
  var _currentUser$partnerI;

  var history = _ref.history,
      location = _ref.location;
  var currentUser = useCurrentUser();
  var isEmployee = useIsEmployee();
  var lastVisitedArtist = useLastVisitedArtist(location.pathname);
  var page = history.createHref(location);
  var googlePartnerId = currentUser === null || currentUser === void 0 ? void 0 : (_currentUser$partnerI = currentUser.partnerIds) === null || _currentUser$partnerI === void 0 ? void 0 : _currentUser$partnerI.google; // set dimensions

  useEffect(function () {
    setUserId(googlePartnerId || '');
    setEmployee(isEmployee);
    setAccess(currentUser ? currentUser.hasAccess : false);
    setLastVisitedArtist(lastVisitedArtist);
  }, [currentUser, googlePartnerId, isEmployee, lastVisitedArtist]); // set logged-in redirect dimension/event based on local storage item

  useEffect(function () {
    if (currentUser) {
      var loggedInRedirectKey = "".concat(currentUser.username, ":analytics:loggedInRedirect");
      var loggedInRedirect = Boolean(localStorageFallback.getItem(loggedInRedirectKey));

      if (loggedInRedirect) {
        ga('set', 'dimension8', 'Yes');
        sendEvent({
          eventCategory: 'Logged In Redirect',
          eventAction: 'Was Redirected',
          eventLabel: 'Yes'
        });
      }

      localStorageFallback.removeItem(loggedInRedirectKey);
    }
  }, [currentUser]); // send page view

  useEffect(function () {
    sendPageview(page);
  }, [page]); // send user id

  useEffect(function () {
    if (googlePartnerId) {
      sendUserId(googlePartnerId);
    }
  }, [googlePartnerId]);
  return null;
});

function useLastVisitedArtist() {
  var pathname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
  var currentUser = useCurrentUser();
  var username = currentUser ? currentUser.username : undefined;
  var key = "".concat(username, ":analytics:lastVisitedArtist");
  var value = localStorageFallback.getItem(key) || '';
  var match = matchPath(pathname, {
    path: '/artist/:artistId'
  });

  if (match) {
    value = match.params.artistId;
  }

  useEffect(function () {
    if (!value) return;
    localStorageFallback.setItem(key, value);
  }, [key, value]);
  return value;
}