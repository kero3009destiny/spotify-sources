import React from 'react';
import { Type, gray50 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { Heading3 } from '../StyleElements';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Headings(props) {
  var t = useT();
  var headingCopy = props.isEditing ? t('artistprofile_fundraising_forminput_headings_1', 'Edit your Artist Fundraising Pick', '') : t('artistprofile_fundraising_forminput_headings_2', 'Set your Artist Fundraising Pick', '');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Heading3, {
      children: headingCopy
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      color: gray50,
      style: {
        paddingBottom: '18px',
        fontSize: '16px',
        lineHeight: '24px'
      },
      children: t('artistprofile_fundraising_forminput_headings_3', 'You can add a fundraising link for yourself or a cause you care about, or choose a Music Relief organization.', 'Music Relief organizations were picked by Spotify for the Artist Fundraising Pick initiative. Spotify partnered with 20 such organizations across the globe.')
    })]
  });
}