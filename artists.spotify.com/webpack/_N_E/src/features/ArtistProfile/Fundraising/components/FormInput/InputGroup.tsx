import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import styled from 'styled-components';
import { FormHelpText, FormInput as EncoreFormInput, FormSelect, Type, gray10 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { helpArticleUrl, musicReliefOrgDisplayNamesWithCountries, musicReliefOrgLinks } from '../../lib/constants';
import { unreachable } from '../../lib/unreachable';
import { setPrefix, useValidateProvider } from '../../lib/validations';
import { FormGroup, TextLinkUnderlined } from '../StyleElements';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var FormHelpTextFontSize14 = styled(FormHelpText).withConfig({
  displayName: "InputGroup__FormHelpTextFontSize14",
  componentId: "sc-1n7q8nb-0"
})(["font-size:14px;line-height:20px;"]);
var LabelSpan16 = styled(Type).attrs({
  color: gray10,
  variant: Type.body2
}).withConfig({
  displayName: "InputGroup__LabelSpan16",
  componentId: "sc-1n7q8nb-1"
})(["font-size:16px;line-height:24px;font-weight:", ";"], Type.bold);
var FormInputPreventAutoZoomIOS = styled(EncoreFormInput).withConfig({
  displayName: "InputGroup__FormInputPreventAutoZoomIOS",
  componentId: "sc-1n7q8nb-2"
})(["font-size:16px;"]);
var FormSelectPreventAutoZoomIOS = styled(FormSelect).withConfig({
  displayName: "InputGroup__FormSelectPreventAutoZoomIOS",
  componentId: "sc-1n7q8nb-3"
})(["font-size:16px;"]);
var FormGroupPositionRelative = styled(FormGroup).withConfig({
  displayName: "InputGroup__FormGroupPositionRelative",
  componentId: "sc-1n7q8nb-4"
})(["position:relative;"]);

function useOptions() {
  var t = useT();
  return {
    cashapp: {
      type: 'text',
      displayName: 'Cash App'
    },
    givealittle: {
      type: 'text',
      disclaimer: /*#__PURE__*/_jsx(_Fragment, {
        children: t('artistprofile_fundraising_forminput_inputgroup_1', "Only choose Givealittle as your payment provider if you're based in New Zealand.", "Givealittle is a name for a company. Don't translate.")
      }),
      displayName: 'Givealittle'
    },
    gofundme: {
      type: 'text',
      displayName: 'GoFundMe'
    },
    payu_turkey: {
      type: 'text',
      disclaimer: /*#__PURE__*/_jsx(_Fragment, {
        children: t('artistprofile_fundraising_forminput_inputgroup_2', "Only choose iyzico, a PayU company (Turkey) as your payment provider if you're based in Turkey. You can only receive donations from people in Turkey.", "Don't translate proper provider names.")
      }),
      displayName: 'iyzico, a PayU company (Turkey)'
    },
    mercadopago: {
      type: 'text',
      disclaimer: /*#__PURE__*/_jsx(_Fragment, {
        children: t('artistprofile_fundraising_forminput_inputgroup_3', "Only choose Mercado Pago as your payment provider if you're based in Argentina, Brazil, Chile, Colombia, Mexico, Peru, or Uruguay. Mercado Pago will ask you to set a fixed donation amount.", "Don't translate proper provider names.")
      }),
      displayName: 'Mercado Pago'
    },
    musicrelieforg: {
      type: 'select',
      displayName: 'Choose Music Relief organization'
    },
    paypal: {
      type: 'text',
      disclaimer: /*#__PURE__*/_jsxs(_Fragment, {
        children: [t('artistprofile_fundraising_forminput_inputgroup_4', "Don’t choose PayPal.me as your payment provider if you're based in one of these countries: Argentina, Bahrain, Brazil, Chile, Colombia, Costa Rica, Dominican Republic, Ecuador, El Salvador, Guatemala, Honduras, Hong Kong, India, Israel, Jordan, Malaysia, Mexico, Nicaragua, Oman, Panama, Peru, Qatar, Saudi Arabia, Singapore, United Arab Emirates, or Uruguay.", "Don't translate proper provider names."), "\xA0", /*#__PURE__*/_jsx(TextLinkUnderlined, {
          href: helpArticleUrl,
          target: "help",
          children: "Learn more"
        })]
      }),
      displayName: 'PayPal.me'
    },
    payu_latam: {
      type: 'text',
      disclaimer: /*#__PURE__*/_jsx(_Fragment, {
        children: t('artistprofile_fundraising_forminput_inputgroup_5', "Only choose PayU (LATAM) as your payment provider if you're based in one of these countries: Argentina, Brazil, Chile, Colombia, Mexico, or Peru. PayU will ask you to set a fixed donation amount.", "Don't translate proper provider names.")
      }),
      displayName: 'PayU (LATAM)'
    }
  };
}

export function InputGroup(props) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [props.isFundraisingLinkSelected ? /*#__PURE__*/_jsx(ProviderSelectGroup, _objectSpread({}, props)) : null, /*#__PURE__*/_jsx(LinkInputGroup, _objectSpread({}, props))]
  });
}

function ProviderSelectGroup(props) {
  var _props$provider$value, _props$provider$error, _props$provider$error2;

  var t = useT();
  var hasErrors = props.provider.errors.length > 0;
  var providerValue = props.provider.value;
  var ariaDescribedBy = hasErrors ? 'fundraising-pick-select-input-error-0' : undefined;
  var disclaimer = null;
  var disclaimerId = '';
  var options = useOptions();

  if (providerValue) {
    var _options$providerValu;

    disclaimer = (_options$providerValu = options[providerValue]) === null || _options$providerValu === void 0 ? void 0 : _options$providerValu.disclaimer;

    if (disclaimer && !hasErrors) {
      disclaimerId = "".concat(providerValue, "-disclaimer");
      ariaDescribedBy = disclaimerId;
    }
  }

  var validateProvider = useValidateProvider();

  function onProviderChange(ev) {
    var nextProvider = ev.target.value;
    props.link.reset();
    props.org.reset();
    props.provider.setValue(ev);
    props.provider.validate([validateProvider.bind(null, nextProvider)]);

    if (nextProvider) {
      setPrefix(props.link, nextProvider);
    }
  }

  var optionsWithoutMusicReliefOrg = _objectSpread(_objectSpread({}, options), {}, {
    musicrelieforg: undefined
  });

  return /*#__PURE__*/_jsxs(FormGroup, {
    label: /*#__PURE__*/_jsx(LabelSpan16, {
      children: t('artistprofile_fundraising_forminput_inputgroup_6', 'Choose payment provider', '')
    }),
    labelFor: "fundraising-pick-select-input",
    children: [/*#__PURE__*/_jsxs(FormSelectPreventAutoZoomIOS, {
      id: "fundraising-pick-select-input",
      onChange: onProviderChange,
      value: (_props$provider$value = props.provider.value) !== null && _props$provider$value !== void 0 ? _props$provider$value : '',
      error: hasErrors,
      "aria-invalid": hasErrors,
      "aria-describedby": ariaDescribedBy,
      children: [/*#__PURE__*/_jsx("option", {
        value: "",
        children: t('artistprofile_fundraising_forminput_inputgroup_7', 'Please select', '')
      }), Object.entries(optionsWithoutMusicReliefOrg).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            option = _ref2[1];

        if (option) {
          return /*#__PURE__*/_jsx("option", {
            value: key,
            children: option.displayName
          }, key);
        }

        return null;
      })]
    }), !hasErrors && !!disclaimer && /*#__PURE__*/_jsx(FormHelpTextFontSize14, {
      id: disclaimerId,
      children: /*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: Type.body2,
        children: disclaimer
      })
    }), (_props$provider$error = (_props$provider$error2 = props.provider.errors) === null || _props$provider$error2 === void 0 ? void 0 : _props$provider$error2.map(function (e, i) {
      return /*#__PURE__*/_jsx(FormHelpTextFontSize14, {
        id: "fundraising-pick-select-input-error-".concat(i),
        error: true,
        children: e
      }, i);
    })) !== null && _props$provider$error !== void 0 ? _props$provider$error : null]
  });
}

function LinkInputGroup(props) {
  var _options$type, _options;

  var t = useT();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      touched = _React$useState2[0],
      setTouched = _React$useState2[1];

  var textInputRef = React.useRef(null);
  var options = useOptions();
  var type = (_options$type = (_options = options[props.provider.value]) === null || _options === void 0 ? void 0 : _options.type) !== null && _options$type !== void 0 ? _options$type : 'text';

  function onOrgChange(ev) {
    if (ev.target.value) {
      props.org.setValue(ev);
      props.link.setInnerValue(musicReliefOrgLinks[ev.target.value]);
    }
  }

  function onPasteTextInput(evt) {
    var pastedText = (evt.clipboardData || window.clipboardData).getData('text/plain');
    props.link.setValue({
      target: {
        value: pastedText
      }
    }); // Important! We don't want the onChange handler to handle this again

    evt.preventDefault();
  }

  var shouldShowPlaceholder = !touched && props.link.value === props.link.initialValue;

  switch (type) {
    case 'text':
      {
        var _props$link$errors$ma, _props$link$errors;

        var hasErrors = props.link.errors.length > 0;
        return /*#__PURE__*/_jsxs(FormGroupPositionRelative, {
          label: /*#__PURE__*/_jsx(LabelSpan16, {
            children: t('artistprofile_fundraising_forminput_inputgroup_8', 'Add your fundraising link', '')
          }),
          labelFor: "fundraising-pick-text-input",
          children: [/*#__PURE__*/_jsx(FormInputPreventAutoZoomIOS, {
            id: "fundraising-pick-text-input",
            type: "text",
            ref: textInputRef,
            onChange: props.link.setValue,
            onFocus: function onFocus() {
              return setTouched(true);
            },
            value: shouldShowPlaceholder ? '' : props.link.value,
            error: hasErrors,
            "aria-invalid": hasErrors,
            onPaste: onPasteTextInput,
            "aria-describedby": hasErrors ? 'fundraising-pick-text-input-error-0' : undefined,
            placeholder: props.link.value || t('artistprofile_fundraising_forminput_inputgroup_9', 'Your link', '')
          }), (_props$link$errors$ma = (_props$link$errors = props.link.errors) === null || _props$link$errors === void 0 ? void 0 : _props$link$errors.map(function (e, i) {
            return /*#__PURE__*/_jsx(FormHelpTextFontSize14, {
              id: "fundraising-pick-text-input-error-".concat(i),
              error: true,
              children: e
            }, i);
          })) !== null && _props$link$errors$ma !== void 0 ? _props$link$errors$ma : null]
        });
      }

    case 'select':
      {
        var _props$org$value, _props$link$errors$ma2, _props$link$errors2;

        var _hasErrors = props.link.errors.length > 0;

        return /*#__PURE__*/_jsxs(FormGroup, {
          label: /*#__PURE__*/_jsx(LabelSpan16, {
            children: t('artistprofile_fundraising_forminput_inputgroup_10', 'Choose Music Relief organization', '')
          }),
          labelFor: "fundraising-pick-select-input",
          children: [/*#__PURE__*/_jsxs(FormSelectPreventAutoZoomIOS, {
            id: "fundraising-pick-select-input",
            onChange: onOrgChange,
            value: (_props$org$value = props.org.value) !== null && _props$org$value !== void 0 ? _props$org$value : '',
            error: _hasErrors,
            "aria-invalid": _hasErrors,
            "aria-describedby": _hasErrors ? 'fundraising-pick-select-input-error-0' : undefined,
            children: [/*#__PURE__*/_jsx("option", {
              value: "",
              children: t('artistprofile_fundraising_forminput_inputgroup_11', 'Please select', '')
            }), Object.keys(musicReliefOrgDisplayNamesWithCountries).map(function (orgName) {
              var orgDisplayName = // @ts-ignore
              musicReliefOrgDisplayNamesWithCountries[orgName];
              return /*#__PURE__*/_jsx("option", {
                value: orgName,
                children: orgDisplayName
              }, orgName);
            })]
          }), (_props$link$errors$ma2 = (_props$link$errors2 = props.link.errors) === null || _props$link$errors2 === void 0 ? void 0 : _props$link$errors2.map(function (e, i) {
            return /*#__PURE__*/_jsx(FormHelpTextFontSize14, {
              id: "fundraising-pick-select-input-error-".concat(i),
              error: true,
              children: e
            }, i);
          })) !== null && _props$link$errors$ma2 !== void 0 ? _props$link$errors$ma2 : null]
        });
      }

    default:
      unreachable(type);
      return null;
  }
}