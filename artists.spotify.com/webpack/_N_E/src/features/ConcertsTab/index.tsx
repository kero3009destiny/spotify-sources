// ignore-string-externalization
import React from 'react';
import { ConnectedConcertView } from './ConcertView';
import { useT } from '@mrkt/features/i18n';
import { useBreakpointValue } from '../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";

var ConcertsTab = function ConcertsTab() {
  var t = useT();
  var viewport = useBreakpointValue();
  return /*#__PURE__*/_jsx(ConnectedConcertView, {
    t: t,
    viewport: viewport
  });
};
/* eslint-disable-next-line import/no-default-export */


export default ConcertsTab;