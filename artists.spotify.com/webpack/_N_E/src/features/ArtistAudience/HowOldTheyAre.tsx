import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import styled from 'styled-components';
import { max } from 'd3-array';
import { format } from 'd3-format';
import { OverlayTrigger, Tooltip, Popover, Table, TableRow, TableCell, Type, black, VisuallyHidden } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { StyledErrorMessage } from '../../shared/messages/styles';
import { useGetString } from '../../shared/messages/strings';
import { ResizeContainer } from '../../shared/components/ResizeContainer';
import { StackedRowChart } from './StackedRowChart';
import { Legend } from '../../shared/components/Chart/Legend';
import { StackedColumnChart } from './StackedColumnChart';
import { useGenderColorSpecs, GenderIdentity } from './constants/genders';
import { useGenderByAgeRawData } from './resources/useGenderByAgeRawData';
import { useHasAudienceCountryFilters } from './hooks/useHasAudienceCountryFilters';
import { useHowOldTheyAreNormalizer } from './normalizers/howOldTheyAre';
import { useBreakpointValue, Viewport, breakpointValues } from '../../shared/lib/useViewport';
import { Section } from '../Section';
import { useCurrentArtist } from '../artists';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledTableRow = styled(TableRow).withConfig({
  displayName: "HowOldTheyAre__StyledTableRow",
  componentId: "leton0-0"
})(["border-bottom:none;"]);
var StyledTableCell = styled(TableCell).withConfig({
  displayName: "HowOldTheyAre__StyledTableCell",
  componentId: "leton0-1"
})(["color:", ";padding:0 8px 2px 0;"], black);
var StyledGenderLabel = styled.span.withConfig({
  displayName: "HowOldTheyAre__StyledGenderLabel",
  componentId: "leton0-2"
})(["display:inline-block;font-weight:normal;padding-left:14px;position:relative;&::before{background-color:", ";border-radius:50%;content:'';height:8px;left:0;position:absolute;top:6px;width:8px;}"], function (props) {
  return props.discColor;
});
var percentFormat = format('.0%');
var sortedGenders = [GenderIdentity.FEMALE, GenderIdentity.MALE, GenderIdentity.NON_BINARY, GenderIdentity.OTHERS];
export function HowOldTheyAre(_ref) {
  var country = _ref.country;

  var generateTooltipBody = function generateTooltipBody(d) {
    return /*#__PURE__*/_jsx(Table, {
      children: /*#__PURE__*/_jsx("tbody", {
        children: sortedGenders.map(function (gender) {
          return /*#__PURE__*/_jsxs(StyledTableRow, {
            children: [/*#__PURE__*/_jsx(StyledTableCell, {
              children: /*#__PURE__*/_jsx(StyledGenderLabel, {
                discColor: genderColorSpecs[gender].color_hex,
                children: genderColorSpecs[gender].message
              })
            }), /*#__PURE__*/_jsx(StyledTableCell, {
              numerical: true,
              align: "right",
              children: /*#__PURE__*/_jsx(Type, {
                weight: Type.bold,
                children: d["".concat(gender, "_value_formatted")]
              })
            })]
          }, gender);
        })
      })
    });
  };

  var t = useT();
  var strings = useGetString();
  var genderColorSpecs = useGenderColorSpecs();

  var _useCurrentArtist = useCurrentArtist(),
      artistName = _useCurrentArtist.name;

  var data = useGenderByAgeRawData(country);
  var hasCountryFilters = useHasAudienceCountryFilters();
  var raw = data && Object.keys(data).length > 0 ? data : {};
  var normalized = useHowOldTheyAreNormalizer(raw);
  var yScaleMax = max(normalized, function (d) {
    return d.percentage_raw;
  }) < 0.5 ? 0.5 : 1;
  var selectedCountry = hasCountryFilters && country !== null && country !== void 0 && country.name ? "".concat(country.name) : '';
  var subtitle = [t('HOW_OLD_THEY_ARE_605606', 'Listeners', ''), t('HOW_OLD_THEY_ARE_b75971', 'Last 28 Days', ''), selectedCountry].filter(Boolean).join(' • ');
  var text = {
    sectionTitle: t('HOW_OLD_THEY_ARE_072f7d', 'Listeners’ age', ''),
    sectionSubtitle: subtitle
  };
  var viewport = useBreakpointValue();
  var isViewportXS = viewport <= breakpointValues[Viewport.XS];
  var isInGridLayout = viewport > breakpointValues[Viewport.SM];
  /**
   * Horizontal padding from the edge of container as a
   * function of chart width
   */

  var PADDING_SCALAR = isInGridLayout ? 0.25 : 0.15;

  if (data.status > 200) {
    return /*#__PURE__*/_jsx(Section, {
      id: "how-old-they-are",
      title: text.sectionTitle,
      subtitle: text.sectionSubtitle,
      children: data.status !== 204 ? /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: strings.insightsError
      }) : /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: t('HOW_OLD_THEY_ARE_78b5ee', 'You’ll see your audience’s age demographics as your audience grows.', '')
        })
      })
    });
  }

  return /*#__PURE__*/_jsxs(Section, {
    id: "how-old-they-are",
    title: text.sectionTitle,
    subtitle: text.sectionSubtitle,
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      children: t('HOW_OLD_THEY_ARE_1b26fe', 'Chart for {artistName} showing age and gender demographics of audience, {countryName}, for the last 28 days. ', 'This text is screen reader copy. We have a feature where a page can be filtered to show only data from a specific country. "countryName" defaults to "Worldwide", and will then be the name of the country a user selects from a dropdown.', {
        artistName: artistName,
        countryName: country.name
      })
    }), /*#__PURE__*/_jsx(ResizeContainer, {
      viewport: viewport,
      render: function render(width) {
        var genderEntries = Object.entries(genderColorSpecs);
        var rowChartKeys = genderEntries.map(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              key = _ref3[0],
              value = _ref3[1];

          return {
            key: key,
            label: value.message
          };
        });
        var colChartKeys = genderEntries.map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              key = _ref5[0],
              value = _ref5[1];

          return {
            key: key,
            message: value.message
          };
        });

        var colorScale = function colorScale(d) {
          return genderColorSpecs[d].color_hex;
        };

        if (isViewportXS) {
          return /*#__PURE__*/_jsxs(React.Fragment, {
            children: [/*#__PURE__*/_jsx(Legend, {
              colorScale: colorScale,
              keys: rowChartKeys
            }), /*#__PURE__*/_jsx(StackedRowChart, {
              data: normalized,
              width: width,
              keys: rowChartKeys,
              colorScale: colorScale,
              xScaleDomain: [0, max(normalized, function (d) {
                return d.percentage_raw;
              })],
              renderTooltip: function renderTooltip(d, onClose) {
                return /*#__PURE__*/_jsx(Popover, {
                  "aria-hidden": "true",
                  onClose: onClose,
                  popoverTitle: d.message.defaultMessage,
                  children: generateTooltipBody(d)
                });
              }
            })]
          });
        }

        return /*#__PURE__*/_jsx(StackedColumnChart, {
          data: normalized,
          width: width,
          paddingScalar: PADDING_SCALAR,
          isInGridLayout: isInGridLayout,
          keys: colChartKeys,
          yScaleDomain: [0, yScaleMax],
          threeTickAxisFormatter: percentFormat,
          colorScale: colorScale,
          renderTooltip: function renderTooltip(d, pos) {
            return /*#__PURE__*/_jsx(OverlayTrigger, {
              placement: pos.x > width ? OverlayTrigger.left : OverlayTrigger.right,
              overlay: /*#__PURE__*/_jsx(Tooltip, {
                children: generateTooltipBody(d)
              })
            });
          }
        });
      }
    })]
  });
}