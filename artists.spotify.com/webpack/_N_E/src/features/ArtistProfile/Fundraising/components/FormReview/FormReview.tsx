import React from 'react';
import styled from 'styled-components';
import { gray10, IconArrowTopRight, Table, TableCell, TableRow, TableHeaderCell, TextLink, Type, spacer4 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { DialogWrapper } from '../DialogWrapper';
import { musicReliefOrgDisplayNames } from '../../lib/constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var TextLinkColorGray10 = styled(TextLink).withConfig({
  displayName: "FormReview__TextLinkColorGray10",
  componentId: "dacqg2-0"
})(["svg{color:", ";}"], gray10);
export function FormReview(props) {
  var orgValue = props.org.value;
  var orgDisplayName = orgValue && musicReliefOrgDisplayNames[orgValue];
  var previewLinkUrl = props.link.value;
  var previewLinkDisplayText = orgDisplayName || previewLinkUrl;
  var t = useT();
  return /*#__PURE__*/_jsx(DialogWrapper, {
    children: /*#__PURE__*/_jsxs(Table, {
      children: [/*#__PURE__*/_jsx("colgroup", {
        children: /*#__PURE__*/_jsx("col", {})
      }), /*#__PURE__*/_jsx("thead", {
        children: /*#__PURE__*/_jsx(TableRow, {
          children: /*#__PURE__*/_jsx(TableHeaderCell, {
            children: t('artistprofile_fundraising_formreview_1', 'Fundraising link', '')
          })
        })
      }), /*#__PURE__*/_jsx("tbody", {
        children: /*#__PURE__*/_jsx(TableRow, {
          children: /*#__PURE__*/_jsx(TableCell, {
            children: /*#__PURE__*/_jsxs(TextLinkColorGray10, {
              id: "preview-link",
              "data-testid": "preview-link",
              href: previewLinkUrl,
              target: "preview",
              children: [/*#__PURE__*/_jsx("label", {
                htmlFor: "preview-link",
                "aria-labelledby": "preview-link",
                style: {
                  cursor: 'pointer'
                },
                children: /*#__PURE__*/_jsx(Type, {
                  variant: Type.body1,
                  color: gray10,
                  children: previewLinkDisplayText
                })
              }), /*#__PURE__*/_jsx(IconArrowTopRight, {
                iconSize: 16,
                style: {
                  marginLeft: spacer4
                }
              })]
            })
          })
        })
      })]
    })
  });
}