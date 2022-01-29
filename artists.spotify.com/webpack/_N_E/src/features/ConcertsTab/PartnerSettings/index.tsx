import _defineProperty from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import cn from 'classnames';
import { ButtonTertiary, Backdrop, IconCheckAltActive, IconX, Type, Banner, FormGroup, FormTextarea, FormRadio } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import { ModalButton } from '../ModalButton';
import Avatar from '../Avatar';
import MediaWithDescription from '../MediaWithDescription';
import partnerConfig from '../partnerConfig';
import styles from './index.module.scss';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var sortPartners = function sortPartners(a, b) {
  return a.partnerName < b.partnerName ? 1 : -1;
};

var filterPartners = function filterPartners(partner) {
  return partnerConfig.allPartnerIds.includes(partner.partnerName);
};

var StyledBackdrop = styled(Backdrop).withConfig({
  displayName: "PartnerSettings__StyledBackdrop",
  componentId: "we5jqr-0"
})(["div{max-width:95%;}"]);
var StyledDialogConfirmation = styled(DialogConfirmation).withConfig({
  displayName: "PartnerSettings__StyledDialogConfirmation",
  componentId: "we5jqr-1"
})(["margin:auto;"]);
/* eslint-disable-next-line import/no-default-export */

export var PartnerSettings = function PartnerSettings(props) {
  var t = useT();
  var partners = props.partners,
      _onClose = props.onClose;
  var initReportedCorrectIds = props.defaultReportMode ? props.defaultIdsSelected.map(function (itm) {
    return "".concat(itm.partnerName, ":").concat(itm.partnerId);
  }).reduce(function (out, itm) {
    return _objectSpread(_objectSpread({}, out), {}, _defineProperty({}, itm, true));
  }, {}) : {};

  var _useState = useState(initReportedCorrectIds),
      reportedIncorrectIds = _useState[0],
      setReportedIncorrectIds = _useState[1];

  var _useState2 = useState(!!props.defaultReportMode),
      reportMode = _useState2[0],
      setReportMode = _useState2[1];

  var _useState3 = useState({}),
      reportedIncompleteIds = _useState3[0],
      setReportedIncompleteIds = _useState3[1];

  var _useState4 = useState(''),
      infoMessage = _useState4[0],
      setInfoMessage = _useState4[1];

  var _useState5 = useState(false),
      showSuccessMessage = _useState5[0],
      setShowSuccessMessage = _useState5[1];

  var _useState6 = useState(false),
      isSubmitting = _useState6[0],
      setIsSubmitting = _useState6[1];

  var _useState7 = useState(false),
      hasError = _useState7[0],
      setHasError = _useState7[1];

  var disableSubmit = infoMessage.trim().length === 0 || Object.keys(reportedIncorrectIds).filter(function (key) {
    return reportedIncorrectIds[key];
  }).length === 0 && Object.keys(reportedIncompleteIds).filter(function (key) {
    return reportedIncompleteIds[key];
  }).length === 0;
  var messages = {
    title: {
      id: 'app.concerts.PartnerSettings.title',
      defaultMessage: t('2c73ed', 'Your artist IDs', '')
    },
    reportTitle: {
      id: 'app.concerts.PartnerSettings.reportTitle',
      defaultMessage: t('84ab69', 'Report a problem', '')
    },
    desc: {
      id: 'app.concerts.PartnerSettings.desc',
      defaultMessage: t('8810cb', 'These are unique IDs we use to pull your concert listings from our partners.', '')
    },
    reportDesc: {
      id: 'app.concerts.PartnerSettings.reportDesc',
      defaultMessage: t('ca4292', 'Select incorrect or incomplete Artist IDs', '')
    },
    report: {
      id: 'app.concerts.PartnerSettings.report',
      defaultMessage: t('84ab69', 'Report a problem', '')
    },
    done: {
      id: 'app.concerts.PartnerSettings.done',
      defaultMessage: t('644e35', 'Done', '')
    },
    submit: {
      id: 'app.concerts.PartnerSettings.submit',
      defaultMessage: t('8398e8', 'Submit', '')
    },
    cancelReport: {
      id: 'app.concerts.PartnerSettings.cancelReport',
      defaultMessage: t('914ff9', 'Cancel', '')
    },
    infoTitle: {
      id: 'app.concerts.PartnerSettings.infoTitle',
      defaultMessage: t('3f1253', 'Briefly explain the problem', '')
    },
    infoPlaceholder: {
      id: 'app.concerts.PartnerSettings.infoPlaceholder',
      defaultMessage: t('0fd519', 'Provide the correct Artist ID...', '')
    },
    incorrectId: {
      id: 'app.concerts.PartnerSettings.incorrectId',
      defaultMessage: t('a0264b', 'Incorrect ID', '')
    },
    incompleteId: {
      id: 'app.concerts.PartnerSettings.incompleteId',
      defaultMessage: t('29aeac', 'Incomplete ID', '')
    },
    errorMessage: {
      id: 'app.concerts.PartnerSettings.errorMessage',
      defaultMessage: t('39bfaf', 'There was an error. Please try again.', '')
    },
    isSubmitting: {
      id: 'app.concerts.PartnerSettings.isSubmitting',
      defaultMessage: t('011432', 'Submitting...', '')
    },
    successMessage: {
      id: 'app.concerts.PartnerSettings.successMessage',
      defaultMessage: t('3d8c3a', "We've received your request. Someone will take a look at your Artist IDs, check back soon.", '')
    }
  };

  var handleSubmitReportProblem = function handleSubmitReportProblem() {
    var incorrectIdsToSend = Object.keys(reportedIncorrectIds).filter(function (key) {
      return reportedIncorrectIds[key];
    }).join('\n');
    var incompleteIdsToSend = Object.keys(reportedIncompleteIds).filter(function (key) {
      return reportedIncompleteIds[key];
    }).join('\n');
    setIsSubmitting(true);
    setHasError(false);
    return props.onReportSubmit(incorrectIdsToSend, incompleteIdsToSend, infoMessage).catch(function () {// catch any error and just log it,
      // but continue on so we don't promote duplicate
      // submissions.
      // SWALLOW THAT ERROR!
    }).then(function () {
      // scroll to top so that user can see message
      var toScroll = document.querySelector("[data-id='body']");
      /* istanbul ignore next */

      if (toScroll && toScroll.scroll) {
        toScroll.scroll(0, 0);
      }

      setReportMode(false);
      setShowSuccessMessage(true);
      setReportedIncorrectIds({});
      setIsSubmitting(false);
      setHasError(false);
    }); // once the BE is fixed, then properly catch
    // and show error message.
    // .catch(() => {
    //   setIsSubmitting(false);
    //   setHasError(true) });
    // });
  }; // toggle report mode and clear any state;


  var toggleReportMode = function toggleReportMode() {
    setReportMode(!reportMode);
    setReportedIncorrectIds({});
    setInfoMessage('');
    setShowSuccessMessage(false);
  };

  var toggleIncorrectPartnerSelected = function toggleIncorrectPartnerSelected(_, partner) {
    var partnerId = "".concat(partner.partnerName, ":").concat(partner.partnerId);
    setReportedIncorrectIds(_objectSpread(_objectSpread({}, reportedIncorrectIds), {}, _defineProperty({}, partnerId, !reportedIncorrectIds[partnerId])));
    setReportedIncompleteIds(_objectSpread(_objectSpread({}, reportedIncompleteIds), {}, _defineProperty({}, partnerId, false)));
  };

  var toggleIncompletePartnerSelected = function toggleIncompletePartnerSelected(_, partner) {
    var partnerId = "".concat(partner.partnerName, ":").concat(partner.partnerId);
    setReportedIncompleteIds(_objectSpread(_objectSpread({}, reportedIncompleteIds), {}, _defineProperty({}, partnerId, !reportedIncompleteIds[partnerId])));
    setReportedIncorrectIds(_objectSpread(_objectSpread({}, reportedIncorrectIds), {}, _defineProperty({}, partnerId, false)));
  };

  var updateInfoMessage = function updateInfoMessage(ev) {
    return setInfoMessage(ev.target.value);
  };

  var renderPartner = function renderPartner(partner) {
    var longNameToForceSpecificFormattingSoSnotShotDoesntBreak = partnerConfig.partnersById[partner.partnerName].displayName;
    return /*#__PURE__*/_jsx("button", {
      type: "button",
      className: styles.partner_layout,
      onClick: function onClick() {
        return partner.profileUrl && window.open(partner.profileUrl, '_blank');
      },
      children: /*#__PURE__*/_jsx(MediaWithDescription, {
        media: /*#__PURE__*/_jsx(Avatar, {
          imageUrl: partner.mappedPartnerImage.imageUrl
        }),
        description: /*#__PURE__*/_jsx("div", {
          className: styles.description,
          children: /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("p", {
              className: cn(styles.partner_text, styles.title),
              children: partner.name
            }), /*#__PURE__*/_jsxs("p", {
              className: styles.partner_text,
              children: [longNameToForceSpecificFormattingSoSnotShotDoesntBreak, ":", ' ', partner.partnerId]
            })]
          })
        })
      })
    }, partner.partnerId);
  };

  var renderPartnerReportMode = function renderPartnerReportMode(partner) {
    var longNameToForceSpecificFormattingSoSnotShotDoesntBreak = partnerConfig.partnersById[partner.partnerName].displayName;
    return /*#__PURE__*/_jsx("div", {
      className: styles.partner_layout,
      children: /*#__PURE__*/_jsx(MediaWithDescription, {
        media: /*#__PURE__*/_jsx(Avatar, {
          imageUrl: partner.mappedPartnerImage.imageUrl
        }),
        description: /*#__PURE__*/_jsxs("div", {
          className: styles.description,
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("p", {
              className: cn(styles.partner_text, styles.title),
              children: partner.name
            }), /*#__PURE__*/_jsxs("p", {
              className: styles.partner_text,
              children: [longNameToForceSpecificFormattingSoSnotShotDoesntBreak, ":", ' ', partner.partnerId]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: styles.partner_report_controls,
            children: [/*#__PURE__*/_jsxs("div", {
              className: styles.partner_report_control,
              children: [/*#__PURE__*/_jsx(Type, {
                variant: Type.body3,
                className: styles.partner_report_controls_text,
                semanticColor: "textSubdued",
                children: messages.incorrectId.defaultMessage
              }), /*#__PURE__*/_jsx(FormRadio, {
                disabled: isSubmitting,
                className: styles.select_checkbox,
                checked: !!reportedIncorrectIds["".concat(partner.partnerName, ":").concat(partner.partnerId)],
                id: "reported-incorrect-id:".concat(partner.partnerId),
                onChange:
                /* istanbul ignore next */
                function onChange(ev) {
                  return toggleIncorrectPartnerSelected(ev, partner);
                }
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: styles.partner_report_control,
              children: [/*#__PURE__*/_jsx(Type, {
                variant: Type.body3,
                className: styles.partner_report_controls_text,
                semanticColor: "textSubdued",
                children: messages.incompleteId.defaultMessage
              }), /*#__PURE__*/_jsx(FormRadio, {
                disabled: isSubmitting,
                className: styles.select_checkbox,
                checked: !!reportedIncompleteIds["".concat(partner.partnerName, ":").concat(partner.partnerId)],
                onChange:
                /* istanbul ignore next */
                function onChange(ev) {
                  return toggleIncompletePartnerSelected(ev, partner);
                },
                id: "reported-incomplete-id:".concat(partner.partnerId)
              })]
            })]
          })]
        })
      })
    }, partner.partnerId);
  };

  return /*#__PURE__*/_jsx(StyledBackdrop, {
    center: true,
    onClose: function onClose() {
      return !isSubmitting && _onClose();
    },
    children: /*#__PURE__*/_jsx(StyledDialogConfirmation, {
      dialogId: "concert-partnerId-dialog",
      dialogTitle: reportMode ? messages.reportTitle.defaultMessage : messages.title.defaultMessage,
      body: /*#__PURE__*/_jsxs("div", {
        children: [!reportMode && /*#__PURE__*/_jsx("p", {
          className: styles.partner_settings_desc,
          children: messages.desc.defaultMessage
        }), reportMode && /*#__PURE__*/_jsx("p", {
          className: styles.report_desc,
          children: messages.reportDesc.defaultMessage
        }), hasError && /*#__PURE__*/_jsx(Banner, {
          className: styles.error_alert // @ts-ignore
          ,
          variant: Banner.error,
          onClose:
          /* istanbul ignore next */
          function onClose() {
            return function () {
              return setHasError(false);
            };
          },
          children: messages.errorMessage.defaultMessage
        }), showSuccessMessage && /*#__PURE__*/_jsxs("div", {
          className: styles.alert,
          children: [/*#__PURE__*/_jsx(IconCheckAltActive, {
            className: styles.alert_icon
          }), /*#__PURE__*/_jsx(Type, {
            className: styles.alert_msg,
            children: messages.successMessage.defaultMessage
          }), /*#__PURE__*/_jsx("button", {
            type: "button",
            className: styles.dismiss_message,
            onClick:
            /* istanbul ignore next */
            function onClick() {
              return function () {
                return setShowSuccessMessage(false);
              };
            },
            children: /*#__PURE__*/_jsx(IconX, {
              iconSize: 16
            })
          })]
        }), partners.slice().sort(sortPartners).filter(filterPartners).map(function (partner) {
          return reportMode ? renderPartnerReportMode(partner) : renderPartner(partner);
        }), !reportMode && /*#__PURE__*/_jsx(ButtonTertiary, {
          condensed: true,
          semanticColor: "textBrightAccent",
          onClick: toggleReportMode,
          "data-testid": "artist-id-report-reportmode",
          children: messages.report.defaultMessage
        }), reportMode && /*#__PURE__*/_jsx(FormGroup, {
          label: messages.infoTitle.defaultMessage,
          children: /*#__PURE__*/_jsx(FormTextarea, {
            disabled: isSubmitting,
            value: infoMessage,
            onChange: updateInfoMessage,
            placeholder: messages.infoPlaceholder.defaultMessage,
            rows: 4,
            "data-testid": "artist-id-report-textarea"
          })
        })]
      }),
      footer: reportMode ? /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(ModalButton, {
          onClick: toggleReportMode,
          disabled: isSubmitting,
          children: messages.cancelReport.defaultMessage
        }), /*#__PURE__*/_jsx(ModalButton, {
          primary: true // @ts-ignore
          ,
          disabled: disableSubmit || isSubmitting,
          onClick: handleSubmitReportProblem,
          "data-testid": "artist-id-report-submit",
          children: isSubmitting ? messages.isSubmitting.defaultMessage : messages.submit.defaultMessage
        })]
      }) : /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(ModalButton, {
          primary: true,
          onClick: _onClose,
          children: messages.done.defaultMessage
        })
      })
    })
  });
};
PartnerSettings.defaultProps = {
  onClose: function onClose() {},
  defaultReportMode: false,
  defaultIdsSelected: []
};
/* eslint-disable-next-line import/no-default-export */

export default PartnerSettings;