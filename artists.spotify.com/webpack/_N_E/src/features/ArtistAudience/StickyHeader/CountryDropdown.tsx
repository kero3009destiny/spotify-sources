import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownItem, DropdownLink, DropdownList, DropdownTrigger } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { createMrktSongStatsInteractionBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktSongStatsInteractionBrowser';
import { useLaunchedCountries } from '@mrkt/features/country-names';
import { useGetString } from '../../../shared/messages/strings';
import { PageId } from '../../PlatformEvents';
import { useCurrentArtist } from '../../../features/artists';
import { logGabitoEvent } from '@mrkt/features/gabito';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledDropdown = styled(Dropdown).withConfig({
  displayName: "CountryDropdown__StyledDropdown",
  componentId: "sc-1eop1mp-0"
})(["min-width:280px;"]);
export function CountryDropdown(props) {
  var _useState = useState(false),
      showOverlay = _useState[0],
      setOverlayToggle = _useState[1];

  var country = props.country,
      setCountry = props.setCountry;
  var launchedCountries = useLaunchedCountries();
  var strings = useGetString();
  var fullCountryList = [strings.worldwide].concat(launchedCountries);
  var artist = useCurrentArtist();
  var t = useT();

  var onDropdownShow = function onDropdownShow() {
    setOverlayToggle(true);
    logGabitoEvent(createMrktSongStatsInteractionBrowser({
      creator_uri: "spotify:artist:".concat(artist.id),
      navigational_root_id: PageId.ArtistAudience,
      page_id: PageId.ArtistAudience,
      page_uri: window.location.href,
      interaction_category: 'CountryFilter',
      interaction_action: 'clickFilter'
    }));
  };

  return /*#__PURE__*/_jsx(DropdownTrigger, {
    "aria-label": t('AUDIENCE_COUNTRY_FILTER_c21564', 'Filter the Audience page by country.', ''),
    overlay: showOverlay && fullCountryList.length > 0 && /*#__PURE__*/_jsx(DropdownList, {
      children: fullCountryList.map(function (_ref) {
        var name = _ref.name,
            code = _ref.code;
        return /*#__PURE__*/_jsx(DropdownItem, {
          children: /*#__PURE__*/_jsx(DropdownLink, {
            onClick: function onClick(e) {
              e.preventDefault();
              setCountry({
                code: code,
                name: name
              });
              setOverlayToggle(false);
            },
            selected: country.name.toLowerCase() === name.toLowerCase(),
            children: name
          })
        }, code);
      })
    }),
    onShow: function onShow() {
      return onDropdownShow();
    },
    onHide: function onHide() {
      return setOverlayToggle(false);
    },
    children: /*#__PURE__*/_jsx(StyledDropdown, {
      children: country.name
    })
  });
}