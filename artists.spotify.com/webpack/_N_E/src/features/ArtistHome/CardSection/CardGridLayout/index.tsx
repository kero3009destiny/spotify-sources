import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Banner, screenLgMax, screenMdMin, screenSmMax, screenXlMin, screenXsMax, spacer40, spacer64 } from '@spotify-internal/encore-web';
import Card from '../Card';
import { Screen } from '../../../../shared/lib/useViewport';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
var CardArea = styled.div.withConfig({
  displayName: "CardGridLayout__CardArea",
  componentId: "sc-6q8xs8-0"
})(["grid-area:cards;min-width:0;@media (max-width:", "){margin-top:", ";}"], screenXsMax, spacer40);
var CardGrid = styled(CardArea).withConfig({
  displayName: "CardGridLayout__CardGrid",
  componentId: "sc-6q8xs8-1"
})(["display:grid;@media (max-width:", "){grid-template-columns:1fr;margin-bottom:", ";}@media (min-width:", ") and (max-width:", "){grid-column-gap:", ";grid-template-columns:repeat(2,1fr);}@media (min-width:", "){grid-column-gap:", ";grid-template-columns:repeat(3,1fr);}"], screenSmMax, spacer64, screenMdMin, screenLgMax, spacer40, screenXlMin, spacer40); // needs to be a div for creation of grid columns

var CardGridCol = styled.div.withConfig({
  displayName: "CardGridLayout__CardGridCol",
  componentId: "sc-6q8xs8-2"
})([""]);
/* get the number of columns for card grid based on viewport */

export var getNumberOfColumns = function getNumberOfColumns(viewport) {
  if (viewport < Screen.MD) {
    return 1;
  }

  if (viewport >= Screen.MD && viewport < Screen.XL) {
    return 2;
  }

  return 3;
};
/* filter out cards from specific column */

var columnFilter = function columnFilter(cardsList, numColumns, currentColIndex) {
  return cardsList.filter(function (_, index) {
    return index % numColumns === currentColIndex;
  });
};

export var sortCardsForColumns = function sortCardsForColumns(cardsList, numColumns) {
  if (numColumns === 2) {
    return [columnFilter(cardsList, 2, 0), columnFilter(cardsList, 2, 1)];
  }

  if (numColumns === 3) {
    return [columnFilter(cardsList, 3, 0), columnFilter(cardsList, 3, 1), columnFilter(cardsList, 3, 2)];
  }

  return [cardsList];
};

var getCardIndex = function getCardIndex(numCols, curColIndex, curRowIndex) {
  return numCols * curRowIndex + curColIndex;
};

var CardGridLayout = /*#__PURE__*/React.memo(function (props) {
  var t = useT();
  var artist = props.artist,
      history = props.history,
      viewport = props.viewport,
      tracker = props.tracker,
      cardData = props.cardData;
  var CardProps = {
    artist: artist,
    history: history,
    viewport: viewport
  };
  var totalCardNum = cardData.length;

  if (totalCardNum === 0) {
    return /*#__PURE__*/_jsx(CardArea, {
      children: /*#__PURE__*/_jsx(Banner, {
        contextual: true,
        children: t('c56829', 'Seems like something’s up. We’re having trouble loading your cards.', '')
      })
    });
  }

  var numColumns = getNumberOfColumns(viewport);
  var filteredCards = cardData.filter(function (card) {
    return card.cardType === 'DISPLAY';
  });
  var resortedCardsList = sortCardsForColumns(filteredCards, numColumns);
  return /*#__PURE__*/_jsx(CardGrid, {
    "data-testid": "cards",
    children: resortedCardsList.map(function (cardColumnList, colIndex) {
      return /*#__PURE__*/_jsx(CardGridCol, {
        children: cardColumnList.map(function (card, rowIndex) {
          return /*#__PURE__*/_createElement(Card, _objectSpread(_objectSpread({}, CardProps), {}, {
            key: card.uuid,
            cardNum: getCardIndex(numColumns, colIndex, rowIndex),
            totalCardNum: totalCardNum,
            resourceUri: card.resourceUri,
            cardSource: card.cardSource,
            uuid: card.uuid,
            notificationClass: card.notificationClass,
            displayCard: card.displayCard,
            clickExpirationBuffer: card.clickExpirationBuffer,
            tracker: tracker
          }));
        })
      }, colIndex);
    })
  });
});
CardGridLayout.propTypes = {
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  viewport: PropTypes.number.isRequired,
  history: PropTypes.shape({}).isRequired,
  cardData: PropTypes.array.isRequired,
  tracker: PropTypes.shape({
    makeHomeCardEvent: PropTypes.func,
    trackImpression: PropTypes.func,
    trackInteraction: PropTypes.func
  })
};
/* eslint-disable-next-line import/no-default-export */

export default CardGridLayout;