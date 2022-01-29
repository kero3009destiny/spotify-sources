// ignore-string-externalization
import { useEffect } from 'react';
import { createMrktPageViewBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktPageViewBrowser';
import { logGabitoEvent } from '@mrkt/features/gabito';
export function usePageViewLogger(_ref) {
  var pageId = _ref.pageId,
      creatorUri = _ref.creatorUri,
      organizationUri = _ref.organizationUri;
  useEffect(function () {
    if (!pageId) return function () {};
    var pageUri = window.location.href;
    logPageView({
      pageId: pageId,
      pageUri: pageUri,
      creatorUri: creatorUri,
      organizationUri: organizationUri,
      navigationalRootId: null,
      type: 'enter'
    });
    return function () {
      logPageView({
        pageId: pageId,
        pageUri: pageUri,
        creatorUri: creatorUri,
        organizationUri: organizationUri,
        navigationalRootId: null,
        type: 'exit'
      });
    };
  }, [pageId, creatorUri, organizationUri]);
}

function logPageView(_ref2) {
  var pageId = _ref2.pageId,
      pageUri = _ref2.pageUri,
      creatorUri = _ref2.creatorUri,
      organizationUri = _ref2.organizationUri,
      navigationalRootId = _ref2.navigationalRootId,
      type = _ref2.type;
  logGabitoEvent(createMrktPageViewBrowser({
    page_id: pageId,
    page_uri: pageUri,
    creator_uri: creatorUri,
    organization_uri: organizationUri,
    navigational_root_id: navigationalRootId,
    type: type
  }));
}