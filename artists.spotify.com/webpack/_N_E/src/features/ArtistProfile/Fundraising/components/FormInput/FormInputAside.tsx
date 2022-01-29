import React from 'react';
import styled from 'styled-components';
import { TextLink, Type, TypeList, TypeListItem, gray50, gray95, screenXsMax, spacer8, spacer24 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useViewport, Viewport } from '../../../../../shared/lib/useViewport';
import { helpArticleUrl, programPoliciesUrl } from '../../lib/constants';
import { HSpacer64 } from '../../../Elements';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var AsideContainer = styled.aside.withConfig({
  displayName: "FormInputAside__AsideContainer",
  componentId: "sc-1ewrjnb-0"
})(["padding:", ";width:310px;background-color:", ";height:fit-content;border-radius:", ";@media (max-width:", "){width:100%;margin:0 auto;}"], spacer24, gray95, spacer8, screenXsMax);
var AsideHeading = styled(Type).attrs({
  forwardedAs: 'h4',
  variant: Type.body2,
  color: gray50
}).withConfig({
  displayName: "FormInputAside__AsideHeading",
  componentId: "sc-1ewrjnb-1"
})(["font-size:16px;line-height:24px;font-weight:", ";"], Type.bold);
var AsideItem = styled(TypeListItem).withConfig({
  displayName: "FormInputAside__AsideItem",
  componentId: "sc-1ewrjnb-2"
})(["color:", ";font-size:16px;line-height:24px;"], gray50);
var AsideItemSpan = styled(Type).attrs({
  variant: Type.body2
}).withConfig({
  displayName: "FormInputAside__AsideItemSpan",
  componentId: "sc-1ewrjnb-3"
})(["font-size:16px;line-height:24px;"]);
var AsideLink = styled(TextLink).withConfig({
  displayName: "FormInputAside__AsideLink",
  componentId: "sc-1ewrjnb-4"
})(["text-decoration:underline;"]);
var AsideList = styled(TypeList).withConfig({
  displayName: "FormInputAside__AsideList",
  componentId: "sc-1ewrjnb-5"
})(["padding:0;list-style-position:outside;margin-left:1em;li:last-child{padding-bottom:0;}"]);
var AsideWrapper = styled.div.withConfig({
  displayName: "FormInputAside__AsideWrapper",
  componentId: "sc-1ewrjnb-6"
})(["display:flex;"]);
export function FormInputAside() {
  var viewport = useViewport();
  var condensed = viewport === Viewport.XS;
  var t = useT();
  return /*#__PURE__*/_jsxs(AsideWrapper, {
    children: [condensed ? null : /*#__PURE__*/_jsx(HSpacer64, {}), /*#__PURE__*/_jsxs(AsideContainer, {
      children: [/*#__PURE__*/_jsx(AsideHeading, {
        children: t('artistprofile_fundraising_forminput_forminputaside_1', 'How Artist Fundraising Pick works', 'Artist Fundraising Pick should be translated as it is in the consumer product. Refer to translation memory.')
      }), /*#__PURE__*/_jsxs(AsideList, {
        children: [/*#__PURE__*/_jsx(AsideItem, {
          children: /*#__PURE__*/_jsx(AsideItemSpan, {
            children: t('artistprofile_fundraising_forminput_forminputaside_2', "Your fundraising link will live at the top of your artist profile. It won't replace your Artist Pick.", '')
          })
        }), /*#__PURE__*/_jsx(AsideItem, {
          children: /*#__PURE__*/_jsx(AsideItemSpan, {
            children: t('artistprofile_fundraising_forminput_forminputaside_3', "Spotify won't receive any money or commission through this feature.", '')
          })
        }), /*#__PURE__*/_jsx(AsideItem, {
          children: /*#__PURE__*/_jsxs(AsideItemSpan, {
            children: [t('artistprofile_fundraising_forminput_forminputaside_4', 'Make sure your link complies with our program policies.', ''), ' ', /*#__PURE__*/_jsx(AsideLink, {
              href: programPoliciesUrl,
              target: "policies",
              children: t('artistprofile_fundraising_forminput_forminputaside_5', 'Read program policies.', 'The program this refers to is Artist Fundraising Pick.')
            })]
          })
        }), /*#__PURE__*/_jsx(AsideItem, {
          children: /*#__PURE__*/_jsxs(AsideItemSpan, {
            children: [t('artistprofile_fundraising_forminput_forminputaside_6', 'For more information about this initiative, please see our help article.', 'Leads to more info on Artist Fundraising Pick'), ' ', /*#__PURE__*/_jsx(AsideLink, {
              href: helpArticleUrl,
              target: "help",
              children: t('artistprofile_fundraising_forminput_forminputaside_7', 'Read help article.', 'This goes to an FAQ page.')
            })]
          })
        })]
      })]
    })]
  });
}