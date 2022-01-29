// ignore-string-externalization
import styled, { css } from 'styled-components';
import { Type, white, green, gray10, gray60 } from '@spotify-internal/encore-web';
import { PencilButton } from '../PencilButton';
export var Wrapper = styled.div.withConfig({
  displayName: "indexstyles__Wrapper",
  componentId: "sc-1yg777c-0"
})(["background-position:50%;background-repeat:no-repeat;background-size:cover;display:flex;flex-direction:column;height:344px;margin:0 -24px;position:relative;@media (min-width:768px){margin:0 -32px;}"]);
export var HeaderImageEditButton = styled.div.withConfig({
  displayName: "indexstyles__HeaderImageEditButton",
  componentId: "sc-1yg777c-1"
})(["align-self:flex-end;background-color:rgba(0,0,0,0.2);border-radius:50%;flex-grow:0;flex-shrink:0;height:48px;text-align:center;white-space:nowrap;width:48px;z-index:1;&:hover{background-color:rgba(0,0,0,0.6);cursor:pointer;}"]);
export var HeaderImageEditOverlay = styled.div.withConfig({
  displayName: "indexstyles__HeaderImageEditOverlay",
  componentId: "sc-1yg777c-2"
})(["align-items:center;align-self:center;background:rgba(0,0,0,0.5);bottom:0;color:", ";display:flex;flex-direction:column;font-size:14px;justify-content:center;left:0;letter-spacing:0.16em;opacity:0;position:absolute;right:0;text-align:center;text-transform:uppercase;top:0;transition:opacity 0.33s cubic-bezier(1,0,0.7,1);width:100%;&:hover{cursor:pointer;}"], white);
export var HeaderImageArtistInfo = styled.div.withConfig({
  displayName: "indexstyles__HeaderImageArtistInfo",
  componentId: "sc-1yg777c-3"
})(["align-self:flex-start;color:", ";display:flex;flex:auto;flex-grow:0;justify-content:space-between;overflow:visible;pointer-events:none;white-space:nowrap;width:100%;z-index:1;"], white);
export var HeaderImageInfoContainer = styled.div.withConfig({
  displayName: "indexstyles__HeaderImageInfoContainer",
  componentId: "sc-1yg777c-4"
})(["align-items:flex-start;background-image:linear-gradient(transparent,", ");bottom:0;display:flex;justify-content:space-between;flex-direction:column-reverse;padding:24px;position:absolute;left:0;right:0;top:0;&:hover ", "{opacity:1;transition:opacity 0.33s cubic-bezier(0.3,0,0,1);}", ";"], gray10, HeaderImageEditOverlay, function (props) {
  return props.withoutButtons && css(["& ", "{flex-grow:1;}@media (min-width:768px){padding:24px 32px;}"], HeaderImageArtistInfo);
});
export var HeaderImageName = styled(Type).attrs({
  forwardedAs: 'h1'
}).withConfig({
  displayName: "indexstyles__HeaderImageName",
  componentId: "sc-1yg777c-5"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-bottom:0;"]);
export var HeaderImageMonthlyListeners = styled.div.withConfig({
  displayName: "indexstyles__HeaderImageMonthlyListeners",
  componentId: "sc-1yg777c-6"
})(["align-self:flex-end;color:", ";font-size:12px;letter-spacing:0.16em;margin-bottom:8px;margin-top:0;text-align:right;text-transform:uppercase;"], gray60);
export var HeaderImageLabelWrapper = styled.div.withConfig({
  displayName: "indexstyles__HeaderImageLabelWrapper",
  componentId: "sc-1yg777c-7"
})(["align-self:flex-end;display:inline-block;flex:1;max-width:calc(100% - 160px);overflow:visible;padding-right:10px;padding-top:10px;position:relative;"]);
export var HeaderImageLabel = styled(Type).withConfig({
  displayName: "indexstyles__HeaderImageLabel",
  componentId: "sc-1yg777c-8"
})(["font-size:14px;letter-spacing:0.16em;text-transform:uppercase;"]);
export var HeaderImageVerifiedCheckmark = styled.span.withConfig({
  displayName: "indexstyles__HeaderImageVerifiedCheckmark",
  componentId: "sc-1yg777c-9"
})(["line-height:1;margin-left:8px;margin-top:-10px;padding:5px 0;vertical-align:text-bottom;"]);
export var HeaderImageEditButtonIcon = styled(PencilButton).withConfig({
  displayName: "indexstyles__HeaderImageEditButtonIcon",
  componentId: "sc-1yg777c-10"
})(["color:", ";height:auto;margin:12px;&:hover,&:focus{color:", ";}"], white, green);