import React from 'react';
import { Route } from 'react-router';
import { useT } from '@mrkt/features/i18n';
import { createUbiEventLogger, useImpressionUBILogger } from '@mrkt/features/ubi';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import EntityItem from '../Entity/Item';
import EntityLink from '../Entity/Link';
import { useCurrentTeamOrNull } from '../../../Team/hooks';
import { useCurrentArtistIdOrNull } from '../../../artists';
import { IconBadge } from '../../../Team/components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function ManageTeamAppLink() {
  var currentTeam = useCurrentTeamOrNull();
  var t = useT();
  var pathname = '/team/roster';
  var to = pathname;
  var fromTeamUri = currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.uri;

  if (fromTeamUri) {
    var searchParams = new URLSearchParams();
    searchParams.append('fromTeamUri', fromTeamUri);
    to += "?".concat(searchParams);
  }

  var artistId = useCurrentArtistIdOrNull();
  var uri = window.location.href;
  var spec = createWebCommonEventFactory({
    data: {
      identifier: 's4a-side-panel-teams-link',
      uri: uri
    }
  });
  var UBIEventLogger = createUbiEventLogger(artistId);

  var sendUbiEvent = function sendUbiEvent() {
    UBIEventLogger.logInteraction(spec.sideNavPanelFactory().otherLinksFactory().yourTeamsRowFactory().hitUiNavigate({
      destination: to
    }));
  };

  var yourTeamsNavItemImpression = spec.sideNavPanelFactory().otherLinksFactory().yourTeamsRowFactory();

  var _useImpressionUBILogg = useImpressionUBILogger(yourTeamsNavItemImpression, artistId, null),
      yourTeamsRef = _useImpressionUBILogg.ref;

  return /*#__PURE__*/_jsx(Route, {
    path: pathname,
    children: function children(_ref) {
      var match = _ref.match;
      return /*#__PURE__*/_jsx(EntityItem, {
        active: !!match,
        children: /*#__PURE__*/_jsxs(EntityLink, {
          ref: yourTeamsRef,
          to: to,
          "data-testid": "your-teams",
          onClick: function onClick() {
            sendUbiEvent();
            sendEvent({
              eventCategory: 'Navigation',
              eventAction: 'YourTeams'
            });
          },
          children: [/*#__PURE__*/_jsx(IconBadge, {
            variant: "team"
          }), t('SIDEPANEL_YOUR_TEAMS_LINK_TEXT', 'Your teams', 'Navigational link to see all of the teams you have access to.')]
        })
      });
    }
  });
}