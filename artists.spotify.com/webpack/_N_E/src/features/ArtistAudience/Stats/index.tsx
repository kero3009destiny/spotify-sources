// ignore-string-externalization
import React from 'react';
import styles from '../index.module.scss';
import { SourcesOfStreams } from '../SourcesOfStreams';
import { ArtistAudienceTimeline } from '../Timeline';
import { HowOldTheyAre } from '../HowOldTheyAre';
import { OtherArtistsListenedTo } from '../OtherArtistsListenedTo';
import { TheirGender } from '../TheirGender';
import { TopCities } from '../TopCities';
import { WhereTheyListen } from '../WhereTheyListen';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Stats(_ref) {
  var country = _ref.country;
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(ArtistAudienceTimeline, {
      country: country
    }), /*#__PURE__*/_jsx(SourcesOfStreams, {
      country: country
    }), /*#__PURE__*/_jsxs("div", {
      className: styles.row,
      children: [/*#__PURE__*/_jsx("div", {
        className: styles.col,
        children: /*#__PURE__*/_jsx(TheirGender, {
          country: country
        })
      }), /*#__PURE__*/_jsx("div", {
        className: styles.col,
        children: /*#__PURE__*/_jsx(HowOldTheyAre, {
          country: country
        })
      })]
    }), /*#__PURE__*/_jsx(OtherArtistsListenedTo, {
      country: country
    }), /*#__PURE__*/_jsx(WhereTheyListen, {
      country: country
    }), /*#__PURE__*/_jsx(TopCities, {
      country: country
    })]
  });
}