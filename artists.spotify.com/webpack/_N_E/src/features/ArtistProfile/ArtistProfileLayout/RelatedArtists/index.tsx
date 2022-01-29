import React from 'react';
import { IconArtist, Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var defaultProps = {
  artists: []
};

var RelatedArtists = function RelatedArtists(_ref) {
  var artists = _ref.artists;
  var t = useT();
  return /*#__PURE__*/_jsxs("div", {
    className: styles.related_artists__tab,
    children: [/*#__PURE__*/_jsx("div", {
      className: styles.related_artists__subtitle,
      children: /*#__PURE__*/_jsx(Type.p, {
        color: "gray60",
        children: t('artistprofile_artistprofilelayout_relatedartists_1', "The Fans Also Like tab on your artist profile is determined by algorithms, using a combination of your fans' listening habits on Spotify, and music discussions and trends happening around the internet.", 'Fans Also Like should be translated as it is in the consumer product. Refer to translation memory.')
      })
    }), /*#__PURE__*/_jsx("div", {
      className: styles.related_artists,
      children: Object.keys(artists).map(function (artist) {
        var currentArtist = artists[artist];
        var hasProfileImg = currentArtist.image && currentArtist.image.uri;

        var artistElement = /*#__PURE__*/_jsxs("a", {
          href: currentArtist.uri,
          className: styles.related_artists__artist,
          children: [hasProfileImg && /*#__PURE__*/_jsx("div", {
            style: {
              backgroundImage: "url(".concat(currentArtist.image.uri, ")")
            },
            className: styles.related_artists__artist_img // @ts-ignore
            ,
            alt: currentArtist.name
          }), !hasProfileImg && /*#__PURE__*/_jsx("div", {
            className: styles.related_artists__artist_placeholder,
            children: /*#__PURE__*/_jsx(IconArtist, {
              "aria-hidden": true,
              focusable: false // @ts-ignore
              ,
              title: currentArtist.name,
              iconSize: 48
            })
          }), /*#__PURE__*/_jsx("div", {
            className: styles.related_artists__artist_name,
            children: currentArtist.name
          })]
        }, currentArtist.uri);

        return artistElement;
      })
    })]
  });
};

RelatedArtists.deefaultProps = defaultProps;
/* eslint-disable-next-line import/no-default-export */

export default RelatedArtists;