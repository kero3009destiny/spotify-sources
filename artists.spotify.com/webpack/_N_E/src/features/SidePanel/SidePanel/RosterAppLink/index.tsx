import React from 'react';
import { Route } from 'react-router';
import { useT } from '@mrkt/features/i18n';
import { createUbiEventLogger, useImpressionUBILogger } from '@mrkt/features/ubi';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import EntityItem from '../Entity/Item';
import EntityLink from '../Entity/Link';
import { primeInitialPage } from '../../../Roster';
import { useCurrentArtistIdOrNull } from '../../../artists';
import { IconBadge } from '../../../Team/components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function RosterAppLink() {
  var t = useT();

  function prime() {
    primeInitialPage();
  }

  var artistId = useCurrentArtistIdOrNull();
  var uri = window.location.href;
  var spec = createWebCommonEventFactory({
    data: {
      identifier: 's4a-side-panel-roster-link',
      uri: uri
    }
  });
  var UBIEventLogger = createUbiEventLogger(artistId);

  var sendUbiEvent = function sendUbiEvent() {
    UBIEventLogger.logInteraction(spec.sideNavPanelFactory().otherLinksFactory().yourRosterRowFactory().hitUiNavigate({
      destination: '/roster'
    }));
  };

  var yourTeamsNavItemImpression = spec.sideNavPanelFactory().otherLinksFactory().yourRosterRowFactory();

  var _useImpressionUBILogg = useImpressionUBILogger(yourTeamsNavItemImpression, artistId, null),
      yourRosterRef = _useImpressionUBILogg.ref;

  return /*#__PURE__*/_jsx(Route, {
    path: "/roster",
    children: function children(_ref) {
      var match = _ref.match;
      return /*#__PURE__*/_jsx(EntityItem, {
        active: !!match,
        onMouseOver: prime,
        onFocus: prime,
        children: /*#__PURE__*/_jsxs(EntityLink, {
          ref: yourRosterRef,
          onClick: sendUbiEvent,
          to: "/roster",
          children: [/*#__PURE__*/_jsx(IconBadge, {
            variant: "roster"
          }), t('SIDEPANEL_YOUR_ROSTER_LINK', 'Your roster', 'Link that sends user to a page listing out all artists in their roster')]
        })
      });
    }
  });
}