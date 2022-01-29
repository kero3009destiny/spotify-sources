import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Popover, Type, IconX, spacer12, spacer20, spacer40, spacer4, white, kleinBlue61, opacityBlack30 } from '@spotify-internal/encore-web';
import VioletReleasePage from './assets/releasepage_graphic.png';
import { useT } from '@mrkt/features/i18n';
import { useReleaseStatsPageModalImpressionLogger } from '../Music/hooks/useMusicUbi';
import { loadAnnouncementsPayloadCreator, RELEASE_PAGE_CALLOUT, updateAnnouncementsPayloadCreator } from '../../shared/store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ImgWrapper = styled.div.withConfig({
  displayName: "ReleasePageCallout__ImgWrapper",
  componentId: "sc-17jd295-0"
})(["min-width:163px;height:100%;flex-grow:1;position:absolute;right:0;bottom:0;overflow:hidden;"]);
var ContentHeader = styled(Type).attrs({
  forwardedAs: 'h4',
  variant: Type.heading4,
  weight: Type.bold
}).withConfig({
  displayName: "ReleasePageCallout__ContentHeader",
  componentId: "sc-17jd295-1"
})(["padding:0 0 0.5em;"]);
var IconWrapper = styled.div.withConfig({
  displayName: "ReleasePageCallout__IconWrapper",
  componentId: "sc-17jd295-2"
})(["z-index:10;"]);
var ReleasePageIcon = styled.img.withConfig({
  displayName: "ReleasePageCallout__ReleasePageIcon",
  componentId: "sc-17jd295-3"
})(["height:160px;position:absolute;bottom:-30px;"]);
var CalloutSubtitle = styled(Type).attrs({
  forwardedAs: 'p',
  variant: Type.body3,
  weight: Type.bold
}).withConfig({
  displayName: "ReleasePageCallout__CalloutSubtitle",
  componentId: "sc-17jd295-4"
})([""]);
var CallOutWrapper = styled.div.withConfig({
  displayName: "ReleasePageCallout__CallOutWrapper",
  componentId: "sc-17jd295-5"
})(["position:absolute;top:75px;z-index:10;> div{color:", ";min-width:500px;height:177px;padding-left:35px;background:linear-gradient(90deg,", " 0%,#766e8b 165%);filter:drop-shadow(0 2.6914px 8.0742px ", ");border-radius:", ";display:flex;cursor:pointer;&::after{border-left:", " solid transparent;border-bottom:", " solid ", ";border-right:", " solid transparent;left:calc(25% - ", ");top:-", ";}}"], white, kleinBlue61, opacityBlack30, spacer4, spacer20, spacer20, kleinBlue61, spacer20, spacer40, spacer20);
var ContentWrapper = styled.div.withConfig({
  displayName: "ReleasePageCallout__ContentWrapper",
  componentId: "sc-17jd295-6"
})(["flex-grow:2;padding-top:", ";cursor:pointer;overflow-x:hidden;max-width:100%;> p{max-width:200px;}"], spacer12);
export var isReleasesPagePath = function isReleasesPagePath() {
  return window.location.pathname.endsWith('/releases');
};
export function ReleasePageCallout(_ref) {
  var artistId = _ref.artistId;
  var t = useT();
  var history = useHistory();
  var impression = useReleaseStatsPageModalImpressionLogger();

  var _useState = useState(false),
      showReleasePageCallout = _useState[0],
      setShowReleasePageCallout = _useState[1];

  useEffect(function () {
    loadAnnouncementsPayloadCreator([RELEASE_PAGE_CALLOUT]).then(function (data) {
      if (!data.includes(RELEASE_PAGE_CALLOUT)) {
        setShowReleasePageCallout(true);
      }
    }).catch(function () {
      setShowReleasePageCallout(false);
    });
  }, []);

  var closeCallout = function closeCallout() {
    updateAnnouncementsPayloadCreator([RELEASE_PAGE_CALLOUT]);
    setShowReleasePageCallout(false);
  };

  var navigateAndCloseCallout = function navigateAndCloseCallout() {
    history.push("/artist/".concat(artistId, "/music/releases"));
    closeCallout();
  }; // user should never see callout after navigating to releases page
  // we do this here to keep logic isolated to this component


  if (isReleasesPagePath() && showReleasePageCallout) {
    closeCallout();
  }

  if (showReleasePageCallout) {
    return /*#__PURE__*/_jsx(CallOutWrapper, {
      ref: impression.ref,
      children: /*#__PURE__*/_jsxs(Popover, {
        arrow: Popover.topLeft,
        popoverTitle: "",
        children: [/*#__PURE__*/_jsxs(ContentWrapper, {
          "aria-label": "Go to Release Page",
          "data-testid": "release-page-popover",
          onClick: navigateAndCloseCallout,
          children: [/*#__PURE__*/_jsx(CalloutSubtitle, {
            children: t('rsp-callout-subtitle', 'NEW!', '')
          }), /*#__PURE__*/_jsx(ContentHeader, {
            children: t('rsp-callout-content-header', 'Release page', '')
          }), /*#__PURE__*/_jsx("p", {
            children: t('rsp-callout-content-message', 'Measure the reach of every release. Tap any album, EP, or single to dive in.', '')
          })]
        }), /*#__PURE__*/_jsx(ImgWrapper, {
          onClick: navigateAndCloseCallout,
          children: /*#__PURE__*/_jsx(ReleasePageIcon, {
            src: VioletReleasePage,
            alt: "demo release page"
          })
        }), /*#__PURE__*/_jsx(IconWrapper, {
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
}