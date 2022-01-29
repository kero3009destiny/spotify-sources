import _slicedToArray from "/var/jenkins_home/workspace/tingle.95d1c772-977c-47f0-ae13-caaa6a239f46/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import { Type } from '@spotify-internal/encore-web';
import { useRelativeTimeFormatter, useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export function TimeAgo(props) {
  var updating = props.updating,
      time = props.time,
      isMobile = props.isMobile;

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tick = _React$useState2[1];

  var numMinutes = Math.ceil((time - Date.now()) / 60000);
  var translatedTimeAgo = useRelativeTimeFormatter({
    numeric: 'auto'
  }).format(numMinutes, 'minutes');
  var t = useT();
  React.useEffect(function () {
    var id;

    if (!isMobile) {
      id = window.setInterval(function () {
        return tick(function (n) {
          return n + 1;
        });
      }, 60000);
    }

    return function () {
      window.clearInterval(id);
    };
  }, [isMobile]); // don't show on mobile cause prolly not a big deal.

  if (isMobile) return null;
  var message = updating ? t('ROSTER_UPDATING', 'Updating...', 'Loading message') : t('ROSTER_UPDATED', 'Updated: {translatedTimeAgo}', 'Finished loading message', {
    translatedTimeAgo: translatedTimeAgo
  });
  return /*#__PURE__*/_jsx(Type, {
    children: message
  });
}