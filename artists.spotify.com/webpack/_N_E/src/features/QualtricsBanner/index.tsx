import _slicedToArray from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { Banner, Type } from '@spotify-internal/encore-web-v3';
import { createMrktSongStatsInteractionBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktSongStatsInteractionBrowser';
import { useT } from '@mrkt/features/i18n';
import { logGabitoEvent } from '@mrkt/features/gabito';
import { loadAnnouncementsPayloadCreator, updateAnnouncementsPayloadCreator } from '../../shared/store';
import { useCurrentArtist } from '../artists';
import { useCurrentUser } from '../currentUser';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var QUALTRICS_BANNER = 'qualtrics_03';
export function QualtricsBanner(_ref) {
  var pageId = _ref.pageId;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      show = _React$useState2[0],
      setShow = _React$useState2[1];

  var t = useT();

  var _useCurrentArtist = useCurrentArtist(),
      artistId = _useCurrentArtist.id;

  var user = useCurrentUser();
  React.useEffect(function () {
    var didCancel = false;
    loadAnnouncementsPayloadCreator([QUALTRICS_BANNER]).then(function (data) {
      if (!data.includes(QUALTRICS_BANNER) && !didCancel) {
        setShow(true);
      }
    }).catch(function () {// swallow errors
    });
    return function () {
      didCancel = true;
    };
  }, []);

  var onClose = function onClose() {
    updateAnnouncementsPayloadCreator([QUALTRICS_BANNER]);
    logGabitoEvent(createMrktSongStatsInteractionBrowser({
      creator_uri: "spotify:artist:".concat(artistId),
      navigational_root_id: pageId,
      page_id: pageId,
      page_uri: window.location.href,
      interaction_category: 'SurveyBanner',
      interaction_action: 'dismissBanner',
      interaction_value: 'fig_kpi_survey'
    }));
    setShow(false);
  };

  return show ? /*#__PURE__*/_jsxs(Banner, {
    variant: Banner.announcement,
    onClose: onClose,
    children: [/*#__PURE__*/_jsx(Type, {
      children: t('QUALTRICS_BANNER_2e5352', 'How can we improve the data we give you?', 'This text is followed by a prompt that links to a survey.')
    }), ' ', /*#__PURE__*/_jsx(Type, {
      children: /*#__PURE__*/_jsx("a", {
        href: "https://spotify.co1.qualtrics.com/jfe/form/SV_9L8YvS7ahJDGs7A?artistId=".concat(artistId, "&tag=").concat(user === null || user === void 0 ? void 0 : user.partnerIds.qualtrics, "&platform=web"),
        target: "_blank",
        rel: "noreferrer",
        onClick: function onClick() {
          logGabitoEvent(createMrktSongStatsInteractionBrowser({
            creator_uri: "spotify:artist:".concat(artistId),
            navigational_root_id: pageId,
            page_id: pageId,
            page_uri: window.location.href,
            interaction_category: 'SurveyBanner',
            interaction_action: 'clickLink',
            interaction_value: 'fig_kpi_survey'
          }));
        },
        children: t('QUALTRICS_BANNER_a95b38', 'Take the survey', '')
      })
    })]
  }) : null; // need to return null for the component rather than false because TS
}