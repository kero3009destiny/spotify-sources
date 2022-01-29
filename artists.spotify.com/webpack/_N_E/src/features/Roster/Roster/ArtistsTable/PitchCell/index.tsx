import _slicedToArray from "/var/jenkins_home/workspace/tingle.95d1c772-977c-47f0-ae13-caaa6a239f46/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import { TableCell, ButtonPrimary, IconCheck, color, createBasicColorSet, kleinBlue61 } from '@spotify-internal/encore-web';
import { Link } from 'react-router-dom';
import { Spinner } from '@mrkt/features/spinner';
import { usePitchActionArtistId } from '../../data/usePitchActionArtistId';
import { node, useAnimation } from '../useAnimation';
import { useT } from '@mrkt/features/i18n';
import { useRosterPitchASongButtonLogger, useRosterSeeAPitchButtonLogger } from '../../logging/useRosterUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var invalidState = node({
  type: 'text',
  text: 'Unknown state'
});
var noUpcoming = node({
  type: 'text',
  text: 'No eligible music'
});
var noPermission = node({
  type: 'text',
  text: "You don't have permission"
}); // from "Pitch a song" to "See pitch"

var seePitch = node({
  type: 'button',
  backgroundColor: color.gray95,
  color: color.gray30,
  text: 'See pitch',
  icon: null
});
var seePitchAnimated = node({
  type: 'button',
  backgroundColor: color.gray95,
  color: color.gray30,
  text: 'See pitch',
  icon: /*#__PURE__*/_jsx(IconCheck, {
    "data-testid": "check",
    style: {
      marginLeft: '4px',
      width: '12px',
      height: '12px'
    },
    color: color.gray30
  })
}, seePitch, 1400);
var pitchToSeePitch = node({
  type: 'button',
  backgroundColor: '#EFF1FF',
  color: kleinBlue61,
  text: 'Pitch a song',
  icon: /*#__PURE__*/_jsx(Spinner, {
    "data-testid": "spinner",
    style: {
      marginLeft: '4px',
      width: '14px',
      height: '14px'
    }
  })
}, seePitchAnimated, 1400); // from "See pitch" to "Pitch a song"

var pitch = node({
  type: 'button',
  backgroundColor: '#EFF1FF',
  color: kleinBlue61,
  text: 'Pitch a song',
  icon: null
});
var pitchAnimated = node({
  type: 'button',
  backgroundColor: '#EFF1FF',
  color: kleinBlue61,
  text: 'Pitch a song',
  icon: /*#__PURE__*/_jsx(IconCheck, {
    "data-testid": "check",
    style: {
      marginLeft: '4px',
      width: '12px',
      height: '12px'
    }
  })
}, pitch, 1400);
var seePitchtoPitch = node({
  type: 'button',
  backgroundColor: color.gray95,
  color: color.gray30,
  text: 'See pitch',
  icon: /*#__PURE__*/_jsx(Spinner, {
    "data-testid": "spinner",
    style: {
      marginLeft: '4px',
      width: '14px',
      height: '14px'
    },
    color: color.gray30
  })
}, pitchAnimated, 1400);
var actionToStage = new Map([['UNKNOWN', invalidState], ['CREATE_PITCH', pitch], ['VIEW_FULL_PITCH', seePitch], ['VIEW_LIMITED_PITCH', seePitch], ['NO_ELIGIBLE_MUSIC', noUpcoming], ['NO_PERMISSION', noPermission]]);

function useFetchCellString(pitchAction) {
  var t = useT();

  switch (pitchAction) {
    case 'VIEW_FULL_PITCH':
      return t('ROSTER_VIEW_FULL_PITCH', 'See pitch', 'View an existing pitch');

    case 'VIEW_LIMITED_PITCH':
      return t('ROSTER_VIEW_LIMITED_PITCH', 'See pitch', 'View an existing pitch');

    case 'CREATE_PITCH':
      return t('ROSTER_CREATE_PITCH', 'Pitch a song', 'Button to Pitch a song to a playlist');

    case 'NO_PERMISSION':
      return t('ROSTER_NO_PITCH_PERMISSION', "You don't have permission", "You don't have permission to Pitch a song");

    case 'NO_ELIGIBLE_MUSIC':
      return t('ROSTER_NO_ELIGIBLE_MUSIC', 'No eligible music', 'No eligible music to be pitched');

    case 'UNKNOWN':
    default:
      return t('ROSTER_UNKNOWN', 'Unknown state', 'unknown');
  }
}

function useLogPitchButtonClick(pitchAction) {
  var logPitchASong = useRosterPitchASongButtonLogger();
  var logSeeAPitch = useRosterSeeAPitchButtonLogger();

  switch (pitchAction) {
    case 'VIEW_FULL_PITCH':
      return logSeeAPitch;

    case 'VIEW_LIMITED_PITCH':
      return logSeeAPitch;

    case 'CREATE_PITCH':
      return logPitchASong;

    default:
      return function () {};
  }
}

function usePitchState(pitchAction, animate) {
  var lastActionRef = React.useRef(pitchAction); // set up initial animation stage to use.
  // this only gets triggered on mount and does not
  // get updated as data updates due to revalidation.

  var _useAnimation = useAnimation(actionToStage.get(pitchAction) || invalidState),
      _useAnimation2 = _slicedToArray(_useAnimation, 2),
      animState = _useAnimation2[0],
      setAnimState = _useAnimation2[1];

  React.useEffect(function () {
    // going from pitch to See pitch
    if (lastActionRef.current === 'CREATE_PITCH' && (pitchAction === 'VIEW_FULL_PITCH' || pitchAction === 'VIEW_LIMITED_PITCH')) {
      if (animate) {
        setAnimState(pitchToSeePitch);
      } else {
        setAnimState(seePitch);
      }
    } // going from See pitch to pitch
    else if ((lastActionRef.current === 'VIEW_FULL_PITCH' || lastActionRef.current === 'VIEW_LIMITED_PITCH') && pitchAction === 'CREATE_PITCH') {
      if (animate) {
        setAnimState(seePitchtoPitch);
      } else {
        setAnimState(pitch);
      }
    } // otherwise just set the pitch state
    else {
      setAnimState(actionToStage.get(pitchAction) || invalidState);
    }

    return function () {
      // when this component changes, capture the pitchAction for next
      // render.
      lastActionRef.current = pitchAction;
    };
  }, [pitchAction, animate, setAnimState]);
  return animState.state;
}

function usePitchUrl(offset, url) {
  if (!url) return '';
  return "".concat(url, "?offset=").concat(offset);
}

export function PitchCell(props) {
  var _props$artist$actions;

  var _usePitchActionArtist = usePitchActionArtistId(),
      setArtistId = _usePitchActionArtist.setArtistId;

  var nmsAction = (_props$artist$actions = props.artist.actions) === null || _props$artist$actions === void 0 ? void 0 : _props$artist$actions.find(function (a) {
    return a.type === 'NMS';
  });
  var pitchAction = nmsAction ? nmsAction.action : 'UNKNOWN';
  var cellState = usePitchState(pitchAction, props.animate || false);
  var url = usePitchUrl(props.offset, nmsAction === null || nmsAction === void 0 ? void 0 : nmsAction.url);
  var cellText = useFetchCellString(pitchAction);
  var logPitchButtonClick = useLogPitchButtonClick(pitchAction);
  return /*#__PURE__*/_jsxs(TableCell, {
    children: [cellState.type === 'button' && /*#__PURE__*/_jsx(Link, {
      to: url,
      className: "no-underline",
      style: {
        display: 'inline-block'
      },
      onClick: function onClick() {
        setArtistId(props.artist.id);
        logPitchButtonClick(url, props.artist.id);
      },
      "aria-label": "".concat(cellState.text, " for artist ").concat(props.artist.name),
      children: /*#__PURE__*/_jsxs(ButtonPrimary, {
        tabIndex: -1,
        style: {
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          transition: 'all 300ms ease-in-out'
        },
        buttonSize: "sm",
        UNSAFE_colorSet: createBasicColorSet(cellState.backgroundColor, cellState.color),
        children: [cellText, cellState.icon]
      })
    }), cellState.type === 'text' && cellText]
  });
}