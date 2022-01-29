import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import styled from 'styled-components';
import { Banner, Type, gray50, spacer20 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { FundraisingBannerWrapper } from '../../components/StyleElements';
import { unreachable } from '../../lib/unreachable';
import { WizardStep } from '../../lib/useWizard';
import { DialogWrapper } from '../DialogWrapper';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function FormTitle(_ref) {
  var isEditing = _ref.isEditing,
      step = _ref.step;
  var t = useT();
  var confirmationSubheading = t('artistprofile_fundraising_formtitle_1', 'Your fans will be directed to this link on your artist profile.', "This link refers to the fundraising channel you've decided to raise money through.");

  switch (step) {
    case WizardStep.input:
      {
        var inputHeadingText = t('artistprofile_fundraising_formtitle_2', 'Add a fundraising link so your fans can support you or your cause directly', '');

        if (isEditing) {
          inputHeadingText = t('artistprofile_fundraising_formtitle_3', 'Edit your fundraising link', '');
        }

        return /*#__PURE__*/_jsx(DialogWrapper, {
          style: {
            flexDirection: 'column'
          },
          children: /*#__PURE__*/_jsx(H2, {
            style: {
              maxWidth: '772px'
            },
            children: inputHeadingText
          })
        });
      }

    case WizardStep.failure:
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(GenericSubmissionErrorBanner, {}), /*#__PURE__*/_jsx(DialogBodyTitle, {
          heading2: t('artistprofile_fundraising_formtitle_4', 'Confirm your Artist Fundraising Pick is correct', ''),
          subheading2: confirmationSubheading
        })]
      });

    case WizardStep.submit:
      return /*#__PURE__*/_jsx(DialogBodyTitle, {
        heading2: t('artistprofile_fundraising_formtitle_5', 'Confirm your Artist Fundraising Pick is correct', ''),
        subheading2: confirmationSubheading
      });

    case WizardStep.submitting:
      return null;

    case WizardStep.success:
      return null;

    case WizardStep.conflict:
      // TODO cleanup once self-serve is rolled out and this response code is deprecated.
      return /*#__PURE__*/_jsx(DialogBodyTitle, {
        heading2: t('artistprofile_fundraising_formtitle_6', 'Your fundraising link was not submitted', "The action didn't work."),
        subheading2: t('artistprofile_fundraising_formtitle_7', 'You can’t submit another link because you, or someone from your team, already submitted an Artist Fundraising Pick. Contact other admins on your team for more info.', '')
      });

    default:
      unreachable(step);
      return null;
  }
}
var H2 = styled(Type).attrs({
  forwardedAs: 'h2',
  variant: Type.heading2
}).withConfig({
  displayName: "FormTitle__H2",
  componentId: "b26ry8-0"
})(["padding-bottom:", ";text-align:start;"], spacer20);
var H3 = styled(Type).attrs({
  forwardedAs: 'h3',
  variant: Type.body1,
  color: gray50
}).withConfig({
  displayName: "FormTitle__H3",
  componentId: "b26ry8-1"
})(["text-align:start;"]);

function DialogBodyTitle(props) {
  return /*#__PURE__*/_jsxs(DialogWrapper, {
    style: {
      flexDirection: 'column'
    },
    children: [/*#__PURE__*/_jsx(H2, {
      children: props.heading2
    }), props.subheading2 ? /*#__PURE__*/_jsx(H3, {
      children: props.subheading2
    }) : null]
  });
}

var FundraisingFormBanner = styled(Banner).withConfig({
  displayName: "FormTitle__FundraisingFormBanner",
  componentId: "b26ry8-2"
})(["margin-bottom:40px;text-align:start;"]);

function GenericSubmissionErrorBanner() {
  var t = useT();

  var _React$useState = React.useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  return open ? /*#__PURE__*/_jsx(FundraisingBannerWrapper, {
    children: /*#__PURE__*/_jsx(FundraisingFormBanner, {
      colorSet: "negative",
      onClose: function onClose() {
        setOpen(false);
      },
      children: t('artistprofile_fundraising_formtitle_8', 'Something went wrong. Please try again.', '')
    })
  }) : null;
}