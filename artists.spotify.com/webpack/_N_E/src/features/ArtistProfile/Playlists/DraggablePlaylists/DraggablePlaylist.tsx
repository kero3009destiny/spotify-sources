import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Playlist } from '../../Playlist';
import { jsx as _jsx } from "react/jsx-runtime";
export function DraggablePlaylist(props) {
  var index = props.index,
      uri = props.uri;
  return (
    /*#__PURE__*/
    // FIXME Can there be duplicates? If so don't use uri for id
    _jsx(Draggable, {
      draggableId: uri,
      index: index,
      children: function children(provided) {
        return /*#__PURE__*/_jsx("div", _objectSpread(_objectSpread(_objectSpread({}, provided.draggableProps), provided.dragHandleProps), {}, {
          ref: provided.innerRef,
          "data-testid": "draggable-playlist",
          children: /*#__PURE__*/_jsx(Playlist, _objectSpread({}, props))
        }));
      }
    })
  );
}