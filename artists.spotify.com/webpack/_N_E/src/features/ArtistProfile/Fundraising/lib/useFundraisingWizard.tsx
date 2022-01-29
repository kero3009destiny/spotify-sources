import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Logger } from '@mrkt/features/Platform';
import { useT } from '@mrkt/features/i18n';
import { Banner } from '@spotify-internal/encore-web';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { FormTitle } from '../components/FormTitle';
import { DialogFooter } from '../components/DialogFooter';
import { FormSuccess } from '../components/FormSuccess';
import { FormInput } from '../components/FormInput';
import { FormLoading } from '../components/FormLoading';
import { FormReview } from '../components/FormReview';
import { usePut } from './usePut';
import { useGoToCurrentArtistProfile } from './useGoToCurrentArtistProfile';
import { useValidateLinkForProviderAndOrg, useValidate } from './validations';
import { WizardStep, useWizard } from './useWizard';
import { useInput } from './useInput';
import { useHideBanner, useShowSuccess } from './useBanner';
import { NavStepper } from '../components/NavStepper';
import { unreachable } from './unreachable';
import { useOptimisticUpdate } from './useOptimisticUpdate';
import { jsx as _jsx } from "react/jsx-runtime";
export function useFundraisingWizard() {
  var viewport = useViewport();
  var condensed = viewport === Viewport.XS;

  var _useWizard = useWizard(),
      _useWizard2 = _slicedToArray(_useWizard, 2),
      currWizardStep = _useWizard2[0],
      wizardStepFromTo = _useWizard2[1];

  var goToCurrentArtistProfile = useGoToCurrentArtistProfile();
  var onExitForm = goToCurrentArtistProfile;
  var showSuccessBannerOnHome = useShowSuccess();
  var hideBannerOnHome = useHideBanner();
  var link = useInput('', '');
  var provider = useInput('');
  var org = useInput('');
  var put = usePut();
  var optimisicUpdate = useOptimisticUpdate();
  var location = useLocation();
  var t = useT();
  var isEditing = new URLSearchParams(location.search).has('editing');
  var Body = getBody(currWizardStep);
  var nextCTACopy = useNextCallToAction(currWizardStep);
  var nextWizardStep = getNextWizardStep(currWizardStep);
  var prevWizardStep = getPrevWizardStep(currWizardStep);
  var disableNext = !link.value || !link.dirty || currWizardStep === WizardStep.submitting;
  var hidePrev = currWizardStep === WizardStep.input || currWizardStep === WizardStep.success || currWizardStep === WizardStep.conflict;
  var disablePrev = currWizardStep === WizardStep.submitting;
  var validate = useValidate();
  var validateLinkForProviderAndOrg = useValidateLinkForProviderAndOrg();

  function stepIfValid() {
    validate(link, provider, org);
    var isValidLink = validateLinkForProviderAndOrg(provider, org)(link.value) == null;

    if (isValidLink) {
      wizardStepFromTo(currWizardStep, nextWizardStep);
    }
  }

  function submitLinkAndProvider() {
    return _submitLinkAndProvider.apply(this, arguments);
  }

  function _submitLinkAndProvider() {
    _submitLinkAndProvider = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var nextNextWizardStep, nextPrevWizardStep, linkValue, providerOrOrgValue, resp;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(nextWizardStep && provider.value)) {
                _context2.next = 10;
                break;
              }

              // Two steps forward submit -> submitting -> success
              nextNextWizardStep = getNextWizardStep(nextWizardStep); // One step forward, one step back submit -> submitting -> failure

              nextPrevWizardStep = getPrevWizardStep(nextWizardStep); // Step forward to submitting

              wizardStepFromTo(currWizardStep, nextWizardStep);
              linkValue = link.value;
              providerOrOrgValue = org.value || provider.value;
              _context2.next = 8;
              return put(linkValue, providerOrOrgValue);

            case 8:
              resp = _context2.sent;

              if (resp !== null && resp !== void 0 && resp.ok) {
                // Step forward again to success
                wizardStepFromTo(nextWizardStep, nextNextWizardStep); // Optimistically update the artist profile

                optimisicUpdate({
                  channel: providerOrOrgValue,
                  url: linkValue
                }); // Update the banner state

                showSuccessBannerOnHome();
              } else if ((resp === null || resp === void 0 ? void 0 : resp.status) === 409) {
                // Step to already submitted error state
                wizardStepFromTo(nextWizardStep, WizardStep.conflict); // Don't show the banner again after conflict has occurred

                hideBannerOnHome();
              } else {
                // Log unexpected error code
                Logger.logError('artist-fundraising-pick-put-error', new Error("Unexpected response".concat(resp !== null && resp !== void 0 && resp.status ? " status ".concat(resp === null || resp === void 0 ? void 0 : resp.status) : " ".concat(resp)))); // Step backward from submitting to failure

                wizardStepFromTo(nextWizardStep, nextPrevWizardStep);
              }

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _submitLinkAndProvider.apply(this, arguments);
  }

  return {
    banner: /*#__PURE__*/_jsx(Banner, {
      step: currWizardStep
    }),
    dialogBody: /*#__PURE__*/_jsx(Body, {
      isEditing: isEditing,
      link: link,
      provider: provider,
      org: org
    }),
    dialogBodyTitle: // Even though <FormTitle> returns null for WizardStep.success, the encore
    // <DialogFullScreen> component that this is ultimately passed to renders an
    // empty <h1> that takes up some space. To get <DialogFullScreen> to omit
    // the empty <h1> we pass null here instead of a component that returns null.
    currWizardStep === WizardStep.success ? null : /*#__PURE__*/_jsx(FormTitle, {
      isEditing: isEditing,
      step: currWizardStep
    }),
    dialogFooter: /*#__PURE__*/_jsx(DialogFooter, {
      isEditing: isEditing,
      prev: function prev() {
        wizardStepFromTo(currWizardStep, prevWizardStep);
      },
      noPrev: disablePrev,
      hidePrev: hidePrev,
      next: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = currWizardStep;
                _context.next = _context.t0 === WizardStep.input ? 3 : _context.t0 === WizardStep.submit ? 5 : _context.t0 === WizardStep.failure ? 5 : _context.t0 === WizardStep.conflict ? 8 : _context.t0 === WizardStep.success ? 8 : _context.t0 === WizardStep.submitting ? 10 : 11;
                break;

              case 3:
                stepIfValid();
                return _context.abrupt("break", 13);

              case 5:
                _context.next = 7;
                return submitLinkAndProvider();

              case 7:
                return _context.abrupt("break", 13);

              case 8:
                onExitForm();
                return _context.abrupt("break", 13);

              case 10:
                return _context.abrupt("break", 13);

              case 11:
                unreachable(currWizardStep);
                return _context.abrupt("break", 13);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })),
      noNext: disableNext,
      nextCopy: nextCTACopy !== null && nextCTACopy !== void 0 ? nextCTACopy : '',
      step: currWizardStep
    }),
    dialogNavStepper: /*#__PURE__*/_jsx(NavStepper, {
      isEditing: isEditing,
      step: currWizardStep,
      visible: !condensed
    }),
    dialogOnClose: onExitForm,
    dialogOnEscape: onExitForm,
    dialogTitle: t('artistprofile_fundraising_useFundraisingWizard_5', 'Artist Fundraising Pick', '')
  };
}

function getBody(step) {
  switch (step) {
    case WizardStep.input:
      return FormInput;

    case WizardStep.failure:
    case WizardStep.submit:
      return FormReview;

    case WizardStep.submitting:
      return function () {
        return /*#__PURE__*/_jsx(FormLoading, {});
      };

    case WizardStep.success:
      return FormSuccess;

    case WizardStep.conflict:
      return function () {
        return null;
      };

    default:
      unreachable(step);
      return function () {
        return null;
      };
  }
}

function useNextCallToAction(step) {
  var t = useT();
  var viewport = useViewport();
  var condensed = viewport === Viewport.XS;

  switch (step) {
    case WizardStep.input:
      return t('artistprofile_fundraising_useFundraisingWizard_1', 'next', '');

    case WizardStep.failure:
    case WizardStep.submit:
    case WizardStep.submitting:
      return condensed ? t('artistprofile_fundraising_useFundraisingWizard_2', 'agree & submit', '') : t('artistprofile_fundraising_useFundraisingWizard_3', 'agree and submit', '');

    case WizardStep.success:
    case WizardStep.conflict:
      return t('artistprofile_fundraising_useFundraisingWizard_4', 'done', '');

    default:
      unreachable(step);
      return null;
  }
}

function getNextWizardStep(step) {
  switch (step) {
    case WizardStep.input:
      return WizardStep.submit;

    case WizardStep.failure:
    case WizardStep.submit:
      return WizardStep.submitting;

    case WizardStep.submitting:
      return WizardStep.success;

    case WizardStep.success:
    case WizardStep.conflict:
      return null;

    default:
      unreachable(step);
      return null;
  }
}

function getPrevWizardStep(step) {
  switch (step) {
    case WizardStep.input:
      return null;

    case WizardStep.failure:
    case WizardStep.submit:
      return WizardStep.input;

    case WizardStep.submitting:
      return WizardStep.failure;

    case WizardStep.success:
    case WizardStep.conflict:
      return null;

    default:
      unreachable(step);
      return null;
  }
}