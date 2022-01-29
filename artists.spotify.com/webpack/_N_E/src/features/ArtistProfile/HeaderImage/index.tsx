/* eslint_disable jsx_a11y/no_static_element_interactions */
import React from 'react';
import { IconVerified, Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useHistory } from 'react-router-dom';
import { formatNumberGrouped } from './lib/formatHelpers';
import { HeaderImageArtistInfo, HeaderImageLabelWrapper, HeaderImageLabel, HeaderImageVerifiedCheckmark, HeaderImageName, HeaderImageMonthlyListeners, Wrapper, HeaderImageEditOverlay, HeaderImageEditButton, HeaderImageEditButtonIcon, HeaderImageInfoContainer } from './index.styles';
import { Screen } from '../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var ArtistHeader = function ArtistHeader(_ref) {
  var name = _ref.name,
      isVerified = _ref.isVerified,
      monthlyListeners = _ref.monthlyListeners;
  var t = useT();
  var headerVariant = 'display1';

  if (name.length > 30) {
    headerVariant = 'heading2';
  } else if (name.length > 20) {
    headerVariant = 'heading1';
  } else if (name.length > 10) {
    headerVariant = 'display2';
  }

  return /*#__PURE__*/_jsxs(HeaderImageArtistInfo, {
    children: [/*#__PURE__*/_jsxs(HeaderImageLabelWrapper, {
      children: [/*#__PURE__*/_jsx(HeaderImageLabel, {
        variant: Type.body1,
        children: t('artistprofile_headerimage_1', 'Artist', '')
      }), isVerified && /*#__PURE__*/_jsx(HeaderImageVerifiedCheckmark, {
        children: /*#__PURE__*/_jsx(IconVerified, {
          "aria-hidden": true,
          focusable: false,
          iconSize: 16
        })
      }), /*#__PURE__*/_jsx(HeaderImageName, {
        variant: headerVariant,
        children: name
      })]
    }), monthlyListeners != null && !isNaN(monthlyListeners) && /*#__PURE__*/_jsxs(HeaderImageMonthlyListeners, {
      children: [/*#__PURE__*/_jsx("div", {
        children: t('artistprofile_headerimage_2', 'Monthly Listeners', 'How many people are listening to your music within a month.')
      }), /*#__PURE__*/_jsx("div", {
        children: formatNumberGrouped(monthlyListeners)
      })]
    })]
  });
};

export var HeaderImage = function HeaderImage(_ref2) {
  var image = _ref2.image,
      monthlyListeners = _ref2.monthlyListeners,
      name = _ref2.name,
      artistId = _ref2.artistId,
      authorizedUser = _ref2.authorizedUser,
      viewport = _ref2.viewport,
      isVerified = _ref2.isVerified;
  var t = useT();
  var history = useHistory();

  var onEdit = function onEdit() {
    var editRoute = "/artist/".concat(artistId, "/profile/edit-image");
    history.push(editRoute);
  };

  var mobile = viewport <= Screen.XS;
  var canEditImage = authorizedUser && viewport !== Screen.XS;
  return /*#__PURE__*/_jsx(Wrapper, {
    "data-slo-id": "header-image:".concat(image ? 'exists' : 'empty'),
    style: {
      backgroundImage: "url(".concat(image, ")")
    },
    children: /*#__PURE__*/_jsxs(HeaderImageInfoContainer, {
      withoutButtons: !canEditImage,
      children: [!mobile ? /*#__PURE__*/_jsx(ArtistHeader, {
        name: name,
        isVerified: isVerified,
        monthlyListeners: monthlyListeners
      }) : null, canEditImage && /*#__PURE__*/_jsx(HeaderImageEditOverlay, {}), canEditImage && /*#__PURE__*/_jsx(HeaderImageEditButton, {
        children: /*#__PURE__*/_jsx(HeaderImageEditButtonIcon, {
          onClick: onEdit,
          "aria-label": t('artistprofile_headerimage_3', 'edit header image', '')
        })
      })]
    })
  });
};