// ignore-string-externalization
import { useEffect } from 'react';
import { createMrktNavigationBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktNavigationBrowser';
import { logGabitoEvent } from '@mrkt/features/gabito';
var NAVIGATION_SINGLETON = {
  pageId: null,
  pageUri: null
}; // this is only for tests, to simulate a fresh load of the application

export var resetNavState = function resetNavState() {
  NAVIGATION_SINGLETON = {
    pageId: null,
    pageUri: null
  };
};
export function useNavigationLogger(props) {
  var pageId = props.pageId,
      creatorUri = props.creatorUri,
      organizationUri = props.organizationUri;
  useEffect(function () {
    var toPageUri = window.location.href;
    var fromPageId = NAVIGATION_SINGLETON.pageId;
    var fromPageUri = NAVIGATION_SINGLETON.pageUri; // probably not necessary, but just to be extra safe, and ensure that
    // this hook never accidentally re-mounts, and attempts a duplicate navigation

    if (fromPageId === pageId && fromPageUri === toPageUri) {
      return;
    }

    NAVIGATION_SINGLETON.pageId = pageId;
    NAVIGATION_SINGLETON.pageUri = toPageUri;

    if (pageId) {
      logNavigation({
        toPageId: pageId,
        toPageUri: toPageUri,
        fromPageId: fromPageId,
        fromPageUri: fromPageUri,
        creatorUri: creatorUri,
        organizationUri: organizationUri,
        navigationalRootId: null
      });
    }
  }, [pageId, creatorUri, organizationUri]);
}

function logNavigation(_ref) {
  var toPageId = _ref.toPageId,
      toPageUri = _ref.toPageUri,
      fromPageId = _ref.fromPageId,
      fromPageUri = _ref.fromPageUri,
      creatorUri = _ref.creatorUri,
      organizationUri = _ref.organizationUri,
      navigationalRootId = _ref.navigationalRootId;
  logGabitoEvent(createMrktNavigationBrowser({
    to_page_id: toPageId,
    to_page_uri: toPageUri,
    from_page_id: fromPageId,
    from_page_uri: fromPageUri,
    navigational_root_id: navigationalRootId,
    creator_uri: creatorUri,
    organization_uri: organizationUri
  }));
}