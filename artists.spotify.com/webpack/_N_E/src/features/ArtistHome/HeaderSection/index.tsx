import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonIcon, screenXsMax, screenSmMin, spacer4, spacer24, spacer32, spacer40, Type, IconPauseAlt, IconPlayAlt } from '@spotify-internal/encore-web';
import { BarAnimation } from '../BarAnimation';
import { ArtistLiveListeners } from '../../ArtistLiveListeners';
import { useCurrentArtist } from '../../../features/artists';
import { useT, useNumberFormatter } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var HeaderTitle = styled(Type.h1).attrs({
  variant: Type.heading1,
  condensed: true
}).withConfig({
  displayName: "HeaderSection__HeaderTitle",
  componentId: "kw0iv6-0"
})(["grid-area:header;margin-top:", ";"], spacer32);
var HeaderText = styled(Type.h1).attrs({
  variant: Type.heading4,
  weight: Type.bold,
  condensed: true
}).withConfig({
  displayName: "HeaderSection__HeaderText",
  componentId: "kw0iv6-1"
})(["display:inline-block;"]);
var NumberListeners = styled(HeaderText).withConfig({
  displayName: "HeaderSection__NumberListeners",
  componentId: "kw0iv6-2"
})(["margin-left:6px;font-feature-settings:'tnum';"]);
var ListeningNow = styled(HeaderText).withConfig({
  displayName: "HeaderSection__ListeningNow",
  componentId: "kw0iv6-3"
})(["margin-left:", ";"], spacer4);
var LiveListeners = styled.div.withConfig({
  displayName: "HeaderSection__LiveListeners",
  componentId: "kw0iv6-4"
})(["display:flex;grid-area:listeners;@media (max-width:", "){margin-bottom:", ";}@media (min-width:", "){margin-bottom:", ";}"], screenXsMax, spacer40, screenSmMin, spacer24);
var StyledButtonIcon = styled(ButtonIcon).withConfig({
  displayName: "HeaderSection__StyledButtonIcon",
  componentId: "kw0iv6-5"
})(["margin-left:", ";"], spacer24);
var HeaderSection = /*#__PURE__*/React.memo(function () {
  var artist = useCurrentArtist();

  var _useState = useState(true),
      animationPlaying = _useState[0],
      setAnimationPlaying = _useState[1];

  var t = useT();
  var numberFormat = useNumberFormatter();

  var toggleCheckActiveListeners = function toggleCheckActiveListeners(newCheckActiveListeners, createSocket, closeSocket) {
    setAnimationPlaying(newCheckActiveListeners);

    if (newCheckActiveListeners) {
      createSocket();
    } else {
      closeSocket();
    }
  };

  var buttonAriaLabel = animationPlaying ? t('S4A_LOGGED_IN_HOME_44935a', 'pause listener count', '') : t('S4A_LOGGED_IN_HOME_25134b', 'activate listener count', '');
  return /*#__PURE__*/_jsx(ArtistLiveListeners, {
    // @ts-ignore
    render: function render(listeners, createSocket, closeSocket) {
      return /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(HeaderTitle, {
          "data-slo-id": "s4a-home-header-title",
          children: t('S4A_LOGGED_IN_HOME_59a158', 'Home', '')
        }), /*#__PURE__*/_jsxs(LiveListeners, {
          children: [/*#__PURE__*/_jsx(BarAnimation, {
            isPlaying: animationPlaying
          }), /*#__PURE__*/_jsx(NumberListeners, {
            "data-testid": "live-listeners",
            "data-slo-id": "live-listeners",
            children: numberFormat.format(listeners >= 0 ? listeners : 0)
          }), /*#__PURE__*/_jsx(ListeningNow, {
            children: t('S4A_LOGGED_IN_HOME_e21fe0', "{listeners, plural,\n                    one {person listening now}\n                    other {people listening now}\n                }", 'Tells user how many people are listening now', {
              listeners: listeners
            })
          }), /*#__PURE__*/_jsx(StyledButtonIcon, {
            "aria-label": buttonAriaLabel,
            "data-testid": "listeners-play-pause-button",
            onClick: function onClick() {
              return toggleCheckActiveListeners(!animationPlaying, createSocket, closeSocket);
            },
            children: animationPlaying ? /*#__PURE__*/_jsx(IconPauseAlt, {
              iconSize: 24
            }) : /*#__PURE__*/_jsx(IconPlayAlt, {
              iconSize: 24
            })
          })]
        })]
      });
    }
  }, artist.id);
});
/* eslint-disable-next-line import/no-default-export */

export default HeaderSection;