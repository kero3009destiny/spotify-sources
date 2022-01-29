import React from 'react';
import { useLocale, useT } from '@mrkt/features/i18n';
import { ArtistEntityPicker } from '@mrkt/features/combobox/EntityPicker';
import styled from 'styled-components';
import { useTeamStore } from '../lib/store/useTeamStore';
import { useHistory, useLocation } from 'react-router';
import { jsx as _jsx } from "react/jsx-runtime";
var ResponsiveArtistSearch = styled(ArtistEntityPicker).withConfig({
  displayName: "ArtistSearchFormCombobox__ResponsiveArtistSearch",
  componentId: "aaqhl6-0"
})(["width:", ";"], function (props) {
  return props.layoutType === 'compact' ? '100%' : '614px';
});
export var ArtistSearchFormCombobox = function ArtistSearchFormCombobox(_ref) {
  var accessSelectAction = _ref.accessSelectAction,
      addTeamsSelectAction = _ref.addTeamsSelectAction;

  var _useTeamStore = useTeamStore(),
      layoutType = _useTeamStore.layoutType,
      hideBanner = _useTeamStore.hideBanner;

  var t = useT();
  var history = useHistory();
  var location = useLocation();
  var locale = useLocale();
  var errorMessages = {
    alreadyOnTeam: t('ERROR_FIND_TEAM_ALREADY_ON_TEAM', "You're already a member of this team.", ''),
    pendingRequest: t('d2c2c7', 'You have a pending request to join this team.', ''),
    inviteOnly: t('ab6f7c', 'This team is not accepting requests right now.', ''),
    genericError: t('CAN_CREATE_ACCESS_REQUEST_GENERIC_ERROR', 'Something went wrong', 'Something went wrong')
  };
  var ERROR_BANNER_ID = 'select-artist-error-banner';

  var handleSelect = function handleSelect(dataObj) {
    if (!dataObj || dataObj.name === 'empty state') {
      return;
    }

    hideBanner(ERROR_BANNER_ID);
    accessSelectAction && accessSelectAction(dataObj.id, locale, errorMessages);
    addTeamsSelectAction && addTeamsSelectAction(dataObj.id, history, location.search);
  };

  return /*#__PURE__*/_jsx("div", {
    "data-testid": "artist-search-form-combobox",
    children: /*#__PURE__*/_jsx(ResponsiveArtistSearch, {
      label: t('ARTIST_COMBOBOX_SEARCH_LABEL', 'Search artists or paste a Spotify artist URI', 'enter an artist name, uri, or link to search'),
      layoutType: layoutType,
      onSelect: handleSelect
    })
  });
};