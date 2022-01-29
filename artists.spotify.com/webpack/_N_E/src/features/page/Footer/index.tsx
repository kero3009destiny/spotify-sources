import React from 'react';
import styled from 'styled-components';
import { AppFooter, AppFooterLink, breakpoint, spacer } from '@spotify-internal/encore-web';
import { PageContainer } from '../Container';
import { getTermsUrl } from '../../Terms/getTermsUrl';
import { useT } from '@mrkt/features/i18n';
import { createUbiEventLogger, useImpressionUBILogger } from '@mrkt/features/ubi';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import { useCurrentArtistIdOrNull } from '../../artists';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledAppFooter = styled(AppFooter).withConfig({
  displayName: "Footer__StyledAppFooter",
  componentId: "sc-11o3o50-0"
})(["@media (min-width:", "){margin-top:", ";}"], breakpoint.screenSmMin, spacer.spacer64);
var copyrightYear = new Date().getFullYear();
export function PageFooter() {
  var t = useT();
  var uri = false ? '' : window.location.href;
  var footerSpec = createWebCommonEventFactory({
    data: {
      identifier: 's4a-footer',
      uri: uri
    }
  }).footerFactory();
  var artistId = useCurrentArtistIdOrNull();
  var UBIEventLogger = createUbiEventLogger(artistId);

  var _useImpressionUBILogg = useImpressionUBILogger(footerSpec, artistId, null),
      footerRef = _useImpressionUBILogg.ref;

  var footerLinks = [{
    label: t('FOOTER_LINK_LEGAL', 'Legal', 'Links to Spotify for Artists Terms and Conditions page'),
    href: getTermsUrl(),
    onClick: function onClick(evt) {
      // MouseEvent<HTMLAnchorElement> doesn't type right for some reason
      UBIEventLogger.logInteraction(footerSpec.legalLinkFactory().hitUiNavigate({
        destination: evt.target.href
      }));
    }
  }, {
    label: t('FOOTER_LINK_PRIVACY', 'Privacy', 'Links to Spotify for Artists Privacy Policy page'),
    href: 'https://www.spotify.com/legal/privacy-policy/',
    onClick: function onClick(evt) {
      // MouseEvent<HTMLAnchorElement> doesn't type right for some reason
      UBIEventLogger.logInteraction(footerSpec.privacyLinkFactory().hitUiNavigate({
        destination: evt.target.href
      }));
    }
  }, {
    label: t('FOOTER_LINK_COOKIES', 'Cookies', 'Links to specific section in Spotify for Artists Privacy Policy page about cookies'),
    href: 'https://www.spotify.com/legal/cookies-policy/',
    onClick: function onClick(evt) {
      // MouseEvent<HTMLAnchorElement> doesn't type right for some reason
      UBIEventLogger.logInteraction(footerSpec.cookiesLinkFactory().hitUiNavigate({
        destination: evt.target.href
      }));
    }
  }];
  return /*#__PURE__*/_jsx(PageContainer, {
    ref: footerRef,
    children: /*#__PURE__*/_jsx(StyledAppFooter, {
      copyrightYear: copyrightYear,
      list: footerLinks.map(function (link) {
        return /*#__PURE__*/_jsx(AppFooterLink, {
          onClick: link.onClick,
          href: link.href,
          target: "_blank",
          children: link.label
        }, link.label);
      })
    })
  });
}