import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { Header, FlyOutToggle } from '../../shared/components/Header';
import { IconBadge } from '../Team/components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
export function TeamHeader() {
  var t = useT();
  var name = t('TEAM_HEADER_NAME', 'Your teams', 'team header name value');
  return /*#__PURE__*/_jsx(Header, {
    children: /*#__PURE__*/_jsx(FlyOutToggle, {
      avatar: /*#__PURE__*/_jsx(IconBadge, {
        variant: "team"
      }),
      name: name
    })
  });
}
/* eslint-disable-next-line import/no-default-export */

export default TeamHeader;