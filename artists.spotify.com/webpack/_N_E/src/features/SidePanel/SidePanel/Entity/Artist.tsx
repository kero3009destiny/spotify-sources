import React from 'react';
import { Route } from 'react-router-dom';
import { Badge } from '@mrkt/features/badge';
import EntityItem from './Item';
import EntityLink from './Link';
import EntityTitle from './Title';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function NavigationArtistEntity(_ref) {
  var artist = _ref.artist,
      _onClick = _ref.onClick;
  var t = useT();
  var to = "/artist/".concat(artist.id, "/home");
  return /*#__PURE__*/_jsx(Route, {
    path: to,
    children: function children(_ref2) {
      var match = _ref2.match;
      var title = match ? t('SIDEPANEL_CURRENT_ARTIST_LABEL', 'Current Artist: {name}', 'Label in the sidepanel for the artist that the user is currently acting on behalf of', artist) : artist.name;
      return /*#__PURE__*/_jsx(EntityItem, {
        active: Boolean(match),
        children: /*#__PURE__*/_jsxs(EntityLink, {
          onClick: function onClick(evt) {
            _onClick === null || _onClick === void 0 ? void 0 : _onClick(evt, to);
          },
          to: to,
          title: title,
          children: [/*#__PURE__*/_jsx(Badge, {
            variant: "artist",
            imgSrc: artist.imageUrl,
            initial: artist.name
          }), /*#__PURE__*/_jsx(EntityTitle, {
            "data-testid": "artist_name",
            "data-slo-id": "artist_name",
            children: artist.name
          })]
        })
      });
    }
  });
}
/* eslint-disable-next-line import/no-default-export */


export default NavigationArtistEntity;