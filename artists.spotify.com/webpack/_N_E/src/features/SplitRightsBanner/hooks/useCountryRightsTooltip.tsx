import _slicedToArray from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useT } from '@mrkt/features/i18n';
import { ButtonTertiary, IconCheckAltActive, PopoverTrigger, Type, cssColorValue } from '@spotify-internal/encore-web';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { SplitRightsIcon } from '../../Music/SplitRightsBadge';
import * as S from '../styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function useCountryRightsTooltip(countries, bannerText) {
  var t = useT();
  var viewport = useViewport();
  var isMobile = viewport === Viewport.XS;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      show = _React$useState2[0],
      setShow = _React$useState2[1];

  var allowedCountries = React.useMemo(function () {
    return countries.filter(function (c) {
      return c.has_access;
    });
  }, [countries]);
  var notAllowedCountries = React.useMemo(function () {
    return countries.filter(function (c) {
      return !c.has_access;
    });
  }, [countries]);

  function openDialog() {
    setShow(true);
  }

  function closeDialog() {
    setShow(false);
  }

  return /*#__PURE__*/_jsx(PopoverTrigger, {
    onClick: function onClick() {
      return setShow(true);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Escape') {
        closeDialog();
      }

      if (e.key === 'Enter') {
        openDialog();
      }
    },
    placement: isMobile ? PopoverTrigger.bottom : PopoverTrigger.bottomRight,
    overlay: show && /*#__PURE__*/_jsx(S.Dialog, {
      dialogTitle: t('split-rights-country-rights-title', 'Where you own rights', 'Heading for a modal that displays a list of country names where you own rights for a particular song.'),
      body: /*#__PURE__*/_jsx(S.CountryList, {
        tabIndex: 0,
        children: countries.map(function (country) {
          return /*#__PURE__*/_jsx(S.CountryListItem, {
            "aria-label": !country.has_access ? t('split-rights-008f4b', 'Artist does not own rights to this song in {countryName}', 'This aria-label appears in a list of country names where Spotify has launched. Here we are flagging a country where an artist does not own rights for a particular song.', {
              countryName: country.country_name
            }) : undefined,
            children: /*#__PURE__*/_jsxs(S.CountryName, {
              semanticColor: country.has_access ? 'textBase' : 'textSubdued',
              weight: country.has_access ? Type.bold : undefined,
              children: [country.country_name, country.has_access && /*#__PURE__*/_jsx(S.IconWrapper, {
                children: /*#__PURE__*/_jsx(IconCheckAltActive, {
                  iconSize: 16
                })
              })]
            })
          }, country.country_name);
        })
      }),
      footer: /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          onClick: function onClick(e) {
            e.stopPropagation();
            closeDialog();
          },
          condensed: true,
          children: t('split-rights-dialog-btn-a93ee5', 'Close', 'This text closes a pop-up window.')
        }), /*#__PURE__*/_jsx(ButtonTertiary, {
          href: "https://bit.ly/343eWnR",
          rel: "noopener noreferrer",
          target: "_blank",
          condensed: true,
          children: t('split-rights-dialog-btn-284b02', 'Learn More', 'This links to an external Google doc explaining song rights.')
        })]
      })
    }),
    children: /*#__PURE__*/_jsxs(React.Fragment, {
      children: [/*#__PURE__*/_jsx(S.BadgeWrapper, {
        children: /*#__PURE__*/_jsx(SplitRightsIcon, {
          isActive: false,
          setBgColor: cssColorValue('backgroundBase')
        })
      }), /*#__PURE__*/_jsxs(Type, {
        as: "span",
        condensed: true,
        children: [bannerText, allowedCountries.length >= 3 && notAllowedCountries.length !== 0 && /*#__PURE__*/_jsx(S.PopoverTextLink, {
          component: "button",
          tabIndex: 0,
          semanticColor: "textBrightAccent",
          children: t('split-rights-country-rights-tooltip-3', '{countryNameOne}, {countryNameTwo}, {countryNameThree}, and {numberOfRemainingCountries} more', 'A list of 2 country names and the number of remaining country names the user can view. Example Usage: Albania, Brazil, Austria, and 23 more.', {
            countryNameOne: allowedCountries[0].country_name,
            countryNameTwo: allowedCountries[1].country_name,
            countryNameThree: allowedCountries[2].country_name,
            numberOfRemainingCountries: allowedCountries.length - 3
          })
        }), allowedCountries.length === 2 && /*#__PURE__*/_jsx(S.PopoverTextLink, {
          component: "button",
          tabIndex: 0,
          semanticColor: "textBrightAccent",
          children: t('split-rights-country-rights-tooltip-2', '{countryNameOne}, {countryNameTwo}', 'A list of 2 country names. Example Usage: Albania, Brazil.', {
            countryNameOne: allowedCountries[0].country_name,
            countryNameTwo: allowedCountries[1].country_name
          })
        }), allowedCountries.length === 1 && /*#__PURE__*/_jsx(S.PopoverTextLink, {
          component: "button",
          tabIndex: 0,
          semanticColor: "textBrightAccent",
          children: allowedCountries[0].country_name
        }), notAllowedCountries.length === 0 && /*#__PURE__*/_jsx(S.PopoverTextLink, {
          component: "button",
          tabIndex: 0,
          semanticColor: "textBrightAccent",
          children: t('split-rights-country-tooltip-worldwide', 'Worldwide', '')
        })]
      })]
    })
  });
}