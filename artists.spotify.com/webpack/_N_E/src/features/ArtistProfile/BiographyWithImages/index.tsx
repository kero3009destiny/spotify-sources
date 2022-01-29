import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import { Backdrop, ButtonPrimary, ButtonTertiary, IconPlus, Type } from '@spotify-internal/encore-web';
import { DialogConfirmation } from '@mrkt/features/Dialog'; // @ts-ignore

import { ImagePreviewWithCarousel } from '@mrkt/features/image-preview-with-carousel';
import { DefaultImageUploadModal } from '../ImageUploadModal/DefaultImageUploadModal';
import { DefaultBiography } from './DefaultBiography';
import { BioHeader, BioHeaderTitle, BioEditButton, Bio, BioWithImagesEmptyImages } from './index.styles';
import { useProfileSwitcheroo } from '../utils/useProfileSwitcheroo';
import { Screen } from '../../../shared/lib/useViewport';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var BiographyWithImages = function BiographyWithImages(props) {
  var _useState = useState(false),
      editingImages = _useState[0],
      setEditingImages = _useState[1];

  var _useState2 = useState(false),
      showRemoveRoviGalleryAnnouncement = _useState2[0],
      setShowRemoveRoviGalleryAnnouncement = _useState2[1];

  var t = useT();

  var _useProfileSwitcheroo = useProfileSwitcheroo(function () {
    return setEditingImages(true);
  }),
      showProfileSwitcheroo = _useProfileSwitcheroo.showProfileSwitcheroo,
      renderedProfileSwitcheroo = _useProfileSwitcheroo.renderedProfileSwitcheroo,
      organizationUri = _useProfileSwitcheroo.organizationUri;

  var onEditImages = function onEditImages() {
    var gallerySource = props.gallerySource;
    var isRoviGallery = gallerySource === 'ROVI';

    if (isRoviGallery) {
      setShowRemoveRoviGalleryAnnouncement(true);
    } else {
      showProfileSwitcheroo();
    }
  };

  var onCloseImageUploadModal = function onCloseImageUploadModal() {
    setEditingImages(false);
  };

  var onSaveGallery = function onSaveGallery(images) {
    props.updateGalleryImages(images);
    props.setAlert({
      title: t('artistprofile_biographywithimages_10', 'Your image was saved. It may take up to 72 hours to update on Spotify.', 'An alert when saving the gallery was a success.')
    });
  };

  var onGalleryError = function onGalleryError() {
    props.setAlert({
      title: t('artistprofile_biographywithimages_11', 'Something went wrong. We can’t update this page for you right now.', 'An alert when there was an error saving the gallery.'),
      error: true
    });
  };

  var onSaveBio = function onSaveBio(bio) {
    props.saveBio(bio);
    props.setAlert({
      title: t('artistprofile_biographywithimages_9', 'We saved your bio. Fans can see it on your profile now.', 'An alert when saving bio was a success.')
    });
  };

  var onBioError = function onBioError() {
    props.setAlert({
      title: t('artistprofile_biographywithimages_8', 'Something went wrong, please try again later.', 'An alert when there was an error saving bio.'),
      error: true
    });
  };

  var onRemoveRoviGalleryClose = function onRemoveRoviGalleryClose() {
    setShowRemoveRoviGalleryAnnouncement(false);
  };

  var onRemoveRoviGalleryConfirm = function onRemoveRoviGalleryConfirm() {
    setShowRemoveRoviGalleryAnnouncement(false);
    showProfileSwitcheroo();
  };

  var renderRemoveRoviGalleryAnnouncement = function renderRemoveRoviGalleryAnnouncement() {
    var viewport = props.viewport;
    var xs = viewport <= Screen.XS;
    var ButtonSwitch = xs ? ButtonTertiary : ButtonPrimary;
    return /*#__PURE__*/_jsx(Backdrop, {
      center: true,
      onClose: onRemoveRoviGalleryClose,
      children: /*#__PURE__*/_jsx(DialogConfirmation, {
        dialogId: "profile-takeover-image-gallery-dialog",
        dialogTitle: t('artistprofile_biographywithimages_1', 'NEW: Own your image gallery.', ''),
        body: t('artistprofile_biographywithimages_2', 'Take over your image gallery and we’ll remove all the images in there now—which come from our partner Rovi.', "Rovi is the name of a third party software, it is a proper noun. Don't translate."),
        footer: /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(ButtonTertiary, {
            buttonSize: ButtonTertiary.sm,
            condensed: true,
            onClick: onRemoveRoviGalleryClose,
            children: t('artistprofile_biographywithimages_3', 'Not now', '')
          }), /*#__PURE__*/_jsx(ButtonSwitch, {
            buttonSize: ButtonSwitch.sm,
            condensed: xs,
            color: "green",
            onClick: onRemoveRoviGalleryConfirm,
            children: t('artistprofile_biographywithimages_4', 'Take it over', '')
          })]
        })
      })
    });
  };

  var artistId = props.artistId,
      authorizedUser = props.authorizedUser,
      autoBiographyOrigin = props.autoBiographyOrigin,
      gallery = props.gallery,
      gallerySource = props.gallerySource,
      text = props.text,
      viewport = props.viewport;
  var isRoviGallery = gallerySource === 'ROVI';
  var hasImageEditAccess = !editingImages && authorizedUser;
  var imageUrls = gallery.map(function (i) {
    return i.src;
  });
  return /*#__PURE__*/_jsxs(Bio, {
    dimmed: !authorizedUser && !text,
    children: [renderedProfileSwitcheroo, gallery.length ? /*#__PURE__*/_jsx(ImagePreviewWithCarousel, {
      galleryHeaderTitle: /*#__PURE__*/_jsxs(BioHeader, {
        children: [/*#__PURE__*/_jsx(BioHeaderTitle, {
          children: t('artistprofile_biographywithimages_5', 'Image gallery', 'Image gallery is the images an artist uploads to display on their profile.')
        }), authorizedUser && gallery.length ? /*#__PURE__*/_jsx(BioEditButton, {
          onClick: onEditImages,
          testIdPrefix: "images-",
          "aria-label": t('artistprofile_biographywithimages_6', 'edit image gallery', 'Image gallery is the images an artist uploads to display on their profile.')
        }) : null]
      }),
      imageUrls: imageUrls
    }) : /*#__PURE__*/_jsxs(BioWithImagesEmptyImages, _objectSpread(_objectSpread({
      disabled: !hasImageEditAccess,
      role: "button",
      tabIndex: 0,
      "data-testid": "empty-gallery-edit-button"
    }, hasImageEditAccess && {
      onClick: onEditImages
    }), {}, {
      children: [/*#__PURE__*/_jsx(IconPlus, {
        "aria-hidden": true,
        focusable: false,
        color: "white"
      }), /*#__PURE__*/_jsx(Type, {
        as: "p",
        color: "gray60",
        children: t('artistprofile_biographywithimages_7', 'Add an image gallery', '')
      })]
    })), /*#__PURE__*/_jsx(DefaultBiography, {
      roviBio: props.text,
      autobiography: autoBiographyOrigin ? autoBiographyOrigin.body : null,
      authorizedUser: authorizedUser,
      artistId: artistId,
      viewport: viewport,
      onSave: onSaveBio,
      onError: onBioError
    }), showRemoveRoviGalleryAnnouncement && renderRemoveRoviGalleryAnnouncement(), editingImages && /*#__PURE__*/_jsx(DefaultImageUploadModal, {
      images: isRoviGallery ? [] : gallery,
      viewport: viewport,
      artistId: artistId,
      onClose: onCloseImageUploadModal,
      onSave: onSaveGallery,
      onError: onGalleryError,
      organizationUri: organizationUri
    })]
  });
};