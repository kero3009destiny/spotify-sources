import React from 'react';
import styled from 'styled-components';
import { ButtonPrimary, ButtonTertiary, TextLink, Type, gray50, screenSmMax, screenSmMin, screenXsMax, kleinBlue61 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { WizardStep } from '../lib/useWizard';
import { programPoliciesUrl, termsAndConditionsUrl } from '../lib/constants';
import { NavStepper } from './NavStepper';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var TermsAgreementNotice = styled(Type).attrs({
  forwardedAs: 'p',
  variant: Type.body3,
  color: gray50
}).withConfig({
  displayName: "DialogFooter__TermsAgreementNotice",
  componentId: "sc-19mc3ok-0"
})(["@media (min-width:", "){padding-bottom:0;}@media (max-width:", "){max-width:252px;text-align:right;}@media (max-width:", "){text-align:center;padding-bottom:auto;grid-area:terms;justify-self:center;}"], screenSmMin, screenSmMax, screenXsMax);
var TermsAndNextCTAContainer = styled.div.withConfig({
  displayName: "DialogFooter__TermsAndNextCTAContainer",
  componentId: "sc-19mc3ok-1"
})(["display:flex;align-items:baseline;@media (min-width:", "){align-items:center;}@media (max-width:", "){flex-direction:column;}"], screenSmMin, screenXsMax);
var FooterContainer = styled.div.withConfig({
  displayName: "DialogFooter__FooterContainer",
  componentId: "sc-19mc3ok-2"
})(["display:flex;@media (max-width:", "){display:grid;grid-template-columns:1fr minmax(0,1fr) 1fr;grid-template-rows:1fr;grid-template-areas:'. nav next';}@supports (-webkit-touch-callout:none){padding-bottom:env(safe-area-inset-bottom,auto);}"], screenXsMax);
var FooterContainerWithTerms = styled.div.withConfig({
  displayName: "DialogFooter__FooterContainerWithTerms",
  componentId: "sc-19mc3ok-3"
})(["display:flex;@media (max-width:", "){display:grid;grid-template-columns:1fr minmax(0,1fr) 1fr;grid-template-rows:1fr 1fr;grid-template-areas:'terms terms terms' 'prev nav next';}@supports (-webkit-touch-callout:none){padding-bottom:env(safe-area-inset-bottom,auto);}"], screenXsMax);
var LinkUnderlined = styled(TextLink).withConfig({
  displayName: "DialogFooter__LinkUnderlined",
  componentId: "sc-19mc3ok-4"
})(["text-decoration:underline;"]);
export function DialogFooter(props) {
  var viewport = useViewport();
  var condensed = viewport === Viewport.XS;
  var t = useT();
  var confirmSelected = props.step === WizardStep.submit || props.step === WizardStep.failure || props.step === WizardStep.submitting;
  var termsAgreementNotice = confirmSelected ? /*#__PURE__*/_jsxs(TermsAgreementNotice, {
    children: [t('artistprofile_fundraising_dialogfooter_1', "By submitting this form you're agreeing to our terms and program polices.", 'The link artists put in for people to donate should be a link from the fundraising provider they chose.'), ' ', /*#__PURE__*/_jsx(LinkUnderlined, {
      href: termsAndConditionsUrl,
      target: "terms",
      children: t('artistprofile_fundraising_dialogfooter_2', 'Read terms.', '')
    }), ' ', /*#__PURE__*/_jsx(LinkUnderlined, {
      href: programPoliciesUrl,
      target: "policies",
      children: t('artistprofile_fundraising_dialogfooter_3', 'Read program policies.', 'The program this refers to is Artist Fundraising Pick.')
    })]
  }) : null;
  var nextBtn = condensed ? /*#__PURE__*/_jsx(ButtonTertiary, {
    buttonSize: ButtonTertiary.sm,
    disabled: props.noNext,
    onClick: props.next,
    style: {
      color: !props.noNext ? kleinBlue61 : 'auto',
      gridArea: 'next',
      whiteSpace: 'nowrap'
    },
    condensed: true,
    children: props.nextCopy
  }) : /*#__PURE__*/_jsx(ButtonPrimary, {
    buttonSize: ButtonTertiary.md,
    disabled: props.noNext,
    onClick: props.next,
    style: {
      marginLeft: '24px'
    },
    children: props.nextCopy
  });

  var termsAndNextCTAContainer = /*#__PURE__*/_jsxs(TermsAndNextCTAContainer, {
    children: [termsAgreementNotice, nextBtn]
  });

  var uncondensedFooterBody = /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ButtonTertiary, {
      buttonSize: condensed ? ButtonTertiary.sm : ButtonTertiary.md,
      disabled: props.noPrev,
      onClick: props.prev,
      condensed: true // Hide the button, but keep the layout the same
      ,
      style: props.hidePrev ? {
        visibility: 'hidden'
      } : {},
      children: t('artistprofile_fundraising_dialogfooter_4', 'Previous', '')
    }), termsAndNextCTAContainer]
  });

  var condensedFooterBody = /*#__PURE__*/_jsxs(_Fragment, {
    children: [termsAgreementNotice, props.hidePrev ? null : /*#__PURE__*/_jsx(ButtonTertiary, {
      buttonSize: condensed ? ButtonTertiary.sm : ButtonTertiary.md,
      disabled: props.noPrev,
      onClick: props.prev,
      condensed: true,
      style: {
        gridArea: 'prev'
      },
      children: t('artistprofile_fundraising_dialogfooter_5', 'Previous', '')
    }), /*#__PURE__*/_jsx(NavStepper, {
      isEditing: props.isEditing,
      step: props.step,
      visible: condensed
    }), nextBtn]
  });

  var footerBody = condensed ? condensedFooterBody : uncondensedFooterBody;
  return confirmSelected ? /*#__PURE__*/_jsx(FooterContainerWithTerms, {
    children: footerBody
  }) : /*#__PURE__*/_jsx(FooterContainer, {
    children: footerBody
  });
}