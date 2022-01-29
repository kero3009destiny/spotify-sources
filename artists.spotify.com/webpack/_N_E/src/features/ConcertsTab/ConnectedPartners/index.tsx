import _toConsumableArray from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import cn from 'classnames';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { cssColorValue, Type, Tooltip, spacer } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { UnstyledButton } from '@mrkt/features/UnstyledButton';
import DotItem from '../DotItem';
import Avatar from '../Avatar';
import MediaWithDescription from '../MediaWithDescription';
import PartnerSettingsStyles from '../PartnerSettings/index.module.scss';
import { useT } from '@mrkt/features/i18n';
import partnerConfig from '../partnerConfig';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var PartnerLayout = styled.div.withConfig({
  displayName: "ConnectedPartners__PartnerLayout",
  componentId: "sc-1hh6tkm-0"
})(["cursor:default;display:flex;flex-wrap:wrap;& > *{margin-right:48px;}"]);
var ExtraPadding = styled.div.withConfig({
  displayName: "ConnectedPartners__ExtraPadding",
  componentId: "sc-1hh6tkm-1"
})(["padding-right:50px;"]);
var MultiPartner = styled.div.withConfig({
  displayName: "ConnectedPartners__MultiPartner",
  componentId: "sc-1hh6tkm-2"
})(["border-bottom:1px solid ", ";margin-bottom:8px;padding-bottom:8px;&:last-of-type{border-bottom:0;margin-bottom:0;padding-bottom:0;}"], cssColorValue('backgroundPress'));
var TitleLayout = styled.div.withConfig({
  displayName: "ConnectedPartners__TitleLayout",
  componentId: "sc-1hh6tkm-3"
})(["display:flex;align-items:center;margin-bottom:", ";& > *:first-child{margin-right:", ";}"], spacer.spacer24, spacer.spacer8);

var filterPartners = function filterPartners(partner) {
  return partnerConfig.allPartnerIds.includes(partner.partnerName);
};
/* eslint-disable-next-line import/no-default-export */


export default function ConnectedPartners(_ref) {
  var partners = _ref.partners,
      _onClick = _ref.onClick;
  var t = useT();
  var hasNoPartners = partners.length === 0;
  var reduced = partners.reduce(function (group, partner) {
    return _objectSpread(_objectSpread({}, group), {}, _defineProperty({}, partner.partnerName, group[partner.partnerName] ? [].concat(_toConsumableArray(group[partner.partnerName]), [partner]) : [partner]));
  }, {});
  var grouped = Object.keys(reduced).map(function (key) {
    return {
      partnerName: key,
      datas: reduced[key]
    };
  }).filter(filterPartners);
  return /*#__PURE__*/_jsxs("div", {
    role: "presentation",
    onClick: function onClick() {
      sendEvent({
        eventCategory: 'concerts',
        eventAction: 'click',
        eventLabel: 'Partners Settings Open'
      });

      _onClick.apply(void 0, arguments);
    },
    children: [/*#__PURE__*/_jsx(TitleLayout, {
      children: /*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: "body1",
        condensed: true,
        semanticColor: "textBase",
        children: t('29bd41', 'Connected ticketing partners', '')
      })
    }), /*#__PURE__*/_jsxs(PartnerLayout, {
      children: [grouped.map(function (partner) {
        return /*#__PURE__*/_jsx(TooltipTrigger, {
          tooltipId: "".concat(partner.partnerName, "-tooltip"),
          placement: "bottomRight",
          tooltip: /*#__PURE__*/_jsx(_Fragment, {
            children: partner.datas.map(function (data) {
              return /*#__PURE__*/_jsx(Tooltip, {
                style: {
                  display: 'block'
                },
                children: /*#__PURE__*/_jsx(MultiPartner, {
                  children: /*#__PURE__*/_jsx(MediaWithDescription, {
                    media: /*#__PURE__*/_jsx(Avatar, {
                      imageUrl: data.mappedPartnerImage.imageUrl
                    }),
                    description: /*#__PURE__*/_jsxs(ExtraPadding, {
                      children: [/*#__PURE__*/_jsx(UnstyledButton, {
                        children: /*#__PURE__*/_jsx(Type, {
                          as: "p",
                          className: cn(PartnerSettingsStyles.partner_text, PartnerSettingsStyles.title),
                          children: data.name
                        })
                      }), /*#__PURE__*/_jsx(Type, {
                        as: "p",
                        className: cn(PartnerSettingsStyles.partner_text),
                        children: data.partnerId
                      })]
                    })
                  })
                })
              }, data.partnerId);
            })
          }),
          children: /*#__PURE__*/_jsx(UnstyledButton, {
            children: /*#__PURE__*/_jsx("div", {
              children: /*#__PURE__*/_jsx(DotItem, {
                label: "".concat(partner.partnerName).concat(partner.datas.length > 1 ? " (".concat(partner.datas.length, ")") : '')
              })
            })
          })
        }, partner.partnerName);
      }), hasNoPartners && /*#__PURE__*/_jsx(Type, {
        as: "p",
        semanticColor: "textSubdued",
        children: t('97159a', "Looks like we don't have any matches on our partners...", '')
      })]
    })]
  });
}
ConnectedPartners.defaultProps = {
  onClick: function onClick() {}
};