import _defineProperty from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useContext, useState, useMemo } from 'react';
import { Type } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { useCurrentArtist } from '../../artists';
import { useCurrentSong } from '../../Song/hooks/useCurrentSong';
import { useSongRightsData } from '../../Song/hooks/useSongRightsData';
import { useCountryPickerNormalizer } from './normalizer';
import { CountryTimelineContext } from '../CountryTimelineContext';
import { useGetString } from '../../../shared/messages/strings';
import { Combobox } from '@mrkt/features/combobox';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledCombobox = styled(Combobox).withConfig({
  displayName: "CountryInput__StyledCombobox",
  componentId: "sc-9ryse8-0"
})(["width:40%;"]);
export function CountryInput() {
  var _useCurrentArtist = useCurrentArtist(),
      artistId = _useCurrentArtist.id;

  var _useCurrentSong = useCurrentSong(),
      songId = _useCurrentSong.id;

  var strings = useGetString();
  var t = useT();
  var songRightsResponse = useSongRightsData(artistId, songId);
  var countryRights = 'countryRights' in songRightsResponse ? songRightsResponse.countryRights : [];
  var normalized = useCountryPickerNormalizer(countryRights);

  var _useContext = useContext(CountryTimelineContext),
      countries = _useContext.countries,
      addNewCountry = _useContext.addNewCountry;

  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var filtered = useMemo(function () {
    var regex = new RegExp("^".concat(value), 'i');
    return normalized.filter(function (n) {
      return !!n.value.match(regex) && !(countries !== null && countries !== void 0 && countries.includes(n.code));
    });
  }, [normalized, countries, value]);
  var countryOptions = useMemo(function () {
    return filtered.map(function (country) {
      return _objectSpread(_objectSpread({}, country), {}, {
        id: country.code
      });
    });
  }, [filtered]);

  if ('status' in songRightsResponse && songRightsResponse.status > 200 || 'countryRights' in songRightsResponse && !songRightsResponse.countryRights.length) {
    return /*#__PURE__*/_jsx(Type, {
      as: "p",
      children: strings.insightsError
    });
  }

  var _onChange = function onChange(val) {
    var regex = new RegExp("^".concat(val), 'i');
    setValue(val);
  };

  var onSelect = function onSelect(entity) {
    if (entity) {
      setValue('');

      if (addNewCountry) {
        addNewCountry(entity.id);
      }
    }
  };

  return /*#__PURE__*/_jsx(StyledCombobox, {
    placeholder: t('COUNTRY_TIMELINE_fa1e3a', 'Choose a country', ''),
    value: value,
    onSelect: onSelect,
    onChange: function onChange(str) {
      return _onChange(str);
    },
    options: countryOptions
  });
}