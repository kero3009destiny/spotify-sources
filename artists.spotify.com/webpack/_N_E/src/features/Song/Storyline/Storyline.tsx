import _slicedToArray from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { StorylineManager } from '@mrkt/features/storylines';
import { createErrorLoggerHook } from '@mrkt/features/Platform';
import { storylinesExperience } from '@mrkt/features/experience-definitions';
import { setAlert } from '../../../shared/store';
import { useCurrentSong } from '../hooks/useCurrentSong';
import { EDITOR, useCurrentArtist, useCurrentArtistPermissions } from '../../../features/artists';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { useEnhanceFeatures } from '../../enhanceFeatures';
import { jsx as _jsx } from "react/jsx-runtime";
var DEFAULT_ENTITY_IMAGE_SIZE = 300;
var StorylineControlsWrapper = styled.div.withConfig({
  displayName: "Storyline__StorylineControlsWrapper",
  componentId: "sc-12dno11-0"
})(["display:flex;flex-direction:row;align-items:center;"]);
var StorylineButtonWrapper = styled.div.withConfig({
  displayName: "Storyline__StorylineButtonWrapper",
  componentId: "sc-12dno11-1"
})(["margin-right:10px;"]);
export function Storyline() {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      error = _React$useState2[0],
      setError = _React$useState2[1];

  var _useEnhanceFeatures = useEnhanceFeatures(),
      hasStorylineAccess = _useEnhanceFeatures.hasStorylineAccess;

  var artist = useCurrentArtist();
  var artistPermissions = useCurrentArtistPermissions();
  var dispatch = useDispatch();
  var song = useCurrentSong();
  var useLogError = createErrorLoggerHook({
    view: 'song-entity',
    experience: storylinesExperience
  });

  var showSuccessAlert = function showSuccessAlert(title) {
    return dispatch(setAlert({
      title: title
    }));
  };

  var showErrorAlert = function showErrorAlert(title) {
    return dispatch(setAlert({
      title: title,
      error: true
    }));
  };

  var handleError = function handleError(title, err) {
    setError(err);
    showErrorAlert(title);
  };

  useLogError(error);
  var entityImage = song && (song.images.find(function (i) {
    return i && i.height === DEFAULT_ENTITY_IMAGE_SIZE;
  }) || song.images[0]);
  var entityImageUrl = entityImage && entityImage.url;
  var viewport = useViewport();
  var tooSmall = viewport === Viewport.XS || viewport === Viewport.SM;
  if (!hasStorylineAccess || !artist || !song || tooSmall) return null;
  return /*#__PURE__*/_jsx(StorylineControlsWrapper, {
    children: /*#__PURE__*/_jsx(StorylineButtonWrapper, {
      children: /*#__PURE__*/_jsx(StorylineManager, {
        artist: artist,
        entity: {
          imageUrl: entityImageUrl,
          name: song.name,
          uri: "spotify:track:".concat(song.id)
        },
        hasEditAccess: artistPermissions.includes(EDITOR),
        onRemoveError: handleError,
        onRemoveSuccess: showSuccessAlert,
        onUploadError: handleError
      })
    })
  });
}