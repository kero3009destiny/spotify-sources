import React from 'react';
import { Header, FlyOutToggle } from '../../../shared/components/Header';
import { useT } from '@mrkt/features/i18n';
import { IconBadge } from '../../Team/components/IconBadge/IconBadge';
/* eslint-disable-next-line import/no-default-export */

import { jsx as _jsx } from "react/jsx-runtime";
export default function RosterHeader() {
  var t = useT();
  return /*#__PURE__*/_jsx(Header, {
    children: /*#__PURE__*/_jsx(FlyOutToggle, {
      avatar: /*#__PURE__*/_jsx(IconBadge, {
        variant: "roster"
      }),
      name: t('ROSTER_YOUR_ROSTER', 'Your roster', 'The roster of artists you have access to')
    })
  });
}