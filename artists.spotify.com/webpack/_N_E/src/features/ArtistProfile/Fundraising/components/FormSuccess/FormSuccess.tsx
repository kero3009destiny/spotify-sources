import React from 'react';
import { Image, Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { VSpacer20, VSpacer48 } from '../../../Elements';
import { helpArticleUrl } from '../../lib/constants';
import { DialogWrapper } from '../DialogWrapper';
import { Heading3FontSize16, PFontSize16, TextLinkUnderlined } from '../StyleElements';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var afpLogoURL = 'https://misc.scdn.co/artist-fundraising-pick/arist_fundraising_pick.png'; // eslint-disable-next-line

export function FormSuccess(_p) {
  var t = useT();
  return /*#__PURE__*/_jsxs(DialogWrapper, {
    style: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '584px',
      minHeight: '100%',
      textAlign: 'center'
    },
    children: [/*#__PURE__*/_jsx(Image, {
      src: afpLogoURL,
      style: {
        height: '102px',
        width: '102px'
      },
      alt: "Artist Fundraising Pick logo"
    }), /*#__PURE__*/_jsx(VSpacer48, {}), /*#__PURE__*/_jsx(Type, {
      as: "h2",
      variant: Type.heading2,
      children: t('artistprofile_fundraising_formsuccess_1', 'Your fundraising link has been received', 'The link was submitted to Spotify, we received it.')
    }), /*#__PURE__*/_jsx(VSpacer20, {}), /*#__PURE__*/_jsx(Heading3FontSize16, {
      children: t('artistprofile_fundraising_formsuccess_2', "Here's what happens next:", "The sets the context for instructions after you've added your artist fundraising pick.")
    }), /*#__PURE__*/_jsx(PFontSize16, {
      children: t('artistprofile_fundraising_formsuccess_3', 'Most Artist Fundraising Picks will be posted immediately. In some cases, links may be manually reviewed, which may take a bit longer.', '')
    }), /*#__PURE__*/_jsxs(PFontSize16, {
      children: [t('artistprofile_fundraising_formsuccess_4', 'For general questions about how artist support works, see our help article.', 'Leads to more info on Artist Fundraising Pick'), ' ', /*#__PURE__*/_jsx(TextLinkUnderlined, {
        href: helpArticleUrl,
        target: "help",
        children: t('artistprofile_fundraising_formsuccess_5', 'Read help article.', '')
      })]
    })]
  });
}