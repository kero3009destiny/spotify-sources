import _slicedToArray from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import { useDispatch } from 'react-redux';
import { CanvasManager } from '@mrkt/features/canvas';
import { Logger, createErrorLoggerHook } from '@mrkt/features/Platform';
import { canvasExperience } from '@mrkt/features/experience-definitions';
import { setAlert } from '../../../shared/store';
import { useCurrentArtist } from '../../../features/artists';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { useCurrentSong } from '../hooks/useCurrentSong';
import { logGabitoEvent } from '@mrkt/features/gabito';
import { jsx as _jsx } from "react/jsx-runtime";
export var CANVAS_SONG_ENTITY = 'canvas-song-entity';
export var Canvas = function Canvas() {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      error = _React$useState2[0],
      setError = _React$useState2[1];

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

  var useLogError = createErrorLoggerHook({
    view: 'song-entity',
    experience: canvasExperience
  });
  var artist = useCurrentArtist();
  var dispatch = useDispatch();
  var song = useCurrentSong();
  var viewport = useViewport();
  var tooSmall = viewport === Viewport.XS;
  useLogError(error);
  if (!artist || !song || tooSmall) return null;

  function handleRemoveSuccess(message) {
    Logger.logSuccess(CANVAS_SONG_ENTITY);
    message && showSuccessAlert(message);
  }

  function handleUpdateSuccess(_uri, message) {
    Logger.logSuccess(CANVAS_SONG_ENTITY);
    showSuccessAlert(message);
  }

  function handleUpdateError(_uri, message, err) {
    setError(err);
    showErrorAlert(message);
  }

  function handleRemoveError(message, err) {
    setError(err);
    showErrorAlert(message);
  }

  return /*#__PURE__*/_jsx(CanvasManager, {
    artistId: artist.id,
    enableRecordingGroups: true,
    enableTeamSwitcher: true,
    entityUri: "spotify:track:".concat(song.id),
    logGabitoEvent: logGabitoEvent,
    onRemoveError: handleRemoveError,
    onRemoveSuccess: handleRemoveSuccess,
    onUpdateError: handleUpdateError,
    onUpdateSuccess: handleUpdateSuccess
  });
};