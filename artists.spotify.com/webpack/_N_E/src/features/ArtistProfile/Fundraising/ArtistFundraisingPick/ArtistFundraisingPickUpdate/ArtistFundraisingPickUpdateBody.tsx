import React from 'react';
import styled from 'styled-components';
import { IconChevronRight, Image, TextLink, Type, gray60, white } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useCurrentArtist } from '../../../../../features/artists';
import { VSpacer24 } from '../../../Elements';
import { useTitle } from './lib';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var iconSrc = 'https://misc.scdn.co/artist-fundraising-pick/arist_fundraising_pick.png';
var Row = styled.div.withConfig({
  displayName: "ArtistFundraisingPickUpdateBody__Row",
  componentId: "sc-8qczlm-0"
})(["display:flex;align-items:flex-start;"]);
var Heading = styled(Type).attrs({
  as: Type.h4,
  color: white,
  variant: Type.heading4
}).withConfig({
  displayName: "ArtistFundraisingPickUpdateBody__Heading",
  componentId: "sc-8qczlm-1"
})(["font-size:16px;padding-bottom:0;&::after{content:'';display:block;border-bottom:3px solid transparent;transition:border-color 200ms ease-in;}"]);
var RowSpaceBetween = styled(TextLink).withConfig({
  displayName: "ArtistFundraisingPickUpdateBody__RowSpaceBetween",
  componentId: "sc-8qczlm-2"
})(["display:flex;align-items:flex-start;justify-content:space-between;&:focus ", "{&::after{border-color:", ";}}&&&{text-decoration:none;&:hover{text-decoration:none;}}"], Heading, white);
var Column = styled(Row).withConfig({
  displayName: "ArtistFundraisingPickUpdateBody__Column",
  componentId: "sc-8qczlm-3"
})(["flex-direction:column;"]);
var Icon = styled(Image).attrs({
  height: 80
}).withConfig({
  displayName: "ArtistFundraisingPickUpdateBody__Icon",
  componentId: "sc-8qczlm-4"
})(["margin-right:16px;min-height:80px;min-width:80px;"]);
var Logo = styled(Image).attrs({
  height: 24
}).withConfig({
  displayName: "ArtistFundraisingPickUpdateBody__Logo",
  componentId: "sc-8qczlm-5"
})(["margin-right:8px;min-height:24px;min-width:24px;border-radius:50%;"]);
export var Title = styled(Type).attrs({
  as: Type.h3
}).withConfig({
  displayName: "ArtistFundraisingPickUpdateBody__Title",
  componentId: "sc-8qczlm-6"
})(["color:", ";margin-bottom:5px;padding-bottom:0;"], gray60);
var Subheading = styled(Type).attrs({
  as: Type.p,
  color: gray60
}).withConfig({
  displayName: "ArtistFundraisingPickUpdateBody__Subheading",
  componentId: "sc-8qczlm-7"
})(["padding-bottom:0;"]);
export var PreviewLinkIcon = styled(IconChevronRight).attrs({
  color: gray60,
  iconSize: 24
}).withConfig({
  displayName: "ArtistFundraisingPickUpdateBody__PreviewLinkIcon",
  componentId: "sc-8qczlm-8"
})(["align-self:center;[dir='rtl'] &{transform:scaleX(-1);}"]);
export function ArtistFundraisingPickUpdateBody(props) {
  var t = useT();
  var title = useTitle(props.partner);
  var heading = t('artistprofile_fundraising_artistfundraisingpickupdatebody_1', 'Make a contribution', '');
  var subheading = t('artistprofile_fundraising_artistfundraisingpickupdatebody_2', 'No money goes to Spotify', "When people donate via Artist Fundraising Pick, Spotify doesn't take a cut.");
  var currentArtist = useCurrentArtist();

  function PreviewLink(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/_jsx(RowSpaceBetween, {
      href: props.url,
      target: "preview-link",
      children: children
    });
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(PreviewLink, {
      children: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(Row, {
          children: [/*#__PURE__*/_jsx(Icon, {
            src: iconSrc,
            alt: ""
          }), /*#__PURE__*/_jsxs(Column, {
            children: [/*#__PURE__*/_jsxs(Title, {
              children: [/*#__PURE__*/_jsx(Logo, {
                src: currentArtist.imageUrl,
                alt: "avatar"
              }), title]
            }), /*#__PURE__*/_jsx(Heading, {
              children: heading
            }), /*#__PURE__*/_jsx(Subheading, {
              children: subheading
            })]
          })]
        }), /*#__PURE__*/_jsx(Column, {
          style: {
            justifySelf: 'flex-end',
            alignSelf: 'center'
          },
          children: /*#__PURE__*/_jsx(PreviewLinkIcon, {
            "aria-hidden": true,
            focusable: false
          })
        })]
      })
    }), /*#__PURE__*/_jsx(VSpacer24, {})]
  });
}