// ignore-string-externalization

/* eslint-disable no-unexpected-multiline */
import styled, { keyframes } from 'styled-components';
import { cssColorValue, spacer8, spacer16, screenSmMax, screenMdMin } from '@spotify-internal/encore-web';
var glueEaseInSoft = 'cubic-bezier(0.3, 0, 0.4, 1)';
var glueEaseOutSoft = 'cubic-bezier(0.6, 0, 0.7, 1)';
var ANIMATION_RUNTIME = 0.3;
var PRE_ANIMATION_DELAY = 0.15;
var POST_ANIMATION_DELAY = 0.35;

var calculateDelay = function calculateDelay(cardNumber) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PRE_ANIMATION_DELAY;
  return cardNumber * delay;
}; // to make sure shadow stays until all cards come in
// calculate delay based on number of remaining cards


var calculateDuration = function calculateDuration(cardNumber, totalCardNum) {
  var waitTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : POST_ANIMATION_DELAY;
  var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : PRE_ANIMATION_DELAY;
  var cardIndex = cardNumber - 1;
  var remainingCardsToAnimate = totalCardNum - cardIndex;
  var individualCardDuration = calculateDelay(remainingCardsToAnimate, delay);
  return individualCardDuration + waitTime;
};

var convertToSeconds = function convertToSeconds(value) {
  return "".concat(value.toString(), "s");
};

var ANIMATION_FILL_MODE = 'both';
var CARD_BOX_SHADOW = "0 ".concat(spacer8, " ").concat(spacer16, " 0 rgba(0, 0, 0, 0.07)");
var backgroundColor = keyframes(["from{background-color:", ";}to{background-color:", ";}"], cssColorValue('backgroundHighlight'), cssColorValue('backgroundBase'));
var fadeIn = keyframes(["from{opacity:0;transform:translate3d(0,", ",0);}to{opacity:1;transform:translate3d(0,0,0);}"], spacer8);
var addShadow = keyframes(["0%{box-shadow:none;}20%{box-shadow:", ";}95%{animation-timing-function:", ";box-shadow:", ";}100%{box-shadow:none;}"], CARD_BOX_SHADOW, glueEaseOutSoft, CARD_BOX_SHADOW);
export var CardShadowAnimation = styled.div.withConfig({
  displayName: "Animation__CardShadowAnimation",
  componentId: "sc-1smfjjs-0"
})(["animation:", " ", " ", " ", ";animation-delay:", ";"], addShadow, function (props) {
  return convertToSeconds(calculateDuration(props.cardNum, props.totalCardNum));
}, glueEaseInSoft, ANIMATION_FILL_MODE, function (props) {
  return convertToSeconds(calculateDelay(props.cardNum));
});
export var CardGrayAnimation = styled.div.withConfig({
  displayName: "Animation__CardGrayAnimation",
  componentId: "sc-1smfjjs-1"
})(["animation:", " ", " ", " ", ";animation-delay:", ";"], backgroundColor, convertToSeconds(ANIMATION_RUNTIME), glueEaseInSoft, ANIMATION_FILL_MODE, function (props) {
  return convertToSeconds(calculateDelay(props.cardNum));
});
export var CardFadeInAnimation = styled.div.withConfig({
  displayName: "Animation__CardFadeInAnimation",
  componentId: "sc-1smfjjs-2"
})(["animation:", " ", " ", " ", ";animation-delay:", ";@media (max-width:", "){box-shadow:", ";}@media (min-width:", "){&:hover{box-shadow:", ";transition:box-shadow ", " ", ";}}"], fadeIn, convertToSeconds(ANIMATION_RUNTIME), glueEaseInSoft, ANIMATION_FILL_MODE, function (props) {
  return convertToSeconds(calculateDelay(props.cardNum));
}, screenSmMax, CARD_BOX_SHADOW, screenMdMin, CARD_BOX_SHADOW, convertToSeconds(ANIMATION_RUNTIME), glueEaseInSoft);