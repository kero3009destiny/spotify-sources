import _slicedToArray from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import { getArtistEligibility } from '../Campaign/lib/api';
import { Popover, IconX } from '@spotify-internal/encore-web';
import { VioletMarquee } from './assets';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { ArtistIneligibilityReasons } from '../Campaign/lib/api/types';
import { CalloutSubtitle, CallOutWrapper, ContentHeader, ContentWrapper, ImgWrapper, MarqueeIcon } from './styled';
import { createErrorLoggerHook } from '@mrkt/features/Platform';
import { campaignsExperience } from '@mrkt/features/experience-definitions';
import { loadAnnouncementsPayloadCreator, MARQUEE_ONBOARDING_CALLOUT, updateAnnouncementsPayloadCreator } from '../../shared/store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var isCampaignsPath = function isCampaignsPath(location) {
  return location.pathname.endsWith('/campaigns');
};
export var MarqueeCallout = function MarqueeCallout() {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      error = _React$useState2[0],
      setError = _React$useState2[1];

  var _useState = useState(false),
      showMarqueeCallout = _useState[0],
      setShowMarqueeCallout = _useState[1];

  var _useState2 = useState(null),
      isEligible = _useState2[0],
      setIsEligible = _useState2[1];

  var _useParams = useParams(),
      artistId = _useParams.artistId;

  var history = useHistory();
  var location = useLocation();
  var useLogError = createErrorLoggerHook({
    view: 'marquee-callout',
    experience: campaignsExperience
  });
  useEffect(function () {
    loadAnnouncementsPayloadCreator([MARQUEE_ONBOARDING_CALLOUT]).then(function (data) {
      if (!data.includes(MARQUEE_ONBOARDING_CALLOUT)) {
        setShowMarqueeCallout(true);
      }
    }).catch(function (e) {
      setError(e); // eslint-disable-next-line no-console

      console.error(e);
    });
  }, []);
  useEffect(function () {
    function canFetchEligibility() {
      return isEligible === null && showMarqueeCallout;
    }

    if (canFetchEligibility() && artistId) {
      getArtistEligibility(artistId).then(function (_ref) {
        var eligible = _ref.eligible,
            reasons = _ref.reasons;
        var isIneligibleViewer = reasons.includes(ArtistIneligibilityReasons.INELIGIBLE_VIEWER);
        var hasIneligibleAudience = reasons.includes(ArtistIneligibilityReasons.INELIGIBLE_AUDIENCE);
        setIsEligible(isIneligibleViewer || hasIneligibleAudience ? false : eligible);
      }).catch(function (e) {
        setError(e); // eslint-disable-next-line no-console

        console.error(e);
      });
    }
  }, [artistId, isEligible, showMarqueeCallout]);
  useLogError(error);

  var closeCallout = function closeCallout() {
    updateAnnouncementsPayloadCreator([MARQUEE_ONBOARDING_CALLOUT]);
    setShowMarqueeCallout(false);
  }; // user should never see callout after navigating to campaigns page
  // we do this here to keep logic isolated to this component


  if (isCampaignsPath(location) && showMarqueeCallout) {
    closeCallout();
  }

  if (isEligible && showMarqueeCallout) {
    return /*#__PURE__*/_jsx(CallOutWrapper, {
      children: /*#__PURE__*/_jsxs(Popover, {
        arrow: Popover.top,
        popoverTitle: "",
        colorSet: "brightAccent",
        children: [/*#__PURE__*/_jsxs(ContentWrapper, {
          "aria-label": "Go to Campaigns",
          onClick: function onClick() {
            history.push("/artist/".concat(artistId, "/campaigns"));
            closeCallout();
          },
          children: [/*#__PURE__*/_jsx(CalloutSubtitle, {
            children: "NEW!"
          }), /*#__PURE__*/_jsx(ContentHeader, {
            children: "Promote your next release with Marquee"
          }), /*#__PURE__*/_jsx("p", {
            children: "Tap the Campaigns tab for more."
          })]
        }), /*#__PURE__*/_jsx(ImgWrapper, {
          children: /*#__PURE__*/_jsx(MarqueeIcon, {
            src: VioletMarquee,
            alt: "demo marquee"
          })
        }), /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsx(IconX, {
            onClick: closeCallout,
            semanticColor: "textBase",
            "aria-label": "Close Callout"
          })
        })]
      })
    });
  }

  return null;
};