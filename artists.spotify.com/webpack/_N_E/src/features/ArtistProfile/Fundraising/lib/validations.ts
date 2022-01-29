// ignore-string-externalization
import { musicReliefOrgLinks } from './constants';
import { unreachable } from '../lib/unreachable';
import { useCopy } from '.';
export function useValidate() {
  var validateProvider = useValidateProvider();
  var validateLinkForProviderAndOrg = useValidateLinkForProviderAndOrg();
  return function validate(link, provider, org) {
    provider.validate([validateProvider]);
    link.validate([validateLinkForProviderAndOrg(provider, org)]);
  };
} // TODO also export slug regexps which will allow clean up in useInput

var cashappPrefix = 'https://cash.app/$';
var cashappRegex = /^https:\/\/cash\.app\/\$[a-zA-Z0-9_-]+$/;
var givealittlePrefix = 'https://givealittle.co.nz/';
var givealittleRegex = /^https:\/\/givealittle\.co\.nz\/(cause|org|fundraiser|project|event)\/[a-z0-9_-]+$/;
var paypalPrefix = 'https://www.paypal.me/';
var paypalRegex = /^https:\/\/www\.paypal\.me\/[a-zA-Z0-9_-]+$/;
var gofundmePrefix = 'https://www.gofundme.com/f/';
var gofundmeRegex = /^https:\/\/www\.gofundme\.com\/f\/[a-zA-Z0-9_-]+$/;
var mercadopagoPrefix = '';
var mercadopagoRegex = /(^https:\/\/www\.mercadopago\.((cl)|(com\.(br|cl|ar|pe|co|uy|mx)))\/[a-zA-Z0-9-_/?=#&]+$)|(^(http(s)?:\/\/mpago\.la\/[a-zA-Z0-9-_/?=#&]+$))/;
var payulatamPrefix = '';
var payulatamRegex = /^https:\/\/biz.payulatam.(com|cl)\/[L][0-9a-fA-F]{6,30}$/;
var payuturkeyPrefix = 'https://iyzi.link/';
var payuturkeyRegex = /^https:\/\/iyzi\.link\/[a-zA-Z0-9_-]+$/; // export for test

export var providers = {
  cashapp: {
    prefix: cashappPrefix,
    regex: cashappRegex
  },
  givealittle: {
    prefix: givealittlePrefix,
    regex: givealittleRegex
  },
  gofundme: {
    prefix: gofundmePrefix,
    regex: gofundmeRegex
  },
  mercadopago: {
    prefix: mercadopagoPrefix,
    regex: mercadopagoRegex
  },
  musicrelieforg: null,
  paypal: {
    prefix: paypalPrefix,
    regex: paypalRegex
  },
  payu_latam: {
    prefix: payulatamPrefix,
    regex: payulatamRegex
  },
  payu_turkey: {
    prefix: payuturkeyPrefix,
    regex: payuturkeyRegex
  }
};
export function setPrefix(link, providerValue) {
  var _providers$providerVa;

  if (!providerValue) return;
  var providerPrefix = (_providers$providerVa = providers[providerValue]) === null || _providers$providerVa === void 0 ? void 0 : _providers$providerVa.prefix;

  if (providerPrefix) {
    link.setPrefix(providerPrefix);
  }
}
export function useValidateProvider() {
  var copy = useCopy();
  return function validateProvider(providerValue) {
    if (!providerValue) return copy.errors.orgValidation;
    return null;
  };
}
export function useValidateLinkForProviderAndOrg() {
  var copy = useCopy();
  return function validateLinkForProviderAndOrg(provider, org) {
    return function validateLink(link) {
      switch (provider.value) {
        case 'cashapp':
          {
            if (!link) return copy.errors.linkValidation;
            return link !== null && link !== void 0 && link.match(cashappRegex) ? null : copy.errors.linkValidation;
          }

        case 'givealittle':
          {
            if (!link) return copy.errors.linkValidation;
            return link !== null && link !== void 0 && link.match(givealittleRegex) ? null : copy.errors.linkValidation;
          }

        case 'gofundme':
          {
            if (!link) return copy.errors.linkValidation;
            return link !== null && link !== void 0 && link.match(gofundmeRegex) ? null : copy.errors.linkValidation;
          }

        case 'mercadopago':
          {
            if (!link) return copy.errors.linkValidation;
            return link !== null && link !== void 0 && link.match(mercadopagoRegex) ? null : copy.errors.linkValidation;
          }

        case 'musicrelieforg':
          {
            if (!org.value) return copy.errors.orgValidation;
            return link === musicReliefOrgLinks[org.value] ? null : copy.errors.orgValidation;
          }

        case 'paypal':
          {
            if (!link) return copy.errors.linkValidation;
            return link !== null && link !== void 0 && link.match(paypalRegex) ? null : copy.errors.linkValidation;
          }

        case 'payu_latam':
          {
            if (!link) return copy.errors.linkValidation;
            return link !== null && link !== void 0 && link.match(payulatamRegex) ? null : copy.errors.linkValidation;
          }

        case 'payu_turkey':
          {
            if (!link) return copy.errors.linkValidation;
            return link !== null && link !== void 0 && link.match(payuturkeyRegex) ? null : copy.errors.linkValidation;
          }

        case '':
          return copy.errors.linkValidation;

        default:
          unreachable(provider.value);
          return copy.errors.linkValidation;
      }
    };
  };
}